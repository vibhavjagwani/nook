from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, logout
from django.conf import settings
from django.db.models import F
from django.http import JsonResponse

from fiesta_api.models import Restaurant, Location, Drinks, Dessert, Activity, GenericActivity
from fiesta_api.models import RestaurantSerializer, LocationSerializer, DrinksSerializer, DessertSerializer, ActivitySerializer
from fiesta_api.models import User
from fiesta_api.models import UserSerializer
from fiesta_api.utils.yelp.api import search_restaurants_by_location, search_desserts_by_location, search_bars_by_location
from fiesta_api.utils.csv.restaurants import write_restaurants_to_csv, headers
from fiesta_api.utils.csv.reader import read_csv_lines
from fiesta_api.utils.csv.activities import write_activities_to_csv
from fiesta_api.utils.google.api import find_place_from_text, get_place_data_from_place_id
from fiesta_api.utils.google.cloud import storage_exists
from fiesta_api.utils.opentable.unofficial_api import find_restaurant

from django.core.files.storage import default_storage
from google.cloud import storage
import json
import time
import os
import logging
import environ
import decimal
import random


# env variables
env = environ.Env()
logger = logging.getLogger(__name__)

def index(request):
    return HttpResponse("Hello, world. You're at the fiesta index.")

@csrf_exempt 
def login(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # Redirect to a success page.
        return JsonResponse({"data": "somedata"})
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({"data": None}, status=404)

def signup(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    user = User.objects.create_user(username, password)
    if user:
        return HttpResponse({'data': UserSerializer(user).data})
    else:
        return HttpResponse("error", status=404)

def generate_restaurant_data(request):
    city = request.GET.get('city', None)
    with open(os.path.join(settings.BASE_DIR,'fiesta_api/utils/city_info/' + city + '.json')) as f:
        city_data = json.load(f)
    city_name = city_data['name']
    exclusion_list = city_data['exclusion_list']
    write_businesses = []
    # logging.info
    print('making yelp api calls')
    for region in city_data['regions']:
        for neighborhood in city_data['regions'][region]:
            search_location = f'{neighborhood}, {region}, {city_name}'
            print(search_location)
            # https://www.yelp.com/developers/documentation/v3/business_search
            restaurants_distance = search_restaurants_by_location(neighborhood, region, sort_by='distance')
            write_businesses.extend(restaurants_distance)
            time.sleep(0.5)
            restaurants = search_restaurants_by_location(neighborhood, region)
            write_businesses.extend(restaurants)
            time.sleep(0.5)
            desserts = search_desserts_by_location(neighborhood, region, limit=15)
            write_businesses.extend(desserts)
            time.sleep(0.5)
            bars = search_bars_by_location(neighborhood, region, limit=25)
            write_businesses.extend(bars)

    # logging.info
    print("writing to csv")
    write_restaurants_to_csv(city, write_businesses, exclusion_list=exclusion_list)
    return HttpResponse("done")

def add_event_metadata_csv(request):
    city = request.GET.get('city', None)
    filename = city + '_activities.csv'
    lines = read_csv_lines(filename)
    headers = list(filter( lambda x : x != '', next(lines)))
    activities = []
    for line in lines:
        event = " ".join(line[0:len(headers)])
        activity = find_place_from_text(event)
        activity = get_place_data_from_place_id(activity)
        logger.debug(activity)
        # use place id to get place details
        activities.append(activity)
        time.sleep(0.5)

    write_activities_to_csv(city, activities)
    return HttpResponse("done")

@csrf_exempt 
def update_restaurants_from_csv(request):
    city = 'new_york_city'
    csv_default = f'generated_restaurants_{city}_sample.csv'
    csv = request.POST.get('restaurant_data', csv_default)
    if storage_exists(csv):
        # open blob
        csvfile = default_storage.open(csv, 'r')
        file = csvfile.read()
        csvfile.close()
        # write blob to csv file locally
        restaurant_csv = "restaurant_data.csv"
        f = open(restaurant_csv, "wb")
        f.write(file)
        f.close()

        lines = read_csv_lines(restaurant_csv)
        headers = next(lines)
        # line = dict(zip(headers,line))
        for line in lines:
            activity_object = dict(zip(headers, line))
            # construct object
            tag = activity_object['tag']

            categories = activity_object['categories'].split(';')[:-1]
            while len(categories) < 3:
                categories.append(None)
            
            # clean_categories = []
            clean_categories = [cat[cat.index('-') + 1:] if cat and len(cat) > 2 else cat for cat in categories[:3]]
            location, loc_created = Location.objects.update_or_create(
                zip_code=activity_object['zip_code'],
                address1=activity_object['address1'],
                defaults={
                    'longitude': activity_object['longitude'],
                    'formatted_address': activity_object['display_address'],
                    'latitude': activity_object['latitude'],
                    'city': activity_object['city'],
                    'state': activity_object['state'],
                    'country': activity_object['country'],
                    'neighborhood': activity_object['neighborhood'],
                    'address2': activity_object['address2'],
                    'address3': activity_object['address3']
                }
            )

            activity_defaults = {
                'name': activity_object['name'],
                'website': activity_object['url'],
                'tag_one': clean_categories[0],
                'tag_two': clean_categories[1],
                'tag_three': clean_categories[2],
                'review_count': activity_object['review_count'],
                'rating': activity_object['rating'],
                'image_url': f"https://storage.googleapis.com/nooks_tagged_images/{activity_object['neighborhood']}_new_york_city.jpg",
                'phone_number': activity_object['phone'],
                'price': activity_object['price'],
                'alias': activity_object['alias'],
                'active': True,
                'location': location

            }
            if 'restaurants' in tag:
                # print(activity_object['alias'])
                obj, created = Restaurant.objects.update_or_create(
                    yelp_id=activity_object['id'],
                    defaults={
                        **activity_defaults
                    }
                )

            elif 'bars' in tag:
                obj, created = Drinks.objects.update_or_create(
                    yelp_id=activity_object['id'],
                    defaults={
                        **activity_defaults
                    }
                )
            elif 'dessert' in tag:
               obj, created = Dessert.objects.update_or_create(
                    yelp_id=activity_object['id'],
                    defaults={
                        **activity_defaults
                    }
                )
        
        # delete restaurant_csv
        os.remove(restaurant_csv)

    return HttpResponse("done")

@csrf_exempt 
def update_activity_from_csv(request):
    city = 'new_york_city'
    csv_default = f'generated_activities_{city}_sample.csv'
    csv = request.POST.get('activity_data', csv_default)
    if storage_exists(csv):
        csvfile = default_storage.open(csv, 'r')
        file = csvfile.read()
        csvfile.close()
        # write blob to csv file locally
        activity_csv = "activity_data.csv"
        f = open(activity_csv, "wb")
        f.write(file)
        f.close()

        lines = read_csv_lines(activity_csv)
        headers = next(lines)
        for line in lines:
            activity_object = dict(zip(headers, line))
            # construct object
            address = activity_object['formatted_address'].split(',')
            if len(address) > 2:
                area_info = address[-2].split(' ')
                zip_code = area_info[-1]
                state = area_info[0]
                address1 = address[0]
                # city = address[-3]
                # country = address[-1]
                types = activity_object['types'].split(',')
                while len(types) < 3:
                    types.append(None)
                
                clean_num = ''.join(d for d in activity_object['formatted_phone_number'] if d.isdigit())
                location, loc_created = Location.objects.update_or_create(
                    zip_code=zip_code,
                    address1=activity_object['vicinity'],
                    defaults={
                        'longitude': activity_object['longitude'],
                        'latitude': activity_object['latitude'],
                        'formatted_address': activity_object['formatted_address'],
                        'city': 'New York',
                        'state': state,
                        'country': 'US',
                        'neighborhood': '',
                        'address2': '',
                        'address3': ''
                    }
                )
                # image url will be based on types hierarchy
                activity_defaults = {
                    'name': activity_object['name'],
                    'website': activity_object['website'],
                    'tag_one': types[0],
                    'tag_two': types[1],
                    'tag_three': types[2],
                    'image_url': "https://storage.googleapis.com/nooks_tagged_images/Little_Italy_new_york_city.jpg",
                    'phone_number': clean_num,
                    'location': location
                }

                obj, created = Activity.objects.update_or_create(
                    google_place_id=activity_object['place_id'],
                    name=activity_object['name'],
                    defaults={
                        **activity_defaults
                    }
                )

        os.remove(activity_csv)
    return HttpResponse("done")

@csrf_exempt 
def pathfinder(request):
    for l in Location.objects.all()[:1]:
        activity = l.genericactivity_set.first()
        activity_location = l
        activity_range = decimal.Decimal(0.01)
        activities = GenericActivity.objects.filter(location__longitude__lte=activity_location.longitude + activity_range, location__latitude__lte=activity_location.latitude + activity_range,location__longitude__gte=activity_location.longitude - activity_range, location__latitude__gte=activity_location.latitude - activity_range)
        # locations = Location.objects.filter(longitude__lte=activity_location.longitude + activity_range, latitude__lte=activity_location.latitude + activity_range,longitude__gte=activity_location.longitude - activity_range, latitude__gte=activity_location.latitude - activity_range)
        # print(activities.count())
        for activity in activities:
            print(activity.name)
    # l = Location.objects.get(id=1)
    # print(l.longitude)
    # print(l.latitude)
    # print(l.genericactivity_set.first().name)
    return HttpResponse("done")

@csrf_exempt 
def find_restaurant_test(request):
    name = request.GET.get('name', '')
    print(find_restaurant(name))
    return HttpResponse("done")

def serializer_helper(model_type, obj):
    if 'restaurant' in model_type:
        return RestaurantSerializer(obj).data
    elif 'dessert' in model_type:
        return DessertSerializer(obj).data
    elif 'activity' in model_type:
        return ActivitySerializer(obj).data
    elif 'drinks' in model_type:
        return DrinksSerializer(obj).data
    return None

def get_shuffle(request):
    try:
        city = "New York"
        p1_type = request.GET.get('p1_type', '')
        p2_type = request.GET.get('p2_type', '')
        p3_type = request.GET.get('p3_type', '')
        p_shuffle = request.GET.get('shuffle', ',,,')
        lock_ids = p_shuffle.split(',')

        return_obj = [None,None,None,None,None] # first and last slots are just to avoid index out of bounds
        p_types = [p1_type, p2_type, p3_type]

        for i in range(0,3):
            if lock_ids[i] != '':
                return_obj[i+1] = GenericActivity.objects.get(pk=lock_ids[i])
        
        # flipped edge case
        flipped = False
        if return_obj[3] != None and return_obj[2] == None and return_obj[1] == None:
            flipped = True
            return_obj = return_obj[::-1]
            p_types = p_types[::-1]
    
        activity_range = decimal.Decimal(0.01)
        for i in range(0,3):
            item = p_types[i]
            idx = i + 1
            if return_obj[idx] == None:
                # 4 cases: before, after, before and after, neither
                lng_near, lat_near = None, None
                if return_obj[idx-1] != None and return_obj[idx+1] != None:
                    lng_near = (return_obj[idx-1].location.longitude + return_obj[idx+1].location.longitude)/2
                    lat_near = (return_obj[idx-1].location.latitude + return_obj[idx+1].location.latitude)/2
                elif return_obj[idx-1] != None:
                    lng_near = return_obj[idx-1].location.longitude
                    lat_near = return_obj[idx-1].location.latitude
                elif return_obj[idx+1] != None:
                    lng_near = return_obj[idx+1].location.longitude
                    lat_near = return_obj[idx+1].location.latitude

                # longitude and latitude of surrounding locations set
                if 'any' == item:
                    item = random.choice(['restaurant', 'drinks', 'dessert', 'activity'])
                if 'restaurant' == item:
                    if lng_near != None and lat_near != None:
                        obj = Restaurant.objects.filter(location__longitude__lte=lng_near + activity_range, location__latitude__lte=lat_near + activity_range,location__longitude__gte=lng_near - activity_range, location__latitude__gte=lat_near - activity_range).random()
                    else:
                        obj = Restaurant.objects.random()
                elif 'drinks' == item:
                    if lng_near != None and lat_near != None:
                        obj = Drinks.objects.filter(location__longitude__lte=lng_near + activity_range, location__latitude__lte=lat_near + activity_range,location__longitude__gte=lng_near - activity_range, location__latitude__gte=lat_near - activity_range).random()
                    else:
                        obj = Drinks.objects.random()
                elif 'dessert' == item:
                    if lng_near != None and lat_near != None:
                        obj = Dessert.objects.filter(location__longitude__lte=lng_near + activity_range, location__latitude__lte=lat_near + activity_range,location__longitude__gte=lng_near - activity_range, location__latitude__gte=lat_near - activity_range).random()
                    else:
                        obj = Dessert.objects.random()
                elif 'activity' == item:
                    if lng_near != None and lat_near != None:
                        obj = Activity.objects.filter(location__longitude__lte=lng_near + activity_range, location__latitude__lte=lat_near + activity_range,location__longitude__gte=lng_near - activity_range, location__latitude__gte=lat_near - activity_range).random()
                    else:
                        obj = Activity.objects.random()
                                    
                if 'restaurant' == item or 'drinks' == item or 'dessert' == item:
                    if obj.open_table_id == '-1':
                        open_table_id = find_restaurant(obj.name)
                        obj.open_table_id = open_table_id
                        obj.save()
                
                return_obj[idx] = obj

        if flipped:
            return_obj = return_ob[::-1]

        # serialize
        final_arr = []
        for i in range(0,3):
            idx = i + 1
            obj = return_obj[idx]
            serialized_obj = serializer_helper(item, obj)
            serialized_obj['location'] = LocationSerializer(obj.location).data
            final_arr.append(serialized_obj)
        return JsonResponse({'data': final_arr})
    except Exception as e:
        logging.error(e)
        return JsonResponse({'message': 'error'}, status=404)
                


# --------------------------------------MODELS--------------------------------

# 40.746233424878845, -73.99092717791646
# 40.75422668177996, -73.98449848481967

# 0.007993256901 + 0.006428693097 = .014
# .001 = 1 min walk

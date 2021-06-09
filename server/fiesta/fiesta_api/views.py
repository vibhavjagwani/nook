from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, logout
from django.conf import settings


from fiesta_api.utils.yelp.api import search_restaurants_by_location, search_desserts_by_location, search_bars_by_location
from fiesta_api.utils.csv.restaurants import write_restaurants_to_csv, headers
from fiesta_api.utils.csv.reader import read_csv_lines
from fiesta_api.utils.csv.activities import write_activities_to_csv
from fiesta_api.utils.google.api import find_place_from_text, get_place_data_from_place_id
import json
import time
import os
import logging
import environ


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
    return HttpResponse("sign up")

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
            

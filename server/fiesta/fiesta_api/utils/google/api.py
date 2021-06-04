import requests
from fiesta_api.utils.csv.reader import read_csv_lines

# env variables
import environ
env = environ.Env()


GOOGLE_API_KEY=env('GOOGLE_API_KEY')
BUSINESS_SEARCH_ENDPOINT='https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
BUSINESS_DETAILS_ENDPOINT='https://maps.googleapis.com/maps/api/place/details/json?'

# https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResults
FIND_FIELDS = 'photos,formatted_address,name,geometry,place_id,plus_code,types'
DETAILS_FIELDS = 'formatted_phone_number,opening_hours,photos,address_component,adr_address,business_status,\
formatted_address,geometry,icon,name,place_id,type,url,utc_offset,vicinity,website'
def find_place_from_text(search):
    params = {
        'input': search,
        'inputtype': 'textquery',
        'fields': FIND_FIELDS,
        'key': GOOGLE_API_KEY
    }
    response = requests.get(BUSINESS_SEARCH_ENDPOINT, params=params, timeout=5)
    response_data = response.json()
    result = response_data['candidates'][0]
    return make_activity_object_from_search(result)

def make_activity_object_from_search(result):
    activity_object = {}
    if 'formatted_address' in result:
        activity_object['formatted_address'] = result['formatted_address']
    if 'geometry' in result:
        location = result['geometry']['location']
        activity_object['latitude'] = location['lat']
        activity_object['longitude'] = location['lng']
    if 'name' in result:
        activity_object['name'] = result['name']
    if 'place_id' in result:
        activity_object['place_id'] = result['place_id']
    if 'types' in result:
        activity_object['types'] = ','.join(result['types'])
    # if 'address_components' in result:
    #     if 'types' in result['address_components']['types']:
    #         activity_object['types'] = ','.join(result['address_components']['types'])
    if 'formatted_phone_number' in result:
        activity_object['formatted_phone_number'] = result['formatted_phone_number']
    if 'adr_address' in result:
        activity_object['adr_address'] = result['adr_address']
    if 'opening_hours' in result:
        hours = result['opening_hours']
        # ignore periods[]
        activity_object['weekday_text'] = ';'.join(hours['weekday_text'])
    if 'vicinity' in result:
        activity_object['vicinity'] = result['vicinity']
    if 'website' in result:
        activity_object['website'] = result['website']
    if 'url' in result:
        activity_object['url'] = result['url']
    return activity_object
    # if 'rating' in result:
    

def get_place_data_from_place_id(business):
    if business['place_id']:
        params = {
            'place_id': business['place_id'],
            'fields': DETAILS_FIELDS,
            'key': GOOGLE_API_KEY
        }
        response = requests.get(BUSINESS_DETAILS_ENDPOINT, params=params, timeout=5)
        response_data = response.json()
        result = response_data['result']
        if 'info_messages' in result:
            print(result['info_messages'])
    else:
        return business
    return make_activity_object_from_search(result)
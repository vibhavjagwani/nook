import requests
import fiesta_api.utils.yelp.helper as helper

# env variables
import environ
env = environ.Env()

YELP_API_KEY=env('YELP_API_KEY')
BUSINESS_SEARCH_ENDPOINT='https://api.yelp.com/v3/businesses/search'

RESTAURANT_CATEGORIES='restaurants,dancerestaurants'
DESSERT_CATEGORIES='desserts'
BARS_CATEGORIES='bars,beergardens'
# category list https://www.yelp.com/developers/documentation/v3/all_category_list

HEADERS = {'Authorization': 'Bearer {}'.format(YELP_API_KEY)}

def search_restaurants_by_location(neighborhood, region, limit=50,sort_by='best_match'):
    search_location = f'{neighborhood}, {region}'
    tag = RESTAURANT_CATEGORIES
    params = {
        'categories': tag,
        'location': search_location,
        'limit': limit,
        'price': '1,2',
        'sort_by': sort_by
    }

    response = requests.get(BUSINESS_SEARCH_ENDPOINT, headers=HEADERS, params=params, timeout=5)
    response_data = response.json()
    return filter(lambda x: x != {}, [helper.flatten_yelp_business(business, neighborhood, region, tag) \
         for business in response_data['businesses']])


def search_desserts_by_location(neighborhood, region, limit=50):
    search_location = f'{neighborhood}, {region}'
    tag = DESSERT_CATEGORIES
    params = {
        'categories': tag,
        'location': search_location,
        'limit': limit,
        'price': '1,2',
        'sort_by': 'distance'
    }

    response = requests.get(BUSINESS_SEARCH_ENDPOINT, headers=HEADERS, params=params, timeout=5)
    response_data = response.json()
    return filter(lambda x: x != {}, [helper.flatten_yelp_business(business, neighborhood, region, tag) \
         for business in response_data['businesses']])

def search_bars_by_location(neighborhood, region, limit=50):
    search_location = f'{neighborhood}, {region}'
    tag = BARS_CATEGORIES
    params = {
        'categories': tag,
        'location': search_location,
        'limit': limit,
        'price': '1,2',
        'sort_by': 'distance'
    }

    response = requests.get(BUSINESS_SEARCH_ENDPOINT, headers=HEADERS, params=params, timeout=5)
    response_data = response.json()
    return filter(lambda x: x != {}, [helper.flatten_yelp_business(business, neighborhood, region, tag) \
         for business in response_data['businesses']])

import requests
from bs4 import BeautifulSoup


# # env variables
# import environ
# env = environ.Env()

# OPENTABLE_ENDPOINT = "https://opentable.herokuapp.com/api"

# def find_restaurant(name, address, state, city, zip_code, country):
#     params = {
#         'name': name,
#         # 'address': address,
#         'state': state,
#         'city': city,
#         'zip': zip_code,
#         'country': country,
#         'per_page': 5
#     }

#     response = requests.get(OPENTABLE_ENDPOINT + '/restaurants', params=params, timeout=10)
#     print(response)
#     response_data = response.json()
#     print(response_data['restaurants'])
#     return response_data['restaurants']

    # return response_data['reserve_url'], response_data['mobile_reserve_url']


def find_restaurant(name, city="New York"):
    # return id if available
    # else 1 if there with id but not available 
    # else 0 if not found
    try:
        name_term = "%20".join(name.split(' '))
        city_term = "%20".join(city.split(' '))
        search_url = f"https://www.opentable.com/s?term={name_term}%20{city_term}&intentModifiedTerm={name_term}&queryUnderstandingType=location"
        soup = BeautifulSoup(requests.get(search_url).content, 'html.parser')
        containers = soup.findAll("div", {"data-test" : "restaurant-card"})
        links = soup.findAll("a", {"data-test" : "res-card-name"})
        combined_info = list(zip(containers, links))
        for c, l in combined_info:
            try:
                label = l['aria-label']
                if (name in label or label in name):
                    text = c.get_text()
                    if 'Unfortunately' in  c.get_text() or 'Sorry':
                        return '1'
                    else:
                        return c['data-rid']
                    
            except e:
                print(e)
    except e:
        print(e)
    return '0'

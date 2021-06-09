import csv

headers = ['name', 'review_count', 'rating', 'phone', 'display_address',
    'image_url', 'url','categories', 'display_phone', 'price', 'longitude', 
    'latitude', 'neighborhood', 'region', 'city', 'country', 'state', 'zip_code', 
    'address1', 'address2', 'address3', 'alias', 'id', 'is_closed', 'update_date', 'tag']


def write_restaurants_to_csv(city, businesses, exclusion_list=[]):
    exclusion_set = set(exclusion_list)
    with open('restaurants_' + city + '.csv', mode='w') as restaurant_file:
        restaurant_writer = csv.writer(restaurant_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        restaurant_writer.writerow(headers)
        seen_ids = set()
        for business in businesses:
            # logging.info
            if business['id'] not in seen_ids and business['name'] not in exclusion_set:
                seen_ids.add(business['id'])
                row = []
                for header in headers:
                    if header in business:
                        row.append(business[header])
                    else:
                        row.append("N/A")
                restaurant_writer.writerow(row)

from datetime import datetime

YBIZ_RATING_MIN = 4
YBIZ_REVIEW_COUNT_MIN = 50

def flatten_yelp_business(ybiz, neighborhood, region, tag):
    biz = {}
    try:
        now = datetime.now() # current date and time
        biz['update_date'] = now.strftime("%m/%d/%Y, %H:%M")
        biz['neighborhood'] = neighborhood
        biz['region'] = region
        biz['tag'] = tag
        if 'id' in ybiz:
            biz['id'] = ybiz['id']
        
        if 'alias' in ybiz:
            biz['alias'] = ybiz['alias']
        
        if 'name' in ybiz:
            biz['name'] = ybiz['name']

        if 'image_url' in ybiz:
            biz['image_url'] = ybiz['image_url']
        
        if 'is_closed' in ybiz:
            biz['is_closed'] = ybiz['is_closed']
        
        if 'url' in ybiz:
            biz['url'] = ybiz['url']
        
        if 'review_count' in ybiz:
            if ybiz['review_count'] >= YBIZ_REVIEW_COUNT_MIN:
                biz['review_count'] = ybiz['review_count']
            else:
                return {}
        else:
            return {}

        if 'categories' in ybiz:
            biz['categories'] = ''
            for category in ybiz['categories']:
                biz['categories'] += category['alias'] + '-' + category['title'] + ";"
        
        if 'rating' in ybiz:
            if ybiz['rating'] >= YBIZ_RATING_MIN:
                biz['rating'] = ybiz['rating']
            else:
                return {}
        else:
            return {}
        
        if 'coordinates' in ybiz:
            coordinates = ybiz['coordinates']
            biz['longitude'] = coordinates['longitude']
            biz['latitude'] = coordinates['latitude']

        if 'transactions' in ybiz:
            biz['transactions'] = ','.join(ybiz['transactions'])
        
        if 'price' in ybiz:
            biz['price'] = ybiz['price']
        
        if 'location' in ybiz:
            location = ybiz['location']
            biz['address1'] = location['address1']
            biz['address2'] = location['address2']
            biz['address3'] = location['address3']
            biz['city'] = location['city']
            biz['zip_code'] = location['zip_code']
            biz['country'] = location['country']
            biz['state'] = location['state']
            biz['display_address'] = ', '.join(location['display_address'])
        
        if 'phone' in ybiz:
            biz['phone'] = ybiz['phone']
        
        if 'display_phone' in ybiz:
            biz['display_phone'] = ybiz['display_phone']

    except Exception as e:
        print(e)
        
    return biz
    

    
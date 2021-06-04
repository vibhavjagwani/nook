import csv


# google 
def write_activities_to_csv(city, activities):
    headers = ['name', 'formatted_address', 'weekday_text','website','latitude', 'longitude', 'types', 'place_id', 'types','formatted_phone_number','url','vicinity']
    with open('activities_' + city + '.csv', mode='w') as activity_file:
        activity_writer = csv.writer(activity_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        activity_writer.writerow(headers)
        seen_ids = set()
        for activity in activities:
            # logging.info
            if activity['place_id'] not in seen_ids:
                seen_ids.add(activity['place_id'])
                row = []
                for header in headers:
                    if header in activity:
                        row.append(activity[header])
                    else:
                        row.append("N/A")
                activity_writer.writerow(row)

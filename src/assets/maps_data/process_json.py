import json

# for i in range(19, 20):
#     with open(f'eurovelo{i}.json') as f:
#         j = json.load(f)

#     lat_keys = sorted(list(j['latitude'].keys()))
#     new_lat = [j['latitude'][i] for i in lat_keys]
#     j['latitude'] = new_lat

#     lon_keys = sorted(list(j['longitude'].keys()))
#     new_lon = [j['longitude'][i] for i in lon_keys]
#     j['longitude'] = new_lon

#     if 'altitude' in j:
#         alt_keys = sorted(list(j['altitude'].keys()))
#         new_alt = [j['altitude'][i] for i in alt_keys]
#         j['altitude'] = new_alt


#     with open(f'eurovelo{i}.json', 'w') as fp:
#         json.dump(j, fp)

for i in range(1, 20):
    new_json = []
    with open(f'eurovelo{i}.json') as f:
        j = json.load(f)

    if len(j['latitude']) != len(j['longitude']):
        raise Exception('')

    for k in range(len(j['latitude'])):
        point = {'latitude': j['latitude'][k], 'longitude':j['longitude'][k]}
        if 'altitude' in j:
            point['altitude'] = j['altitude'][k]
        new_json.append(point)
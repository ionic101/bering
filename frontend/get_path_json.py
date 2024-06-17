import requests
import json

def get_query():
    coords_query = ''

    for coord in coords:
        coords_query += f'{coord[0]},{coord[1]};'
    
    coords_query = coords_query[:-1]

    return f'https://api.mapbox.com/directions/v5/mapbox/walking/{coords_query}?steps=true&geometries=geojson&access_token={access_token}'


def save_json(data):
    with open(json_file_path, 'w') as f:
        json.dump(json.loads(data), f)


access_token = 'pk.eyJ1IjoiaW9uaWMxMDFkZXYiLCJhIjoiY2x1OWxmdWw1MGNsejJxbWs3c3J6aGhrZCJ9.0StK68-J9ebsVUfikK0T5A'
json_file_path = 'test_path.json'
coords = [
    [
      60.611174,
      56.845229
    ],
    [
      60.609771,
      56.847468
    ],
    [
      60.606096,
      56.846464
    ],
    [
      60.606635,
      56.844407
    ],
    [
      60.606889,
      56.842743
    ],
    [
      60.606889,
      56.842443
    ],
    [
      60.606700,
      56.842450
    ],
    [
      60.607455,
      56.843457
    ]

]



request = requests.get(get_query()).text
save_json(request)

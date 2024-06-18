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
json_file_path = 'json/paths/test_path.json'
coords = [
    [
      60.591389,
      56.844811
    ],
    [
      60.652661,
      56.843861
    ],
    [
      60.616148,
      56.840434
    ]
]

request = requests.get(get_query()).text
save_json(request)

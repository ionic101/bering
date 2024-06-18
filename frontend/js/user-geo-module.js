async function getRouteToSight(userCoords, sightLocation) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${userCoords[0]},${userCoords[1]};${sightLocation[0]},${sightLocation[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };

    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    }
    else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#008eb8',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
}

export function buildPathToSight(sightLocation) {
    if (!window.userGeo)
        return;
    getRouteToSight([window.userGeo.longitude, window.userGeo.latitude], sightLocation);
}
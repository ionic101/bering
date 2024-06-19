async function getRouteToSight(userCoords, sightLocation) {
    const query = await fetch(
      `http://89.232.170.133:8000/route/${userCoords[0]},${userCoords[1]};${sightLocation[0]},${sightLocation[1]}`,
      { method: 'GET' }
    );

    const result = await query.json();
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: result
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
mapboxgl.accessToken = 'pk.eyJ1IjoiaW9uaWMxMDFkZXYiLCJhIjoiY2x1OWxmdWw1MGNsejJxbWs3c3J6aGhrZCJ9.0StK68-J9ebsVUfikK0T5A';

let data = [['ufru.jpg', 'УРФУ - уральский федеральный университет', [60.652661,56.843861]], ['elcin.jpg', 'Ельцин центр', [60.591389,56.844811]]];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ionic101dev/clu9s2dk3014m01qsdx000x87',
    center: [60.652661,56.843861],
    zoom: 15
});


data.forEach(element => {
    let popup = new mapboxgl.Popup({ offset: 30 }).setText(
        element[1]
        );
    
    let el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(' + 'images/' + element[0] + ')';

    let marker = new mapboxgl.Marker(el)
        .setLngLat(element[2])
        .setPopup(popup)
        .addTo(map);

    marker.getElement().addEventListener('click', function() {
        getRoute(element[2]);
    });

    popup.on('close', function() {
        if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }
    });
});



let userCoords = null;

const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
});

geolocate.on('geolocate', function(event) {
    userCoords = [event.coords.longitude, event.coords.latitude];
    console.log('Current location:', userCoords);
});


geolocate.on('trackuserlocationend', () => {
    if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
    }
    userCoords = null;
});

map.addControl(geolocate);



async function getRoute(end) {
    if (userCoords == null) {
        return;
    }

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${userCoords[0]},${userCoords[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
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
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
  }
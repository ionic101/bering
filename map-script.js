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

    new mapboxgl.Marker(el)
        .setLngLat(element[2])
        .setPopup(popup)
        .addTo(map);
});

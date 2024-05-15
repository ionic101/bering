import { spawnSightPopups } from "./sight-popups-module.js";
import { menuButtonSwitcher } from "./menu-buttons-module.js";

window.addEventOnClickHtmlID = function (htmlID, callFunc) {
  const mainMenuButton = document.getElementById(htmlID);
  if (mainMenuButton) {
    mainMenuButton.addEventListener('click', () => callFunc());
  }
  else {
    throw new Error(`Element with ID: "${htmlID}" was not found`);
  }
}

window.addEventOnClickHtmlClass = function (htmlClass, callFunc) {
  const mainMenuButton = document.querySelector('.' + htmlClass);
  if (mainMenuButton) {
    mainMenuButton.addEventListener('click', () => callFunc());
  }
  else {
    throw new Error(`Element with Class: "${htmlClass}" was not found`);
  }
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaW9uaWMxMDFkZXYiLCJhIjoiY2x1OWxmdWw1MGNsejJxbWs3c3J6aGhrZCJ9.0StK68-J9ebsVUfikK0T5A';

window.map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ionic101dev/clu9s2dk3014m01qsdx000x87',
  center: [60.621529,56.837706],
  zoom: 13
});

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
});

map.addControl(geolocate);

map.on('load', function() {
  geolocate.on('geolocate', function(event) {
      window.userGeo = event.coords;
  });

  geolocate.on('error', function(event) {
    window.userGeo = undefined;
  });
});

window.userGeo = undefined;


spawnSightPopups();

addEventOnClickHtmlID('main-menu-button', menuButtonSwitcher);

import { buildPathToSight } from "./user-geo-module.js";

export function spawnSightPopups() {
    fetch('http://89.232.170.133:8000/sights')
      .then(response => {
        if (!response.ok) {
          throw new Error('The sights could not be loaded');
        }
        return response.json()
      })
      .then(sightData => {
        for (let sightIndex in sightData) {
          spawnSightPopup(sightData[sightIndex]);
        }
      });
}

function getHtmlSightPopup(sightData) {
  return `<div class="popup-content">
              <image class="popup-image" src="${sightData.img}"></image>
              <h3>${sightData.name}</h3>
              <p class="popup-description">${sightData.description}</p>
              <button class="popup-button-plus"></button>
              <button class="popup-button-place"></button>
              <button class="popup-button-details"></button>
          </div>`;
}


export function spawnSightPopup(sightData) {
    const popupSettings = {
      offset: 30
    };

    const sightPopup = new mapboxgl.Popup(popupSettings).setHTML(getHtmlSightPopup(sightData));

    let sightMarker = document.createElement('div');
    sightMarker.id = sightData._id;
    sightMarker.className = 'marker';
    sightMarker.style.backgroundImage = `url(${sightData.img})`;

    sightPopup.once('open', () => {
      const popupContent = sightPopup.getElement();
      const placeButton = popupContent.querySelector('.popup-button-place');
      placeButton.addEventListener('click', () => buildPathToSight(sightData.location));
    });

    sightPopup.on('close', () => {
      if (map.getSource('route') && map.getLayer('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }
    })
    
    new mapboxgl.Marker(sightMarker)
        .setLngLat(sightData.location)
        .setPopup(sightPopup)
        .addTo(map);
}

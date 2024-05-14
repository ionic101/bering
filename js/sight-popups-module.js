export function spawnSightPopups() {
    fetch('json/sights.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('The sigts.json file could not be loaded');
        }
        return response.json()
      })
      .then(sightData => {
        for (let sightID in sightData) {
          spawnSightPopup(sightID, sightData[sightID]);
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

export function spawnSightPopup(sightID, sightData) {
    const popupSettings = {
      offset: 30
    };

    const sightPopup = new mapboxgl.Popup(popupSettings).setHTML(getHtmlSightPopup(sightData));

    let sightMarker = document.createElement('div');
    sightMarker.id = sightID;
    sightMarker.className = 'marker';
    sightMarker.style.backgroundImage = `url(${sightData.img})`;
    
    new mapboxgl.Marker(sightMarker)
        .setLngLat(sightData.location)
        .setPopup(sightPopup)
        .addTo(map);
}

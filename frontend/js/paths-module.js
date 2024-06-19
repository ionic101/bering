export function pathsMenuSwitcher() {
    if (isPathsCreated) {
      removePathMenu();
      removePathOnMap();
      isPathsCreated = false;
    }
    else {
      spawnPathsMenu();
      isPathsCreated = true;
    }
}

function getHtmlPathBlockMenu(pathInfo) {
    return `<div id=${pathInfo._id}
            class="path">
                <img src=${pathInfo.img}>
                <h3>${pathInfo.name}</h3>
            </div>`;
}

function spawnPathBlocksMenu(fileData) {
    fileData.forEach(pathData => {
        document.getElementById('paths-menu').innerHTML += getHtmlPathBlockMenu(pathData);
    });
}

function addEventOnClickToPathBlocksMenu(fileData) {
    fileData.forEach(pathData => {
        const pathBlock = document.getElementById(pathData._id);

        if (pathBlock) {
            pathBlock.addEventListener('click',
                () => spawnPathBlockInfo(pathData));
        }
        else {
            throw new Error(`The path block with ID: "${pathData._id}" was not found`);
        }
    });
}

function spawnPathsMenu() {
    document.getElementById('dynamic-container').innerHTML = 
      `<div id="paths-menu"></div>`;
    
    fetch('http://89.232.170.133:8000/paths')
        .then(response => {
            if (!response.ok) {
                throw new Error('The paths_info.json file could not be loaded');
            }
            return response.json();
        })
        .then(fileData => {
            spawnPathBlocksMenu(fileData);
            addEventOnClickToPathBlocksMenu(fileData);
        });
}

export function getFormattedTime(timeInSeconds) {
    return String(Math.floor(timeInSeconds / 60));
}

export function getFormattedDistance(distanceInMetres) {
    return String(Math.floor(distanceInMetres));
}

function getHtmlPathBlockInfo(pathData) {
    return `<div class="path-about">
                <h3>${pathData.name}</h3>
                <img src=${pathData.img}></img>
                <div class="path-description">
                    <p>Длина пути: ${getFormattedDistance(pathData.distance)} метров</p>
                    <p>Время в пути: ${getFormattedTime(pathData.duration)} минут</p>
                    <h2>Описание</h2>
                    <p>${pathData.description}</p>
                </div>
            </div>`;
}

function spawnPathBlockInfo(pathData) {
    displayPathOnMap(pathData.path);
    document.getElementById('paths-menu').innerHTML = getHtmlPathBlockInfo(pathData);
}

function getPathObject(pathData) {
    return {
        id: 'path',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: pathData
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },  
        paint: {
          'line-color': '#ff2d00',
          'line-width': 5,
          'line-opacity': 0.75
        }
      }
}

export function displayPathOnMap(pathData) {
    map.addLayer(getPathObject(pathData));
}

function removePathMenu() {
    document.getElementById('dynamic-container').removeChild(document.getElementById('paths-menu'));
}

export function removePathOnMap() {
    if (map.getLayer('path')) {
        map.removeLayer('path');
    }
    if (map.getSource('path')) {
        map.removeSource('path');
      }
}

window.isPathsCreated = false;

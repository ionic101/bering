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
    return `<div id=${pathInfo.id}
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
    fileData.forEach(pathInfo => {
        const pathBlock = document.getElementById(pathInfo.id);

        if (pathBlock) {
            pathBlock.addEventListener('click',
                () => spawnPathBlockInfo(pathInfo));
        }
        else {
            throw new Error(`The path block with ID: "${pathInfo.id}" was not found`);
        }
    });
}

function spawnPathsMenu() {
    document.getElementById('dynamic-container').innerHTML = 
      `<div id="paths-menu"></div>`;
    
    fetch('json/paths_info.json')
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

//TO DO
export function getFormattedTime(timeInSeconds) {
    return String(Math.floor(timeInSeconds / 60));
}

//TO DO
export function getFormattedDistance(distanceInMetres) {
    return String(distanceInMetres);
}

function getHtmlPathBlockInfo(pathInfo, pathData) {
    return `<div class="path-about">
                <h3>${pathInfo.name}</h3>
                <img src=${pathInfo.img}></img>
                <div class="path-description">
                    <p>Длина пути: ${getFormattedDistance(pathData.distance)} метров</p>
                    <p>Время в пути: ${getFormattedTime(pathData.duration)} минут</p>
                    <h2>Описание</h2>
                    <p>${pathInfo.description}</p>
                </div>
            </div>`;
}

function spawnPathBlockInfo(pathInfo) {
    fetch(`json/paths/${pathInfo.id}_path.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`The ${pathInfo.id}_path.json file could not be loaded`);
            }
            return response.json();
        })
        .then(fileData => {
            const pathData = fileData.routes[0];
            displayPathOnMap(pathData);
            document.getElementById('paths-menu').innerHTML = getHtmlPathBlockInfo(pathInfo, pathData);
        });
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
              coordinates: pathData.geometry.coordinates
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

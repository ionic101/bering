function spawn_sight(sight_id, sight_data) {
  let popup = new mapboxgl.Popup(popup_settings);

  fetch('popup.html')
      .then(response => response.text())
      .then(html => {
          popup.setHTML(html
            .replace('!img', sights_images_path + sight_data.img)
            .replace('!name', sight_data.name)
            .replace('!description', sight_data.description))
      });

  let marker = document.createElement('div');
  marker.id = sight_id;
  marker.className = 'marker';

  if (sight_data.img != undefined) {
    marker.style.backgroundImage = `url(${sights_images_path + sight_data.img})`;
  }
  


  new mapboxgl.Marker(marker)
      .setLngLat(sight_data.location)
      .setPopup(popup)
      .addTo(map);
}


function spawn_sights() {
  fetch('json/sights.json')
    .then(response => response.json())
    .then(data => {
      for (let sight in data) {
        spawn_sight(sight, data[sight]);
      }
    })
    .catch(error => {
      console.error('Ошибка загрузки JSON файла:', error);
    });
}


function spawn_menu_buttons() {
  for (let buttonID in buttons_settings) {
    let button = document.createElement('button');
    let button_settings = buttons_settings[buttonID];
    
    button.id = buttonID;
    button.classList.add('menu-button');
    button.style.backgroundImage = `url(${buttons_icons_path + button_settings.img})`;
    button.style.bottom = button_settings.bottom;
    button.style.right = button_settings.right;
    button.addEventListener('click', button_settings.function);

    document.getElementById('menu-buttons').appendChild(button);
  }
}


function remove_menu_buttons() {
  var parent = document.getElementById('menu-buttons');

  document.querySelectorAll('.menu-button').forEach(element => {
    parent.removeChild(element);
  });
}


function on_click_main_menu_button() {
  if (isButtonsCreated) {
    remove_menu_buttons();
    isButtonsCreated = false;
  }
  else {
    spawn_menu_buttons();
    isButtonsCreated = true;
  }
}

function spawn_html_block(html_file_path) {
  fetch(html_file_path)
      .then(response => response.text())
      .then(html => {
          document.getElementById('dynamic-container').innerHTML = html;
      });
}


function spawn_profile() {
  spawn_html_block('window.html');
  remove_route();
  isPathsCreated = false;
}


function remove_paths() {
  document.getElementById('dynamic-container').removeChild(document.getElementById('paths-content'));
}

function clear_paths_content() {
  var parent = document.getElementById('paths-content');

  document.querySelectorAll('.path').forEach(element => {
    parent.removeChild(element);
  });
}


function spawn_paths() {
  if (isPathsCreated) {
    remove_paths();
    remove_route();
    isPathsCreated = false;
  }
  else {
    spawn_path_blocks();
    isPathsCreated = true;
  }
}


function on_click_out_window() {
  let window_block = document.getElementById('window-block');

  while (window_block.firstChild) {
    window_block.removeChild(window_block.firstChild);
  }
}


function spawn_path_blocks() {
  document.getElementById('dynamic-container').innerHTML = 
    `<div id="paths-content"></div>`

  fetch('json/paths_info.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(path => {
      let html_block = 
      `<div id=${path.id} class="path" onclick="show_path('${path.id}', '${path.name}', '${path.img}', '${path.description}')">
          <img src=${path.img}>
          <h3>${path.name}</h3>
        </div>`;
      
      let a = document.getElementById('paths-content').innerHTML;
      document.getElementById('paths-content').innerHTML = a + html_block;
    });
  });
}


function show_path(id, name, img, description) {
  document.getElementById('paths-content').innerHTML = 
  `<div class="path-about">
    <h3>${name}</h3>
    <img src=${img}></img>
    <div class="path-description">
      <h2>Описание</h2>
      <p>${description}</p>
    </div>
  </div>`;

  fetch(`json/paths/${id}_path.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayPath(data);
  });
}



async function displayPath(query) {
  const data = query.routes[0];
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
        'line-color': '#ff2d00',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
}

function remove_route() {
  if (map.getLayer('route')) {
    map.removeLayer('route');
  }
  if (map.getSource('route')) {
    map.removeSource('route');
  }
}



mapboxgl.accessToken = 'pk.eyJ1IjoiaW9uaWMxMDFkZXYiLCJhIjoiY2x1OWxmdWw1MGNsejJxbWs3c3J6aGhrZCJ9.0StK68-J9ebsVUfikK0T5A';

const map = new mapboxgl.Map({
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

const popup_settings = {
    offset: 30
};

const sights_images_path = 'images/sights/';
const buttons_icons_path = 'images/icons/';


const buttons_settings = {
  "profile-button": {
    img: "profile.png",
    bottom: "60px",
    right: "160px",
    function: spawn_profile
  },
  "paths-button": {
    img: "paths.png",
    bottom: "160px",
    right: "120px",
    function: spawn_paths
  },
  "cards-button": {
    img: "cards.png",
    bottom: "230px",
    right: "40px",
    function: spawn_profile
  }
}

let isButtonsCreated = false;
let isPathsCreated = false;


map.addControl(geolocate);
spawn_sights();

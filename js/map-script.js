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
  marker.style.backgroundImage = `url(${sights_images_path + sight_data.img})`;


  new mapboxgl.Marker(marker)
      .setLngLat(sight_data.location)
      .setPopup(popup)
      .addTo(map);
}


function spawn_sights() {
  for (let sight in sights_data) {
    spawn_sight(sight, sights_data[sight]);
  }
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
  spawn_html_block('window.html')
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
  

  fetch('paths.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(path => {
      let html_block = 
      `<div id=${path.id} class="path" onclick="show_path('${path.name}', '${path.img}')">
          <img src=${path.img}>
          <h3>${path.name}</h3>
        </div>`;
      
      let a = document.getElementById('paths-content').innerHTML;
      document.getElementById('paths-content').innerHTML = a + html_block;
    });
  });
}


function show_path(name, img) {
  document.getElementById('paths-content').innerHTML = 
  `<div class="path-about">
    <h2>${name}</h2>
    <img src=${img}></img>
  </div>`;
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

const sights_data = {
  'urfu': {
    name: 'УРФУ',
    img: 'urfu.png',
    description: 'УРФУ - уральский федеральный университет',
    location: [60.652661,56.843861]
  },
  'elcin': {
    name: 'Ельцин центр',
    img: 'elcin.png', 
    description: 'Ельцин центр',
    location: [60.591389,56.844811]
  },
  'cirk': {
    name: 'Цирк',
    img: 'cirk.png', 
    description: 'Екатеринбуржский цирк',
    location: [60.605071,56.825784]
  },
  'ugi': {
    name: 'УГИ',
    img: 'ugi.png', 
    description: 'Уральский гуманитарный университет',
    location: [60.616148,56.840434]
  },
  'visockiy': {
    name: 'Высоцкий',
    img: 'visockiy.png', 
    description: 'Самое высокое здание в Екатеринбурге высотой 194 метра, названное в честь Высоцкого В. С.',
    location: [60.614625,56.835965]
  }
}

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

const buttons_icons_path = 'images/icons/'

let isButtonsCreated = false;
let isPathsCreated = false;


map.addControl(geolocate);
spawn_sights();

import { pathsMenuSwitcher, removePathOnMap } from "./paths-module.js";
import { spawnProfile } from "./profile-module.js";

export function menuButtonSwitcher() {
    if (isButtonsSpawned) {
      removeMenuButtons();
      isButtonsSpawned = false;
    }
    else {
      spawnMenuButtons();
      isButtonsSpawned = true;
    }
}

function spawnMenuButtons() {
    for (let buttonID in BUTTONS_SETTINGS) {
      const button = document.createElement('button');
      const buttonSettings = BUTTONS_SETTINGS[buttonID];
      
      button.id = buttonID;
      button.classList.add('menu-button');
      button.style.backgroundImage = `url(${buttonSettings.img})`;
      button.style.bottom = buttonSettings.bottom;
      button.style.right = buttonSettings.right;
      button.addEventListener('click', buttonSettings.function);
  
      document.getElementById('menu-buttons').appendChild(button);
    }
}

function removeMenuButtons() {
    var parent = document.getElementById('menu-buttons');

    document.querySelectorAll('.menu-button').forEach(element => {
        parent.removeChild(element);
    });
}

const BUTTONS_SETTINGS = {
    // "profile-button": {
    //   img: "images/icons/profile.png",
    //   bottom: "60px",
    //   right: "160px",
    //   function: spawnProfile
    // },
    "paths-button": {
      img: "images/icons/paths.png",
      bottom: "50px",
      right: "120px",
      function: pathsMenuSwitcher
    },
    "cards-button": {
      img: "images/icons/cards.png",
      bottom: "140px",
      right: "60px",  
      function: spawnProfile
    }
}

window.isButtonsSpawned = false;

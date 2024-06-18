import { removePathOnMap } from "./paths-module.js";

function getHtmlProfile() {
    return `<div id="profile-content">
              <div class="profile-bg"></div>
              <div class="profile-window">
                  <div class="profile-header">
                    <button class="button-exit"></button>
                    <input type="radio" name="radio" id="profile" checked >
                    <input type="radio" name="radio" id="setting">
                    <input type="radio" name="radio" id="card">

                    <div class="btn">
                        <label for="profile" class="btn_">Профиль</label>
                        <label for="card" class="btn_">Карточки</label>
                    </div>

                    <div class="profile">
                    <div class="block_mini">
                    <img src="images/icons/profile.png" class = "image_profile" >
                    <ul>
                        <li>Имя:</li>
                        <li>Дата рождения:</li>
                        <li>Электронная почта:</li>
                        <li>Посещенные места:</li>
                    </ul>
                    </div>
                    </div>

                    <div class="setting"> 
                        <div class="block_mini_1">
                            <div class="form_setting">
                                <p>Персональная информация</p>
                                <div class="form_content_setting">
                                    <div class = "content_form">
                                        <div class= "content_button">
                                            <label class="text" for="name">Имя</label>
                                            <button class="button_form"></button>
                                        </div>
                                        <input class="input_setting" type="text" name="name" placeholder="name" autocomplete="off" >
                                    </div>

                                    <div class = "content_form">
                                        <div class= "content_button">
                                            <label class="text" for="email">Почта</label>
                                            <button class="button_form"></button>
                                        </div>
                                        <input class="input_setting"  type="email" name="email" placeholder="email" autocomplete="off" >
                                    </div>

                                    <div class = "content_form">
                                        <div class= "content_button">
                                            <label class="text" for="name">Телефон</label>
                                            <button class="button_form"></button>
                                        </div>
                                        <input class="input_setting" type="text" name="name" placeholder="+7___ ___ ___" autocomplete="off" >
                                    </div>

                                    <div class = "content_form">
                                        <div class= "content_button">
                                            <label class="text" for="name">Информация</label>
                                            <button class="button_form"></button>
                                        </div>
                                        <input class="input_setting" type="text" name="name" placeholder="..." autocomplete="off" >
                                    </div>
                                </div>
                            </div>
                            <div class="image_convert">
                                <img src="images/icons/profile.png" class = "image_setting" >
                                <div class= "content_button">
                                    <p>Изменить фото</p>
                                    <button class="button_image"></button>
                                </div>
                                <a href="index.html"><button class="button_exit">Выйти</button></a>
                            </div>
                        </div>
                    </div>

                    <div class="card"> 
                        <div class="block_mini_2">
                            <div class="block-content">
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                            </div>

                            <div class="block-content-phone">
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                                <div class="card-content"></div>
                            </div>

                            <div class = "cards-info">
                                <div class="card1">
                                    <a href="./map.html"> <button class="button-exit1"></button></a>
                                    <p class = "card-text">Название</p>
                                </div>
                                <div class="card-info"></div>
                                <p class = "card-text-info">Дополнительная информация о достопримечательности </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

export function spawnProfile() {
    document.getElementById('dynamic-container').innerHTML = getHtmlProfile();
    addEventOnClickHtmlClass('profile-bg', removeProfile);
    addEventOnClickHtmlClass('button-exit', removeProfile);

    removePathOnMap();
    isPathsCreated = false;
}

function removeProfile() {
    const profileContent = document.getElementById('profile-content');
  
    while (profileContent.firstChild) {
      profileContent.removeChild(profileContent.firstChild);
    }
}

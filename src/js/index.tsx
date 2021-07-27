import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import bridge from "@vkontakte/vk-bridge";

// Import scroll helper for safari
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

// Главный файл
import App from '../pages/App';

// Стили VKUI
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css';

// Init VK Mini App
bridge.send("VKWebAppInit");

// Use scroll helper
const root = document.getElementById('root');
mVKMiniAppsScrollHelper(root);

if (document.location.href) {
  axios.defaults.headers.common.user = document.location.href;
}

// axios.defaults.baseURL = config.apiUrl;
// axios.defaults.responseType = 'json';

ReactDOM.render(
  <App />,
  root
);

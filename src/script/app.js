import * as urls from './urls.mjs';
import {request} from './request.mjs';

window.loginUrl = urls.loginUrl;
window.galleryUrl = urls.galleryUrl;
window.userUrl = urls.getUserInfoUrl;
window.request = request;
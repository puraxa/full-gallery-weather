import * as urls from './urls.mjs';
import {request} from './request.mjs';
import * as fetchOptions from './fetchOptions.mjs';
import * as loginFn from './loginFn.mjs';
import {isLoggedIn} from './isLoggedIn.mjs';
import {welcomeMessage} from './welcomeMessage.mjs';

window.loginUrl = urls.loginUrl;
window.galleryUrl = urls.galleryUrl;
window.userUrl = urls.getUserInfoUrl;
window.request = request;
window.fetchLogin = fetchOptions.login;
window.fetchUser = fetchOptions.user;
window.loginFn = loginFn.login;
window.isLoggedIn = isLoggedIn;
window.welcomeMessage = welcomeMessage;
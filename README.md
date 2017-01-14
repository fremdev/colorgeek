# ColorGeek

> ColorGeek: Make your color palette & share it with community

Project live on [https://colorgeek.pw/](https://colorgeek.pw/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
##About

ColorGeek is a web application for creating and sharing color palettes.

* Guests have to register for being able to create, share and like palettes
* User can create private palettes, share best palettes with other users.
* User can like palettes, and palettes with the biggest number of likes are available on Popular page.
* Palettes picked by admin are showing on Picked page.
* It's possible to edit and save private palettes.
* User can make a copy of any public palette to user's palettes.
* On click on a color cell selected color's value is copying to clipboard.
* It's possible to choose color mode: hex(default) or rgb.

##Technologies

Main technologies used for ColorGeek development are:

* Vue.js 2 - progressive JavaScript framework
* Vue-router for app routing
* Vuex for state management
* Vue-cli for scaffolding project
* Firebase for authentification and realtime database
* And other libraries and tools: Clipboard.js, Webpack, Babel, ESLint, etc.

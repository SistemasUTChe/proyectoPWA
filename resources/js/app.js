require('bootstrap');

window.Vue = require('vue');

Vue.component('usuario-component', require('components/UsuariosComponent.vue').default);

const app = new Vue({
    el: '#app',
});
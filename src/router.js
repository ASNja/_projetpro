import Vue from 'vue';
import Router from 'vue-router';
import employeListe from './components/employe/liste.vue';
import employeAdd from './components/employe/add.vue';
import employeEdit from './components/employe/edit.vue';
import employeDetails from './components/employe/details.vue';
import congeListe from './components/conge/liste.vue';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Accueil',
            component: employeListe,
        },
        {
            path: '/employe/add',
            name: 'AddEmploye',
            component: employeAdd
        },
        {
            path: '/employe/:id/edit',
            name: 'EditEmploye',
            component: employeEdit,
            props: true
        },
        {
            path: '/employe/:id/details',
            name: 'DetailsEmploye',
            component: employeDetails,
            props: true
        },
        {
            path: '/conges/',
            name: 'ListeConge',
            component: congeListe,
            props: true
        },
    ],
});
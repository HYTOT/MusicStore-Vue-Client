import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    // name: 'Index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue')
      },
      {
        path: '/album_details',
        name: 'AlbumDetails',
        component: () => import('../views/AlbumDetails.vue')
      },
      {
        path: '/genre',
        name: 'Genre',
        component: () => import('../views/Genre.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, _from, next) => {
  const isLogin = $store.getters.getUserInfo || localStorage.getItem('musicstore_login_id');
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

export default router;

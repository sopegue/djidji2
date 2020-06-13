import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connexion from '../views/Connexion.vue'
import NotFound from '../views/NotFound.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin.vue'
import Search from '../views/Search.vue'
import store from '../store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/connexion')
}
const routes = [
  {
    path: '/admin',
    component: Admin,
    children: [
      { 
        path: '', 
        component: () => import('@/components/admin/Dashome.vue'),
        children:[
          
          { 
            path: '',
            name: 'DashomeWelcome', 
            component: () => import('@/components/admin/HomeAdm.vue') /* Dashboard */
          },
          { 
            path: 'usinf',
            name: 'meWelcome', 
            component: () => import('@/components/admin/user/UserInf.vue') /* Dashboard */
          },
          { 
            path: 'adinf',
            name: 'gvjWelcome', 
            component: () => import('@/components/admin/ad/AdInf.vue') /* Dashboard */
          },
          
          { 
            path: 'statsus',
            name: 'Dasho', 
            component: () => import('@/components/admin/UsStat.vue') /* Dashboard */
          },
          { 
            path: 'statad',
            name: 'DmeWelcome', 
            component: () => import('@/components/admin/AdStat.vue') /* Dashboard */
          },
          { 
            path: 'users', 
            component: () => import('@/components/admin/user/UserGest.vue') /* Dashboard */,
            children:[
              {
                path: '',
                name: 'AllUser', 
                component: () => import('@/components/admin/user/All.vue') /* Dashboard */,
              },
              {
                path: 'part',
                name: 'PartUser', 
                component: () => import('@/components/admin/user/Part.vue') /* Dashboard */,
              },
              {
                path: 'admin',
                name: 'AdmUser', 
                component: () => import('@/components/admin/user/Admin.vue') /* Dashboard */,
              },
              {
                path: 'blck',
                name: 'BlUser', 
                component: () => import('@/components/admin/user/Blocked.vue') /* Dashboard */,
              },
              {
                path: 'report',
                name: 'RepBlUser', 
                component: () => import('@/components/admin/user/Report.vue') /* Dashboard */,
              }
              
            ]
          },
          { 
            path: 'ads', 
            component: () => import('@/components/admin/ad/AdGest.vue') /* Dashboard */,
            children:[
              {
                path: '',
                name: 'Allad', 
                component: () => import('@/components/admin/ad/All.vue') /* Dashboard */,
              },
              {
                path: 'report',
                name: 'RepAd', 
                component: () => import('@/components/admin/ad/Report.vue') /* Dashboard */,
              },
            ]
          },
        ]
      },
    ]
  
  },
  {
    path: '/',
    component: Home,
    children: [
      { 
        path: '',
        name: 'Accueil', 
        component: () => import('@/components/body/Welcome.vue') 
      },
      { 
        path: 'reinit',
        name: 'Pwdinit',
        beforeEnter: ifNotAuthenticated, 
        component: () => import('@/components/user/Reinit.vue') 
      },
      { 
        path: 'verification',
        beforeEnter: ifNotAuthenticated,
        name: 'Verify', 
        component: () => import('@/components/user/Verify.vue') 
      },
      {
        path: 'annonce',
        name: 'Annonce',
        component: Search,
        children: [
          { 
            path: 'search', 
            component: () => import('../views/SeeAnnonce.vue'),
            children:[
              { 
                path: 'searching',
                name: 'bySearch', 
                component: () => import('@/components/ads/SeeByCateg.vue')
              },
            ] 
          },
          { 
            path: 'add', 
            component: () => import('../views/AddAds.vue'),
            beforeEnter: ifAuthenticated,
            children:[
              { 
                path: '',
                name: 'addAds',
                component: () => import('@/components/ads/ToAddAds.vue')
              },
            ] 
          },
          { 
            path: 'updating', 
            component: () => import('../views/UpdatingAds.vue'),
            beforeEnter: ifAuthenticated,
            children:[
              { 
                path: '',
                name: 'updAds', 
                component: () => import('@/components/ads/UpdateAd.vue')
              },
            ] 
          },
          { 
            path: ':id', 
            component: () => import('../views/InfoAds.vue'),
            children:[
              { 
                path: '',
                name: 'InfoAd', 
                component: () => import('@/components/ads/InfoAds.vue')
              },
            ] 
          },
          { 
            path: 'categ/:id',
            component: () => import('../views/SeeAnnonce.vue'),
            children:[
              { 
                path: '',
                name: 'byCateg', 
                component: () => import('@/components/ads/SeeByCateg.vue')
              },
              { 
                path: ':ids',
                name: 'byList', 
                component: () => import('@/components/ads/SeeByCateg.vue')
              },
            ] 
          },
        
        ]
      },
      {
        path: '/connexion',
        component: Connexion,
        beforeEnter: ifNotAuthenticated,
        children: [
          { 
            path: '',
            name: 'Connexion',
            beforeEnter: ifNotAuthenticated, 
            component: () => import('@/components/connexion/Connexion.vue') 
          },
          { 
            path: 'register',
            beforeEnter: ifNotAuthenticated, 
            component: () => import('@/components/connexion/Register.vue') 
          }
        ]
      
      },
      {
        path: '/user',
        component: User,
        beforeEnter: ifAuthenticated,
        children: [
          { 
            path: '',
            beforeEnter: ifAuthenticated,
            component: () => import('@/components/user/User.vue'),
            children:[
              { 
                path: '',
                name: 'Profile', 
                component: () => import('@/components/user/Info.vue') 
              },
              { 
                path: 'password',
                name: 'Password', 
                component: () => import('@/components/user/Pwd.vue') 
              },
              { 
                path: 'notif',
                name: 'Notif', 
                component: () => import('@/components/user/Notif.vue') 
              },
              { 
                path: 'list',
                name: 'List', 
                component: () => import('@/components/user/List.vue') 
              },
              { 
                path: 'added',
                name: 'Added', 
                component: () => import('@/components/user/Added.vue') 
              }
            ]
          }
        ]
      
      }
    ]
  },
  {
    path:'*',
    name:'notFound',
    component:NotFound 
  }
]

const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
 //router.replace(to);
})

router.beforeEach(function (to, from, next) {
  store.state.previous=from.path
  //store.state.next=to.path
  store.commit('auth_reg','')
  if (from.path === '/annonce/search' && to.path !== '/annonce/search'){
      localStorage.removeItem('search')
      localStorage.removeItem('adsearch')
      localStorage.removeItem('categSearch')
      localStorage.removeItem('place')
      localStorage.removeItem('type')
      localStorage.removeItem('sCateg')

      localStorage.removeItem('nbPageAds')
      localStorage.removeItem('prix')
      localStorage.removeItem('curPageAds')
      localStorage.removeItem('trier')
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
next();
})
export default router

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
Vue.prototype.$http = Axios;
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  okConnection:{
    okuser:'',
    okpwd:'',
    okregmail:'',
    regmail:'',
    notok:''
  },    
    accessToken:  localStorage.getItem('access_token') ||  '',
    currentUser : [],
    adsPlace:[
      {
      "name":"Tout le pays"
      },
    ],

    pagination:'true',
    nbPageAds:1,
    currentPageAds:1,
    filteringAds:'',
    prixmin:5,
    trier:'',

    placeUpd:false,
    placeNb:0,
    Ads:[],
    categSearch:'',
    Ad:[],
    previous:'',
    next:'',
    usCoStatus:'',
    usRegStatus:'',
    token:'',
    logStatus:'',
    searchfound:'',
    search:'',
    searchNb:0,
    allCateg:'Toutes les catégories',
    searchh:'',
    typeOfSearch: 0,
    sCateg:'',
  },
  getters: {
    isAuthenticated: state => !!state.accessToken,
    authStatus: state => state.usCoStatus,
  },
  mutations: {
    auth_success: (state, token) => {
      state.accessToken = token
    },
    auth_error: (state) => {
      state.usCoStatus = 'error'
    },
    auth_user: (state,user) => {
      state.currentUser = user
      state.usCoStatus = 'success'
    },
    auth_token: (state) => {
      state.token = 'saved'
    },
    updateSearch:(state,value)=>{
      state.searchh=value
    },
    auth_logout: (state) => {
      state.logStatus = 'logged out'
    },
    search_success: (state,ads) => {
      state.Ads=ads
      state.searchfound = 'success'
      state.searchNb=state.Ads.ads.length
      state.nbPageAds=ads.count
    },
    search_notFound: (state) => {
      state.searchfound = 'error'
      state.searchNb=0
    },
    search_searching: (state) => {
      state.searchfound = 'loading'
    },
    setTypeOfSearch: (state,nb) => {
      state.typeOfSearch=nb
    },
    setPlace: (state,value) => {
      state.adsPlace=value
    },
    setPmin: (state,value) => {
      state.prixmin=value
    },
    setTrier: (state,value) => {
      state.trier=value
    },
    reset_search:(state)=>{
      state.Ads=[]
      state.searchNb=0
      //state.searchfound=''
      state.categSearch=''
      state.search=''
      state.sCateg=''
    }
  },
  actions: {
    updPlace({commit,dispatch,state},value){
      if(value.length==0){
      state.adsPlace=[
        {
        "name":"Tout le pays"
        },
      ]
      localStorage.setItem('place', JSON.stringify(state.adsPlace))
      if(state.typeOfSearch==2){
        dispatch('searchMenu',state.categSearch)
      }
      if(state.typeOfSearch==4){
        dispatch('searchByWhat',state.categSearch)
      }
      if(state.typeOfSearch==1){
        var info={
          selected:state.categSearch,
          search:state.search
        }
        dispatch('searchBar',info)
      }
      if(state.typeOfSearch==3){
        var info={
          categ:state.categSearch,
          scateg:state.sCateg
        }
       
        dispatch('searchMenuSous',info)
      }
      dispatch('getNumberPlace',state.adsPlace)
    }
      else{
      commit('setPlace',value)
        //dispatch('checkAdsCache')
        localStorage.setItem('place', JSON.stringify(state.adsPlace))
        if(state.typeOfSearch==2){
          dispatch('searchMenu',state.categSearch)
        }
        if(state.typeOfSearch==4){
          dispatch('searchByWhat',state.categSearch)
        }
        if(state.typeOfSearch==1){
          var info={
            selected:state.categSearch,
            search:state.search
          }
          dispatch('searchBar',info)
        }
        if(state.typeOfSearch==3){
          var info={
            categ:state.categSearch,
            scateg:state.sCateg
          }
          dispatch('searchMenuSous',info)
        }
        dispatch('getNumberPlace',state.adsPlace)
       
    }

    },
    getNumberPlace({commit,state,dispatch}, places){
      return new Promise((resolve, reject) => {
        Axios({url: 'http://localhost:8000/api/annonce/numbyplace', data: {place:places}, method: 'POST' })
       .then(resp => { // store the token in localstorage
         state.placeNb=resp.data;
         resolve(resp)
       })
     .catch(err => { // if the request fails, remove any possible user token if possible
       reject(err)
     })
      })
    },
    checkAdsCache({commit,state}){
      commit('reset_search')
      commit('search_searching')
      if(localStorage.categSearch){
        state.search=localStorage.getItem('search')
        if(localStorage.prix){
        state.prixmin=localStorage.getItem('prix')
        state.trier=localStorage.getItem('trier')
        }
        else{
          state.prixmin=5
          state.trier=''
        }

        state.nbPageAds=localStorage.getItem('nbPageAds')
        state.currentPageAds=localStorage.getItem('curPageAds')

        state.Ads= JSON.parse(localStorage.getItem('adsearch'))
        state.adsPlace= JSON.parse(localStorage.getItem('place'))
        state.categSearch=localStorage.getItem('categSearch')
        state.typeOfSearch=localStorage.getItem('type')
        state.sCateg=localStorage.getItem('sCateg')
        if(state.Ads.ads.length==0)
          state.searchfound='error'
        else
          state.searchfound='success'
        state.allCateg=state.categSearch
        state.searchh=state.search
      }
      else
        router.push('/')
    },
    sorted({dispatch,state}){
      
      if(localStorage.prix || localStorage.trier){
        state.prixmin=localStorage.getItem('prix')
        state.trier=localStorage.getItem('trier')
      }
    },
    searchByWhat({commit,dispatch,state},what){
      dispatch('sorted')
      commit('reset_search')
      state.categSearch=what
      localStorage.removeItem('search')
      localStorage.removeItem('adsearch')
      localStorage.removeItem('categSearch')
      localStorage.removeItem('place')
      localStorage.removeItem('type')
      localStorage.removeItem('sCateg')
      localStorage.removeItem('nbPageAds')
      localStorage.removeItem('curPageAds')
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/annonce/lookbywhat', data: {look:what,curPage:state.currentPageAds,prmin:state.prixmin,trier:state.trier, place:state.adsPlace}, method: 'POST' })
         .then(resp => { // store the token in localstorage
          commit('search_success',resp.data)
          if(state.Ads.ads.length!=0){
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('sCateg', '')
            localStorage.setItem('type', state.typeOfSearch)

            localStorage.setItem('nbPageAds',state.nbPageAds)
            localStorage.setItem('curPageAds',state.currentPageAds)

            localStorage.setItem('search', '')
           }
           else{
            commit('search_notFound')
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('sCateg', '')
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('search', '')
            localStorage.setItem('type', 4)
            
           }
           resolve(resp)
         })
       .catch(err => { // if the request fails, remove any possible user token if possible
         reject(err)
       })
     })


    },

    searchMenuSous({commit,state,dispatch},info){
      dispatch('sorted')
      commit('reset_search')
      state.categSearch=info.categ
      state.sCateg=info.scateg
      localStorage.removeItem('search')
      localStorage.removeItem('adsearch')
      localStorage.removeItem('categSearch')
      localStorage.removeItem('place')
      localStorage.removeItem('type')
      localStorage.removeItem('sCateg')
      localStorage.removeItem('nbPageAds')
      localStorage.removeItem('curPageAds')
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/annonce/looksouscateg', data: {categ:info.categ,prmin:state.prixmin,trier:state.trier,curPage:state.currentPageAds,scateg:info.scateg, place:state.adsPlace}, method: 'POST' })
         .then(resp => { // store the token in localstorage
          commit('search_success',resp.data)
          if(state.Ads.ads.length!=0){
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('sCateg', state.sCateg)
            localStorage.setItem('nbPageAds',state.nbPageAds)
            localStorage.setItem('curPageAds',state.currentPageAds)
            localStorage.setItem('type', state.typeOfSearch)
            localStorage.setItem('search', '')
           }
           else{
            commit('search_notFound')
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('sCateg', state.sCateg)
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('search', '')
            localStorage.setItem('type', 3)
            
           }
           resolve(resp)
         })
       .catch(err => { // if the request fails, remove any possible user token if possible
         reject(err)
       })
     })

    },
    searchMenu({commit,dispatch,state},type){
      dispatch('sorted')
      commit('reset_search')
      state.categSearch=type
      localStorage.removeItem('search')
      localStorage.removeItem('adsearch')
      localStorage.removeItem('categSearch')
      localStorage.removeItem('place')
      localStorage.removeItem('type')
      localStorage.removeItem('sCateg')
      localStorage.removeItem('nbPageAds')
      localStorage.removeItem('curPageAds')
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/annonce/lookcateg', data: {categ:type,prmin:state.prixmin,trier:state.trier,curPage:state.currentPageAds, place:state.adsPlace}, method: 'POST' })
         .then(resp => { // store the token in localstorage
          commit('search_success',resp.data)
           if(state.Ads.ads.length!=0){
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('categSearch', type)
            localStorage.setItem('nbPageAds',state.nbPageAds)
            localStorage.setItem('curPageAds',state.currentPageAds)
            localStorage.setItem('type', state.typeOfSearch)
            localStorage.setItem('search', '')
           }
           else{
            commit('search_notFound')
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('categSearch', type)
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('search', '')
            localStorage.setItem('type', 2)
            
           }
           resolve(resp)
         })
       .catch(err => { // if the request fails, remove any possible user token if possible
         reject(err)
       })
     })
    },

    searchBar({commit,dispatch,state},info){
      dispatch('sorted')
      commit('reset_search')
      state.categSearch=info.selected
      state.search=info.search
      localStorage.removeItem('search')
      localStorage.removeItem('adsearch')
      localStorage.removeItem('categSearch')
      localStorage.removeItem('place')
      localStorage.removeItem('type')
      localStorage.removeItem('sCateg')
      localStorage.removeItem('nbPageAds')
      localStorage.removeItem('curPageAds')
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/annonce/look', data: {selected:info.selected,prmin:state.prixmin,trier:state.trier,curPage:state.currentPageAds, search:info.search, place:state.adsPlace}, method: 'POST' })
         .then(resp => { // store the token in localstorage
          commit('search_success',resp.data)
           if(state.Ads.ads.length!=0){
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('nbPageAds',state.nbPageAds)
            localStorage.setItem('curPageAds',state.currentPageAds)
            localStorage.setItem('type', state.typeOfSearch)
            localStorage.setItem('search', state.search)
           }
           else{
            commit('search_notFound')
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('search', state.search)
            localStorage.setItem('type', 1)
           }
           resolve(resp)
         })
       .catch(err => { // if the request fails, remove any possible user token if possible
         reject(err)
       })
     })
    },
    addAd({commit,dispatch,state},ad){
      
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token') // clear your user's token from localstorage
        delete Axios.defaults.headers.common['Authorization']
        commit('auth_logout')
        resolve()
      })
    },
   signup({},info){
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
         Axios({url: 'http://localhost:8000/api/auth/register', data: info, method: 'POST' })
          .then(resp => { // store the token in localstorage
            this.state.usRegStatus = 'success'
            resolve(resp)
          })
        .catch(err => {
          localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
    checkLogin({commit,state}){
      if(state.accessToken!==''){
        return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/user/check', data: {token:state.accessToken}, method: 'POST' })
            .then(respo => {
              commit('auth_user', respo.data)
              commit('auth_token')
              resolve(respo)
            });
        });
      }
    },
    login:({commit,state},user)=>{
      state.okConnection.notok=""
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            localStorage.setItem('access_token', token) // store the token in localstorage
            Axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token)

            Axios({url: 'http://localhost:8000/api/user/tokenS',data: {email:user.email,password:user.password,token:state.accessToken}, method: 'POST' })
            .then(tok=>{
              
              commit('auth_token',tok)
            })

            Axios({url: 'http://localhost:8000/api/user',data: user, method: 'POST' })
            .then(respo => {
              
              commit('auth_user', respo.data)
              resolve(respo)
            });

            resolve(resp)
          })
        .catch(err => {
          state.okConnection.notok="true"
          commit('auth_error', err)
          localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
        
      }).catch((err)=>console.log(err))
    },
  },
  modules: {
  }
})

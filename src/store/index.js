import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
Vue.prototype.$http = Axios;
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken:  localStorage.getItem('access_token') ||  '',
    currentUser : [],
    adsPlace:[
      {
      "name":"Tout le pays"
      },
    ],
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
    typeOfSearch: 0
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
      state.searchNb=state.Ads.length
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
    reset_search:(state)=>{
      state.Ads=[]
      state.searchNb=0
      state.searchfound=''
      state.categSearch=''
      state.search=''
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
      if(state.typeOfSearch==1){
        var info={
          selected:state.categSearch,
          search:state.search
        }
        dispatch('searchBar',info)
      }
      dispatch('getNumberPlace',state.adsPlace)
    }
      else{
      commit('setPlace',value)
      state.placeUpd=true
        //dispatch('checkAdsCache')
        if(state.typeOfSearch==2){
          dispatch('searchMenu',state.categSearch)
        }
        if(state.typeOfSearch==1){
          var info={
            selected:state.categSearch,
            search:state.search
          }
          dispatch('searchBar',info)
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
        state.Ads= JSON.parse(localStorage.getItem('adsearch'))
        state.adsPlace= JSON.parse(localStorage.getItem('place'))
        state.categSearch=localStorage.getItem('categSearch')
        state.typeOfSenarch=localStorage.getItem('type')
        if(state.Ads.length==0)
          state.searchfound='error'
        else
          state.searchfound='success'
        state.allCateg=state.categSearch
        state.searchNb=state.Ads.length
        state.searchh=state.search
      }
      else
        router.push('/')
    },


    searchMenu({commit,dispatch,state},type){
      commit('reset_search')
      commit('search_searching')
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/annonce/lookcateg', data: {categ:type, place:state.adsPlace}, method: 'POST' })
         .then(resp => { // store the token in localstorage
           if(resp.data.length!=0){
            commit('search_success',resp.data)
            state.categSearch=type
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
            localStorage.setItem('categSearch', type)
            localStorage.setItem('type', state.typeOfSearch)
            localStorage.setItem('search', '')
           }
           else{
            commit('search_notFound')
            state.categSearch=type
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
      commit('reset_search')
      commit('search_searching')
      state.categSearch=info.selected
      state.search=info.search
      localStorage.removeItem('access_token') 
      localStorage.removeItem('search')
      localStorage.removeItem('adsearch')
      localStorage.removeItem('categSearch')
      localStorage.removeItem('place')
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        Axios({url: 'http://localhost:8000/api/annonce/look', data: {selected:info.selected, search:info.search, place:state.adsPlace}, method: 'POST' })
         .then(resp => { // store the token in localstorage
          commit('search_success',resp.data)
           if(state.Ads.length!=0){
            localStorage.setItem('adsearch', JSON.stringify(state.Ads))
            localStorage.setItem('categSearch', state.categSearch)
            localStorage.setItem('place', JSON.stringify(state.adsPlace))
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
          commit('auth_error', err)
          localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
  },
  modules: {
  }
})

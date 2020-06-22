import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
Vue.prototype.$http = Axios;
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mimage:'',
  finish:false,
  notUserExist:false,
  UserExistance:false,
  pwdIncorrect:false,
  okConnection:{
    okuser:'',
    okpwd:'',
    okregmail:'',
    regmail:'',
    notok:''
  },   

  emailreseting:'',
  mailConfirmed:false,
  resetObject:
    {
    email:"",
    code:0,
    existMail:false,
    }
  ,  
    accessToken:  localStorage.getItem('access_token') ||  '',
    currentUser : [],
    infoAds : [],
    picAds : [],
    infoUsers : [],
    userExist:false,
    okRegister:'',
    adsPlace:[
      {
      "name":"Tout le pays"
      },
    ],

    pagination:'true',
    nbPageAds:1,
    nbPageMyAds:1,
    currentPageAds:1,
    nbPageMySavedAds:1,
    currentPageSavedAds:1,
    currentPageMyAds:1,
    filteringAds:'',
    prixmin:5,
    trier:'',

    placeUpd:false,
    placeNb:0,

    pricing:'false',
    
    saveAds:[],
    savedAdfound :'',
    hasAdAdded:false,

    mysaveAds:[],
    mysavedAdfound :'',
    hasAdSaved:false,

    hasFoundAfterResearch:true,
    Ads:[],

    delAds:[],

    categSearch:'',
    Ad:[],
    previous:'',
    next:'',
    saving:'',
    adToSave:0,
    adToDelete:0,
    usCoStatus:'',
    usRegStatus:'',
    token:'',
    logStatus:'',
    searchfound:'success',
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
    auth_reg:(state,right)=>{
      state.okRegister=right
    },
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
    auth_exist:(state)=>{
      state.userExist=true
    },
    auth_exist:(state,exist)=>{
      state.userExist=exist
    },
    updateSearch:(state,value)=>{
      state.searchh=value
    },
    video_image:(state,value)=>{
      state.mimage=value
    },
    auth_logout: (state) => {
      state.logStatus = 'logged out'
    },
    search_success: (state,ads) => {
      state.Ads=ads
      state.searchfound = 'success'
      state.searchNb=state.Ads.ads.length
      state.nbPageAds=ads.count
      state.hasFoundAfterResearch=true
    },
    success: (state) => {
      state.searchfound = 'success'
    },
    adtodell: (state,value) => {
      state.delAds=value
    },
    savedAd_success: (state,ads) => {
      state.saveAds=ads
      state.savedAdfound = 'success'
      state.nbPageMyAds=ads.count
      state.hasAdAdded=true
    },
    savedAd_failed: (state) => {
      state.saveAds=[]
      state.savedAdfound = 'r'
      state.nbPageMyAds=1
      state.hasAdAdded=false
    },
    savedAd_reset: (state) => {
      state.saveAds=[]
      state.savedAdfound = 'loading'
      state.hasAdAdded=false
      //state.nbPageMyAds=1
    },


    mysavedAd_success: (state,ads) => {
      state.mysaveAds=ads
      state.mysavedAdfound = 'success'
      state.nbPageMySavedAds=ads.count
      state.hasAdSaved=true
    },
    mysavedAd_failed: (state) => {
      state.mysaveAds=[]
      state.mysavedAdfound = 'r'
      state.nbPageMySavedAds=1
      state.hasAdSaved=false
    },
    reset_success: (state,value) => {
      state.resetObject.code=value
      state.resetObject.existMail=true
    },
    mysavedAd_reset: (state) => {
      state.mysaveAds=[]
      state.mysavedAdfound = 'loading'
      state.hasAdSaved=false
      //state.nbPageMyAds=1
    },


    search_notFound: (state) => {
      state.hasFoundAfterResearch = false
      state.searchNb=0
    },
    search_searching: (state) => {
      state.hasFoundAfterResearch=true
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
    infoAd: (state,value) => {
      state.infoAds=value
    },
    infoUser: (state,value) => {
      state.infoUsers=value
    },
    reset_search:(state)=>{
      state.hasFoundAfterResearch=true
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
        if(localStorage.nbPageAds)
          state.nbPageAds=localStorage.getItem('nbPageAds')
        else state.nbPageAds=0
        if(localStorage.curPageAds)
          state.currentPageAds=localStorage.getItem('curPageAds')
        else
        state.currentPageAds=1
        
        state.Ads= JSON.parse(localStorage.getItem('adsearch'))
        state.adsPlace= JSON.parse(localStorage.getItem('place'))
        state.categSearch=localStorage.getItem('categSearch')
        state.typeOfSearch=localStorage.getItem('type')
        state.sCateg=localStorage.getItem('sCateg')
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
          if(state.Ads.total!=0){
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
          if(state.Ads.total!=0){
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
          if(state.Ads.total!=0){
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
           if(state.Ads.total!=0){
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
    
    logout({commit}){
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token') // clear your user's token from localstorage
        delete Axios.defaults.headers.common['Authorization']
        commit('auth_logout')
        resolve()
      })
    },
    
  isUserExistUpdate({commit,dispatch,state},user){
    return new Promise((resolve, reject)=>{
    Axios({url: 'http://localhost:8000/api/user/checkUserExistanceUpdate', data: user, method: 'POST' })
        .then(respo => {
          if(respo.data!=0)
            state.notUserExist=false
          else
            state.notUserExist=true
          resolve(respo)
        });
    });
},
pwdUpdate({commit,dispatch,state},info){
  return new Promise((resolve, reject)=>{
  Axios({url: 'http://localhost:8000/api/user/pwdUpdate', data: info, method: 'POST' })
      .then(respo => {
        if(respo.data!==0)
          state.pwdIncorrect=false
        else
          state.pwdIncorrect=true
        resolve(respo)
      });
  });
},
isUserExist({commit,dispatch,state},user){
  return new Promise((resolve, reject)=>{
  Axios({url: 'http://localhost:8000/api/user/checkUserExistance', data: user, method: 'POST' })
      .then(respo => {
        if(respo.data==0)
          state.notUserExist=true
        else
          state.notUserExist=false
        resolve(respo)
      })
  });
},
   signup({dispatch,state},info){
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
         Axios({url: 'http://localhost:8000/api/auth/register', data: info, method: 'POST' })
          .then(resp => { // store the token in localstorage
            state.usRegStatus = 'success'
            state.okConnection.regmail=''
            state.UserExistance=false
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
        state.accessToken=localStorage.getItem('access_token')
        return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/user/check', data: {token:state.accessToken}, method: 'POST' })
            .then(respo => {
              commit('auth_user', respo.data)
              commit('auth_token')
              resolve(respo)
            }).catch(err => {
              state.okConnection.notok="true"
              commit('auth_error', err)
              localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
              reject(err)
            })
        })
      }
    },
    getSavedAds({commit,state},form){
      commit('savedAd_reset')
      
        return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/annonce/saved', data:form, method: 'POST' })
            .then(respo => {
              if(respo.data.total!=0){
                console.log(respo.data)
                state.nbPageMyAds=respo.data.count
                commit('savedAd_success',respo.data)
              }else{
                console.log(form.get('user'))
                commit('savedAd_failed')
              }
              resolve(respo)
            });
        });
      
    },

    getAdToDel({commit,state},content){
        state.adToDelete=[]
        return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/annonce/adtodell', data:content, method: 'POST' })// add to modify
            .then(respo => {
                commit('adtodell',respo.data)
                localStorage.setItem('adtomod', JSON.stringify(respo.data))
              resolve(respo)
            })
            .catch(err => {
              state.adToDelete=[] // if the request fails, remove any possible user token if possible
              localStorage.removeItem('adtomod')
              reject(err)
            });
        });
      
    },

    sendEmail({commit,dispatch},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/message/sending', data: content, method: 'POST' })
        .then(respo => {
          console.log('message sent')
          resolve(respo)
        })
        })
    },
    setreset({commit,dispatch},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/pwdreset', data: content, method: 'POST' })
        .then(respo => {
          console.log('pwd reseted')
          resolve(respo)
        })
        })
    },
    reset({commit,state},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/verify', data: content, method: 'POST' })
        .then(respo => {
         if(respo.data!=0){
           commit('reset_success',respo.data)
           var reset=state.resetObject
           console.log(state.resetObject)
         }
         else{
          state.resetObject.existMail=false
         }
          resolve(respo)
        })
        })
    },
    verify({commit,state},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/checkcode', data: content, method: 'POST' })
        .then(respo => {
         if(respo.data!=0){
           //commit('reset_success',respo.data)
           state.mailConfirmed=true
           localStorage.setItem('mailreset', state.resetObject.email)
           //console.log(state.resetObject)
         }
         else{
          state.mailConfirmed=false
         }
          resolve(respo)
        })
        })
    },
    signalerAd({commit,dispatch},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/signalement', data: content, method: 'POST' })
        .then(respo => {
          console.log('ad reported')
          resolve(respo)
        })
        })
    },
    sauverAd({commit,dispatch},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/sauvegarde', data: content, method: 'POST' })
        .then(respo => {
          console.log('ad saved')
          resolve(respo)
        })
        })
    },
    retirerAd({commit,dispatch},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/sauvegardedel', data: content, method: 'POST' })
        .then(respo => {
          console.log('ad del')
          resolve(respo)
        })
        })
    },
    supprimerAd({commit,dispatch},content){
      return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/delad', data: content, method: 'POST' })
        .then(respo => {
          console.log('myad del')
          resolve(respo)
        })
        })
    },
    getMySavedAds({commit,state},form){
      commit('mysavedAd_reset')
      
        return new Promise((resolve, reject)=>{
        Axios({url: 'http://localhost:8000/api/annonce/mysaved', data:form, method: 'POST' })
            .then(respo => {
              if(respo.data.total!=0){
                console.log(respo.data)
                state.nbPageMySavedAds=respo.data.count
                commit('mysavedAd_success',respo.data)
              }else{
                console.log(form.get('user'))
                commit('mysavedAd_failed')
              }
              resolve(respo)
            });
        });
      
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
              localStorage.setItem('usetrixco', respo.data.id)
              commit('auth_user', respo.data)
              resolve(respo)
            })

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

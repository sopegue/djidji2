<template>
  <div>
    <Header :scrolling="showNavbar" :hasNotif="hasNotif"></Header>
    <router-view></router-view>
    <Contact></Contact>
    <Footer></Footer>
  </div>
</template>
<script>
  import Footer from '@/components/footer/Footer.vue'
  import Contact from '@/views/Contact.vue'
  import Header from '@/components/header/Header.vue'
   import Axios from 'axios'
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  export default {
    name:'Home',
    data() {
        return {
          showNavbar: true,
          lastScrollPosition: 0,
        }
      },
      components: {
        Header,
        Footer,
        Contact
      },
      props:['hasNotif'],
      created(){
        this.handlerClose()
      },
      mounted () {
        
        window.addEventListener('scroll', this.onScroll);
      },
      methods:{
        handlerClose(){
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/incrementVisit', method: 'GET' })
                .then(respo => {
                  console.log(respo.data,' visiteur(s)')
                  resolve(respo)
                })
            })
        },
        onScroll () {
          const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

          if (currentScrollPosition < 0) {
            return
          }

          if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 150) {
            return
          }
          this.showNavbar = currentScrollPosition < this.lastScrollPosition;
          this.lastScrollPosition = currentScrollPosition
        },
      },
  }
</script>
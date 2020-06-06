<template >
    <div class="us-c-not">
        <div class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class=" d-flex flex-row  align-items-center" v-if="avert">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Avertissement !</p>
                    </div>
                    <div class=" d-flex flex-row align-items-center" v-if="comm">
                        <i class="fas fa-users"></i>
                        <p>Violation des règles de la communauté</p>
                    </div>
                    <div class=" d-flex flex-row ju align-items-center" v-if="deleted">
                        <i class="fas fa-bookmark"></i>
                        <p>Annonce enregistré</p>
                    </div>
                </div>
                <div class="not-dismiss">
                    <button><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   work directly with our designers and suppliers,
                    an We work directly with our designers and suppliers,
                    an We work directly with our designers and suppliers,
                    an We work directly with our designers and suppliers,
                    ans, at a price anyone can afford.
                </div>
            </div>
            <div class="not-foot d-flex flex-row justify-content-between">
                <div class="not-read">
                    <button>Marquer comme lu</button>
                </div>
                <div class="not-timee">
                    21 juin 2020, 22h
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted(){

        },
        data () {
            return { 
                avert:true,
                comm:false,
                deleted:false
            }
        },
        methods: {
         
        }
    }
</script>
<style scoped>
.fa-users,.fa-exclamation-triangle,.fa-bookmark{
    color: #004e66;
}
.us-c-not{
    height: auto;
    border: 0.5px solid #ddd;
    border-radius: 1%;
    margin-bottom: 0.5rem;
}
.us-c-not .container{
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.message{
    width: 85%;
}
.not-title p{
    position: relative !important;
    top: 0.6rem;
    left: 0.7rem;
    color: #004e66;
    font-weight: bold;
    font-size:medium ;
}
.not-foot{
    padding-top: 1.5rem;
}
.not-dismiss button, .not-read button{
    background-color: white;
    border: none;
}
button:focus{
    outline: none;
}
.not-read button{
    color: #004e66;
}
.fa-times{
    font-size: 16px;
    color: rgb(100, 100, 100) !important;
}
.not-timee{
    color: rgb(100, 100, 100);
    font-size: 13px;
}
</style>

<template>
   <v-card flat>
      <v-toolbar
         color="primary"
         dark
         extended
         flat
         >
      </v-toolbar>
      <v-layout row pb-2>
         <v-flex xs8 offset-xs2>
            <v-card class="card--flex-toolbar">
               <v-toolbar card prominent>
                  <v-toolbar-title class="body-2 grey--text">Logowanie</v-toolbar-title>
                  <v-spacer></v-spacer>
               </v-toolbar>
               <v-divider></v-divider>
               <v-card-text style="height: 200px;">
                  <v-text-field placeholder="Email" v-model="credientials.email"></v-text-field>
                  <v-text-field placeholder="Hasło" v-model="credientials.password" type="password"></v-text-field>
                  <v-btn color="primary" block dark @click="login()">Zaloguj się z pomocą Social ID</v-btn>
               </v-card-text>
            </v-card>
         </v-flex>
      </v-layout>
   </v-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      credientials:{
          email:"",
          password:""
      }
    }
  },
  methods:{
      login(){
         this.$store.dispatch('login',{ email:this.credientials.email,password:this.credientials.password });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .card--flex-toolbar {
    margin-top: -64px;
  }
</style>

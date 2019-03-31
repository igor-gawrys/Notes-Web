<template>
   <div>
      <v-layout row justify-center>
         <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
               <v-card-title>
                  <span class="headline">Stwórz notatkę</span>
               </v-card-title>
               <v-card-text>
                  <v-container grid-list-md>
                     <v-layout wrap>
                        <v-flex xs12>
                           <v-alert
                              :value="error"
                              type="error"
                              >
                              Wystąpił błąd ! Spróbuj jeszcze raz !
                           </v-alert>
                        </v-flex>
                        <v-flex xs12>
                           <v-text-field placeholder="Tytuł"  v-model="note.title" solo></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                           <v-textarea
                              v-model="note.content"
                              solo
                              name="input-7-4"
                              label="Treść"
                              ></v-textarea>
                        </v-flex>
                     </v-layout>
                  </v-container>
               </v-card-text>
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="dialog = false">Zamknij</v-btn>
                  <v-btn color="blue darken-1" flat @click="createNote()">Stwórz</v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
      </v-layout>
      <v-layout row justify-center>
         <v-dialog v-model="dialog_note" persistent max-width="600px">
            <v-card>
               <v-card-title>
                  <span class="headline">{{ note.title }}</span>
               </v-card-title>
               <v-card-text>
                  <v-container grid-list-md>
                     <v-alert
                        :value="error"
                        type="error"
                        >
                        Wystąpił błąd ! Spróbuj jeszcze raz !
                     </v-alert>
                     <v-layout wrap v-on:dblclick="() => { note_edit = true; }" v-if="!note_edit">
                        {{ note.content }}
                     </v-layout>
                     <v-textarea v-else
                        v-model="note.content"
                        solo
                        name="input-7-4"
                        label="Treść"
                        @keydown.enter.prevent="updateNote(note)"
                        ></v-textarea>
                  </v-container>
               </v-card-text>
               <v-card-actions>
                  <v-btn color="error darken-1" block flat @click="deleteNote(note)">Skasuj</v-btn>
                  <v-btn color="blue darken-1" block flat @click="() => { note = { title:'',content:'' }; dialog_note = false }">Zamknij</v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
      </v-layout>
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
                     <v-toolbar-title class="body-2 grey--text">Twoje notatki</v-toolbar-title>
                     <v-spacer></v-spacer>
                     <v-btn icon @click="() => { dialog = true; }">
                        <v-icon>create</v-icon>
                     </v-btn>
                     <v-btn icon @click="logout()">
                        <v-icon>exit_to_app</v-icon>
                     </v-btn>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-card-text style="height: 100vh;">
                     <div class="text-truncate" v-if="!$store.state.logged" >Aby wyświetlić notatki musisz się <a href="#" @click="$router.push({ name:'Login',params:{} })">zalogować</a></div>
                     <span v-else>
                        <template v-for="note in $store.state.user.user.notes">
                           <v-list-tile
                              avatar
                              @click="showDialog(note)"
                              >
                              <v-list-tile-content>
                                 <v-list-tile-title v-html="note.title"></v-list-tile-title>
                                 <v-list-tile-sub-title v-html="note.content"></v-list-tile-sub-title>
                              </v-list-tile-content>
                           </v-list-tile>
                        </template>
                     </span>
                  </v-card-text>
               </v-card>
            </v-flex>
         </v-layout>
      </v-card>
   </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dialog:false,
      dialog_note:false,
      note_edit:false,
      note:{
        title:"",
        content:""
      },
      error:false
    }
  },
  methods:{
    createNote(){
      axios.post('auth/notes',{ title: this.note.title,content:this.note.content }).then((response) => {
        this.dialog = false;
        this.note = {
          title:"",
          content:""
        };
        this.$store.dispatch('me');
      }).catch((err) => {
        this.error = true;
      });
    },
    deleteNote(){
      axios.delete('auth/notes/'+this.note.id).then((response) => {
        this.note = {
          title:"",
          content:""
        };
        this.dialog_note = false;
        this.$store.dispatch('me');
      });
    },
    updateNote(note){
      axios.patch('auth/notes/'+note.id,{ title: this.note.title,content:this.note.content }).then((response) => {
        this.note_edit = false;
        this.$store.dispatch('me');
      }).catch((err) => {
        this.error = true;
      });
    },
    showDialog(note){
      this.note = note; 
      this.dialog_note = true;
    },
    logout(){
      this.$store.dispatch('logout');
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

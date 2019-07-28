<template>
  <div class="home container">
    <div class="card" v-for="todo in todos" :key="todo.id" >
      <div class="card-content" 
      v-bind:class="{'st' : todo.completed}"
      >
      <ul>
        <li>
          <i class="material-icons delete  z-depth-5" @click="deltetodo(todo.id)">delete</i>
        </li>
      </ul>
      
      <h2 >{{todo.title}}</h2><span class="chip z-depth-5">
         <i class="material-icons status " 
         @click="UpdateTodo(todo.id, !todo.completed)"
         >{{(todo.completed) ? 'done_all' : 'clear'}}</i>
       </span>
      <ul class="todos">
       <li>
         <span class="chip">{{todo.slug}}</span>
       </li>
   </ul>
 </div>
 <span class="btn-floating btn-large halfway-fab blue">
   <router-link  :to="{name: 'EditTodo', params:{todo_slug: todo.slug} }"><i class="material-icons">edit</i></router-link>
 </span>
</div>
   
<div class="container delete">
   <div class="card" v-for="item in deleted">
     {{item}}
   </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import db from '@/firebase/init'
export default {

  name: 'Home',
  data () {
    return {
     todos:[
        
    ],
    deleted:[
    ],
  }
},
methods:{
  deltetodo(id){
    // this.deleted.push(this.todos[id]);
    db.collection('todos').doc(id).delete()
    .then(() => {
      this.todos = this.todos.filter(todo => {
        return todo.id != id
      })
    })
  },
   UpdateTodo(id,status){
    // console.log(id+status);
             db.collection('todos').doc(id).update({
                completed:status,
              }).then(() => {
                this.$router.push({ name:'Home'
                }).catch(err => {
                  this.feedback = err
                })
              })
            }
           
},
created(){
  db.collection('todos').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      let todos = doc.data()
      todos.id = doc.id
      this.todos.push(todos)
    })
  })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color:#1a237e;

}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
.home{
  display:grid;
  grid-template-columns: 1fr ;
  grid-gap:20px;

}

.home .todos{
  margin: 30px auto;

}

.home .todos li{
  display: inline-block;
}
.home .status{
  margin:2px;
  text-align: center;
  cursor: pointer;
  color: #42a5f5;

}.home .delete{

  cursor: pointer;
  color: #0d47a1;

}
.chip{
  background-color:#90caf9;
}
.card{
  background-color:#bbdefb;

}
.st{
  background-color:#42a5f5;
}
</style>

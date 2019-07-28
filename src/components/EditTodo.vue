<template>
	<div class="edit-todo container" v-if="todo">
		<h2>Edit {{todo.title}}</h2>
		<form @submit.prevent="EditTodo">
		  <div class="field title">
		  	<label for="title">Todo Title</label>
		  	<input type="text" name="title" v-model="todo.title" @keydown.tab.prevent="EditTodo">
		  </div>		
		    <div class="field user">
		  	<label for="user">User</label>
		  	<input type="text" name="user" v-model="todo.user">
		  </div>		  <div class="field title">
		  	<label for="completed">Status</label>
		  	<input type="text" name="completed" v-model="todo.completed">
		  </div>
           <div class="field center-align">
           	  	<p v-if="feedback" class="red-text">{{feedback}}</p>
           		<button type="" class="btn blue">Edit</button>
           	
           </div>

		</form>
	</div>
</template>

<script >
import db from '@/firebase/init'
import slugify from 'slugify'
	export default{
		name: 'EditTodo',
		data(){
			return{
             qs : this.$route.params.todo_slug,
             todo :null,
             feedback:null,
             slug:null
			}
		},
		methods:{
           EditTodo(){
           	if(this.todo.title){
           		this.feedback = null
           		this.slug =slugify(this.todo.title,{
           			replacement: '-',
           			remove: /[.*+?^=!:$@{}()|[\]\/\\]/g,
           			lower:true
           		})
           		console.log(this.todo)
           		db.collection('todos').doc(this.todo.id).update({
           			title:this.todo.title,
           			user:this.todo.user,
           			completed:this.todo.completed,
           			slug:this.slug
           		}).then(() => {
           			this.$router.push({
           				name:'Home'
           			}).catch(err => {
           				this.feedback = err
           			})
           		})
           	}else{
           		this.feedback = 'Grrrrr :( How can the title can be empty'
           	}
           }
		},
		created(){
			let ref = db.collection('todos').where('slug', '==' ,this.qs)
			ref.get().then(snapshot => {
				snapshot.forEach(doc => {
					this.todo = doc.data()
					this.todo.id = doc.id
				})
			})
			
		}
	}
</script>
<style>
	.edit-todo{
	margin-top:60px;
	padding:20px;
	max-width:500px;
}
.edit-todo h2{
	font-size:2em;
	margin : 20px auto;
}
.edit-todo .field{
	margin: 20px;
}
</style>
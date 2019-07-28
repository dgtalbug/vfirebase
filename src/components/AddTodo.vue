<template>
	<div class="add-todo container">
		<h2 class="center-align blue-text">Add Todo</h2>
		<form @submit.prevent="AddTodo">
		  <div class="field title">
		  	<label for="title">Todo Title</label>
		  	<input type="text" name="title" v-model="title" @keydown.tab.prevent="AddTodo">
		  </div>		
		    <div class="field user">
		  	<label for="user">User</label>
		  	<input type="text" name="user" v-model="user">
		  </div>		  <div class="field title">
		  	<label for="completed">Status</label>
		  	<input type="text" name="completed" v-model="completed">
		  </div>
           <div class="field center-align">
           	  	<p v-if="feedback" class="red-text">{{feedback}}</p>
           		<button type="" class="btn blue">Add</button>
           	
           </div>

		</form>
	</div>
</template>

<script >
import db from '@/firebase/init'
import slugify from 'slugify'
	export default {
		name: 'AddTodo',
		data(){
			return {
				title:null,
				user:1,
				completed:  true,
				slug:null,
				feedback:null
			}
		},
		methods:{
			AddTodo(){
				if(this.title){
					this.feedback = null
					this.slug =slugify(this.title,{
						replacement: '-',
						remove: /[.*+?^=!:$@{}()|[\]\/\\]/g,
						lower:true
					})
					// console.log(this.slug)
					db.collection('todos').add({
						title:this.title,
						user:this.user,
						completed:this.completed,
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
		}
	}
</script>

<style>
.add-todo{
	margin-top:60px;
	padding:20px;
	max-width:500px;
}
.add-todo h2{
	font-size:2em;
	margin : 20px auto;
}
.add-todo .field{
	margin: 20px;
}
</style>
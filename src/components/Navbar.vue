<template>
	<div class="navbar">
		<nav class="nav-extended indigo darken-2">
			<div class="nav-content">
				<router-link :to="{name: 'Home'}">
					<span class="nav-title">Todo</span>
				</router-link>
				<a href="" class="btn-floating btn-large halfway-fab cyan" title="">
					<router-link :to="{name: 'AddTodo'}">
						<i class="material-icons">add</i>
					</router-link>
				</a>
			</div>
		</nav>
	</div>
</template>
<template>
	<form class="post-form" @submit.prevent>
		<h4 class="title">Create Post</h4>
		<my-input v-model="post.title" v-focus type="text" placeholder="Title" />
		<my-input v-model="post.body" type="text" placeholder="Description" />
		<button class="post-btn" @click="createPost">Add Post</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			post: {
				title: '',
				body: '',
			},
		};
	},
	methods: {
		createPost() {
			this.post.id = Date.now();
			this.$emit('create', this.post);
			this.post = {
				title: '',
				body: '',
			};
		},
	},
	watch: {
		post: {
			handler(newVal) {
				// console.log(newVal);
			},
			deep: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.post-form {
	margin-bottom: 40px;
}

.post-btn {
	background: #00bd7e;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	font-weight: bold;
	cursor: pointer;
}
.title {
	font-weight: bold;
	margin-bottom: 20px;
	font-size: 22px;
}
</style>

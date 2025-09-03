<template>
	<div class="post">
		<div>
			<div><strong>Post ID:</strong> {{ post.id }}</div>
			<div><strong>Post Title:</strong> {{ post.title }}</div>
			<div><strong>Post Description:</strong> {{ post.body }}</div>
		</div>
		<div class="btn-block">
			<my-button
				@click="$router.push(`/posts/${post.id}`)"
				class="open-btn"
				>Open</my-button
			>
			<my-button
				@click="$emit('remove', post)"
				class="del-btn"
			></my-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.post {
	border: 2px solid #00bd7e;
	margin-bottom: 10px;
	padding: 20px;
}
.btn-block {
	display: flex;
	justify-content: space-between;
}
.open-btn {
	background: #00bd7e;
	color: white;
	border: none;
	border-radius: 10px;
	padding: 6px 12px;
	cursor: pointer;
	margin-top: 10px;
}
.del-btn {
	background: red;
	color: white;
	border: none;
	border-radius: 10px;
	padding: 6px 12px;
	cursor: pointer;
	margin-top: 10px;
}
</style>

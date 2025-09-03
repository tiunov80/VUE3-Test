<template>
	<div v-show="posts.length > 0">
		<h3>List of Users</h3>
		<transition-group name="list">
			<post-item
				v-for="post in posts"
				v-bind:post="post"
				:key="post.id"
				@remove="handleRemove(post)"
			/>
		</transition-group>
	</div>
	<h2 v-show="posts.length === 0" style="color: red">No posts</h2>
</template>

<script>
import { createApp } from 'vue';
import PostItem from '@/components/PostItem.vue';

export default {
	components: { PostItem },
	props: {
		posts: {
			type: Array,
			required: true,
		},
	},
	emits: ['remove'],
	methods: {
		handleRemove(post) {
			this.$emit('remove', post); // <-- пробрасываем наверх
		},
	},
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
	transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>

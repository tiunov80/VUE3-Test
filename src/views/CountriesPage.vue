<template>
	<div class="test-page">
		<div>{{ $store.state.likes }}</div>
		<h1>This is a Test page</h1>
		<my-input
			v-focus
			v-model="searchQuery"
			placeholder="Search..."
		></my-input>
		<div class="app_btns">
			<my-button @click="showDialog" class="add_post_btn"
				>Create new post</my-button
			>
			<my-select
				v-model="selectedSort"
				:options="sortOptions"
			></my-select>
		</div>

		<my-dialog v-model:show="dialogVisible">
			<post-form @create="createPost" />
		</my-dialog>

		<post-list
			:posts="sortedAndSearchedPosts"
			@remove="removePost"
			v-if="!isPostsLoading"
		/>

		<div v-else>Loading...</div>
		<div v-intersection="loadMorePosts" class="observer"></div>
	</div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';

export default {
	components: {
		PostList,
		PostForm,
	},
	data() {
		return {
			posts: [],
			dialogVisible: false,
			isPostsLoading: false,
			modificatorValue: '',
			selectedSort: '',
			searchQuery: '',
			page: 1,
			limit: 8,
			totalPages: 0,
			sortOptions: [
				{ value: 'title', name: 'By title' },
				{ value: 'body', name: 'By Description' },
				// { value: 'ID', name: 'By ID' },
			],
		};
	},

	methods: {
		createPost(post) {
			this.posts.push(post);
			// console.log(post);
			this.dialogVisible = false;
		},
		removePost(post) {
			this.posts = this.posts.filter((p) => p.id !== post.id);
		},
		showDialog() {
			this.dialogVisible = true;
		},
		async fetchPosts() {
			try {
				this.isPostsLoading = true;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts',
					{
						params: {
							_page: this.page,
							_limit: this.limit,
						},
					},
				);
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit,
				);
				this.posts = response.data;
				// console.log(response);
			} catch (e) {
				alert('error');
			} finally {
				this.isPostsLoading = false;
			}
		},
		async loadMorePosts() {
			try {
				this.page += 1;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts',
					{
						params: {
							_page: this.page,
							_limit: this.limit,
						},
					},
				);
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit,
				);
				this.posts = [...this.posts, ...response.data];
				// console.log(response);
			} catch (e) {
				alert('error');
			} finally {
			}
		},
	},
	mounted() {
		this.fetchPosts();
		// console.log(this.$refs.observer);
	},
	computed: {
		sortedPosts() {
			return [...this.posts].sort((post1, post2) =>
				String(post1[this.selectedSort]).localeCompare(
					String(post2[this.selectedSort]),
				),
			);
		},
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter((post) =>
				post.title
					.toLowerCase()
					.includes(this.searchQuery.toLowerCase()),
			);
		},
	},
	watch: {
		// page() {
		// 	this.fetchPosts();
		// },
		// 	selectedSort(newValue) {
		// 		if (!newValue) return;
		// 		this.posts = [...this.posts].sort((post1, post2) =>
		// 			String(post1[newValue]).localeCompare(
		// 				String(post2[newValue]),
		// 			),
		// 		);
		// 	},
	},
};
</script>

<style lang="scss" scoped>
.test-page {
	padding: 20px;
}
.add_post_btn {
	margin-bottom: 20px;
	background: #00bd7e;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	font-weight: bold;
	cursor: pointer;
}
.app_btns {
	display: flex;
	justify-content: space-between;
}
.page-wrapper {
	display: flex;
	gap: 15px;
}
.page {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: 1px solid white;
	border-radius: 50%;
	padding: 2px;
	width: 30px;
	height: 30px;
}
.carent-page {
	background: #00bd7e;
	color: black;
}
.observer {
	background: #00bd7e;
	padding: 10px;
}
</style>

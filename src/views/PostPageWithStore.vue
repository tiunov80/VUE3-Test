<template>
	<div>{{ $store.state.likes }}</div>
	<div>{{ $store.getters.doubleLikes }}</div>
	<div>{{ $store.state.isAuth ? 'User Auth' : 'User not Auth' }}</div>

	<mu-button class="open-btn" @click="$store.commit('incrementLikes')"
		>Like</mu-button
	>
	<mu-button class="open-btn" @click="$store.commit('decrementLikes')"
		>Dislike</mu-button
	>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.open-btn {
	background: #00bd7e;
	color: white;
	border: none;
	border-radius: 10px;
	padding: 6px 12px;
	cursor: pointer;
	margin-top: 10px;
}
</style>

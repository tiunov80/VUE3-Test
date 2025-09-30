<script>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<header class="b-header">
		<div class="wrapper">
			<nav class="nav">
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/countries-page"
					>Countries Page</RouterLink
				>
				<RouterLink to="/countries-page-composition-api-style"
					>Page Composition API with GraphQL</RouterLink
				>
				<RouterLink to="/Favorites">Favorites</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

<style lang="scss" scoped>
.b-header {
	margin-bottom: 40px;
	padding-bottom: 30px;
	border-bottom: 2px solid #00bd7e;
}
.main {
	display: flex;
	flex-direction: column;
}
nav a {
	font-size: 18px;
}
header {
	line-height: 1.5;
	/* max-height: 100vh; */
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: red;
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

/* @media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
} */
</style>

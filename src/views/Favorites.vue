<template>
	<section>
		<h1>Favorite Countries ({{ favoriteCountries.length }})</h1>

		<div v-if="loading">Загрузка…</div>
		<div v-else-if="error">Ошибка: {{ error.message }}</div>

		<ul v-else>
			<li v-for="c in favoriteCountries" :key="c.code">
				<router-link
					:to="{
						name: 'CountryDetailsGraphQL',
						params: { code: c.code },
					}"
				>
					{{ c.emoji }} {{ c.name }} ({{ c.code }})
				</router-link>
			</li>
		</ul>

		<p v-if="!loading && favoriteCountries.length === 0">
			No favorite countries
		</p>
		<button
			v-else
			class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			@click="favorites.removeAll()"
		>
			Remove all from Favorite
		</button>
	</section>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { computed } from 'vue';

const favorites = useFavoritesStore();

const GET_COUNTRIES = gql`
	query {
		countries {
			code
			name
			emoji
		}
	}
`;

const { result, loading, error } = useQuery(GET_COUNTRIES);

// favorite country
const favoriteCountries = computed(() => {
	if (!result.value) return [];
	return result.value.countries.filter((c) => favorites.items.includes(c.code));
});
</script>

<style lang="scss" scoped>
section {
	padding: 20px;
}
h1 {
	font-size: 32px;
	margin-bottom: 20px;
}
ul {
	list-style: circle;
	margin-bottom: 20px;
	list-style-position: inside;
}
li {
	font-size: 18px;
}
strong {
	color: #fff;
}
img {
	width: 200px;
	height: auto;
}
</style>

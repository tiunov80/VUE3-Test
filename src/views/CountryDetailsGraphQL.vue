<template>
	<section>
		<button
			@click="$router.back()"
			type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 12h14M5 12l4-4m-4 4 4 4"
				/>
			</svg>
			Back
		</button>
		<div v-if="loading">Loading country...</div>
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else-if="country">
			<h1>{{ country.name }}</h1>
			<p><strong>Capital:</strong> {{ country.capital }}</p>
			<p><strong>Currencies:</strong> {{ country.currency }}</p>
			<p>
				<strong>Continent:</strong>
				{{ country.continent.name }}
			</p>
		</div>

		<button
			class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			v-if="country && !favorites.isFavorite(country.code)"
			@click="favorites.add(country.code)"
		>
			Add to Favorite
		</button>

		<button
			class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
			v-else-if="country"
			@click="favorites.remove(country.code)"
		>
			Remove from Favorite
		</button>
	</section>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { useRoute } from 'vue-router';
import { useFavoritesStore } from '@/stores/favorites';
import { computed } from 'vue';
const favorites = useFavoritesStore();
const route = useRoute();
const countryCode = route.params.code;

const GET_COUNTRY = gql`
	query getCountry($code: ID!) {
		country(code: $code) {
			code
			name
			emoji
			capital
			currency
			continent {
				name
			}
		}
	}
`;

const { result, loading, error } = useQuery(GET_COUNTRY, { code: countryCode });
const country = computed(() => result.value?.country);
</script>

<style lang="scss" scoped>
section {
	padding: 20px;
}
h1 {
	font-size: 24px;
	margin-bottom: 25px;
}
button {
	margin-bottom: 30px;
	min-width: 180px;
	justify-content: center;
}
p {
	margin-bottom: 15px;
}
</style>

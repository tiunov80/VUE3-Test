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
		<div v-if="country">
			<h1>Country: {{ country.name }}</h1>
			<img :src="country.flag" alt="flag" width="100" />
			<p>
				<strong class="country-label">Capital:</strong>
				{{ country.capital }}
			</p>
			<p>
				<strong class="country-label">Region:</strong>
				{{ country.region }}
			</p>
			<p>
				<strong class="country-label">Population:</strong>
				{{ country.population }}
			</p>
			<p>
				<strong class="country-label">Borders:</strong>
				{{ country.borders }}
			</p>
			<p>
				<strong class="country-label">NativeName:</strong>
				{{ country.nativeName }}
			</p>
			<p>
				<strong class="country-label">Alpha2Code:</strong>
				{{ country.alpha2Code }}
			</p>
			<p>
				<strong class="country-label">Timezones:</strong>
				{{ country.timezones }}
			</p>
			<p>
				<strong class="country-label">Currencies:</strong>
				{{ country.currencies[0].name }}
			</p>
		</div>
		<div v-else>Loading country...</div>
	</section>
</template>

<script>
import axios from 'axios';

export default {
	props: ['code'],
	data() {
		return { country: null };
	},
	async mounted() {
		try {
			const response = await axios.get(
				'https://cors-anywhere.herokuapp.com/https://www.apicountries.com/countries',
			);
			this.country = response.data.find(
				(c) => c.alpha2Code === this.code,
			);
		} catch (e) {
			alert('Error loading country');
		}
	},
};
</script>
<style lang="scss" scoped>
section {
	padding: 20px;
}
h1 {
	font-size: 32px;
	margin-bottom: 20px;
}
p {
	font-size: 28px;
}
strong {
	color: #fff;
}
img {
	width: 200px;
	height: auto;
}
</style>

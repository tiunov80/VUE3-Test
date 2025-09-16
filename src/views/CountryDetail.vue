<template>
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

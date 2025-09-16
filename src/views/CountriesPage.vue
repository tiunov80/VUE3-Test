<template>
	<div class="test-page">
		<h1>Countries</h1>
		<div class="page-tools">
			<my-input
				v-focus
				v-model="searchQuery"
				placeholder="Search country..."
			></my-input>
			<my-select
				v-model="selectedSort"
				:options="sortOptions"
			></my-select>
		</div>

		<country-list
			:countries="displayedCountries"
			v-if="!isCountriesLoading"
		/>

		<div v-else>Loading...</div>
		<div v-intersection="loadMoreCountries" class="observer"></div>
	</div>
</template>

<script>
import axios from 'axios';

// country list
import CountryList from '@/components/CountryList.vue';

export default {
	components: {
		CountryList,
	},
	data() {
		return {
			countries: [],
			isCountriesLoading: false,
			selectedSort: '',
			searchQuery: '',
			page: 1,
			limit: 15,
			sortOptions: [
				{ value: 'name', name: 'Sort by Name' },
				{ value: 'capital', name: 'Sort by Capital' },
				{ value: 'region', name: 'Sort by Region' },
			],
		};
	},

	methods: {
		async fetchCountries() {
			try {
				this.isCountriesLoading = true;
				const response = await axios.get(
					'https://cors-anywhere.herokuapp.com/https://www.apicountries.com/countries',
				);
				this.countries = response.data;
			} catch (e) {
				alert('Error while loading countries');
			} finally {
				this.isCountriesLoading = false;
			}
		},
		loadMoreCountries() {
			// if there are still countries, increase the page to display the following elements
			if (
				this.page * this.limit <
				this.sortedAndSearchedCountries.length
			) {
				this.page += 1;
			}
		},
	},

	computed: {
		sortedCountries() {
			if (!this.selectedSort) return this.countries;
			return [...this.countries].sort((a, b) =>
				String(a[this.selectedSort] || '').localeCompare(
					String(b[this.selectedSort] || ''),
				),
			);
		},
		sortedAndSearchedCountries() {
			return this.sortedCountries.filter((c) =>
				c.name
					.toLowerCase()
					.includes(this.searchQuery.toLowerCase()),
			);
		},
		displayedCountries() {
			return this.sortedAndSearchedCountries.slice(
				0,
				this.page * this.limit,
			);
		},
	},

	mounted() {
		this.fetchCountries();
	},
};
</script>

<style scoped lang="scss">
.test-page {
	padding: 20px;
}
.page-tools {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	align-items: center;
}
.observer {
	background: transparent;
	padding: 10px;
}
</style>

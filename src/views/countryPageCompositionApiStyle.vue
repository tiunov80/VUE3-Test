<template>
	<div class="test-page">
		<h1>Countries</h1>
		<p>
			<a
				href="https://cors-anywhere.herokuapp.com/corsdemo"
				target="_blank"
				>Click here to temporarily unlock access to the demo
				Server
			</a>
		</p>
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

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import CountryList from '@/components/CountryList.vue';

// reactive vars
const countries = ref([]);
const isCountriesLoading = ref(false);
const selectedSort = ref('');
const searchQuery = ref('');
const page = ref(1);
const limit = ref(15);
const sortOptions = [
	{ value: 'name', name: 'Sort by Name' },
	{ value: 'capital', name: 'Sort by Capital' },
	{ value: 'region', name: 'Sort by Region' },
];

//if ref we use .value instead of this
//methods
async function fetchCountries() {
	try {
		isCountriesLoading.value = true;
		const response = await axios.get(
			'https://cors-anywhere.herokuapp.com/https://www.apicountries.com/countries',
		);
		countries.value = response.data;
	} catch (e) {
		alert('Error while loading countries');
	} finally {
		isCountriesLoading.value = false;
	}
}

function loadMoreCountries() {
	console.log(sortedAndSearchedCountries.value.length);
	if (page.value * limit.value < sortedAndSearchedCountries.value.length) {
		page.value += 1;
	}
}

const sortedCountries = computed(() => {
	if (!selectedSort.value) return countries.value;
	return [...countries.value].sort((a, b) =>
		String(a[selectedSort.value] || '').localeCompare(
			String(b[selectedSort.value] || ''),
		),
	);
});

const sortedAndSearchedCountries = computed(() =>
	sortedCountries.value.filter((c) =>
		c.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
	),
);

const displayedCountries = computed(() =>
	sortedAndSearchedCountries.value.slice(0, page.value * limit.value),
);

// mounted
onMounted(() => {
	fetchCountries();
});
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
p {
	margin-bottom: 20px;
}
a {
	text-decoration: underline;
}
a:hover {
	text-decoration: none;
}
</style>

<template>
	<section class="test-page">
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

		<section class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
			<div>
				<country-list
					:countries="displayedCountries"
					v-if="!isCountriesLoading"
				/>
				<div v-else>Loading...</div>
			</div>
			<div>
				<h5 class="text-xl mb-4">
					GraphQL from https://countries.trevorblades.com/
				</h5>
				<div v-if="loading">Loading...</div>
				<ul v-else>
					<li v-for="c in result.countries" :key="c.code">
						<strong class="name">{{ c.name }}</strong>
						{{ c.code }} {{ c.emoji }}
					</li>
				</ul>
			</div>
		</section>
		<div v-intersection="loadMoreCountries" class="observer"></div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import CountryList from '@/components/CountryList.vue';
//GraphQL
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Tailwind styles
import '@/index.css';

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
	// console.log(sortedAndSearchedCountries.value.length);
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

//GraphQL
const { result, loading, error } = useQuery(gql`
	query {
		countries {
			code
			name
			emoji
		}
	}
`);
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
.name {
	font-weight: bold;
}
</style>

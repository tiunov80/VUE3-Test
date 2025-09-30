<template>
  <section class="test-page">
    <section class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="test-page-col1">
        <p>
          <a class="server-link" href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank"
            >Click here to temporarily unlock access to the demo Server
          </a>
        </p>
        <div class="page-tools">
          <!-- Country search -->
          <my-input v-focus v-model="searchQuery" placeholder="Search country..."></my-input>
          <!-- Country sort -->
          <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        </div>
        <!-- Country list -->
        <country-list :countries="displayedCountries" v-if="!isCountriesLoading" />
        <div v-else>Loading...</div>
      </div>
      <div class="test-page-col2">
        <h5 class="text-xl mb-4">
          GraphQL from
          <a target="_blank" href="https://countries.trevorblades.com/">https://countries.trevorblades.com/</a>
        </h5>
        <div v-if="loading">Loading...</div>

        <!-- GraphQL -->
        <div v-else-if="error">Ошибка: {{ error.message }}</div>
        <ul v-else class="overflow b-country_list">
          <li
            v-for="c in result.countries"
            :key="c.code"
            class="b-country_list-item"
            @click="goToCountryFromGraphQL(c.code)"
          >
            <span>
              <strong class="name">{{ c.name }}</strong>
              {{ c.code }} {{ c.emoji }}
            </span>

            <button
              @click.stop.prevent="favorites.isFavorite(c.code) ? favorites.remove(c.code) : favorites.add(c.code)"
              type="button"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <svg
                v-if="favorites.isFavorite(c.code)"
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
                />
              </svg>
              <svg
                v-else
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
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>

              <span class="sr-only">Icon description</span>
            </button>
          </li>
        </ul>
        <!-- /GraphQL -->
      </div>
    </section>
    <div v-intersection="loadMoreCountries" class="observer"></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import CountryList from "@/components/CountryList.vue";
import { useFavoritesStore } from "@/stores/favorites";
const favorites = useFavoritesStore();

// reactive vars
const countries = ref([]);
const isCountriesLoading = ref(false);
const selectedSort = ref("");
const searchQuery = ref("");
const page = ref(1);
const limit = ref(15);
const sortOptions = [
  { value: "name", name: "Sort by Name" },
  { value: "capital", name: "Sort by Capital" },
  { value: "region", name: "Sort by Region" },
];

//if ref we use .value instead of this
//methods
async function fetchCountries() {
  try {
    isCountriesLoading.value = true;
    const response = await axios.get("https://cors-anywhere.herokuapp.com/https://www.apicountries.com/countries");
    countries.value = response.data;
  } catch (e) {
    alert("Error while loading countries");
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
    String(a[selectedSort.value] || "").localeCompare(String(b[selectedSort.value] || "")),
  );
});

const sortedAndSearchedCountries = computed(() =>
  sortedCountries.value.filter((c) => c.name.toLowerCase().includes(searchQuery.value.toLowerCase())),
);

const displayedCountries = computed(() => sortedAndSearchedCountries.value.slice(0, page.value * limit.value));

// mounted
onMounted(() => {
  fetchCountries();
});

//GraphQL imports
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";

//GraphQL query
const router = useRouter();
const { result, loading, error } = useQuery(gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`);

function goToCountryFromGraphQL(code) {
  router.push({ name: "CountryDetailsGraphQL", params: { code } });
}
</script>

<style scoped lang="scss">
.b-country_list {
  padding-right: 10px;

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 0 5px 10px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
      border: 1px solid #00bd7e;
      background: #00bd7e5e;
      color: #fff;
    }
  }
}
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
.overflow {
  height: 500px;
  overflow-y: auto;
}
.server-link {
  font-size: 12px;
}
</style>

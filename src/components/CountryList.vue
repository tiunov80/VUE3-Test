<template>
	<div class="country grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		<button
			type="button"
			v-for="country in countries"
			:key="country.alpha2Code || country.name"
			class="country-item flex items-center gap-3 w-full min-h-[80px] px-4 py-2 rounded-lg border border-gray-300 bg-white text-lg text-gray-800 hover:bg-gray-50 hover:shadow-md hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500 transition duration-200"
			@click="goToCountry(country)"
		>
			<img
				class="country-flag_icon w-20 h-auto flex-shrink-0 rounded-md shadow-sm"
				:src="country.flag"
				:alt="country.name + ' flag'"
				width="80"
			/>
			<h3>{{ country.name }}</h3>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		countries: { type: Array, required: true },
	},
	methods: {
		goToCountry(country) {
			// Go to country page
			this.$router.push({
				name: 'CountryDetail',
				params: { code: country.alpha2Code },
			});
		},
	},
};
</script>

<style lang="scss">
.country {
	&-item {
		display: flex;
		gap: 10px;
		align-items: center;
		min-height: 80px;
		padding: 5px 10px;
		margin-bottom: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background: transparent;
		width: 100%;
		color: #fff;
		font-size: 18px;
		&:focus {
			outline: 4px solid #00bd7e;
		}
		&:hover {
			background: #ffffff4f;
			color: #000;
			cursor: pointer;
		}
	}
	&-flag_icon {
		display: flex;
		width: 80px;
		height: auto;
	}
	&-label {
		margin-left: 5px;
	}
}
</style>

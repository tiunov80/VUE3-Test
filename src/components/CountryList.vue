<template>
	<div class="country">
		<button
			type="button"
			v-for="country in countries"
			:key="country.alpha2Code || country.name"
			class="country-item"
			@click="goToCountry(country)"
		>
			<img
				class="country-flag_icon"
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

<style lang="scss" scoped>
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

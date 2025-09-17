<template>
	<label for="search-inp">
		<input
			id="search-inp"
			:value="modelValue"
			@input="updateInput"
			class="search-input"
			name="inp"
			aria-label="Search"
	/></label>
</template>

<script>
import { onUpdated } from 'vue';

export default {
	name: 'my-input',
	props: {
		modelValue: [String, Number],
	},
	methods: {
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value);
		},
	},
};
</script>

<style lang="scss">
.search-input {
	width: 50%;
	min-width: 300px;
	display: block;
	border: 2px solid #ffffff;
	background: transparent;
	padding: 10px;
	border-radius: 6px;
	color: #ffffff;
	font-size: 16px;

	&:focus {
		outline: 4px solid #00bd7e;
	}
}
</style>

<template>
	<select :value="modelValue" name="" id="" class="select" @change="changeOption">
		<option disabled value="">Choose from the list</option>
		<option
			v-for="option in options"
			:key="option.value"
			:value="option.value"
		>
			{{ option.name }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'my-select',
	props: {
		modelValue: {
			type: String,
		},
		options: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		changeOption(event) {
			// console.log(event);
			this.$emit('update:modelValue', event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped>
.select {
	display: flex;
	height: 30px;
	padding: 2px 10px;
}
</style>

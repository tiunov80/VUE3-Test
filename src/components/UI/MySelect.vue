<template>
	<label
		><select
			:value="modelValue"
			name="select"
			id=""
			class="select"
			@change="changeOption"
			aria-label="Sort by"
		>
			<option disabled value="">Sort by...</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.name }}
			</option>
		</select></label
	>
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
	border: 2px solid #ffffff;
	background: #181818;
	padding: 10px 20px 10px 10px;
	border-radius: 6px;
	color: #ffffff;
	font-size: 16px;
	option {
		color: #ffffff;
	}
	&:focus {
		outline: 4px solid #00bd7e;
	}
}
</style>

<template>
	<input :value="modelValue" @input="updateInput" class="post-input" />
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
.post-input {
	width: 50%;
	margin-bottom: 20px;
	display: block;
	border: 2px solid #00bd7e;
	padding: 10px;
}
</style>

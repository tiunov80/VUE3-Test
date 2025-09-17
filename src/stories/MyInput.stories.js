import MyInput from '../components/UI/MyInput.vue';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/MyInput',
	component: MyInput,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const FirstStory = {
	render: (args) => ({
		components: { MyInput },
		setup() {
			return { args };
		},
		template: '<my-input v-bind="args" />',
	}),
	args: {
		//👇 The args you need here will depend on your component
	},
};
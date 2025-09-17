import MySelect from '../components/UI/MySelect.vue';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/MySelect',
	component: MySelect,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const FirstStory = {
	render: (args) => ({
		components: { MySelect },
		setup() {
			return { args };
		},
		template: '<my-select v-bind="args" />',
	}),
	args: {
		//👇 The args you need here will depend on your component
	},
};
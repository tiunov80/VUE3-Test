
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/UI'
import Vintersection from '@/directives/Vintersection'
import directives from '@/directives'
import './index.css'
import './assets/main.css'
import { apolloClient } from './apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'


const app = createApp(App);

components.forEach(component => {
	app.component(component.name, component)
});

directives.forEach(directive => {
	app.directive(directive.name, directive)
});

app
	.use(router)
	.directive('intersection', Vintersection)
	.provide(DefaultApolloClient, apolloClient)
	.mount('#app')

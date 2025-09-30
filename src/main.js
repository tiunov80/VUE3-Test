
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
import { createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

const app = createApp(App)
const pinia = createPinia()

components.forEach(component => {
	app.component(component.name, component)
});

directives.forEach(directive => {
	app.directive(directive.name, directive)
});

app
	.use(router)
	.use(pinia)
	.directive('intersection', Vintersection)
	.provide(DefaultApolloClient, apolloClient)


//Pinia subscription 
const favorites = useFavoritesStore(pinia)
favorites.$subscribe((mutation, state) => {
	localStorage.setItem('favorites', JSON.stringify(state.items))
})

app.mount('#app')
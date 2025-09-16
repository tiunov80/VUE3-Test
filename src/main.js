import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/UI'
import Vintersection from '@/directives/Vintersection'
import directives from '@/directives'

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
	.mount('#app')

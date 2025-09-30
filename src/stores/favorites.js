import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		// items: []
		items: JSON.parse(localStorage.getItem('favorites') || '[]')
	}),
	actions: {
		add(code) {
			if (!this.items.includes(code)) {
				this.items.push(code)
				// this.saveItems()
			}
		},
		remove(code) {
			this.items = this.items.filter(arrElement => arrElement !== code)
			// this.saveItems()
		},
		removeAll() {
			this.items = []
		},
		isFavorite(code) {
			return this.items.includes(code)
		},
		//saves the current state to localStorage.
		// saveItems() {
		// 	localStorage.setItem('favorites', JSON.stringify(this.items))
		// }
	}
})

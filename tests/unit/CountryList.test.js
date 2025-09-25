import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import CountryList from '../../src/components/CountryList.vue'

// create a router mockup
const mockRouter = {
	push: vi.fn()
}

describe('CountryList.vue', () => {
	const countries = [
		{ name: 'Brazil', alpha2Code: 'BR', flag: 'brazil.png' },
		{ name: 'Canada', alpha2Code: 'CA', flag: 'canada.png' }
	]

	it('рендерит список стран', () => {
		render(CountryList, {
			props: { countries },
			global: {
				mocks: { $router: mockRouter }
			}
		})

		// We check that the countries have appeared
		expect(screen.getByText('Brazil')).toBeInTheDocument()
		expect(screen.getByText('Canada')).toBeInTheDocument()
	})

	it('вызывает $router.push при клике на страну', async () => {
		render(CountryList, {
			props: { countries },
			global: {
				mocks: { $router: mockRouter }
			}
		})

		const brazilButton = screen.getByText('Brazil')
		await fireEvent.click(brazilButton)

		expect(mockRouter.push).toHaveBeenCalledWith({
			name: 'CountryDetail',
			params: { code: 'BR' }
		})
	})
})

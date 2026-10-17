import { PROJECTS, getFeaturedProjects } from './projects'
import { PRODUCTS, getFeaturedProducts } from './products'

export const DEMO_PROJECTS = getFeaturedProjects()
export const DEMO_PRODUCTS = getFeaturedProducts().slice(0, 4)

export const SAMPLE_PROJECT = DEMO_PROJECTS[0]!
export const SAMPLE_PRODUCT = PRODUCTS[0]!

export { PROJECTS, PRODUCTS }

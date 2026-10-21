import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'

import { HomePage } from '@/routes/HomePage'

// Lazy-loaded routes for performance & code-splitting
const ProjectsPage = lazy(() => import('@/routes/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const ProjectDetailPage = lazy(() => import('@/routes/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })))
const ShopPage = lazy(() => import('@/routes/ShopPage').then((m) => ({ default: m.ShopPage })))
const ProductDetailPage = lazy(() => import('@/routes/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })))
const CartPage = lazy(() => import('@/routes/CartPage').then((m) => ({ default: m.CartPage })))
const CheckoutPage = lazy(() => import('@/routes/CheckoutPage').then((m) => ({ default: m.CheckoutPage })))
const OrderConfirmationPage = lazy(() => import('@/routes/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage })))
const AboutPage = lazy(() => import('@/routes/AboutPage').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() => import('@/routes/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const JournalPage = lazy(() => import('@/routes/JournalPage').then((m) => ({ default: m.JournalPage })))
const JournalArticlePage = lazy(() => import('@/routes/JournalArticlePage').then((m) => ({ default: m.JournalArticlePage })))
const FaqPage = lazy(() => import('@/routes/FaqPage').then((m) => ({ default: m.FaqPage })))
const ContactPage = lazy(() => import('@/routes/ContactPage').then((m) => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() => import('@/routes/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const DesignSystemPage = lazy(() => import('@/routes/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:slug', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'checkout/confirmation', element: <OrderConfirmationPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'studio', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'journal/:slug', element: <JournalArticlePage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'design-system', element: <DesignSystemPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

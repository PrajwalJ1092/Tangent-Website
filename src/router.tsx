import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/routes/HomePage'
import { ProjectsPage } from '@/routes/ProjectsPage'
import { ProjectDetailPage } from '@/routes/ProjectDetailPage'
import { ShopPage } from '@/routes/ShopPage'
import { ProductDetailPage } from '@/routes/ProductDetailPage'
import { CartPage } from '@/routes/CartPage'
import { CheckoutPage } from '@/routes/CheckoutPage'
import { OrderConfirmationPage } from '@/routes/OrderConfirmationPage'
import { AboutPage } from '@/routes/AboutPage'
import { ServicesPage } from '@/routes/ServicesPage'
import { JournalPage } from '@/routes/JournalPage'
import { JournalArticlePage } from '@/routes/JournalArticlePage'
import { FaqPage } from '@/routes/FaqPage'
import { ContactPage } from '@/routes/ContactPage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { DesignSystemPage } from '@/routes/DesignSystemPage'

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

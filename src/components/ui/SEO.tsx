import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export interface SEOProps {
  title: string
  description?: string
  canonicalPath?: string
  ogType?: 'website' | 'article' | 'product'
  ogImage?: string
  jsonLd?: Record<string, unknown>
}

const DEFAULT_DESCRIPTION =
  'The Tangent Collaborative is an architectural practice and spatial systems atelier serving Bangalore, Vijayapura, and Hubballi, Karnataka, India.'
const SITE_NAME = 'The Tangent Collaborative'
const BASE_URL = 'https://thetangentcollaborative.com'

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  ogType = 'website',
  ogImage,
  jsonLd,
}: SEOProps) {
  const location = useLocation()
  const currentPath = canonicalPath || location.pathname
  const fullUrl = `${BASE_URL}${currentPath}`
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`

  useEffect(() => {
    // 1. Update Document Title
    document.title = pageTitle

    // Helper to update or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description)

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', pageTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:url', fullUrl)
    setMetaTag('property', 'og:site_name', SITE_NAME)
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage)
    }

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', pageTitle)
    setMetaTag('name', 'twitter:description', description)
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage)
    }

    // 5. Canonical Link
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', fullUrl)

    // 6. JSON-LD Structured Data
    let scriptTag = document.querySelector<HTMLScriptElement>('#tangent-seo-jsonld')
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'tangent-seo-jsonld'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(jsonLd)
    } else if (scriptTag) {
      scriptTag.remove()
    }

    return () => {
      // Optional cleanup if needed
    }
  }, [pageTitle, description, ogType, fullUrl, ogImage, jsonLd])

  return null
}

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  siteName?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  articleSection?: string
  tags?: string[]
}

export default function SEO({
  title = "BharatNodes - Next-Gen VPS Hosting in India",
  description = "High-performance VPS hosting with 99.99% uptime guarantee. NVMe SSD, DDR4 RAM, and 24/7 expert support. Perfect for developers and businesses.",
  keywords = "VPS hosting, India VPS, cloud hosting, dedicated server, NVMe SSD, virtual private server",
  image = "/og-image.jpg",
  url = "https://bharatnodes.com",
  type = "website",
  siteName = "BharatNodes",
  author = "BharatNodes Team",
  publishedTime = "",
  modifiedTime = "",
  articleSection = "",
  tags = []
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://bharatnodes.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bharatnodes.com/logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98765-43210",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    },
    ...(type === "article" && publishedTime && {
      "author": {
        "@type": "Person",
        "name": author
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "articleSection": articleSection || "Technology",
      "keywords": tags.join(", ")
    })
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": "https://bharatnodes.com",
    "logo": "https://bharatnodes.com/logo.png",
    "description": "Leading VPS hosting provider in India offering high-performance virtual private servers with 99.99% uptime guarantee.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "hoursAvailable": "Mo-Fr 09:00-18:00"
    },
    "sameAs": [
      "https://twitter.com/bharatnodes",
      "https://facebook.com/bharatnodes",
      "https://linkedin.com/company/bharatnodes"
    ]
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "VPS Hosting",
    "description": "High-performance virtual private server hosting with NVMe SSD storage and 24/7 support",
    "provider": {
      "@type": "Organization",
      "name": siteName
    },
    "serviceType": "Web Hosting",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "499",
      "highPrice": "1999",
      "offerCount": "3"
    }
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@bharatnodes" />
      <meta name="twitter:creator" content="@bharatnodes" />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content={siteName} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}

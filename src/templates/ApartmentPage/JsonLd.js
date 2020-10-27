import { useStaticQuery, graphql } from 'gatsby'
import dayjs from 'dayjs'

const Place = props => {
  const {
    line1: streetAddress,
    city: addressLocality,
    state: addressRegion,
    postalCode,
  } = props.address

  return {
    '@id': props.url,
    name: props.name,
    description: props.seo ? props.seo.description : '',
    url: props.url,
    telephone: '+1' + props.telephone.replace(/\D/g, ''),
    address: {
      '@context': 'http://schema.org',
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: 'US',
    },
    geo: {
      '@context': 'http://schema.org',
      '@type': 'GeoCoordinates',
      ...props.coordinates,
    },
    image: [props.defaultPhoto.src],
    openingHoursSpecification: props.officeHours.map(o => ({
      '@context': 'http://schema.org',
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [o.Day],
      opens: dayjs(o.OpenTime, 'h:mm A').format('HH:mm'),
      closes: dayjs(o.CloseTime, 'h:mm A').format('HH:mm'),
    })),
    sameAs: props.social.map(s => s.url),
    hasMap: `https://www.google.com/maps?q=place_id:${ props.googlePlaceId }`,
  }
}

export default props => {
  const { site } = useStaticQuery(graphql`
    query JsonLd {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)

  const siteUrl = site.siteMetadata.siteUrl.replace(/\/$/, '')
  const url = `${ siteUrl }/${ props.marketingWebsiteUrl.replace(/^\//, '') }`

  const place = Place({
    url,
    ...props,
  })

  const breadcrumbs = [
    {
      '@id': siteUrl,
      name: 'Home',
    },
    {
      '@id': `${ siteUrl }/${ props.primaryMarket.marketPage.slug.replace(/^\//, '') }`,
      name: props.primaryMarket.market,
    },
    {
      '@id': url,
      name: props.name,
    },
  ]

  const lowPrice = Math.min(...props.priceSummary.filter(p => p.min && p.min.effectiveRent).map(p => p.min.effectiveRent.min))
  const highPrice = Math.max(...props.priceSummary.filter(p => p.max && p.max.effectiveRent).map(p => p.max.effectiveRent.min))

  return {
    '@context': 'http://schema.org',
    '@type': 'ItemPage',
    breadcrumb: {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, i) => ({
        '@context': 'http://schema.org',
        '@type': 'ListItem',
        position: i,
        item,
      })),
    },
    about: {
      '@context': 'http://schema.org',
      '@type': 'Product',
      name: props.name,
      description: props.seo ? props.seo.description : '',
      brand: {
        '@context': 'http://schema.org',
        '@type': 'Brand',
        name: site.siteMetadata.title,
      },
      offers: {
        '@context': 'http://schema.org',
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice,
        highPrice,
      },
      image: [props.defaultPhoto.src],
    },
    mainEntity: {
      '@context': 'http://schema.org',
      '@type': 'ApartmentComplex',
      ...place,
      containedInPlace: {
        '@context': 'http://schema.org',
        '@type': 'LocalBusiness',
        '@id': place['@id'],
        priceRange: '$' + [lowPrice, highPrice].join('-'),
      },
    },
  }
}

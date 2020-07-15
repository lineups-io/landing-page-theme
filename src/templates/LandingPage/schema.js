export const getSchemaOrgJSONLD = (breadcrumb, apartments) => {
  if (!breadcrumb || !apartments) {
    return {}
  }

  const breadcrumbList = []

  const keys = ['market', 'submarket']
  keys.forEach((key, i) => {
    const item = breadcrumb[key]
    if (item) {
      breadcrumbList.push({
        '@type': 'ListItem',
        'position': i + 1,
        'item': {
          'name': item.title,
          '@id': '/' + item.marketPage.slug + '/',
          '@type': 'SearchResultsPage',
        },
      })
    }
  })

  return {
    '@type': 'SearchResultsPage',
    'breadcrumb': [{
      'itemListElement': breadcrumbList,
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
    }],
    'about': apartments.map(apartment => ({
      'url': apartment.marketingWebsiteUrl,
      // 'image': '',
      'Address': {
        '@type': 'PostalAddress',
        'streetAddress': apartment.address.line1,
        'addressLocality': apartment.address.city,
        'addressRegion': apartment.address.state,
        'postalCode': apartment.address.postalCode,
        'addressCountry': 'US',
      },
      // 'telephone': '+1-844-428-7186',
      '@type': 'ApartmentComplex',
      'name': apartment.name,
      '@id': apartment.marketingWebsiteUrl,
    })),
    '@context': 'http://schema.org',
  }
}

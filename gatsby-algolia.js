const fragments = `
  fragment ApartmentFields on Lineups_Apartment {
    id: publicId
    name
    adLabel
    spotlight
    type
    primaryMarket {
      state {
        name
      }
      market
      submarket
    }
    address {
      line1
      city
      state
      postalCode
    }
    coordinates {
      lat
      lng
    }
    marketingWebsiteUrl
    floorPlanUrl
    prospectPhoneNumber
    termGroups {
      name
      icon
    }
    amenityIcons
    defaultPhoto {
      url
      alt
    }
    carousel: landingPageCarousel {
      url
      alt
    }
    tour {
      url
      alt
    }
    markets {
      state {
        name
      }
      market
      submarket
      marketingCoop
    }
    floorPlans {
      id
      name
      marketRent {
        min
      }
      bedrooms
      bathrooms
      availability {
        unitId: UnitID
        unitRent: UnitRent
        unitDisplayRank: UnitDisplayRank
        unitDisplayStatus: UnitDisplayStatus
        dateAvailable: DateAvailable
        unitAmenityList: UnitAmenityList
        floorplan: FloorplanName
        bedrooms: UnitBedrooms
        marketRent: MarketRent
      }
    }
    externalData {
      propertyAverageRating {
        AllTime
      }
      floorplans {
        id
        floorplan: name
        bedrooms
        units {
          unitId: id
          dateAvailable
          effectiveRent {
            min
          }
        }
      }
    }
    priceSummary {
      bedrooms
      min {
        id
        squareFeet
        floor
        bathrooms
        floorplan
        effectiveRent {
          min
        }
        dateAvailable
        unitAvailabilityUrl
      }
      median {
        id
        squareFeet
        floor
        bathrooms
        floorplan
        effectiveRent {
          min
        }
        dateAvailable
        unitAvailabilityUrl
      }
      max {
        id
        squareFeet
        floor
        bathrooms
        floorplan
        effectiveRent {
          min
        }
        dateAvailable
        unitAvailabilityUrl
      }
    }
  }
`

const transformer = ({ data }) => {
  const { items } = data.lineups.apartments
  return items.reduce((acc, item) => {
    const {
      externalData,
      floorPlans = [],
      markets = [],
      termGroups = [],
      __typename: a,
      ...apartment
    } = item

    apartment.createdAt = new Date()
    apartment.floorPlans = []
    apartment.termGroups = termGroups
    apartment._tags = termGroups.map(t => t.name)
    apartment._geoloc = apartment.coordinates

    apartment.state = []
    apartment.market = []
    apartment.submarket = []
    apartment.allMarkets = []
    apartment.externalData = {
      propertyAverageRating: externalData && externalData.propertyAverageRating,
    }

    markets.forEach(m => {
      const st = m.state.name
      const mkt = st + ' > ' + m.market
      const sub = m.submarket && mkt + ' > ' + m.submarket

      if (apartment.state.indexOf(st) === -1) {
        apartment.state.push(st)
      }

      if (apartment.market.indexOf(mkt) === -1) {
        apartment.market.push(mkt)
        if (!m.marketingCoop)
          apartment.allMarkets.push('- ' + mkt.split(' > ').reverse().join(', '))
      }

      if (sub && apartment.submarket.indexOf(sub) === -1) {
        apartment.submarket.push(sub)
        if (!m.marketingCoop)
          apartment.allMarkets.push(sub.split(' > ').reverse().join(', '))
      }
    })

    const docs = []

    const floorplans = externalData ? externalData.floorplans.map(({ units, ...fp }) => {
      const availability = units.filter(unit => unit.effectiveRent && unit.effectiveRent.min && unit.dateAvailable)
        .map(({ effectiveRent, ...unit }) => ({
          ...fp,
          ...unit,
          unitRent: effectiveRent.min,
        }))

      return {
        ...fp,
        availability,
      }
    }) : floorPlans

    floorplans.forEach(({ __typename: b, availability = [], ...floorplan }) => {
      const [first] = availability.sort((a, b) => a.unitRent - b.unitRent)
      apartment.floorPlans.push({
        ...floorplan,
        availability: first ? [first] : [],
      })

      availability.forEach(({ __typename: c, ...unit }) => {
        docs.push({
          ...apartment,
          groupBy: apartment.id,
          id: [apartment.id, floorplan.id, unit.unitId].join('_'),
          rent: unit.unitRent,
          floorplan: {
            ...floorplan,
            marketRent: floorplan.marketRent && floorplan.marketRent.min,
          },
          unit: {
            ...unit,
            unitAmenityList: unit.unitAmenityList ? unit.unitAmenityList.split(/, ?/) : [],
            dateAvailableTimestamp: Date.parse(unit.dateAvailable),
          },
        })
      })

      if (docs.length === 0) {
        docs.push({
          ...apartment,
          groupBy: apartment.id,
          id: [apartment.id, floorplan.id].join('_'),
          floorplan: {
            ...floorplan,
            marketRent: floorplan.marketRent && floorplan.marketRent.min,
          },
        })
      }
    })

    if (docs.length === 0) {
      docs.push({
        ...apartment,
        groupBy: apartment.id,
      })
    }

    return [...acc, ...docs]
  }, [])
}

const queries = [
  {
    query: `
      ${ fragments }

      query getAlgoliaIndexData {
        lineups {
          apartments: findApartments(filter: { account: "${ process.env.ACCOUNT }" status: published enabledFeatures: search }) {
            count
            items {
              ...ApartmentFields
            }
          }
        }
      }
    `,
    transformer,
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings: {
      attributesForFaceting: [
        'state',
        'market',
        'submarket',
        'floorplan.bedrooms',
        'unit.dateAvailableTimestamp',
        'rent',
        'searchable(allMarkets)',
        'type',
        'amenityIcons',
      ],
      searchableAttributes: [
        'name',
        'allMarkets',
      ],
      distinct: 1,
      attributeForDistinct: 'groupBy',
      ranking: [
        'desc(spotlight)',
        'asc(name)',
        'typo',
        'geo',
        'words',
        'filters',
        'proximity',
        'attribute',
        'exact',
        'custom',
      ],
    },
  },
]

module.exports = queries

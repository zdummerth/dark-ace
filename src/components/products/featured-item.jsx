import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import { colors } from '../../utils/styles';

const Container = styled.div`
    text-align: center;
    border-bottom: 5px solid ${colors.brand};
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`
const ImgLink = styled(Link)`

  .gatsby-image-wrapper {
    transition: all 250ms;
  }

  &:hover {
      .gatsby-image-wrapper {
        // transform: scale(1.1);
      }
  }
`

const FeaturedItem = ({ product }) => {
    const price = Intl.NumberFormat(undefined, {
        currency: product.priceRange.minVariantPrice.currencyCode,
        minimumFractionDigits: 2,
        style: 'currency',
      }).format(product.priceRange.minVariantPrice.amount)
    return (
        <Container>
            <ImgLink
                to={`/shop/${product.handle}`}
            >
                <Img 
                    fluid={product.images[0].localFile.childImageSharp.fluid} 
                    alt={product.title}
                />
            </ImgLink>
            <Link to={`/shop/${product.handle}`}>
                <h3>{product.title}{" - "}{price}</h3>
            </Link>
        </Container>
    )
}

export default FeaturedItem
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Image from 'gatsby-image';


import {
  breakpoints,
  colors,
  radius,
  spacing,
} from '../utils/styles';

const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  background: ${colors.lightest};
  border-radius: ${radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  text-decoration: none;
  transition: all ${TRANSITION_DURATION};

  @media (min-width: ${breakpoints.tablet}px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: 300px;
    justify-content: center;
    margin: ${spacing.md * 1.25}px;
  }

  @media (hover: hover) {
    :hover {
      background: ${colors.brandLighter};
    }
  }
`;

const Item = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${spacing.lg}px;
`;

const Preview = styled.div`
  border-bottom: 1px solid ${colors.brandLight};
  border-radius: ${radius.large}px ${radius.large}px 0 0;
  margin: -${spacing.lg}px;
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  position: relative;

  .gatsby-image-wrapper {
    transition: all ${TRANSITION_DURATION};
  }

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`;




const ProductListingItem = ({node}) => {

  const [index, setIndex] = useState(0);

  const price = Intl.NumberFormat(undefined, {
    currency: node.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(node.priceRange.minVariantPrice.amount)

  const images = node.images.map((variant, ind) => (
    <Image 
      fluid={variant.localFile.childImageSharp.fluid} 
      alt={'slideshow for feature images'}
      fadeIn={false}
      style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '100%',
        left: '0',
        opacity: `${index === ind ? '1' : '0'}`,
        transition: 'opacity .19s ease-in', 
      }}
      imgStyle={{ 
        objectFit: 'contain', 
      }}
    />
  ))

  const thumbs = node.thumbs.map((variant, ind) => (
    <button
      className='thumbnail' 
      onClick={() => setIndex(ind)}
    >
      <Image 
        // fixed={variant.localFile.childImageSharp.fixed} 
        // alt={'slideshow for feature images'}
        // fadeIn={false}
        // onClick={() => setIndex(ind)}
        // style={{
        //   position: 'absolute',
        //   top: '0',
        //   width: '100%',
        //   height: '100%',
        //   left: '0',
        // }}
        // imgStyle={{ 
        //   objectFit: 'contain', 
        // }}
      />
    </button>
  ))

    return (
        <ProductListingItemLink to={`/shop/${node.handle}`} aria-label={node.title}>
            <Item>
                <Preview>
                    {images[0]}
                </Preview>
                <div className='thumb-container'>{thumbs}</div>
                <h3>
                    <Link to={`/shop/${node.handle}`}>
                        {node.title}{" - "}{price}
                    </Link>
                </h3>
            </Item>
        </ProductListingItemLink>
    );
};

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListingItem;

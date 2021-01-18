import React from 'react'
import { useCheckout } from '../../hooks/useCheckout'

import { Link } from 'gatsby'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Quantity from './quantity'

import { colors, BrandButton } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';

const StyledQuantity = styled(Quantity)`
  justify-content: flex-start;
`


const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;

  & .out-of-stock {
    font-size: 1.5rem;
  }

  & .price {
    font-size: 1.75rem;
    font-weight: bold;
    margin-top: 0;
  }

  & > * {
      margin-bottom: 1.3rem;
  }
`


const StyledLink = styled(Link)`
    text-align: center;
    background: ${colors.darkGradient};
    box-shadow: 0 0 5px ${colors.brand};
    border-radius: 5px;
    padding: 10px 0;
`
const OptionContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // align-items: center;

`

const Values = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & > * {
        margin: .5rem;
    }
`
const Span = styled.span`
  border: ${props => (props.selected ? `none` : '1px solid rgba(232, 232, 232, .3)')};
  background: ${props => (props.selected ? `${colors.gradient}` : 'black')};
  box-shadow: ${props => (props.selected ? ` 0 0 5px ${colors.brand}` : '')};

  padding: 10px;
  border-radius: 5px;
  :hover {
      cursor: pointer;
    }
    
`

const SoldOut = styled.div`
  font-size: 1.5rem;
`

// const CompareAtPriceWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `
// const CompareAtPrice = styled.div`
//   position: relative;
//   font-size: 1.75rem;
//   margin-right: 20px;

//   .line-through {
//     position: absolute;
//     border-top: 2px solid ${colors.brand};
//     width: 100%;
//     transform: rotate(-10deg);
//     top: 50%;
//   }
// `

// const NewPrice = styled.div`
//   -webkit-text-stroke: 1px ${colors.brand};
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: ${colors.lightest};
//   text-shadow:
//   -1px -1px 0 ${colors.brand},  
//   1px -1px 0 ${colors.brand},
//   -1px 1px 0 ${colors.brand},
//     1px 1px 6px ${colors.lightest};
// `

const ProductForm = ({ product, setImageFluid }) => {
  const {
    options,
    variants,
  } = product

  const {
    variant,
    quantity,
    available,
    status,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    setVariant
  } = useCheckout(product)


  const handleOptionClick = (name, value) => {
    const currentOptions = [...variant.selectedOptions]
    
    const index = currentOptions.findIndex(opt => opt.name === name)
    
    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setImageFluid(selectedVariant.image.localFile.childImageSharp.fluid);
    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = e => {
    e.preventDefault();
    addToCart();
  }



  const checkSelected = (name, value) => {
    const currentOptions = [...variant.selectedOptions]
    const index = variant.selectedOptions.findIndex(opt => opt.name === name)
    
    if(currentOptions[index].value === value) {
        return true
    }
    return false
  }

  const price = formatPrice(variant.priceV2)

   
  const optionDisplay = ({name, values}) => (
    <Values>
      <p>Select {name}:</p>
        {values.map((value, index) => {
          return (
            <Span
                value={value}
                key={`${name}-${value}`}
                selected={checkSelected(name, value)}
                onClick={() => handleOptionClick(name, value, index)}
            >
                {value.toUpperCase()}
            </Span>
          )})}
    </Values>
  )


  return (
    <Form onSubmit={handleAddToCart}>
      {/* {Product with no variants produces option with name === 'Title', So check for that to prevent unwanted select menu} */}
      {options.map(({ id, name, values }) => name !== 'Title' && (
        <OptionContainer key={id}>
            {optionDisplay({name, values})}
        </OptionContainer>
      ))}

      {available ? 
        (
        <>
          <StyledQuantity
            quantity={quantity}
            increase={increaseQuantity}
            decrease={decreaseQuantity}
          />
        </>
        )
        :
        <SoldOut>
          {`Out of Stock! Please select another `}
          {variant.selectedOptions.length === 1 ? 
            variant.selectedOptions[0].name 
            : 
            `${variant.selectedOptions[0].name} or ${variant.selectedOptions[1].name}`}
          .
        </SoldOut>
      }

      <div className="price">{price}</div>

      { available && (
        <BrandButton 
          type="submit"
          disabled={status === 'Adding'}
          >
          Add To Cart
        </BrandButton>
      )}

      <StyledLink to='/'>Continue Shopping</StyledLink>
    </Form>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm


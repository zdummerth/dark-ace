import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Link } from 'gatsby'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledButton } from '../shared/buttons'


import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';



import { StoreContext } from '../../context/StoreContextProvider'

import { colors } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';


const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;

    & button {
        border: none;
        background: none;
        color: white;
    }

    & > * {
        font-size: 24px;
        font-weight: bold;
        padding-right: 8px;
    }
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
const Span = styled.span`
  border: ${props => (props.selected ? `none` : '1px solid rgba(232, 232, 232, .3)')};
  background: ${props => (props.selected ? `${colors.gradient}` : 'black')};
  box-shadow: ${props => (props.selected ? ` 0 0 5px ${colors.lightest}` : '')};

  padding: .65rem;
  border-radius: 5px;
  // font-weight: bold;
  :hover {
      cursor: pointer;
    }
    
`

const StyledLink = styled(Link)`
    text-align: center;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 0;
`
const OptionContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  align-items: center;

`

const Values = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & > * {
        margin: .5rem;
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
    // variants: [initialVariant],
  } = product

  // finds first available variant
  // Still need to set sold out when all variants are sold out...the false condition
  const initialVariant = product.availableForSale ? variants.find(variant => variant.availableForSale) : variants[0];

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)

  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)


  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)


  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        console.log('result', result[0])
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
      .catch(err => {
        console.log({err});
      })
    },
    [client.product, productVariant.shopifyId]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])




  const handleQuantityIncrease = e => {
    e.preventDefault();
    setQuantity(quantity + 1)
  }

  const handleQuantityDecrease = e => {
    e.preventDefault();
    if(quantity > 1) {
        setQuantity(quantity - 1)
    }
  }

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
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    // console.log({match, name, value})
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
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

  const priceDisplay = <div className="price">{price}</div>
   

  const baseOption = options.length > 0 ? options[0] : {}
  console.log({baseOption})

  const optionDisplay = ({name, values}) => (
    <Values>
      <p>Select {name}:</p>
        {values.map((value, index) => {
          return (
            <Span
                value={value}
                key={`${name}-${value}`}
                disabled={checkDisabled(name, value)}
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
          <QuantityContainer>
              <p>Quantity</p>
              <button onClick={handleQuantityDecrease}>
                  <AiOutlineMinusCircle /> 
              </button>
              <p>{quantity}</p> 
              <button onClick={handleQuantityIncrease}>
                  <AiOutlinePlusCircle />
              </button>
          </QuantityContainer>
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

      {priceDisplay}

      { available && (
        <StyledButton 
          type="submit"
          disabled={!available || adding}
          >
          Add To Cart
        </StyledButton>
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


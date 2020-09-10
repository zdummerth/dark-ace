import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Link } from 'gatsby'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GlobalStateContext } from '../context/GlobalContextProvider'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    & > * {
        margin-bottom: 1.3rem;
    }
`
const Span = styled.span`
    border: ${props => (props.selected ? '2px solid #C00A0A' : '1px solid rgba(232, 232, 232, .3)')};
    padding: .5rem;
    border-radius: 5px;
    :hover {
        cursor: pointer;
      }
    
`
const StyledButton = styled.button`
    background: #C00A0A;
    border: none;
    border-radius: 5px;
    padding: 10px 0;
    color: white;

    :hover {
      cursor: pointer;
      background: red;
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
    align-items: center;

    p {
      margin-top: 0;
    }
`

const Values = styled.div`
    display: flex;
    flex-wrap: wrap;

    & > * {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 800px) {
      overflow-x: auto;
      flex-wrap: nowrap;

      & > * {
        margin-bottom: 0;
      }
    }
`

const QuantityInput = styled.input`
    width: 40px;
`

const ProductForm = ({ product, setImageFluid }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)

  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(GlobalStateContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  // const handleOptionChange = (optionIndex, { target }) => {
  //   const { value } = target
  //   const currentOptions = [...variant.selectedOptions]

  //   currentOptions[optionIndex] = {
  //     ...currentOptions[optionIndex],
  //     value,
  //   }

  //   const selectedVariant = find(variants, ({ selectedOptions }) =>
  //     isEqual(currentOptions, selectedOptions)
  //   )

  //   setImageFluid(selectedVariant.image.localFile.childImageSharp.fluid)
  //   setVariant({ ...selectedVariant })
  // }

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

    setImageFluid(selectedVariant.image.localFile.childImageSharp.fluid)
    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
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

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)


  return (
    <Container>
      {/* {Product with no variants produces option with name === 'Title', So check for that to prevent unwanted select menu} */}
      {options.map(({ id, name, values }, index) => name !== 'Title' ? (
        <React.Fragment key={id}>
          <OptionContainer>
              <p>{name}:</p>
              <Values>
                {values.map((value, index) => !checkDisabled(name, value) ? (
                    <Span
                        value={value}
                        key={`${name}-${value}`}
                        // disabled={checkDisabled(name, value)}
                        selected={checkSelected(name, value)}
                        onClick={() => handleOptionClick(name, value, index)}
                    >
                        {value}
                    </Span>
                    )
                    :
                    null
                    )}
              </Values>
          </OptionContainer>
        </React.Fragment>
      ) : null)}
      <label htmlFor="quantity">Quantity :</label>
      <QuantityInput
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        step="1"
        onChange={handleQuantityChange}
        value={quantity}
      />
      <h3>{product.title}</h3>
      <h3>{price}</h3>
      {available ? 
        <StyledButton 
            type="submit"
            disabled={!available || adding}
            onClick={handleAddToCart}
            >
            {adding ? 'Adding...': 'Add to Cart'}
        </StyledButton>
        :
        <p>This Product is out of Stock! Please select another variant.</p>
      }
        <StyledLink to='/products'>Continue Shopping</StyledLink>
    </Container>
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


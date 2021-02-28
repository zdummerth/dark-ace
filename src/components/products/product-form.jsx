import React from 'react'
import Img from 'gatsby-image'

import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Quantity from './quantity'

import { colors, BrandButton } from '../../utils/styles'

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

  & > * {
      margin-bottom: 1.3rem;
  }
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
        margin-right: 5px;
        margin-top: 5px;
    }
`
const Span = styled.span`
  border: ${props => (props.selected ? `none` : '1px solid rgba(232, 232, 232, .3)')};
  background: ${props => (props.selected ? `${colors.gradient}` : 'black')};
  box-shadow: ${props => (props.selected ? ` 0 0 3px ${colors.lightest}` : '')};

  display: flex; 
  justify-content: center;
  align-items: center;

  // padding: 10px;

  height: 50px;
  width: 50px;
  border-radius: 5px;
  :hover {
      cursor: pointer;
    }
    
`
const SoldOut = styled.div`
  font-size: 1.2rem;
`

const Thumbs = styled.div`
  display: flex; 
  // justify-content: center;
`
const ThumbButton = styled.button`
  margin-right: 8px;
  width: 48px;
  height: 60px;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  background: none;
  :focus {outline:none;}
  ::-moz-focus-inner {border:0;}

`

const ThumbContainer = styled.div`
  border: ${({ selected }) => selected ? `4px solid ${colors.brand}` : `4px solid ${colors.gray}`};
  box-shadow: ${({ selected }) => selected ? `0 0 3px ${colors.lightest}` : `none`};
  margin-right: 10px;
  display: flex; 
  align-items: center;
  justify-content: center;

  position: relative;
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background: rgba(0,0,0, .35);
`

const CurrentOption = styled.div`
  margin-bottom: 5px;
`

const ProductForm = ({
  product,
  setImageFluid,
  setVariant,
  variant,
  quantity,
  available,
  status,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  imgWithOption,
}) => {

  const {
    options,
    variants,
  } = product


  const handleOptionClick = (name, value, isImage) => {
    const currentOptions = [...variant.selectedOptions]

    const index = currentOptions.findIndex(opt => opt.name === name)

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant(selectedVariant)

    if (isImage) {
      setImageFluid(selectedVariant.image.localFile.childImageSharp.fluid)
    }
  }

  const handleAddToCart = e => {
    e.preventDefault();
    addToCart(variant.shopifyId)
  }


  const checkSelected = (name, value) => {
    const currentOptions = [...variant.selectedOptions]
    // console.log('Curr Opt', currentOptions)

    const index = variant.selectedOptions.findIndex(opt => opt.name === name)
    // console.log('Selected', currentOptions[index].value === value)

    if (currentOptions[index].value === value) {
      return true
    }
    return false
  }

  const checkImageSelected = (imageId) => {
    if (imageId === variant.image.id) {
      return true
    }
    return false
  }


  const getCurrentValue = optionName => {
    return variant.selectedOptions.find(opt => opt.name === optionName)?.value
  }

  const currentColor = getCurrentValue('Color')

  const optionDisplay = ({ name, values }) => {
    const currentValue = getCurrentValue(name)
    return (
      <>
        <CurrentOption  style={{marginBottom: '0'}}>{`${name}: ${currentValue.toUpperCase()}`}</CurrentOption>
        <Values>
          {values.map((value) => {
            return (
              <Span
                value={value}
                key={`${name}-${value}`}
                selected={checkSelected(name, value)}
                onClick={() => handleOptionClick(name, value)}
              >
                {value.toUpperCase()}
              </Span>
            )
          })}
        </Values>
      </>
    )
  }


  return (
    <>

      <Form onSubmit={handleAddToCart}>
        {currentColor && <CurrentOption>{`Color: ${currentColor.toUpperCase()}`}</CurrentOption>}

        <Thumbs>
          {imgWithOption.map(({ imageId, thumb, name, value }) => {
            // const currentValue = getCurrentValue(name)
            const selected = checkImageSelected(imageId)
            return (
                <ThumbContainer
                  selected={selected}
                  key={imageId}
                >
                  <ThumbButton
                    type='button'
                    onClick={() => handleOptionClick(name, value, true)}
                  >
                    <Img
                      fixed={thumb}
                    />
                    {selected || <Overlay />}
                  </ThumbButton>
                </ThumbContainer>
            )
          })}
        </Thumbs>


        {/* {Product with no variants produces option with name === 'Title', So check for that to prevent unwanted select menu} */}
        {options.map(({ id, name, values }) => name !== 'Title' && name !== 'Color' && (
          <OptionContainer key={id}>
            {optionDisplay({ name, values })}
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
              <BrandButton
                type="submit"
                disabled={status === 'Adding'}
                style={{
                  alignSelf: 'flex-start',
                  marginBottom: '0',
                }}
              >
                {`ADD TO CART`}
          </BrandButton>
            </>
          )
          :
          <SoldOut>
            {`Out of Stock! Please select another `}
            {variant.selectedOptions.length === 1 ?
              variant.selectedOptions[0].name
              :
              `${variant.selectedOptions[0].name} or ${variant.selectedOptions[1].name}.`}
          </SoldOut>
        }

      </Form>
    </>
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


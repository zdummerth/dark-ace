import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { DarkBrandButton, colors } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';




import { StoreContext } from '../../context/StoreContextProvider'

const Container = styled.div`
    display: flex;
    border: 1px solid ${colors.gray};
    background: ${colors.grayGradient};
    // box-shadow: 0 0 10px ${colors.brand};
    margin: 15px 0;
    width: 100%;
    max-width: 600px;


    height: 175px;
    overflow: hidden;


    img {
      object-fit: contain;
      width: 45vw;
      max-width: 300px;
      height: 175px;
      padding: 5px 0;
      overflow: hidden;
    }

    #product-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: .5rem;
      width: 100%;
    }
`

const LineItem = props => {
  const { item } = props

  console.log('variant', item.variant.selectedOptions)
  const {
    removeLineItem,
    // updateLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
    />
  ) : null

  console.log({ item })

  const price = formatPrice(item.variant.priceV2)

  const options = item.variant.selectedOptions

  // const selectedValues = item.variant.selectedOptions
  //   ? item.variant.selectedOptions.map(option => `${option.value} / `)
  //   : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  return (
    <Container>
      <Link to={`/shop/${item.variant.product.handle}/`}>
        {variantImage}
      </Link>
      <div id='product-info'>
        <div>
          {item.title}
        </div>
        {options.map(opt => {
          if (opt.name === 'Title' || opt.name === 'Denominations') {
            return null
          }
          return (
            <div key={`${opt.name}:${opt.value}`}>
              {`${opt.name}: ${opt.value.toUpperCase()}`}
            </div>
          )
        })}
        <span>
          {`Price: ${price}`}
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          Qty:
          {item.quantity}
          <DarkBrandButton
            onClick={handleRemove}
            style={{
              width: '80px'
            }}
          >
            Delete
        </DarkBrandButton>
        </span>
      </div>
    </Container>
  )
}

export default LineItem
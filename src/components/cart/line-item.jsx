import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { DarkBrandButton, colors } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';




import { StoreContext } from '../../context/StoreContextProvider'

const Container = styled.div`
    display: flex;
    box-shadow: 0 0 10px ${colors.brand};
    margin: 15px 0;
    width: 100%;
    max-width: 600px;


    height: 150px;
    overflow: hidden;


    img {
      object-fit: contain;
      width: 45vw;
      max-width: 300px;
      height: 150px;
      padding: 5px 0;
      overflow: hidden;
    }

    #product-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: .5rem;
    }
`

const LineItem = props => {
  const { item } = props
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

  console.log({item})

  const price = formatPrice(item.variant.priceV2)

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
            {`  `}
            {item.variant.title !== 'Default Title' ? item.variant.title : ''}
        </div>
        <div>
          {price}
        </div>
        <div>
          Qty:
          {item.quantity}
        </div>
        <DarkBrandButton 
          onClick={handleRemove}
        >
          Remove
        </DarkBrandButton>
      </div>
    </Container>
  )
}

export default LineItem
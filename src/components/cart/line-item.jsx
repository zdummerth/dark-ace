import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { DarkBrandButton } from '../../utils/styles';
import Quantity from '../products/quantity'




import { StoreContext } from '../../context/StoreContextProvider'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    padding: .5rem 0;
    border-bottom: 1px solid #C00A0A;
    height: 150px;

    #product-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      height: 100%;

      p {
        padding-top: 0;
      }
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
      height="150px"
    />
  ) : null

  // const selectedValues = item.variant.selectedOptions
  //   ? item.variant.selectedOptions.map(option => `${option.value} / `)
  //   : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  return (
    <Container>
      {console.log(item)}
      <Link style={{marginRight: '1rem'}} to={`/shop/${item.variant.product.handle}/`}>
        {variantImage}
      </Link>
      <div id='product-info'>
        <div>
            {item.title}
            {`  `}
            {item.variant.title !== 'Default Title' ? item.variant.title : ''}
        </div>
        <div>
          {item.variant.price}
        </div>
        <Quantity 
          quantity={item.quantity}
        />
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
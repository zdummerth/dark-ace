import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { StoreContext } from '../context/StoreContextProvider'

const Container = styled.div`
    display: flex;
    // justify-content: space-between;
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
    updateLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  console.log("image", item.variant)

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
      <Link style={{marginRight: '1rem'}} to={`/product/${item.variant.product.handle}/`}>
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
        {/* {selectedValues} */}
        <div>
          Quantity: {item.quantity}
        </div>
        <button 
            // style={{width: '50px'}}     
            onClick={handleRemove}>
                Delete
        </button>
      </div>
    </Container>
  )
}

export default LineItem
import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { GlobalStateContext } from '../context/GlobalContextProvider'

const Container = styled.div`
    display: flex;
    // justify-content: space-between;
    align-items: center;

`

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(GlobalStateContext)

  console.log("image", item.variant)

  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      height="150px"
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value}, `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  return (
    <Container>
      {console.log(item)}
      <Link style={{marginRight: '2rem'}} to={`/product/${item.variant.product.handle}/`}>
        {variantImage}
      </Link>
      <div>
        <p>
            {item.title}
            {`  `}
            {item.variant.title === !'Default Title' ? item.variant.title : ''}
        </p>
        {selectedOptions}
        {item.quantity}
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
import React from 'react'
import {
    Container,
    ProductContainer,
    ProductImageContainer,
    ProductInfoContainer,
    CheckoutLink
} from './styles'
import { X } from '@styled-icons/boxicons-regular'
import { useCheckout } from 'src/hooks/useCheckout'
import { GatsbyImage } from 'gatsby-plugin-image'
import Quantity from 'src/components/products/quantity'
import Button from 'src/components/shared/Button'


const Product = ({ product }) => {
    const {
        variant,
        quantity,
        available,
        status,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
    } = useCheckout(product)

    return (
        <ProductContainer>

            <ProductImageContainer>
                <GatsbyImage
                    image={product.images[0].gatsbyImageData}
                    alt={product.title}
                    style={{ height: '100%', width: '100%' }}
                    objectFit={'contain'}
                />
            </ProductImageContainer>
            <ProductInfoContainer>
                <div>{product.title}</div>
                <div>${variant.price}</div>
                <Quantity
                    quantity={quantity}
                    increase={increaseQuantity}
                    decrease={decreaseQuantity}
                />
                <Button type='button' onClick={addToCart}>Add To Cart</Button>
            </ProductInfoContainer>
        </ProductContainer>
    )
}

const View = ({ suggestions, checkoutUrl, isOpen, setIsOpen }) => {
    return (
        <Container isOpen={isOpen}>
            <h2>Suggested Products</h2>
            {suggestions.map(s => <Product product={s} key={s.shopifyId} />)}
            <CheckoutLink href={checkoutUrl}>Proceed to checkout</CheckoutLink>
            <Button type='button' cancel style={{border: 'none', alignSelf: 'flex-end'}} onClick={() => setIsOpen(false)}><X size={26}/></Button>

        </Container>
    )
}

export default View
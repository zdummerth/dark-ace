import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
// import { colors } from '../utils/styles'
import styled from 'styled-components'

import ProductForm from '../components/products/product-form'
import SEO from '../components/seo'
import Slideshow from '../components/Slideshow'

const Title = styled.h1`
  text-align: center;
`

const Subtitle = styled.h2`
  margin: 1rem auto;
  color: white;
  width: 90%;
  text-align: center;

`

const Container = styled.div`
  display: flex;
  // align-items: center;
  margin: 3rem auto;
  color: white;
  width: 90%;

  .hidden {
    display: none;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }


`
const ImgContainer = styled.div`
  // flex: 0 1 80%;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
`

const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & > * {
    margin: .75rem;
  }
  
`
// const ThumbnailContainer = styled.div`  
//   margin-top: 5px;
// `
// const Thumbnail = styled.button`
//     margin-right: 8px;
//     width: 48px;
//     height: 60px;
//     border: 0;
//     outline: 0;
//     background: none;
//     :focus {outline:none;}
//     ::-moz-focus-inner {border:0;}
// `

// const Thumbnails = ({ thumbs, handleThumbClick }) => {

//   return (
//     <ThumbnailContainer>
//       {thumbs.map(t => (
//         <Thumbnail key={t.id} onClick={() => handleThumbClick(t.id)}>
//           <Img
//             fixed={t.localFile.childImageSharp.fixed}
//             alt={'Thumbnail for Product'}
//           />
//         </Thumbnail>
//       ))}
//     </ThumbnailContainer>
//   )
// }


const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const {
    variants: [initialVariant],
    // variants,
    thumbs,
    fulls,
  } = product

  // const thumbnails = <Thumbnails thumbs={thumbs} handleThumbClick={handleThumbClick} />


  const [imageFluid, setImageFluid] = useState(initialVariant.image.localFile.childImageSharp.fluid)

  const [slideShowState, setSlideShowState] = useState({
    open: false,
    index: 0
  })


  // const handleThumbClick = imageId => {

    // const variantsWithImage = variants.filter(v => v.image.id === imageId)
    // console.log({ variantsWithImage })

    // const getOptionName = (variants) => {
    //   const firstOptions = variants[0].selectedOptions
    //   const secondOptions = variants[1].selectedOptions

    //   const match = firstOptions.find(opt =>
    //     opt.value === secondOptions[0].value
    //   )

    //   return match
    // }

    // const optionName = getOptionName(variantsWithImage)

    // const currentOptions = [...variant.selectedOptions]

    // const index = currentOptions.findIndex(opt => opt.name === optionName)

    // currentOptions[index] = {
    //   ...currentOptions[index],
    //   value,
    // }

    // setSlideShowState({
    //   open: true,
    //   index
    // })
  // }

  
  const closeSlideshow = () => {
    setSlideShowState({
      open: false,
      index: 0
    })
  }


  const isPreOrder = product.tags.includes('pre-order');


  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Title>{product.title}</Title>
      {isPreOrder ? <Subtitle>This Is A Pre-Order Item</Subtitle> : null}
      <Container>
        <ImgContainer>
          <Img
            fluid={imageFluid}
            alt={product.title}
          />
        </ImgContainer>
        {/* <Thumbnails thumbs={thumbs} handleThumbClick={handleThumbClick} /> */}
        <FormContainer>
          <ProductForm
            product={product}
            setImageFluid={setImageFluid}

          />
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </FormContainer>
      </Container>
      { slideShowState.open && (
        <Slideshow
          startingIndex={slideShowState.index}
          fulls={fulls}
          thumbs={thumbs}
          close={closeSlideshow}
        />
      )}
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      availableForSale
      productType
      description
      descriptionHtml
      shopifyId
      tags
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          id
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      thumbs: images {
        id
        localFile {
          childImageSharp {
            fixed(height: 60, width: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      fulls: images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage
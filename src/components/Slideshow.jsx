import React, { useState, useEffect } from 'react'
import Flex from 'src/components/shared/Flexbox'
import styled from 'styled-components'
import { breakpoints } from 'src/styles'
import { useSwipeable } from 'react-swipeable'

const SlideshowContainer = styled.div`
  position: relative;
  background: black;
  overflow: hidden;
`

const StyledSlide = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: ${props => props.active ? '1' : '0'};
  transition: opacity .3s ease-in;
`

const Dot = styled.button`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.text};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 3px;

  &.active {
    background: ${({ theme }) => theme.colors.brand};
    border: 1px solid ${({ theme }) => theme.colors.brand};
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 16px;
    height: 16px;
  }
`

const DotContainer = styled(Flex)`
  position: absolute;
  bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`

const SlideShow = ({ children, interval, exit, initialSlide, ...rest }) => {
    const slides = React.Children.toArray(children);

    const [index, setIndex] = useState(initialSlide ? initialSlide : 0);

    const handleNext = () =>
        index === slides.length - 1 ? setIndex(0) : setIndex(index + 1)
    const handlePrevious = () =>
        index === 0 ? setIndex(slides.length - 1) : setIndex(index - 1)

    const handlers = useSwipeable({
        onSwipedLeft: (e) => handlePrevious(),
        onSwipedRight: (e) => handleNext(),
        trackMouse: true,
        trackTouch: true
    })

    useEffect(
        () => {
            const intervalId = setInterval(() => { handleNext() }, interval)
            return () => {
                clearInterval(intervalId);
            }
        }
    )

    return (
        <SlideshowContainer {...handlers} {...rest}>
            {slides.map((s, ind) => (
                <StyledSlide active={ind === index} key={ind}>
                    {s}
                </StyledSlide>
            ))}
            <DotContainer>
                {slides.map((_, ind) => (
                    <Dot
                        onClick={() => setIndex(ind)}
                        key={ind}
                        className={ind === index ? 'active' : ''}
                    />
                ))}
            </DotContainer>
        </SlideshowContainer>
    )
}


export default SlideShow
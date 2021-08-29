import styled from 'styled-components'
import { colors } from 'src/styles'
import { Link } from 'gatsby'


const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    // background: ${colors.darkGradient};
    // box-shadow: 0 0 5px ${colors.brand};
    padding: 10px 0;
    // max-width: 300px;
`

export default StyledLink
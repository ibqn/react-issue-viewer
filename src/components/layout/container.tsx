import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${(props) => props.theme.spacing(2)};
`

export default Container

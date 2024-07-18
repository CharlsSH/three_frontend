// Third-party Imports
import styled from '@emotion/styled'

const StyledVerticalNavBgColorContainer = styled.div`
  position: relative;
  block-size: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ backgroundColor }) => backgroundColor && `background-color:${backgroundColor};`}
`

export default StyledVerticalNavBgColorContainer

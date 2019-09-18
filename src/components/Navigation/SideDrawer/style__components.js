import styled from 'styled-components'

export const SideDrawer = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  padding: 10px 30px;
  background: #1976d2;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  
  @media (min-width: 500px) {
    display: none;
  }
  
  &.open {
    transform: translateX(0)
  }
  
  &.close {
    transform: translateX(-100%)
  }
  
  & a {
    color: white;
    padding-left: 0
  }
  
  & a:hover, & a.active {
    color: white;
    border-bottom: 4px solid white
  }
  
  & nav ul{
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 50px 0 0 -20px
  }
`;

export const LogoWrapper = styled.div`
    height: 50px;
`

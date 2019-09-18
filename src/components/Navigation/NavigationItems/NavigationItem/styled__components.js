import styled from 'styled-components'

export const NavLI = styled.li`
  margin: 0 0 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 100%;
  
  
  
  & a {
    color: white;
    text-decoration: none;
    height: 100%;
    padding: 15px 10px;
    border-bottom: 4px solid transparent;
    box-sizing: border-box;
  }
  
  & a:hover, 
  & a:active,
  & a.active {
    color: white;
    border-bottom: 4px solid white;
  }
`;

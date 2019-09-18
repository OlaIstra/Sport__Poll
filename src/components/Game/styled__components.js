import styled from 'styled-components'

export const Game = styled.div`
  width: 90%;
  margin: auto;
  overflow: auto;
  text-align: center;  
    
  @media(min-width: 380px) {
    width: 350px;
  }  
`;

export const TournamentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

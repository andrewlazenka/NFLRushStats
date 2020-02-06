import React from "react";
import styled from "styled-components";

import { getPlayer } from "../modules/api";
import Header from '../components/Header'
import Main from '../components/Main'

const BlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const StatLine = styled.div`
  border-bottom: 1px solid #393c42;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  font-size: 14px;
  font-weight: 400;
  width: 42%;

  @media only screen and (max-width: 500px) {
    width: calc(100% - 20px);
  }
`;

const PlayerMainInfo = styled.div`
  padding: 0 16px;
`;

function Player({ playerName }) {
  const [player, setPlayer] = React.useState({});
  const [team, setTeam] = React.useState("");
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    // fetches player data on page mount based on url param
    async function findPlayer() {
      const response = await getPlayer(playerName);
      setTeam(response.data.Team);
      setPosition(response.data.Pos);

      // these deletes ensure the values displayed in the main information section
      // of the page aren't displayed as stat items
      delete response.data.Player;
      delete response.data.Team;
      delete response.data.Pos;
      setPlayer(response.data);
    }
    findPlayer();
  }, [playerName]);

  return (
    <>
    <Header />
      <Main>
        <PlayerMainInfo>
          <h2>{playerName}</h2>
          <h4>
            {team} · {position}
          </h4>
        </PlayerMainInfo>
        <hr />
        <BlockWrapper>
          {Object.keys(player).map(pKey => (
            <StatLine key={pKey}>
              <span>{pKey}</span>
              <span>{player[pKey]}</span>
            </StatLine>
          ))}
        </BlockWrapper>
      </Main>
    </>
  );
}

export default Player;

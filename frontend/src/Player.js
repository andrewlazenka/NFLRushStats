import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import { getPlayer } from "./api";

const PageHeading = styled.h1`
  max-width: 1024px;
  padding: 0 16px;
  width: fit-content;
  margin: 0;
`;

const Main = styled.main`
  max-width: 1024px;
  margin: 0 auto;
`;

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

const HomeLink = styled(Link)`
  text-decoration: none;
  color: rgba(249, 249, 249, 0.65);
  transition: color 0.2s ease-in-out;

  :hover {
    color: white;
  }
`

function Player({ playerName }) {
  const [player, setPlayer] = React.useState({});
  const [team, setTeam] = React.useState("");
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    async function findPlayer() {
      const response = await getPlayer(playerName);
      setTeam(response.data.Team);
      setPosition(response.data.Pos);

      delete response.data.Player;
      delete response.data.Team;
      delete response.data.Pos;
      setPlayer(response.data);
    }
    findPlayer();
  }, [playerName]);

  return (
    <>
      <header style={{ backgroundColor: "#1e1f21", padding: "24px 0" }}>
        <HomeLink to="/">
          <PageHeading>NFL Rushing Stats</PageHeading>
        </HomeLink>
      </header>
      <Main>
        <PlayerMainInfo>
          <h2>{playerName}</h2>
          <h3>
            {team} · {position}
          </h3>
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

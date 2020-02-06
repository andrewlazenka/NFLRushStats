import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const HomeLink = styled(Link)`
  text-decoration: none;
  color: rgba(249, 249, 249, 0.65);
  transition: color 0.2s ease-in-out;

  :hover {
    color: white;
  }
`;

const StyledHeader = styled.header`
  background-color: #1e1f21;
  padding: 24px 0;
`;

const PageHeading = styled.h1`
  padding: 0 16px;
  width: fit-content;
  margin: 0;
`;

const HeadingWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Header = () => (
  <StyledHeader>
    <HomeLink to="/">
      <HeadingWrapper>
        <PageHeading>NFL Rushing Stats</PageHeading>
      </HeadingWrapper>
    </HomeLink>
  </StyledHeader>
);

export default Header;

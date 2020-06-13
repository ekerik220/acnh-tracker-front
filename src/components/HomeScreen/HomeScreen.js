import React from "react";
import styled from "styled-components";

export default function HomeScreen() {
  return (
    <Wrapper>
      <CenterImage>
        <div>
          <img
            src={require("assets/leaf.jpg")}
            alt="Animal Crossing leaf logo"
          />
        </div>
      </CenterImage>
      <FooterTextArea>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://tinyurl.com/acnh-sheet"
        >
          Data source
        </a>
      </FooterTextArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const CenterImage = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    width: 200px;
  }
`;

const FooterTextArea = styled.div`
  text-align: center;
`;

import React from "react";
import styled from "styled-components";
import GracefulImage from "react-graceful-image";

export default function HomeScreen() {
  return (
    <Wrapper>
      <CenterImage>
        <div>
          <GracefulImage
            src="https://terimeos.sirv.com/Images/leaf.jpg"
            alt="Animal Crossing leaf logo"
            placeholderColor="white"
            noLazyLoad
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

import styled from "styled-components";
import { colors } from "../theme/colors";

export const Header = () => {
  return (
    <>
      <Container>
        <Logo src={"images/logo.png"} />
        <Row>
          <NumberContainer>6710</NumberContainer>
          <Title>Unique Banished Bears</Title>
        </Row>
        <TitleUnderline>living on the AVAX C-Chain</TitleUnderline>
        <SmallTitle>GENESIS SOLD OUT</SmallTitle>
      </Container>
      <Bears src={"images/bears.png"} />
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NumberContainer = styled.h1`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 1000;
  font-size: 3vw;
  text-align: center;

  color: ${colors.main.white};
  border: 1px solid ${colors.main.red};
  background: ${colors.main.red};
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0px;
  margin-right: 1.5vw;
  transform: rotate(-5deg);
`;

const Title = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 1000;
  font-size: 3vw;
  text-align: center;
  line-height: 0px;
  margin: 0px;
`;

const TitleUnderline = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 1000;
  font-size: 3vw;
  text-align: center;
  line-height: 0px;
`;

const SmallTitle = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 1.5vw;
  text-align: center;
  letter-spacing: 0.29em;
`;

const Logo = styled.img`
  width: 70px;
  padding: 70px;
`;

const Bears = styled.img`
  position: relative;
  width: 100%;
  top: -10vw;
`;

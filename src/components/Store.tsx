import styled from "styled-components";
import { colors } from "../theme/colors";

type StoreProps = {
  accountAddress: string | null;
  setupMetamask: () => void;
};

export const Store = ({ accountAddress, setupMetamask }: StoreProps) => {
  return (
    <Container>
      <Logo src={"/images/logo.png"} />
      {accountAddress ? (
        <Connected>
          Connected to <Bold>{accountAddress.slice(0, 10)}...</Bold>
        </Connected>
      ) : (
        <>
          <Title>Connect your wallet</Title>
          <Text>In order to wrap your bear and live your new life</Text>
          <Button onClick={() => setupMetamask()}>
            <Buttontext>Connect wallet</Buttontext>
          </Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(115.66deg, #e8edff 1.35%, #f1f9f9 83.98%);
  border-radius: 56px;
  margin: 56px;
  padding: 40px;
`;

const Logo = styled.img`
  width: 70px;
  padding: 20px;
`;

const Bold = styled.span`
  font-weight: 900;
`;

const Title = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 4vw;
  text-align: center;
  line-height: 0px;
  margin-bottom: 3vh;
`;

const Text = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5vw;
  text-align: center;
  line-height: 0px;
  margin-bottom: 4vh;
`;

const Connected = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 700;
  font-size: 2.2vw;
  text-align: center;
  line-height: 0px;
  margin-bottom: 4vh;
`;

const Button = styled.button`
  background: linear-gradient(270.06deg, #e33c3d 10.22%, #ee7354 77.56%);
  border-radius: 5px;
  text-decoration: none;
  border: none;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Buttontext = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 1vw;
  text-align: center;
  line-height: 0px;
  color: ${colors.main.white};
`;

import Ticker from "react-ticker";
import styled from "styled-components";

export const Carousel = () => {
  const numberOfBears = 32;
  let BearsName: string[] = [];

  const fillBearsName = () => {
    for (let i = 0; i < numberOfBears; i++) {
      BearsName.push(`${i}`);
    }
  };

  fillBearsName();

  const Bears = BearsName.map(bear => {
    return (
      <img
        src={`/images/bears/bear_${bear}.jpeg`}
        style={{ width: "250px", height: "250px" }}
      />
    );
  });

  return <Ticker>{() => <Row>{Bears}</Row>}</Ticker>;
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

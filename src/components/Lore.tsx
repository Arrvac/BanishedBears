import styled from "styled-components";

export const Lore = () => {
  return (
    <Container>
      <Title>Our lore</Title>
      <Text>
        A long time ago, in the early days of the Avalanche C-chain, bears were
        the first creatures to cross the bridge into new territory.{" "}
        <Bold>Polar Bears, Ice Age Bears, Mutant Bears,</Bold> and even the
        fabled <Bold>Golden Himalayans</Bold> were blazing a new trail.
        <br />
        <br />
        However, after some time, things went terribly wrong. Resources were
        becoming scarce, enthusiasm amongst the bears was nearly non-existent,
        and the developers who brought them into this new world were nowhere to
        be found.
        <br />
        <br />
        These bears were banished to a place of stagnation and hopelessness
        until a few strong bears came <Bold>together</Bold> and
        <Bold> lead</Bold> the community in a new direction.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  padding: 20%;
  padding-top: 0px;
  padding-bottom: 100px;
`;

const Title = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 5vw;
  text-align: center;
  margin-bottom: 50px;
`;

const Text = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 1.5vw;
  letter-spacing: -0.01em;
`;

const Bold = styled.span`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 1.5vw;
  text-align: center;
`;

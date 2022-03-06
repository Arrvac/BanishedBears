import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as MinusIcon } from "../assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";
import { colors } from "../theme/colors";

type FAQInformationsType = {
  question: string;
  reponse: string;
  index?: number;
};

const FAQInformations: FAQInformationsType[] = [
  {
    question: "Who are the Banished Bears ?",
    reponse:
      "As our lore states, we were the original bears on the Avalanche blockchain. We are now a community-run project looking to develop fun new use cases for these adorable pfps.",
  },
  {
    question: "How will you fund future developments ?",
    reponse:
      "All Banished Bears have a 5% royalty on secondary sales that will go to a community wallet. This wallet will be managed by trusted community members and used to grow the project.",
  },
  {
    question: "Where is the roadmap ?",
    reponse:
      "As we transition to this new frontier there are many details that need to be worked out, including our roadmap. We hope that a successful launch will provide enough funds to deliver new and exciting things, including Baby Bears.",
  },
  {
    question: "How can I help ?",
    reponse:
      "We are always looking for enthusiastic and talented community members to help with the project. Join us in our Discord and let us know what you are good at !",
  },
  {
    question: "What happens when I wrap/unwrap?",
    reponse:
      "Wrapping your Bridging Bear locks it in a smart contract and mints and identical Banished Bear that can be traded freely on external marketplaces like NFTrade. If you ever want your Bridging Bear back, unwrapping will return it to you while also burning the new NFT.",
  },
];

const ListItem = ({ question, reponse, index }: FAQInformationsType) => {
  const [isOpen, setIsOpen] = useState(index ? false : true);
  return (
    <>
      <Row>
        {isOpen ? (
          <MinusIcon
            style={{
              color: colors.main.grey,
              height: "20px",
              width: "20px",
              cursor: "pointer",
              marginRight: "25px",
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <PlusIcon
            style={{
              color: colors.main.grey,
              height: "20px",
              width: "20px",
              cursor: "pointer",
              marginRight: "25px",
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        <QuestionTitle>{question}</QuestionTitle>
      </Row>
      {isOpen ? <QuestionReponse>{reponse}</QuestionReponse> : null}
    </>
  );
};

export const FAQ = () => {
  const faq = FAQInformations.map((information, index) => {
    return (
      <ListItem
        question={information.question}
        reponse={information.reponse}
        index={index}
      />
    );
  });
  return (
    <Container>
      <Title>FAQ</Title>
      {faq}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 0.01vh;
  padding-left: 30vw;
  padding-right: 30vw;
`;

const Title = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 4vw;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionTitle = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 1.5vw;
  text-align: center;
`;
const QuestionReponse = styled.p`
  margin-left: 45px;
  margin-top: 0px;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 1.5.vw;
  letter-spacing: -0.01em;
`;

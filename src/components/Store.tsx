import { ButtonGroup, Grid } from "@mui/material";
import styled from "styled-components";
import { colors } from "../theme/colors";
import { Button as MuiButton } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";

type Bear = {
  name: string;
  attributes: {
    trait_type: string;
    value: string;
    points: number;
  }[];
  image: string;
  id: number;
};

type StoreProps = {
  accountAddress: string | null;
  setupMetamask: () => void;
  bearsWrap: Bear[];
  bearsUnWrap: Bear[];
  newContract: ethers.Contract | null;
  oldContract: ethers.Contract | null;
  wrapperContract: ethers.Contract | null;
};

export const Store = ({
  accountAddress,
  setupMetamask,
  bearsUnWrap,
  bearsWrap,
  oldContract,
  newContract,
  wrapperContract,
}: StoreProps) => {
  const [type, setType] = useState<"wrap" | "unwrap">("unwrap");
  const bears = type === "wrap" ? bearsWrap : bearsUnWrap;

  const wrapBear = async (id?: number) => {
    try {
      if (oldContract && wrapperContract) {
        await oldContract["setApprovalForAll(address,bool)"](
          "0x8ce76CDa1658a7dd8019FA5EffbaBe77E22CF2F9",
          true,
        );
        const bearsToWrap = id ? [id] : bearsUnWrap.map(bear => bear.id);

        const perChunk = 20; // items per chunk
        const result = bearsToWrap.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / perChunk);
          if (!resultArray[chunkIndex]) {
            //@ts-ignore
            resultArray[chunkIndex] = [] as any;
          }
          //@ts-ignore
          resultArray[chunkIndex].push(item);
          return resultArray;
        }, []);

        await Promise.all(
          result.map(async res => {
            await wrapperContract["wrapBears(uint256[])"](res);
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Logo src={"images/logo.png"} />
      {!accountAddress ? (
        <>
          <Title>Connect your wallet</Title>
          <Text>In order to wrap your bear and live your new life</Text>
          <Button onClick={() => setupMetamask()}>
            <Buttontext>Connect wallet</Buttontext>
          </Button>
        </>
      ) : (
        <>
          <Connected>
            Connected to <Bold>{accountAddress.slice(0, 10)}...</Bold>
          </Connected>

          <ButtonGroup
            disableElevation
            variant="contained"
            style={{
              backgroundColor: "white",
              padding: 10,
              margin: 20,
              marginBottom: 50,
            }}
          >
            <MuiButton
              style={{
                backgroundColor: "white",
                color: type === "wrap" ? "black" : "grey",
                boxShadow:
                  type === "wrap"
                    ? "0px 1px 3px rgba(16, 24, 40, 0.3)"
                    : "none",
                marginRight: 10,
                borderRadius: 5,
                borderColor: "white",
              }}
              onClick={() => setType("wrap")}
            >
              Wrap Bears
            </MuiButton>
            <MuiButton
              style={{
                backgroundColor: "white",
                color: type === "unwrap" ? "black" : "grey",
                boxShadow:
                  type === "unwrap"
                    ? "0px 1px 3px rgba(16, 24, 40, 0.3)"
                    : "none",
                borderRadius: 5,
                borderColor: "white",
              }}
              onClick={() => setType("unwrap")}
            >
              Unwrap Bears ({bearsUnWrap.length})
            </MuiButton>
            {bearsUnWrap.length > 0 ? (
              <MuiButton
                style={{
                  backgroundColor: "white",
                  color: "grey",
                  borderRadius: 5,
                  borderColor: "grey",
                }}
                onClick={() => {
                  wrapBear();
                }}
              >
                WRAP BEARS
              </MuiButton>
            ) : null}
          </ButtonGroup>
          <Grid container spacing={5}>
            {bears.map((bear: Bear, index) => {
              return (
                <Grid item xs={3}>
                  <Item>
                    <img
                      src={bear.image}
                      key={`${bear.name}_${index}`}
                      style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: "15px",
                        marginBottom: "30px",
                      }}
                      alt={"bear"}
                    />
                    <BeatAttribute>
                      <BeatAttributeTitle>ID:</BeatAttributeTitle>
                      <BeatAttributeValue>
                        BANISHEDBEAR #{bear.id}
                      </BeatAttributeValue>
                    </BeatAttribute>
                    {bear.attributes.map((attribute: any) => {
                      return (
                        <BeatAttribute>
                          <BeatAttributeTitle>
                            {attribute.trait_type}:
                          </BeatAttributeTitle>
                          <BeatAttributeValue>
                            {attribute.value}
                          </BeatAttributeValue>
                        </BeatAttribute>
                      );
                    })}
                    {type !== "wrap" ? (
                      <div style={{ width: "90%", marginTop: "25px" }}>
                        <MuiButton
                          variant="outlined"
                          style={{
                            color: colors.main.black,
                            borderColor: colors.main.black,
                            borderRadius: "20px",
                            textTransform: "none",
                          }}
                          onClick={() => wrapBear(bear.id)}
                        >
                          Wrap Bear
                        </MuiButton>
                      </div>
                    ) : null}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
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
  padding: 100px;
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

const Item = styled.div`
  background-color: ${colors.main.white};
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
`;

const BeatAttribute = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const BeatAttributeTitle = styled.div`
  margin-right: 15px;
`;

const BeatAttributeValue = styled.div``;

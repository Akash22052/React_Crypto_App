import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Crypto from "../Components/Context/Crypto";
import axios from "axios";
import { SingleCoin } from "../Config/api";
import CoinInfo from "../Components/CoinInfo";
import { styled } from "@mui/material/styles";
import { LinearProgress, Typography } from "@mui/material";
import parse from 'html-react-parser';

import { numberWithCommas } from "../Components/Banner/Craousel";

export default function CoinPage() {
  const FirstDiv = styled("div")(({ theme }) => ({
    display: "flex",
    width: "100%",
    minHeight: "100vh", 
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const SecondDiv = styled("div")(({ theme }) => ({
   width: "30%",
   [theme.breakpoints.down("md")]: {
     width: "100%",
   },
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   marginTop: 25,
   borderRight: "2px solid grey",
  }));

  const MarketData = styled("div")(({ theme }) => ({
   alignSelf: "start",
   padding: 25,
   paddingTop: 10,
   width: "100%",
   [theme.breakpoints.down("md")]: {
     display: "flex",
     justifyContent: "space-around",
   },
   [theme.breakpoints.down("sm")]: {
     flexDirection: "column",
     alignItems: "center",
   },
   [theme.breakpoints.down("xs")]: {
     alignItems: "start",
   },
  }));
 

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(Crypto);

  const coinfetch = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    coinfetch();
  }, []);


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <FirstDiv>
      <SecondDiv>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 2,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5"   sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}>Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}  >
            <Typography variant="h5"  sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" } }>
            <Typography variant="h5"   sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}>Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </SecondDiv>
      <CoinInfo coin={coin} />
    </FirstDiv>
  );
}


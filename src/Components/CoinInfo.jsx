import { useContext, useState,useEffect } from "react";
import Crypto from "./Context/Crypto";
import { CircularProgress, createTheme, styled, ThemeProvider } from "@mui/material";
import axios from "axios";
import { HistoricalChart } from "../Config/api";
import { chartDays } from "../Config/data";
import {Line} from 'react-chartjs-2'
import SelectButton from "./selectButton";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
  } from "chart.js";
  ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);
export default function CoinInfo({coin}){
    let[historic,setHistoric]=useState();
    let [days,setDays]=useState(1);
    const{currency}=useContext(Crypto);
    console.log(`currency" "${coin.id}`);
    const fetchHistoric=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency));
        setHistoric(data.prices);
        console.log(`data${historic}`)
    }
    useEffect(()=>{
      fetchHistoric();
    },[currency,days])
    const darkTheme=createTheme({
        palette:{
             primary:{
                main:"#fff"
             },
             mode:"dark"
        }
    })
    const Container=styled("div")(({theme})=>({
        width:"75%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginTop:25,
        padding:40,
        [theme.breakpoints.down("md")]:{
            width:"100%",
            marginTop:0,
            padding:20,
            paddingTop:0
        }
    }))
         return(
           <ThemeProvider theme={darkTheme}>
            <Container>
                {
                    !historic?(<CircularProgress 
                       style={{color:"gold"}}
                       size={150}
                       thickness={1}
                       />):(<>
                       <Line
              data={{
                labels: historic.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historic.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div style={{
                display:"flex",
                marginTop:20,
                justifyContent:"space-around",
                width:"100%",
            }}>
             {chartDays.map((day)=>(
                <SelectButton key={day.value} onClick={()=>setDays(day.value)} selected={day.value===days}>{day.label}</SelectButton>
             ))}
            </div>
                        </>)
                }
            </Container>
           </ThemeProvider>
         );
}
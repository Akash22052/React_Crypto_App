import { useContext, useEffect, useState } from "react";
import Crypto from "../Context/Crypto";
import { TrendingCoins } from "../../Config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { makeStyles } from '@mui/styles'
export function numberWithCommas(x) {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

const useStyles = makeStyles({
       crouselitem: {
         display:"flex",
         flexDirection:"column",
         alignItems:"center",
         cursor:"pointer",
         textTransform:"uppercase",
         color:"white"
       },
     });
export default function Craousel({data}){
       const classes=useStyles();
        let [trending,setTrending]=useState([]);
        const {currency,symbol}=useContext(Crypto);
        const fetchTrendingCoins= async ()=>{
            try{
             const  {data} =await axios.get(TrendingCoins(currency));
             setTrending(data);
             console.log(data);
            }catch(err){
                throw err ;
                
            }
        }
     
        useEffect(()=>{
            try{
            fetchTrendingCoins();
            }catch{
                console.log("error");
            }
        },[currency]);
       
       const items=trending.map((coin)=>{
              const profit=coin?.price_change_percentage_24h>=0;
              return(
                     <Link className={classes.crouselitem}
                      to={`coins/${coin.id}`}
                     >
                     <img 
                       src={coin?.image} 
                       alt={coin.name}
                       height="80"
                       style={{marginBottom:10}}
                     />
                     <span>
                            {coin?.symbol}
                            &nbsp;
                            <span style={{
                                   color:profit?"rgb(14,203,129)":"red",
                                   fontWeight:500
                            }}>
                                   {profit&&'+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                                   </span>
                     </span>
                     <span style={{fontSize:22,fontWeight:500}}>
                       {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                     </span>
                     </Link>

              )
       })
       const responsive={
              0:{
                     items:2,
              },
              512:{
                     items:4
              }
       }
      
       
       return(
        <div style={{
        height:"50%",
        display:"flex",
        alignItem:"center"
        
        }}>
       <AliceCarousel 
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          autoPlay  
          items={items}
       />
        </div>
       );
}
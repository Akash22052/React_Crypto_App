import { Typography , Container} from "@mui/material";
import {  display, fontFamily, styled, textAlign, textTransform } from "@mui/system";
import Craousel from "./Craousel";
import { useContext, useEffect, useState } from "react";
import Crypto from "../Context/Crypto";
export default function Banner(){

     const StyledContainer=styled(Container)({
          height:400,
          display:"flex",
          flexDirection:"column",
          paddingTop:25,
          justifyContent:"space-around",
     })
  
      return (
        <div style={{   backgroundImage:'url(./banner2.jpg)'}}>
            <StyledContainer>
                <div style={{
                    display:"flex",
                    height:"40%",
                    flexDirection:"column",
                    justifyContent:"center",
                    textAlign:"center"

                }}>
                 <Typography variant="h2" 
                   style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Montserrat"
                   }}                 
                 >
                  Crypto Hunter
                 </Typography>
                 <Typography variant="subtitle2"
                  style={{
                    color:"darkgrey",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat"
                  }}
                 >get all information regarding your faviourate crypto currency</Typography>
                 </div>
                 <Craousel /> 
            </StyledContainer>
        </ div>
      );
}
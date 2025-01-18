import React ,{useState,useEffect}from "react";
import Crypto from "./Crypto";

export default function CryptoProvider({children}){
    let [currency,setCurrency]=useState("INR");
    let [symbol,setSymbol]=useState("₹");
    useEffect(()=>{
        if(currency==="USD"){
            setSymbol("$")
        }
        else{
            setSymbol("₹")
        }
    },[currency])
    return (
    <Crypto.Provider value={{currency,setCurrency,symbol}}>
        {children}
    </Crypto.Provider>
    );
}
import { AppBar, Toolbar, Typography,Container, MenuItem ,Select} from "@mui/material";
import { Component, useContext } from "react";
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import CryptoProvider from "./Context/cryptoProvide";
import Crypto from "./Context/Crypto";
const StyledTypography = styled(Typography)({
    flex:1,
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer"
  });
export default function Header(){
    let {currency,setCurrency}=useContext(Crypto);
    console.log(currency)
    const navigate=useNavigate();
    const darkTheme=createTheme({
        palette:{
            primary:{
              main:"#fff"
            },
            type:"dark"
        }
    })
    return(<ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>

                <Toolbar>
                    <StyledTypography onClick={()=>(navigate('/'))}>
                        CRYPTO HUNTER
                    </StyledTypography>
                    <Select
                          variant="outlined"
                          style={{
                               width: 100,
                               height: 40,
                               marginLeft: 15,
                                }}
                          sx={{
                               color: "white",
                              ".MuiSvgIcon-root": { color: "white" },
                              ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "gold" },
                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "gold" },
                              }}
                            MenuProps={{
                               PaperProps: {
                                          sx: {
                                               backgroundColor: "#14161a", 
                                                color: "white", 
                                              },
                                               },
                                        }}
                                        value={currency} onChange={(e)=>setCurrency(e.target.value)}
                >
                 <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                </Select>

                </Toolbar>
               </ Container>
        </AppBar>
        </ThemeProvider>
       
    );
}
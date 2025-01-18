/*import { useState,useContext, useEffect } from "react";
import Crypto from "./Context/Crypto";
import axios from "axios";
import { CoinList } from "../Config/api";
import { createTheme, ThemeProvider, Typography,Container, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useNavigate } from 'react-router-dom'
export default function CoinsTable(){
    let[coins,setCoins]=useState([]);
    let [loading,setLoading]=useState(false);
    let[search,setSearch]=useState();
     const {currency}=useContext(Crypto);
     const navigate=useNavigate();
    
     let fetchCoins= async ()=>{
        setLoading(true);
        let {data}=await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false)
     }
     useEffect(()=>{
        
        fetchCoins();
       
     },[currency])
     const darkTheme=createTheme(
        {
            palette:{
                primary:{
                main:"#fff"
                },
                type:"dark",
            }
        }
     )
     const handleSearch=()=>{
        return (coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search)||
            coin.symbol.toLowerCase().includes(search)
                )))
     }
    return(
       
       <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant="h4" style={{margin:18,fontFamily:"Montserrat"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
  label="Search for Cryptocurrency..."
  variant="outlined"
  style={{ marginBottom: 20, width: "100%" }}
  onChange={(e) => setSearch(e.target.value)}
  InputProps={{
    style: { color: "white" },
  }}
  InputLabelProps={{
    style: { color: "white" }, 
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "gold", 
      },
      "&.Mui-focused fieldset": {
        borderColor: "gold", 
      },
    },
  }}
/>
        <TableContainer>
            {
            loading ?(<LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>):(<>
            <Table>
                <TableHead  sx={{backgroundColor: "#EEBC1D",}}>
                  <TableRow>
                    {
                        ["Coin","Price","24h Change","Market Cap"].map((head)=>(
                            <TableCell
                              sx={{
                                color:"Black",
                                fontWeight:700,
                                fontFamily:"Montserrat"
                              }} 
                              key={head}                           
                              align={head==="Coin"?"center":"right"}
                              >
                             {head}

                            </TableCell>
                        ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                    {handleSearch().map((row)=>{
                       const profit=row?.price_change_percentage_24h>=0;
                       return(
                           <TableRow onClick={()=>navigate.push(`/coins/${row.id}`)}
                              className={Classes.row}
                              key={row.name}
                           >
                            <TableCell
                            componenet="th"
                            scope="row"
                            style={{
                              dispaly:"flex",
                              gap:15,
                            }}
                            >
                              <img 
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{marginBottom:10}}
                              />
                            </TableCell>
                           </TableRow>
                       );
                    })}
                </TableBody>
            </Table>
            </>)
        }
        </TableContainer>
        </Container>
      
       </ThemeProvider>
    );
}
*/
import { useState, useContext, useEffect } from "react";
import Crypto from "./Context/Crypto";
import axios from "axios";
import { CoinList } from "../Config/api";
import { createTheme, ThemeProvider, Typography, Container, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CoinsTable() {
  let [coins, setCoins] = useState([]);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  const { currency,symbol } = useContext(Crypto);
  let [page,setPage]=useState(1);
 
  const navigate = useNavigate();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  const fetchCoins = async () => {
    setLoading(true);
    let { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark",
    }
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    ));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for Cryptocurrency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "gold",
              },
              "&.Mui-focused fieldset": {
                borderColor: "gold",
              },
            },
          }}
        />
        <TableContainer>
          {
            loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) : (<>
              <Table>
                <TableHead sx={{ backgroundColor: "#EEBC1D", }}>
                  <TableRow>
                    {
                      ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                        <TableCell
                          sx={{
                            color: "Black",
                            fontWeight: 700,
                            fontFamily: "Montserrat"
                          }}
                          key={head}
                          align={head === "Coin" ? "center" : "right"}
                        >
                          {head}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                    const profit = row?.price_change_percentage_24h >= 0;
                    return (
                      <TableRow onClick={() => navigate(`/coins/${row.id}`)} key={row.id} sx={{
                        backgroundColor:"#16171a",
                        cursor:"pointer",
                        "&:hover":{
                          backgroundColor:"#131111"
                        },
                       fontFamily:"Montserrat",
                      }}>
                        <TableCell component="th" scope="row" style={{ display: "flex", gap: 15 }}>
                          <img
                            src={row?.image}
                            alt={row?.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div style={{display:"flex", flexDirection:"column"}}>
                            <span style={{textTransform:"uppercase", fontSize:22,color:"darkgray"}}>
                              {row?.symbol}
                            </span>
                            <span style={{color:"darkgrey"}}>
                              {row?.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{color:"darkgrey"}}>{symbol}{" "}{numberWithCommas(row?.current_price.toFixed(2))}</TableCell>
                        <TableCell align="right" style={{ color: profit ? "green" : "red" }}>
                          {row?.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{color:"darkgrey"}}>{symbol}{" "}{numberWithCommas(row?.market_cap.toString().slice(0,-6))}M</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>)
          }
        </TableContainer>
        <Stack spacing={2}>
      <Pagination 
      style={{
        padding:20,
        width:"100%",
        display:"flex",
        justifyContent:"center"
      }}
      sx={{
        "& .MuiPaginationItem-root":{
          color:"gold",
        },
      }}
      count={Math.ceil((handleSearch()?.length)/10)} 
       onChange={(e,value)=>{
         setPage(value);
         window.scroll(0,450);
       }}
      />
    
    </Stack>
      </Container>
    </ThemeProvider>
  );
}

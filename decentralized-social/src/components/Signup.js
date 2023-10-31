import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function SignUp(){
    const history=useNavigate();
    const [password,setPassword]=useState('');
    const [userName,setUserName]=useState('');
    // const [ account,setAccount ] = useState(null);


    // async function signIn(){
    //     const accounts=await window.ethereum.request({
    //       method:"eth_requestAccounts"
    //     });
    //     setAccount(accounts[0]);
    // }

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8001/signup",{
                userName,
                password
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already signed in")
                }
                else if(res.data==="notExist"){
                    history("/",{state:{id:userName}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }
    }
    return(
        <div className="app">
        <Box width="100%" color="rgba(5, 32, 64, 28)" backgroundColor="rgba(25,32,90,5)">
            <Box 
            display="flex" 
            justifyContent="space-between"
            alignItems="center"
            width="55%"
            margin="auto"
            color="white"
            padding="10px 0"
            >
            <Box>
                <Box fontFamily="DM Serif Display" fontSize="44px" fontStyle="italic">
                Riyal
                </Box>
                <Box>
                Decentralized Dapp
                </Box>
            </Box>
            </Box>
       </Box>
       <div className="sign-up-container">
       <Box className="signnn">
            <h1>SignUp</h1>
            <div className="form-container">

                <form action="POST">
                    <input type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder="User-Name" />
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
                    <input type="submit" onClick={submit} className="submit-btn"/>
                </form>
                <br/>
                <p style={{"textAlign":"center"}}>OR</p>
                <br/>
            </div>


            <div className="form-2-container">
                <p>Already have an Account?</p>
                <Link to="/login" className="login-style">Login</Link>
            </div>

        </Box>
       </div>

        </div>
    )
}

export default SignUp;
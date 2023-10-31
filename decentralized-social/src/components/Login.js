import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function Login(){

    const history=useNavigate();
    const [password,setPassword]=useState('');
    const [userName,setUserName]=useState('');

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8001/login",{
                userName,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/",{state:{id:userName}})
                }
                else if(res.data=="notExist"){
                    alert("User is not signed in")
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
        <div className="login">
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
            <h1>Login</h1>
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
                <p>Don't have an account?</p>
                <Link to="/signup" className="login-style">SignUp</Link>
            </div>

        </Box>
       </div>
        </div>
    )
}

export default Login;
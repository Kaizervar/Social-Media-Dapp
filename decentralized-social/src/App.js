import React,{ useEffect,useState } from "react";
import { 
  urlClient,
  queryExplorePublications, 
  queryRecommendedProfiles, 
  LENS_HUB_CONTRACT_ADDRESS,
} from "./queries";

import LENSHUB from "./lenshub";
// const ethers = require("ethers");
import { ethers } from "ethers";
import { Box, Button, Image} from "@chakra-ui/react";
// import React from "react";
import { createClient, cacheExchange, fetchExchange } from '@urql/core'
import { Provider } from 'urql';
import SearchBox from "./components/search-box.componenets";

import { Input, Popover, Radio, Modal, message } from "antd";
import { Model } from "mongoose";
import Login from "./components/Login";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SignUp from "./components/Signup";
import Home from "./components/Home";


function App(props) {
  // const {isConnected,connect,address}=props;

  // // const history=useNavigate();
  //   const [password,setPassword]=useState('');
  //   const [userName,setUserName]=useState('');


  // // const { address, isConnected } = props;
  // const [isOpen, setIsOpen] = useState(false)

  // const [searchField,setSearchField]=useState('');

  // const [ account,setAccount ] = useState(null);
  // const [ profiles,setProfiles ] = useState([]);
  // console.log('~profiles',profiles)
  // const [ posts,setPosts ] = useState([]);
  // console.log('~posts',posts)
  // // console.log('~names',data.recommendedProfiles.name)
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [log,setLog] = useState(false)
  // const [sign,setSign] = useState(false)
  

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const showLog=()=>{
  //   setLog(true);
  //   setIsOpen(false);
  // }

  
  // const showSign=()=>{
  //   setSign(true);
  //   setIsOpen(false);
  // }

  


  // const onSearchChange=(event)=>{
  //   // console.log(event.target.value);
  //   const searchFieldString = event.target.value.toLowerCase();
  //   setSearchField(searchFieldString);
  // };

  // // useEffect(()=>{
  // //   const newFilterMonsters=monsters.filter((monster)=>{ 
  // //     return monster.name.toLowerCase().includes(searchField)
  // //       }
  // //       );
  // //     setFilteredMonsters(newFilterMonsters);

  // // },[monsters,searchField]);


  // function openModal() {
  //   // setChangeToken(asset);
  //   setIsOpen(true);
  // }

  // function closeModal(){
  //   setIsOpen(false)
  // }


  // async function signIn(){
  //   const accounts=await window.ethereum.request({
  //     method:"eth_requestAccounts"
  //   });
  //   setAccount(accounts[0]);
  // }

  // async function getRecommendedProfiles() {
  //   const response = await urlClient
  //     .query(queryRecommendedProfiles)
  //     .toPromise();
  //   const profiles = response.data.recommendedProfiles.slice(0, 5);
  //   setProfiles(profiles);
  //   // return profiles;
    
  // }


  // async function getPosts(){
  //   const response = await urlClient
  //     .query(queryExplorePublications)
  //     .toPromise();
  //   const posts = response.data.explorePublications.items.filter((post)=>{
  //     if(post.profile) return post;
  //     return " ";
  //   });
  //   setPosts(posts);
  // }

  // async function follow(id){
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const contract = new ethers.Contract(
  //     LENS_HUB_CONTRACT_ADDRESS,
  //     LENSHUB,
  //     provider.getSigner()
  //   );
  //   const tx = await contract.follow([parseInt(id)],[0x0]);
  //   await tx.wait();
  // }

  // useEffect(()=>{
  //   getRecommendedProfiles();
  //   getPosts();
  // },[]);


  // const parseImageUrl=(profile)=>{
  //   if(profile){
  //     const url=profile.picture?.original?.url;
  //     if(url && url.startsWith("ipfs:")){
  //       const ipfsHash=url.split("//")[1];
  //       return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  //     }
  //     return url;
  //   }
  //   return "/default-avatar.png"; 
  // };


  // async function submit(e){
  //   e.preventDefault();

  //   try{
  //       await axios.post("http://localhost:8000/signup",{
  //           userName,
  //           password
  //       })
  //       .then(res=>{
  //           if(res.data==="exist"){
  //               alert("User already signed in")
  //           }
  //           else if(res.data==="notExist"){
  //               // history("/home",{state:{id:userName}})
  //           }
  //       })
  //       .catch(e=>{
  //           alert("wrong details")
  //           console.log(e);
  //       })
  //   }
  //   catch(e){
  //       console.log(e);
  //   }
  // }



  return (
    <div className="app">
                <Router>
                  <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/signup" element={<SignUp/>}></Route>
                  </Routes>
                </Router>  
    </div>  
  );
}

export default App;

import React,{ useEffect,useState } from "react";
import { 
  urlClient,
  queryExplorePublications, 
  queryRecommendedProfiles, 
  LENS_HUB_CONTRACT_ADDRESS,
} from "../queries";

import LENSHUB from "../lenshub";
// const ethers = require("ethers");
import { ethers } from "ethers";
import { Box, Button, Image} from "@chakra-ui/react";
// import React from "react";
import { createClient, cacheExchange, fetchExchange } from '@urql/core'
import { Provider } from 'urql';
import SearchBox from "./search-box.componenets";

import { Input, Popover, Radio, Modal, message } from "antd";
import { Model } from "mongoose";
import Login from "./Login";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SignUp from "./Signup";
import { useLocation } from "react-router-dom";

function Home(props){
    const {isConnected,connect,address}=props;
    const location=useLocation();

  // const history=useNavigate();
    const [password,setPassword]=useState('');
    const [userName,setUserName]=useState('');


  // const { address, isConnected } = props;
  const [isOpen, setIsOpen] = useState(false)

  const [searchField,setSearchField]=useState('');

  const [ account,setAccount ] = useState(null);
  const [ profiles,setProfiles ] = useState([]);
  console.log('~profiles',profiles)
  const [ posts,setPosts ] = useState([]);
  console.log('~posts',posts)
  // console.log('~names',data.recommendedProfiles.name)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [log,setLog] = useState(false)
  const [sign,setSign] = useState(false)
  
//   const [monsters,set]=useState([]);
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showLog=()=>{
    setLog(true);
    setIsOpen(false);
  }

  
  const showSign=()=>{
    setSign(true);
    setIsOpen(false);
  }

  


  const onSearchChange=(event)=>{
    // console.log(event.target.value);
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

//   useEffect(()=>{
//     const newFilterProfiles=profiles.filter((profile)=>{ 
//       return profile.name.toLowerCase().includes(searchField)
//         }
//         );
//       setProfiles(newFilterProfiles);

//   },[profiles,searchField]);


  // useEffect(()=>{
  //   const newFilterMonsters=monsters.filter((monster)=>{ 
  //     return monster.name.toLowerCase().includes(searchField)
  //       }
  //       );
  //     setFilteredMonsters(newFilterMonsters);

  // },[monsters,searchField]);


  function openModal() {
    // setChangeToken(asset);
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false)
  }


  async function signIn(){
    const accounts=await window.ethereum.request({
      method:"eth_requestAccounts"
    });
    setAccount(accounts[0]);
  }

  async function getRecommendedProfiles() {
    const response = await urlClient
      .query(queryRecommendedProfiles)
      .toPromise();
    const profiles = response.data.recommendedProfiles.slice(0, 5);
    setProfiles(profiles);
    // return profiles;
    
  }


  async function getPosts(){
    const response = await urlClient
      .query(queryExplorePublications)
      .toPromise();
    const posts = response.data.explorePublications.items.filter((post)=>{
      if(post.profile) return post;
      return " ";
    });
    setPosts(posts);
  }

  async function follow(id){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      provider.getSigner()
    );
    const tx = await contract.follow([parseInt(id)],[0x0]);
    await tx.wait();
  }

  useEffect(()=>{
    getRecommendedProfiles();
    getPosts();
  },[]);


  const parseImageUrl=(profile)=>{
    if(profile){
      const url=profile.picture?.original?.url;
      if(url && url.startsWith("ipfs:")){
        const ipfsHash=url.split("//")[1];
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      }
      return url;
    }
    return "/default-avatar.png"; 
  };


  
  

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
          {account ? (
            <Box backgroundColor="#000" padding="15px" borderRadius="6px">
              Connected
            </Box>
          ) : <Button onClick={openModal} color="rgba(5,32,64)" _hover={{backgroundColor:"#808080"}}>
            Connect
            </Button>}
                <Modal
                  open={isOpen}
                  onCancel={()=>setIsOpen(false)}
                  title="Connect"
                  footer={null}
                  
                >
                  <Box >
                    <Box 
                      display="flex" 
                      justifyContent="space-between"
                      padding="20px"  
                    >
                    Don't have an account?
                    <Button onClick={showSign} color="rgba(5,32,64)" _hover={{backgroundColor:"#808080"}}>SignUp</Button>
                    </Box>
                    
                    <Box 
                      display="flex" 
                      justifyContent="space-between"
                      padding="20px"
                    >
                      Already have an account?
                      <Button onClick={showLog}  color="rgba(5,32,64)" _hover={{backgroundColor:"#808080"}}>Login</Button>

                    </Box>


                  </Box>
                </Modal>
                <Modal
                  open={sign}
                  onCancel={()=>setSign(false)}
                  title="Sign In"
                  footer={null}
                >
                  
                <Button onClick={signIn}>Connect Metamask</Button>
                <Link to="/signup">Signup</Link>

                  
                </Modal>
                <Modal
                  open={log}
                  onCancel={()=>setLog(false)}
                  title="Login"
                  footer={null}
                >
                <Button onClick={signIn}>Connect Metamask</Button>
                <Link to="/login">Login</Link>
                
                </Modal>
            
            <SearchBox 
              className='search-box' 
              placeholder='Search Profiles' 
              onChangeHandler={onSearchChange}
          />  

        </Box>
      </Box>
      {/*Content */}
      <Box 
        display="flex"
        justifyContent="space-between"
        width="100vw"
        margin="35px auto auto auto"
        color="white"
        flexDirection="row"
        gap={2}
        >

            
        { location?.state?.id ?(

        < Box
            // alignItems="center"
            fontSize="30px"
            color="rgba(5,32,64,28)" 
            fontFamily="DM Serif Display"
            justifyContent="center"
            padding="30px 20px 20px 30px "
        >
        Welcome, {location.state.id}!!
            
        </Box>
        ) : (
            < Box
            // alignItems="center"
            fontSize="30px"
            color="rgba(5,32,64,28)" 
            fontFamily="DM Serif Display"
            justifyContent="center"
            padding="30px 20px 20px 30px "
        >
        Welcome!!
            
        </Box>
        ) } 
        {/*Posts*/}
        <Box width="45%" minWidth="45%" maxWidth="45%">
          {posts.map((post)=>(
            <Box 
              key={post.id}
              marginBottom="25px"
              backgroundColor="rgba(5,32,64,28)"
              padding="40px 30px 40px 25px"
              borderRadius="6px"  
            >
              <Box display="flex">
                {/*Profile Image */}
                <Box width="75px" height="75px" marginTop="8px">
                  <img 
                    alt="profile"
                    src={parseImageUrl(post.profile)}
                    width="75px"
                    height="75px"
                    onError={({ currentTarget })=>{
                      currentTarget.onerror = null; //prevents looping
                      currentTarget.src = "/default-avatar.png";
                    }}
                  />
                </Box>

                {/*Post Content */}
                <Box flexGrow={1} marginLeft="20px">
                  <Box display="flex" justifyContent="space-between">
                    <Box fontFamily="DM Serif Display" fontSize="24px">
                      {post.profile?.handle}
                    </Box>
                    <Box height="50px" _hover={{cursor:"pointer"}}>
                      <Image 
                        alt="follow-icon"
                        src="/follow-icon.png"
                        width="50px"
                        height="50px"
                        onClick={()=>follow(post.id)}
                      />
                    </Box>
                  </Box>
                  <Box overflowWrap="anywhere" fontSize="14px">
                    {post.metadata?.content}
                  </Box>

                </Box>
              </Box>

              </Box>
          )

          )}

        </Box>

        {/*Friendlist*/}
        <Box 
          width="20%" 
          backgroundColor="rgba(5,32,64,28)" 
          padding="40px 25px" 
          borderRadius="6px" 
          height="fit-content">
            <Box fontFamily="DM Serif Display">FRIENDS SUGGESTION</Box>
            <Box backgroundColor="rgba(1,2,1,2)">
              {profiles.map((profile,i)=>(
                <Box 
                  key={profile.id} 
                  margin="30px 0" 
                  display="flex" 
                  alignItems="center" 
                  height="40px"
                  _hover={{color:"#808080",cursor:"pointer"}}
                  backgroundColor="rgba(1,2,1,2)"
                >
                  
                  <img 
                    alt="profile"
                    src={parseImageUrl(profile)}
                    width="40px"
                    height="40px"
                    onError={({ currentTarget })=>{
                      currentTarget.onerror = null; //prevents looping
                      currentTarget.src = "/default-avatar.png";
                    }}
                  />
                  <Box marginLeft="25px">
                    
                    <h4>{profile.name}</h4>
                    <p>{profile.handle}</p>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
      </Box>
    </div>
  );
  
}
export default Home;
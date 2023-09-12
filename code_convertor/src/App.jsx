import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Box, Button, Text, Textarea } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

function App() {

  const [targetLanguage, settargetLanguage] = useState("")
  const [code, setcode] = useState("")
  const [load, setLoad] = useState(false)
  const [content, setContent] = useState("")
  const toast = useToast()

  const codeRunner =  async (code) => {
    let userPrompt = `Run the followinf code and return only the output:\n\n${code}`;
    console.log(userPrompt);
    try{
      setLoad(true)


    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages:[{
          role:"user",
          content:userPrompt
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
      );
      console.log(response)
      let data = response.data.choices[0].message.content;
      setLoad(false)
      setContent(data)
    }
    catch(err){
      console.log(err)
   }
  }


  const CodeConvertor = async ( targetLanguage, code) => {

    let userPrompt = `Translate the following ${code} code to ${targetLanguage}`;
    console.log(userPrompt);
    try{
      setLoad(true)

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages:[{
          role:"user",
          content:userPrompt
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
      );
      console.log(response)
      let data = response.data.choices[0].message.content;
      setLoad(false)
      setContent(data)
    }
    catch(err){
      console.log(err)
    }
  };

  const codeDebugger =  async (code) => {
    let userPrompt = `Debug the following code and provide steps to resolve the issues:\n\n${code}`;
    console.log(userPrompt);
    try{
      setLoad(true)

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages:[{
          role:"user",
          content:userPrompt
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
      );
      console.log(response)
      let data = response.data.choices[0].message.content;
      setLoad(false)
      setContent(data)
    }
    catch(err){
      console.log(err)
    }
  }
  
  const codeQualityCheck =  async (code) => {
    let userPrompt = `Evaluate the quality of the following code and provide feedback:\n\n${code}\n\nRate the quality of the code on a scale of 1 to 10, with 10 being the highest quality. Additionally, offer suggestions and steps the user can take to improve the code's quality and readability.`;
    console.log(userPrompt);
    try{

      setLoad(true)
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages:[{
          role:"user",
          content:userPrompt
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
      );
      console.log(response)
      let data = response.data.choices[0].message.content;

      setLoad(false)
      setContent(data)
    }
    catch(err){
      console.log(err)
    }
  }
  
  
  let handleConvert = ()=>{
    if(code==""){
      return toast({
        title: 'Kindly Write Your Code',
        status: 'error',
        duration: 2000,
        position : "top",
        isClosable: true,
      })
    }
    if(targetLanguage==""){
      return toast({
        title: 'Please Select The Language You Want To Convert',
        status: 'error',
        duration: 2000,
        position : "top",
        isClosable: true,
      })
    }
      toast({
        title: 'Converting Your Code',
        status: 'success',
        duration: 9000,
        position : "top",
        isClosable: true,
      })
    CodeConvertor(targetLanguage, code)
    
  }
  
  let handleRunner = ()=>{
    toast({
      title:'Running Your Code',
      status: 'success',
      duration: 2000,
      position : "top",
      isClosable: true,
    })
    codeRunner(code)
    settargetLanguage("")
  }

  let handleDebug = ()=>{
    toast({
      title: 'Debugging Your Code',
      status: 'success',
      duration: 2000,
      position : "top",
      isClosable: true,
    })
    codeDebugger(code)
    settargetLanguage("")
  }

  let handleQuality = ()=>{
    toast({
      title: 'Checking Qualtiy',
      status: 'success',
      duration: 2000,
      position : "top",
      isClosable: true,
    })
    codeQualityCheck(code)
    settargetLanguage("")
  }

  let handleClear = ()=>{
    toast({
      title: 'Code Box Cleaned',
      status: 'success',
      duration: 2000,
      position : "top",
      isClosable: true,
    })
    setContent("")
    setcode("")
    settargetLanguage("")
  }

  return (
    <div className="theme">
    <Box color={"purple.400"} fontSize={"28px"} fontWeight={"bold"} textAlign={"center"} mt="30px" mb="40px">

    <Text>Run Your Code, Convert Your Code, Debug Your Code,</Text>
    <Text>Even You can Check The Quality Of Your Code</Text>
    <Text>For Free..</Text>

    </Box>

  
    <Box display={"grid"} placeItems={"center"}>
      <Box w="80%">
      <Box mb="15px" mt="10px" display={"grid"} placeItems={"center"} fontSize={"20px"} fontWeight={"bold"} >
      <select style={{border:"2px solid black", height:"50px", borderRadius:"5px"}} value={targetLanguage} onChange={(e)=>settargetLanguage(e.target.value)} >
      <option value="">Select Your Language</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="C++">C++</option>
      </select>
      </Box>

      <Box display={"flex"} gap="50px">
     
    <Textarea bg="white" fontWeight="medium" boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" padding="10px" placeholder="Enter Your Code here..." value={code} onChange={(e)=>setcode(e.target.value)} cols="40" rows="20" w="100%"></Textarea>


    {
      load ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} w="100%">
        <Spinner thickness='4px'
        speed='0.45s'
        emptyColor='gray.200'
        color='#7733ff'
        size='xl'/>
        <Text fontSize={"22px"} fontWeight={"bold"} >Please Wait For The Response</Text>
        </Box>
      ) : (
        <Textarea bg="white" fontWeight="bold" color="green" boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" padding="10px" placeholder="Your Output will be here..." cols="40" rows="20" value={content} w="100%"></Textarea>
      )
    }

      </Box>
      </Box>
    </Box>

    <Box display={"grid"} placeItems={"center"} mt="30px">
      <Box w="80%">

      <Box  display={"flex"} justifyContent={"space-around"}>
      <Button colorScheme='blue' onClick={handleRunner}>Run Code</Button>
      <Button colorScheme='orange' onClick={handleConvert}>Convert Code</Button>
      <Button colorScheme='pink' onClick={handleDebug}>Debug Code</Button>
      <Button colorScheme='green' onClick={handleQuality}>Quality Check</Button>
      <Button colorScheme='red' onClick={handleClear}>Clear Code</Button>

      </Box>
      </Box>
    </Box>


    <Text mt="50px" fontWeight={"medium"}>@Created by Chakresh</Text>

    </div>
  )
}

export default App

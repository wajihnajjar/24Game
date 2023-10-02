import React from 'react'
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useAlert } from "react-alert";
import axios from "axios"
import ReactDOM from 'react-dom';
const createRandomNumber =()=>{
  return Math.floor(Math.random()*1000)
}


function App() {
  const alert = useAlert();

  const ref= useRef(null)
  const numberRef = useRef(null)
  const [randomN , setRand] = useState([])
  const [allLevels , setLeveles] = useState([])
  const [currLevel , setCurrLevel] = useState(0)
  const [test,setTest] = useState(["","","","","","",""])
  const [sum , setSum] = useState(-1)
  const clearTheInputs = ()=>{
    for (let i = 0 ; i< ref.current.children.length ; i ++){
      ref.current.children[i].textContent = ""
    }
  }
  const changeState = ()=>{
    if(allLevels.length>0){
      clearTheInputs()
      let {content} = allLevels[currLevel] 
      console.log(numberRef)
      let tempArray  = []
      for (let i = 0 ; i< content.length ; i+=2){
        tempArray.push(parseInt(content[i]))
      }
      tempArray=tempArray.concat(['+','-','*'])
      setRand([...tempArray])
     
    }
    
  }

useEffect(()=>{
console.log(randomN," ",test)
},[randomN])

  useEffect(()=>{
    changeState()


  },[allLevels,currLevel])



  useEffect(()=>{
      axios.get("http://localhost:4001/create/getAllLevels").then(res=>{
        let data = res.data 
        setLeveles(data)
      })
  },[test])


  const doTheSum = (stack)=>{
    for(let i = 0 ; i< stack.length; i ++){
      if(stack[i]=="*" || stack[i]=="/"){
        let x = parseInt(stack[i-1])
        let y = parseInt(stack[i+1])
        let op = stack[i]
        let sum = 0 ;   
        if(op=="*")
          sum = x*y 
        else
          sum = Math.floor(x/y)
        stack[i+1]=sum
        stack.splice(i-1,2)
        i=-2
      
      }

    }
    for(let i = 0 ; i< stack.length; i ++){
      if(stack[i]=="+" || stack[i]=="-"){
        let x = parseInt(stack[i-1])
        let y = parseInt(stack[i+1])
        let op = stack[i]
        let sum = 0 ;   
        if(op=="+")
          sum = x+y 
        else
          sum = Math.floor(x-y)
        stack[i+1]=sum
        stack.splice(i-1,2)
        i=-2
      
      }

    }
    setSum(stack[0])
    if(stack[0]==24){
      alert.success('Level Finished', {
        timeout: 4000, // custom timeout just for this one alert
        onClose: () => {
          setCurrLevel((prev)=>prev+1)
          setSum(0)
        } 
      })
    }
  }
  const GetTheSomme = ()=>{
    // in Case OF All inputs are full make this function work and change The state
    let Arr = ref.current.children 
    for (let i = 0 ; i< Arr.length ; i ++){
      if(Arr[i].textContent==""){
        setSum(-1)
        return false 
      }
    }
    let stack = []
    for (let i = 0 ; i< Arr.length ; i ++){
      stack.push(Arr[i].textContent)
    }
    let operator = ["+" ,"-","/","*"]
    for( let i = 1 ; i< stack.length; i ++)
    {
      if(operator.indexOf(stack[i])!=-1 &&operator.indexOf(stack[i-1])!=-1 ){
        setSum(-1)
        return false 
      }
    }
      doTheSum(stack)
  }
  const deleteElementFromP = (e)=>{
   let arr = [...randomN]
   arr.push(e.target.elem)
   setRand(arr)
    console.log(numberRef.current.children.addChild)
    e.target.textContent=""
    GetTheSomme()

  }
  const onStop=(e,data)=>{
    console.log(e," ",data.node.childElementCount)
    let Max = 1000
    let Index =-1 
if(ref.current.children[0].offsetTop-e.y<=15){
    for (let i = 0 ; i< ref.current.children.length ; i ++){
      let x = ref.current.children[i].offsetTop
      let y =ref.current.children[i].offsetLeft
      let curr = (Math.sqrt(((x-e.y)*(x-e.y)) + ((y-e.x)*(y-e.x))))
      if(Math.floor(curr)<Max){
        Max=Math.floor(curr)
        Index = i  ; 
      }

    }
    
    let t = [...test]
    t[0]=data.node.textContent
    setTest(t)
    let x = [...randomN]
    x.pop() 
    setRand(x)
    GetTheSomme()
  }

  }
  return (
    <div style={{
      height:"100vh", 
      display:'flex',
      width:"100vw"
      
    }}>
      <div style={{
        display:"flex",
        height:"100vh", 
        width:"100vw",
        marginTop:"15rem" , 
        alignItems:"center" , 
        flexDirection:"column"
     }}>

      <div
       style={{
          display:"flex",

        }}
        ref={numberRef}   
        >
      {randomN.map((number,index)=>{
    return(
      <Draggable
      onStop={onStop}
      
      > 
            <p key={index} data-key={index} style={{marginLeft:"2rem"}}>{number}</p>
      </Draggable>

       )    
     })}
      </div>
      <div ref ={ref}style={{
        display:"flex"
      }}>
       {test.map((number,index)=>{
        return <p key={index}
        onClick={deleteElementFromP}
        style={{
          marginLeft:"2rem" , 
          height:"3em" , 
          width:"3em",
          border:"1px solid black",
          display:"flex" , 
          justifyContent:"center" , 
          alignItems:"center"
        }}></p>
      })}
      </div>
      <p
        style={{
          fontSize:"2em"
        }}
      >{sum}=24</p>
      </div>
      
    </div>
  );
}

export default App;

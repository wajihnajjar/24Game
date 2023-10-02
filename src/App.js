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
  const [lowestInter , setLowerInter] = useState(8)
  const clearTheInputs = ()=>{
    setTest(["","","","","","",""])
  }
  const changeState = ()=>{
    if(allLevels.length>0){
      clearTheInputs()
      console.log(currLevel, "this is the levels")
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
console.log(randomN," ",test , " " )
// Bug in React Drop 
if(numberRef!=undefined  && randomN.length==7 ){
  for (let i = 0 ; i< numberRef.current.children.length; i ++){
    if(numberRef.current.children[i].style.transform!="translate(0px, 0px)"){
      numberRef.current.children[i].style.transform=""
    }
     numberRef.current.children[i].x  =  numberRef.current.children[i].offsetHeight
     numberRef.current.children[i].y = numberRef.current.children[i].offsetLeft 
     numberRef.current.children[i].z  = numberRef.current.children[i].offsetTop 
     numberRef.current.children[i].r = numberRef.current.children[i].offsetWidth
}
}
if(randomN.length<7){
  console.log("Here")
  for (let i = 0 ; i< numberRef.current.children.length; i ++){
    if(numberRef.current.children[i].style.transform!="translate(0px, 0px)"){
      numberRef.current.children[i].style.transform="translate(0px, 0px)"
    }
}
}
//
console.log(lowestInter , "this is inter")
if(test[0]=="*5"){
console.log('************')
  setCurrLevel(prev=>prev+1)
}
},[randomN,test,lowestInter])

  useEffect(()=>{
    changeState()


  },[allLevels,currLevel])



  useEffect(()=>{
      axios.get("http://localhost:4001/create/getAllLevels").then(res=>{
        let data = res.data 
        setLeveles(data)
      })
  },[])


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
console.log(stack , "t his ")
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
    Arr=test
    console.log(Arr , "this is the array to test it ")
    for (let i = 0 ; i< Arr.length ; i ++){
      if(Arr[i]==""){
        console.log("Here 2 ")

        setSum(-1)
        return false 
      }
    }
    let stack = []
    for (let i = 0 ; i< Arr.length ; i ++){
      stack.push(Arr[i])
    }
    let operator = ["+" ,"-","/","*"]
    for( let i = 1 ; i< stack.length; i ++)
    {
      if(operator.indexOf(stack[i])!=-1 &&operator.indexOf(stack[i-1])!=-1 ){
        console.log("Here 3 ")
        setSum(-1)
        return false 
      }
    }
      doTheSum(stack)
  }
  const deleteElementFromP = (e)=>{
   let arr = [...randomN]
   arr.push("*")
   setRand(arr)
    console.log(numberRef.current.children.addChild)
    e.target.textContent=""
    GetTheSomme()

  }
  const onStop=(e,data)=>{
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
    // Index is the Index of the input 
    // Need To get The Index Of element Selected from the number ; 
    //e.target.dataset["key"] index if The P 

         // 1 2 3 4 5 6
         //x
         // 1 2 3 * 5 6 

    let t = [...test]
    t[Index]=data.node.textContent
    setTest(t)
    let x = [...randomN]
    /*
    The Error Is Round here
    console.log(e.target.dataset["key"])
    e.target.dataset["key"]= (parseInt( e.target.dataset["key"]) - (7-randomN.length)).toString()
    console.log ("8//////////////////// ",(parseInt( e.target.dataset["key"]) - (7-randomN.length)).toString()    )
 */
    x.splice(lowestInter <=(e.target.dataset["key"]) ? parseInt(e.target.dataset["key"] - (6 -randomN.length)):parseInt(e.target.dataset["key"]) ,1)
    console.log(lowestInter ," ***/" , e.target.dataset["key"])
 
    let mm = Math.min(lowestInter , (parseInt( e.target.dataset["key"])) )
  setLowerInter(mm)
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
      key={index}
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
        }}>{number}</p>
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

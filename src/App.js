import React from 'react'
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useAlert } from "react-alert";
import axios from "axios"
import Background from "./endless-constellation.png"
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
  const [currLevel , setCurrLevel] = useState(15)
  const [test,setTest] = useState(["","","","","","",""])
  const [sum , setSum] = useState(0)
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
      tempArray=tempArray.concat(['+','-','*','/'])
      setRand([...tempArray])
    }
  }
useEffect(()=>{
// Bug in React Drop 
if(numberRef!=undefined  && randomN.length==8 ){
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
  for (let i = 0 ; i< numberRef.current.children.length; i ++){
    if(numberRef.current.children[i].style.transform!="translate(0px, 0px)"){
      numberRef.current.children[i].style.transform="translate(0px, 0px)"
    }
}
}
//
GetTheSomme()
},[randomN,test,lowestInter])

  useEffect(()=>{
    changeState()


  },[allLevels,currLevel])

const checkForEquation = (str)=>{
for (let i = 3  ; i< str.length;  i +=2){
      if((str[i]=='*' || str[i]=='/') && (str[i-2] == '+'  || str[i-2]=='-'))
        {
          return false 
        }
    } 
return true 
}

  useEffect(()=>{
      axios.get("http://localhost:4001/create/getAllLevelsV1").then(res=>{
        let data = res.data 
        let t = []
        for (let i = 0 ; i< data.length; i ++){
          if(checkForEquation(data[i]["content"])){
            t.push(data[i])
          }
         
        }
        setLeveles(t)
      })
  },[])


  const doTheSum = (stack)=>{
    console.log("This is The Stack " ,stack )
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
    console.log(stack)
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
    if(currLevel!=allLevels.length-1){
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
  else {
    if(stack[0]==24){
      alert.success('Game Finished', {
        timeout: 4000, // custom timeout just for this one alert
        onClose: () => {
          setCurrLevel(0)
          setSum(0)
        } 
      })
    }

  }
  }
  const GetTheSomme = ()=>{
    // in Case OF All inputs are full make this function work and change The state
    let Arr = ref.current.children 
    Arr=test
    for (let i = 0 ; i< Arr.length ; i ++){
      if(Arr[i]==""){

        setSum(0)
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
        setSum(0)
        return false 
      }
    }
      doTheSum(stack)
  }
  const deleteElementFromPV1 = (e)=>{
    if(e.target.textContent.length>0){
      let Temp = [...test]
      console.log(e)
      e.target.textContent = "**"
      let idx = -1  
      for( let i = 0 ; i< ref.current.children.length ; i ++ ){
       if(ref.current.children[i].textContent=="**")
         idx= i
       }
      Temp[idx]=""
      setTest(Temp)
      GetTheSomme()
       }
   
  }
  const deleteElementFromP = (e)=>{
    if(e.target.textContent.length>0){
   let arr = [...randomN]
   arr.push(e.target.textContent)
   let Temp = [...test]
   console.log(e)
   e.target.textContent = "**"
   let idx = -1  
   for( let i = 0 ; i< ref.current.children.length ; i ++ ){
    if(ref.current.children[i].textContent=="**")
      idx= i
    }
    console.log(arr , "this is the Array Of number ")
   Temp[idx]=""
   setTest(Temp)
   setRand(arr)
   GetTheSomme()
    }
  }
  const onStopV1 = (e,data)=>{
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
    console.log(Index)
    // Index is the Index of the input 
    // Need To get The Index Of element Selected from the number ; 
    //e.target.dataset["key"] index if The P 

         // 1 2 3 4 5 6
         //x
         // 1 2 3 * 5 6 
    let t = [...test]
    t[Index]=data.node.textContent
    console.log(t)
    /*
    The Error Is Round here
    console.log(e.target.dataset["key"])
    e.target.dataset["key"]= (parseInt( e.target.dataset["key"]) - (7-randomN.length)).toString()
    console.log ("8//////////////////// ",(parseInt( e.target.dataset["key"]) - (7-randomN.length)).toString()    )
 */
// Deleting Happen To Wrong Element
// Here We Change Rand Because We Already Take The element 
// 
    setTest(t)

    GetTheSomme()
  }



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
    let x = [...randomN]
    /*
    The Error Is Round here
    console.log(e.target.dataset["key"])
    e.target.dataset["key"]= (parseInt( e.target.dataset["key"]) - (7-randomN.length)).toString()
    console.log ("8//////////////////// ",(parseInt( e.target.dataset["key"]) - (7-randomN.length)).toString()    )
 */
// Deleting Happen To Wrong Element
// Here We Change Rand Because We Already Take The element 
// 
let ret = data.node.textContent
data.node.textContent = "***"
let j=  -1 
console.log(ref)
for (let i = 0  ;i <numberRef.current.children.length; i ++){
  if(numberRef.current.children[i].textContent =="***"){
    j = i 
    break 
  }
}
data.node.textContent = ret
    console.log(x , " /// " ,j," ***" , e )
    x.splice(j,1)
    setRand(x)    
    setTest(t)

    GetTheSomme()
  }

  }
  return (
    <div style={{
      height:"100vh", 
      display:'flex',
      width:"100vw" , 
      backgroundImage:`url(${Background})`,
      overflow:"hidden"
      
    }}>
      <div style={{
        display:"flex",
        height:"100vh", 
        width:"100vw",
        marginTop:"15rem" , 
        alignItems:"center" , 
        flexDirection:"column"
     }}>
      <div style={{
                  border:"3px solid white",
                  padding:"0px 15px 0px 15px"

      }}>
        {currLevel+1}/{allLevels.length}

      </div>

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
      onStop={onStopV1}

      > 
            <p  data-key={index} className='Number' style={{
          marginLeft:"2rem"
          ,
          fontWeight:"200px" , 
          fontSize:"1.5rem"
          }}>{number}</p>
      </Draggable>

       )    
     })}
      </div>
      <div ref ={ref}style={{
        display:"flex"
      }}>
       {test.map((number,index)=>{
        return <p key={index}
        onClick={deleteElementFromPV1}
        style={{
          marginLeft:"2rem" , 
          height:"3em" , 
          width:"3em",
          border:"4px solid white",
          display:"flex" , 
          justifyContent:"center" , 
          alignItems:"center",          fontSize:"1.5rem"


        }}>{number}</p>
      })}
      </div>
      <p
        style={{
          fontWeight:"bold" , 
          fontSize:"1.5rem"
        }}
      >{sum}=24</p>
      </div>
      
    </div>
  );
}

export default App;

import React from 'react'
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

const createRandomNumber =()=>{
  return Math.floor(Math.random()*10)
}

function App() {
  const ref= useRef(null)
  const numberRef = useRef(null)
  const [randomN , setRand] = useState([createRandomNumber(),createRandomNumber(),createRandomNumber(),createRandomNumber(),'+','-','*','/'])
  const [test,setTest] = useState(["*","*","*","*","*","*","*","*"])
  useEffect(()=>{

    console.log(test, " ** ", randomN)
  },[test,randomN])



  const deleteElementFromP = (e)=>{
   // numberRef.current.children[e.target.pos].style.display="block"
   console.log(e.target.elem)
   let arr = [...randomN]
   arr.push(e.target.elem)
   setRand(arr)
   //let Element= React.createElement("p", { style:{marginLeft:"2rem"} },e.target.elem);
   console.log(e.target)
    console.log(numberRef.current.children.addChild)
    e.target.textContent=""
  
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
    //data.node.style.display="none"
    data.node.remove()
   let Arr = [...randomN ]
   Arr= Arr.slice(0,Index).concat(Arr.slice(Index+1,Arr.length))
    ref.current.children[Index].elem=data.node.textContent
    ref.current.children[Index].textContent=data.node.textContent
    console.log( ref.current.children)
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
            <p key={index} style={{marginLeft:"2rem"}}>{number}</p>
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
      </div>
      
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

const createRandomNumber =()=>{
  return Math.floor(Math.random()*10)
}

function App() {
  const ref= useRef(null)
  const [randomN , setRand] = useState([createRandomNumber(),createRandomNumber(),createRandomNumber(),createRandomNumber(),'+','-','*','/'])
  const [test,useTest] = useState([1])
  useEffect(()=>{
    console.log(ref.current.children)
    for (let i = 0 ; i< ref.current.children.length ; i ++){
      let x = ref.current.children[i].offsetHeight
      let y =ref.current.children[i].offsetWidth
      console.log(x," ",y,' ',ref.current.children[i].offsetTop , " ", ref.current.children[i].offsetLeft )
    }
  },[])
  const onDrag = (e,data  )=>{
  
  
  }
  
  const onStop=(e,data)=>{
    console.log(e," ",data.node.textContent)
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




  
      <div style={{
          display:"flex",

        }}>
      {randomN.map(number=>{
    return(
      <Draggable
               
      onDrag={onDrag}
      onStop={onStop}
      > 
            <p style={{marginLeft:"2rem"}}>{number}</p>
      </Draggable>

       )    
     })}
      </div>
      <div ref ={ref}style={{
        display:"flex"
      }}>
       {randomN.map(number=>{
        return <p style={{
          
          marginLeft:"2rem" , 
          height:"3em" , 
          width:"3em",
          border:"1px solid black",
          display:"flex" , 
          justifyContent:"center" , 
          alignItems:"center"
        }}>a</p>
      })}
      </div>
      </div>
      
    </div>
  );
}

export default App;

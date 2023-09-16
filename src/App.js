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

    console.log('Event: ',e.x, " ",e.y);
    //console.log('Data: ', data);
    for (let i = 0 ; i< ref.current.children.length ; i ++){
      let x = ref.current.children[i].offsetTop
      let y =ref.current.children[i].offsetLeft
      console.log(Math.sqrt(((x-e.x)*(x-e.x)) + ((y-e.y)*(y-e.y))))
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




      <Draggable
               
                onDrag={onDrag}
        
      >
      <div style={{
          display:"flex",

        }}>
      {test.map(number=>{
        return <p style={{marginLeft:"2rem"}}>{number}</p>
      })}
      </div>
      </Draggable>
      <div ref ={ref}style={{
        display:"flex"
      }}>
       {randomN.map(number=>{
        return <input style={{
          marginLeft:"2rem" , 
          height:"3em" , 
          width:"3em"
        
        }} />
      })}
      </div>
      </div>
      
    </div>
  );
}

export default App;

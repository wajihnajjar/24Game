import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const createRandomNumber =()=>{
  return Math.floor(Math.random()*10)
}
function App() {
  const [randomN , setRand] = useState([createRandomNumber(),createRandomNumber(),createRandomNumber(),createRandomNumber()])
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
        return <p style={{marginLeft:"2rem"}}>{number}</p>
      })}
      </div>
      <div style={{
        display:"flex"
      }}>
       {randomN.map(number=>{
        return <p style={{marginLeft:"2rem"}}>a</p>
      })}
      </div>
      </div>
      
    </div>
  );
}

export default App;

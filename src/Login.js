import React from "react";

export default  function Login () {

return (
    <div style={{
        height:"100vh" , 
        width:"10wh", 
        backgroundColor:"red",
        display:"grid", 
        gridTemplateColumns: "10% 70% 20%" ,
        gridTemplateRows:"10% 80% 10%",
        gridTemplateAreas: "header header e a test c header header header"
}}>

<p style={{
gridColumn:"2 / span 1",
gridRow : "2 / span 1"
}}>
    Hello World
</p>
    </div>
)

}
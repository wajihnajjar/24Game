import React from "react";

export default  function Login () {

return (
    <div style={{
        height:"100vh" , 
        width:"10wh", 
        backgroundColor:"red",
        display:"grid", 
        gridTemplateColumns: "5%% 90% 5%" ,
        gridTemplateRows:"5% 80% 5%",
        gridTemplateAreas: "header header header header test header header header header"
}}>

<p style={{
    gridArea:"test"
}}>
    Hello World
</p>
    </div>
)

}
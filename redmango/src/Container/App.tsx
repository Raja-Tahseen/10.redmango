import React from "react";
import { Header, Footer } from "../Components/Layout";
import { useState, useEffect } from "react"; 
import { menuItemModel } from "../Interfaces";


function App() {
 const [menuItems,setMenuItems] = useState<menuItemModel[]>([]);
 useEffect(() => {
  fetch("https://localhost:7181/api/MenuItem").then((response)=> response.json()).then((data)=>{
    console.log(data);
    setMenuItems(data.result);
  });
 },[]);
  return (
      <div>
        <Header />
        Main Component
        <Footer />
      </div>
  )
}

export default App

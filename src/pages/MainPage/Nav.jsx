import React from "react";

const Nav = ({ onLogout}) => {
  return (
  
      <div className="nav">
        <h1 className="logo">VicHub</h1>
        <button onClick={onLogout}>Logout</button>
      </div>
    
  );
};
export default Nav;

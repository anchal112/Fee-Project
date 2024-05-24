import React,{useState} from 'react'
import './LoginSignup.css'
import images_icon from '../images.png'
import paswd_icon from '../pswd.png'
import user_icon from '../user.png'


const LoginSignUp = () => {
  const [action,setAction]=useState("Login");

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action==="Login"?<div></div>:<div className="input">
            <img src={user_icon} alt="" style={{ width: '20px', height: '20px' }} />
            <input type="text" placeholder="Name" />
        </div>}
        
        <div className="input">
            <img src={images_icon} alt="" style={{ width: '20px', height: '20px' }} />
            <input type="email" placeholder="Email id"/>
        </div>
        <div className="input">
            <img src={paswd_icon} alt="" style={{ width: '20px', height: '20px' }} />
            <input type="password" placeholder="Password"/>
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
      
      <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>setAction("Sign Up")}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>setAction("Login")}>Login</div>
      </div>
    </div>
  )
}

export default LoginSignUp

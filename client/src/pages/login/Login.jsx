import "./login.css"
import { useContext, useState } from "react"
import {useNavigate} from "react-router-dom"
import { authContext } from "../../context/authContext"
import axiosConfig from "../../utils/axiosConfig";

const Login = () => {

  const [credentials , setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

  const {user , loading , err , dispatch} = useContext(authContext)

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setCredentials((prev) => ({...prev ,[e.target.id]: e.target.value }))
  }

  const handleClick = async(e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    console.log("login started");
    try {
      const res = await axiosConfig.post("/auth/login", credentials)
      console.log("login data\n",res.data.details);
      dispatch({type: "LOGIN_SUCCESS", payload:res.data.details})
      console.log("dispatched");

      navigate('/')
      console.log(user)
      // localStorage.clear()
    } catch (err) {
      console.log(err.message.data)
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  console.log(user)

  return (
    <div className="login">
      <div className="lContainer">
        <input 
        type="text"
        placeholder="username"
        id="username"
        onChange={handleChange}
        className="lInput"
        />

      <input 
        type="password"
        placeholder="password"
        id="password"
        onChange={handleChange}
        className="lInput"
        />

        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>

        {err && <span>{err.message}</span>}
      </div>
    </div>
  )
}

export default Login
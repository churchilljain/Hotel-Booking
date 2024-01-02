import "./login.scss"
import { useContext, useState } from "react"
import {useNavigate} from "react-router-dom"
import { authContext } from "../../context/AuthContext.js" 
import axiosConfig from "../../utils/axiosConfig.js"

const Login = () => {

  // const [credentials , setCredentials] = useState({
  //   username: undefined,
  //   password: undefined,
  // })
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {user , loading , err , dispatch} = useContext(authContext)

  const navigate = useNavigate()

  // const handleChange = (e) =>{
  //   setCredentials((prev) => ({...prev ,[e.target.id]: e.target.value }))
  // }

  const handleClick = async(e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
      const res = await axiosConfig.post("/auth/login", {username: username, password: password})
      console.log(res.data);
      // console.log(authContext._currentValue.loading);
      
      if (res.data.isAdmin){
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
        authContext._currentValue.loading = true
        console.log(authContext._currentValue.loading);
        // window.location.href = "/";
        navigate('/')
      }
      else{
        dispatch({type: "LOGIN_FAILURE", 
        payload: {message: "You are not allowed!"}})
      }    

    } catch (err) {
      // console.log(err.message.data)
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  console.log({username: username, password: password})

  return (
    <div className="login">
      <div className="lContainer">
        <input 
        type="text"
        placeholder="username"
        id="username"
        onChange={(e) => {
          setUsername(() => e.target.value)
        }}
        className="lInput"
        />

      <input 
        type="password"
        placeholder="password"
        id="password"
        onChange={(e) => {
          setPassword(() => e.target.value);
        }}
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
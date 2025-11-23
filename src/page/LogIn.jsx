import "./signup.css";
import "./index.css";
import { UniversalNavbar } from "../assets/components/universal-navbar";
import styled from "styled-components";
import { useState } from "react";
import { authAPI } from '../services/api';
import { useNavigate } from "react-router-dom";


export default function LogIn() {
  const [mobile,setMobile] = useState()
  const [password,setPassword] = useState()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    
    try {
      const result = await authAPI.login({ mobile, password })
      console.log(result.data);
      
      if (result.data.token) { 
        localStorage.setItem("authToken", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        alert('Login successful!')
        navigate("/");  
        window.location.reload(); 
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed')
    }
  };

  return (
    <div className="auth-container" id="SignUp">
      <UniversalNavbar />
      <h2 className="auth-title">LogIn</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form className="auth" onSubmit={handleSubmit}>
        <p className="authsubtitle">Mobile</p>
        <StyledWrapper>
          <div className="input-element">
            <input type="number" className="text-input" onChange={(e)=>setMobile(e.target.value)} required></input>
          </div>
        </StyledWrapper>
        <p className="authsubtitle">Password</p>
        <StyledWrapper>
          <div className="input-element">
            <input type="password" className="text-input" onChange={(e)=>setPassword(e.target.value)} required></input>
          </div>
        </StyledWrapper>
        <button type="submit" className="submit-btn">
          LogIn
        </button>
      </form>
    </div>
    )
}

const StyledWrapper = styled.div`
  .text-input {
    background: transparent;
    border: solid 3px white;
    color: white;
    height: 3rem;
    width: 30rem;
    font-size: 1.5rem;
    border-radius: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .input-element {
    display: flex;
    flex-direction: column;
    margin: 0 3rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 600px) {
    .text-input {
      height: 3rem;
      width: 20rem;
    }
  }
`;

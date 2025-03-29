import "./signup.css";
import "./index.css";
import { UniversalNavbar } from "../assets/components/universal-navbar";
import styled from "styled-components";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function LogIn() {
  const [mobile,setMobile] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/login", { mobile, password })
      .then((result) => {
        console.log(result);
        if (result.data.token) { 
          localStorage.setItem("authToken", result.data.token);
          navigate("/home");  
          window.location.reload(); 
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-container" id="SignUp">
      <div className="background">
        <div className="blur-circle circle-1"></div>
        <div className="blur-circle circle-2"></div>
        <div className="blur-circle circle-3"></div>
        <div className="blur-circle circle-4"></div>
        <div className="blur-circle circle-5"></div>
        <div className="blur-circle circle-6"></div>
      </div>
      <UniversalNavbar />
      <h2 className="auth-title">LogIn</h2>

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

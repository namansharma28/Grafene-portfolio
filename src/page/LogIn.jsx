import './signup.css';
import TextInput from '../assets/components/textInput';
import './index.css'
import { UniversalNavbar } from '../assets/components/universal-navbar';

export default function LogIn() {
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
      
        <form className="auth">
        <p className="authsubtitle">Mobile</p>
        <TextInput/>
        <p className="authsubtitle">Password</p>
        <TextInput/>
        <button type="submit" className="submit-btn">LogIn</button>
        </form>
    </div>
    )
}
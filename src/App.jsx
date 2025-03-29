
import Page from './page';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './page/signup';
import LogIn from './page/LogIn';
import UploadProject from './page/UploadProject';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />}/>
        <Route path="/uploadproject" element={<UploadProject />}></Route>
      </Routes>
    </Router>
  );
}
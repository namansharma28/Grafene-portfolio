import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UploadProject = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login if user isn't authenticated
    }
  }, []);

  return <h1>Upload Your Project Here</h1>;
};

export default UploadProject;

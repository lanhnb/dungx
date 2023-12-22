import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/admin/summary");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        
        <div id="home11" className="w3-col m12 s12 w3-container contt">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button>
            {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
          </button>
          {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
          </div > 
      </StyledForm>
      <div className="khoang" style={{ "height": "652px" }}>

      </div>
      </>
    
  );
};

export default Login;

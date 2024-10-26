import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import useLoginMutation from "../../hooks/useLoginMutation";
import styles from "../../styles/login.module.css";

/**
 * LoginComponent is a React component that renders a login form.
 * It allows users to enter their email and password to log in.
 *
 * @component
 * @returns {JSX.Element} The rendered login component.
 */
function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();

  /**
   * Handles the form submission for logging in.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password, isGoogleSignIn: false });
  };

  

  return (
    <div
      className={`${styles.loginContainer} bg-[#e7e2ff] min-h-screen w-screen px-[20%] py-[5%]`}
    >
      <div
        className={`${styles.loginBox} overflow-hidden flex justify-center w-full bg-white rounded-3xl`}
      >
        <div className={`${styles.loginLeft} w-[50%] text-center p-10`}>
          <h1 className="font-poppins font-bold text-3xl leading-[45px] uppercase text-black">
            Login
          </h1>
          <p className="font-poppins font-normal text-base leading-6 text-[#525252] mb-8">
            Enter your credentials to access your account
          </p>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(240, 237, 255, 0.8)",
                  borderRadius: "15px",
                  border: "none",
                  color: "black",
                  fontSize: "14px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&::before": {
                    content: "none",
                  },
                  "&::after": {
                    content: "none",
                  },
                  "& input::placeholder": {
                    color: "black",
                    opacity: 1,
                    fontSize: "14px",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
            />
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              label="password"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(240, 237, 255, 0.8)",
                  borderRadius: "15px",
                  border: "none",
                  color: "black",
                  fontSize: "14px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&::before": {
                    content: "none",
                  },
                  "&::after": {
                    content: "none",
                  },
                  "& input::placeholder": {
                    color: "black",
                    opacity: 1,
                    fontSize: "14px",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loginMutation.isLoading}
              sx={{
                mt: 3,
                mb: 2,
                width: "110px",
                height: "45px",
                background:
                  "linear-gradient(99.78deg, #9181F4 -5.85%, #5038ED 109.55%)",
                boxShadow: "0px 8px 21px rgba(0, 0, 0, 0.16)",
                borderRadius: "16px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background:
                    "linear-gradient(99.78deg, #9181F4 -5.85%, #5038ED 109.55%)",
                  opacity: 0.9,
                },
              }}
            >
              {loginMutation.isLoading ? "Logging in..." : "Login Now"}
            </Button>
            {loginMutation.isError && (
              <p className="text-red-500 mt-2">{loginMutation.error.message}</p>
            )}
          </Box>

          <p className="font-poppins font-normal text-base leading-6 text-[#525252] mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#5038ED] font-bold">
              Register
            </Link>
          </p>
        </div>
        <div className="w-[50%]">
          <img
            className="w-[100%] h-[100%] object-cover z-0"
            src={"/assets/login/login-right-bg.svg"}
          />
          <div className={styles.loginRightSectionBg}></div>
          <img
            width={300}
            className="z-0 absolute top-[35%] right-[25%] rounded-3xl"
            src={"/assets/login/login-right-bg2.svg"}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;

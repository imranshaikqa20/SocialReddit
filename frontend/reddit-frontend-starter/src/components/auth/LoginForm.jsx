import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

function LoginForm() {

  const navigate = useNavigate();

  /* =========================================
     States
  ========================================= */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     Handle Login
  ========================================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    /* =========================================
       Validation
    ========================================= */

    if (
      !email.trim() ||
      !password.trim()
    ) {

      alert(
        "Please fill all fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      /* =========================================
         Login API Call
      ========================================= */

      const response =
        await loginUser({

          email:
            email.trim().toLowerCase(),

          password:
            password.trim()

        });

      console.log(
        "LOGIN RESPONSE :",
        response
      );

      /* =========================================
         Token Extraction
      ========================================= */

      const token =
        response?.token ||
        response?.data?.token;

      const username =
        response?.username ||
        response?.data?.username;

      const userEmail =
        response?.email ||
        response?.data?.email;

      /* =========================================
         Token Check
      ========================================= */

      if (!token) {

        alert(
          "Token not received ❌"
        );

        return;

      }

      /* =========================================
         Save Local Storage
      ========================================= */

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "username",
        username || ""
      );

      localStorage.setItem(
        "email",
        userEmail || ""
      );

      /* =========================================
         Success Alert
      ========================================= */

      alert(
        "Login Success 🚀"
      );

      /* =========================================
         Redirect Home
      ========================================= */

      navigate("/home", {
        replace: true
      });

    } catch (error) {

      console.log(
        "LOGIN ERROR :",
        error
      );

      /* =========================================
         Error Message
      ========================================= */

      const errorMessage =

        error?.response?.data?.message ||

        error?.response?.data?.error ||

        error?.message ||

        "Invalid Email or Password ❌";

      alert(errorMessage);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #020617 0%, #071028 50%, #020617 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      {/* =========================================
         Login Card
      ========================================= */}

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background:
            "rgba(15,23,42,0.85)",
          border:
            "1px solid rgba(59,130,246,0.2)",
          borderRadius: "24px",
          padding: "32px",
          boxShadow:
            "0px 8px 30px rgba(0,0,0,0.35)"
        }}
      >

        {/* =========================================
           Heading
        ========================================= */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "28px"
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "30px",
              fontWeight: "700"
            }}
          >

            Welcome Back

          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#94a3b8",
              fontSize: "14px"
            }}
          >

            Login to continue

          </p>

        </div>

        {/* =========================================
           Form
        ========================================= */}

        <form
          onSubmit={handleLogin}
        >

          {/* =========================================
             Email
          ========================================= */}

          <div
            style={{
              marginBottom: "18px"
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#dbeafe",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >

              Email

            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "14px",
                border:
                  "1px solid rgba(59,130,246,0.2)",
                background:
                  "rgba(30,41,59,0.9)",
                color: "#fff",
                outline: "none",
                boxSizing: "border-box"
              }}
            />

          </div>

          {/* =========================================
             Password
          ========================================= */}

          <div
            style={{
              marginBottom: "24px"
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#dbeafe",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >

              Password

            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "14px",
                border:
                  "1px solid rgba(59,130,246,0.2)",
                background:
                  "rgba(30,41,59,0.9)",
                color: "#fff",
                outline: "none",
                boxSizing: "border-box"
              }}
            />

          </div>

          {/* =========================================
             Login Button
          ========================================= */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "15px",
              background:
                "linear-gradient(to right, #2563eb, #3b82f6)",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              opacity:
                loading ? 0.7 : 1
            }}
          >

            {
              loading
                ? "Logging In..."
                : "Login"
            }

          </button>

        </form>

        {/* =========================================
           Signup Redirect
        ========================================= */}

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#94a3b8",
            fontSize: "14px"
          }}
        >

          Don’t have an account?

          <span
            onClick={() =>
              navigate("/signup")
            }
            style={{
              color: "#60a5fa",
              cursor: "pointer",
              marginLeft: "6px",
              fontWeight: "600"
            }}
          >

            Signup

          </span>

        </p>

      </div>

    </div>

  );

}

export default LoginForm;
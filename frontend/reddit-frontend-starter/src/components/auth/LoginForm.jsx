import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

function LoginForm() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* Handle Login */

  const handleLogin = async (e) => {

    e.preventDefault();

    /* Validation */

    if (!email || !password) {

      alert("Please fill all fields ❌");

      return;

    }

    try {

      setLoading(true);

      /* API Call */

      const response =
        await loginUser({

          email,
          password

        });

      console.log(response.data);

      /* Save JWT Token */

      localStorage.setItem(

        "token",

        response.data.token

      );

      /* Save Username */

      localStorage.setItem(

        "username",

        email

      );

      alert("Login Success ");

      /* Redirect To Home */

      navigate("/home");

      /* Refresh Application */

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Invalid Email or Password ❌"
      );

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
        padding: "20px",
        overflow: "hidden",
        position: "relative"
      }}
    >

      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "80px",
          width: "180px",
          height: "180px",
          background:
            "rgba(37,99,235,0.16)",
          filter: "blur(100px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "80px",
          right: "80px",
          width: "180px",
          height: "180px",
          background:
            "rgba(59,130,246,0.14)",
          filter: "blur(100px)"
        }}
      />

      {/* Login Card */}

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background:
            "rgba(15,23,42,0.78)",
          backdropFilter: "blur(14px)",
          border:
            "1px solid rgba(59,130,246,0.15)",
          borderRadius: "24px",
          padding: "32px",
          boxShadow:
            "0px 8px 30px rgba(0,0,0,0.35)",
          position: "relative",
          zIndex: 2
        }}
      >

        {/* Heading */}

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
              fontWeight: "700",
              textShadow:
                "0px 0px 12px rgba(59,130,246,0.25)"
            }}
          >

            Welcome Back

          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: "24px"
            }}
          >

            Login to continue to
            Social Reddit

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleLogin}
        >

          {/* Email */}

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

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "13px 15px",
                borderRadius: "14px",
                border:
                  "1px solid rgba(59,130,246,0.18)",
                outline: "none",
                background:
                  "rgba(30,41,59,0.9)",
                color: "#f8fafc",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />

          </div>

          {/* Password */}

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "13px 15px",
                borderRadius: "14px",
                border:
                  "1px solid rgba(59,130,246,0.18)",
                outline: "none",
                background:
                  "rgba(30,41,59,0.9)",
                color: "#f8fafc",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />

          </div>

          {/* Login Button */}

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
              boxShadow:
                "0px 0px 18px rgba(37,99,235,0.35)"
            }}
          >

            {

              loading

                ? "Logging In..."

                : "Login"

            }

          </button>

        </form>

        {/* Signup Redirect */}

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
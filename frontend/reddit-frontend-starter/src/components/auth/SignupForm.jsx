import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function SignupForm() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* Handle Signup */

  const handleSignup = async (e) => {

    e.preventDefault();

    /* Validation */

    if (
      !username ||
      !email ||
      !password
    ) {

      alert("Please fill all fields ❌");

      return;

    }

    try {

      setLoading(true);

      const response =
        await api.post(

          "/auth/signup",

          {
            username,
            email,
            password
          }

        );

      console.log(response.data);

      alert("Signup Successful ");

      /* Clear Form */

      setUsername("");

      setEmail("");

      setPassword("");

      /* Redirect */

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup Failed ❌");

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

      {/* Signup Card */}

      <div
        style={{
          width: "100%",
          maxWidth: "440px",
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

             Create Account

          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: "24px"
            }}
          >

            Join Social Reddit and
            connect with the community

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSignup}
        >

          {/* Username */}

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

              Username

            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(
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
              placeholder="Enter email"
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
              placeholder="Enter password"
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

          {/* Signup Button */}

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

                ? "Creating Account..."

                : " Signup"

            }

          </button>

        </form>

        {/* Login Redirect */}

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#94a3b8",
            fontSize: "14px"
          }}
        >

          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
            style={{
              color: "#60a5fa",
              cursor: "pointer",
              marginLeft: "6px",
              fontWeight: "600"
            }}
          >

            Login

          </span>

        </p>

      </div>

    </div>

  );

}

export default SignupForm;
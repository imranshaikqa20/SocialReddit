import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../layout/Navbar";

import {
  createCommunity
} from "../../services/communityService";

function CreateCommunityForm() {

  /* =========================================
     Navigation
  ========================================= */

  const navigate = useNavigate();

  /* =========================================
     Form States
  ========================================= */

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  /* =========================================
     Loading
  ========================================= */

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     Create Community
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* Validation */

    if (!name || !description) {

      alert(
        "Please fill all fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      /* API Call */

      await createCommunity({

        name,

        description

      });

      alert(
        "Community Created Successfully ✅"
      );

      /* Redirect */

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create community ❌"
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

        overflow: "hidden",

        position: "relative"

      }}

    >

      {/* =========================================
         Navbar
      ========================================= */}

      <Navbar />

      {/* =========================================
         Background Glow
      ========================================= */}

      <div

        style={{

          position: "absolute",

          top: "80px",

          left: "60px",

          width: "180px",

          height: "180px",

          background:
            "rgba(37,99,235,0.15)",

          filter: "blur(100px)"

        }}

      />

      <div

        style={{

          position: "absolute",

          bottom: "60px",

          right: "60px",

          width: "180px",

          height: "180px",

          background:
            "rgba(59,130,246,0.14)",

          filter: "blur(100px)"

        }}

      />

      {/* =========================================
         Main Container
      ========================================= */}

      <div

        style={{

          width: "88%",

          maxWidth: "520px",

          margin: "40px auto",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           Card
        ========================================= */}

        <div

          style={{

            background:
              "rgba(15,23,42,0.78)",

            backdropFilter: "blur(14px)",

            border:
              "1px solid rgba(59,130,246,0.12)",

            borderRadius: "22px",

            padding: "28px",

            boxShadow:
              "0px 8px 26px rgba(0,0,0,0.30)"

          }}

        >

          {/* =========================================
             Header
          ========================================= */}

          <div

            style={{

              textAlign: "center",

              marginBottom: "24px"

            }}

          >

            <h1

              style={{

                margin: 0,

                color: "#f8fafc",

                fontSize: "28px",

                fontWeight: "700"

              }}

            >

              Create Community

            </h1>

            <p

              style={{

                marginTop: "10px",

                color: "#94a3b8",

                fontSize: "14px",

                lineHeight: "24px"

              }}

            >

              Build your own subreddit
              and start discussions

            </p>

          </div>

          {/* =========================================
             Form
          ========================================= */}

          <form onSubmit={handleSubmit}>

            {/* Community Name */}

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

                Community Name

              </label>

              <input

                type="text"

                placeholder="Example: java"

                value={name}

                onChange={(e) =>

                  setName(
                    e.target.value
                  )

                }

                style={{

                  width: "100%",

                  padding: "13px 14px",

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

            {/* Description */}

            <div

              style={{

                marginBottom: "22px"

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

                Description

              </label>

              <textarea

                placeholder="Write community description..."

                value={description}

                onChange={(e) =>

                  setDescription(
                    e.target.value
                  )

                }

                rows={5}

                style={{

                  width: "100%",

                  padding: "13px 14px",

                  borderRadius: "14px",

                  border:
                    "1px solid rgba(59,130,246,0.18)",

                  outline: "none",

                  background:
                    "rgba(30,41,59,0.9)",

                  color: "#f8fafc",

                  fontSize: "14px",

                  resize: "none",

                  boxSizing: "border-box"

                }}

              />

            </div>

            {/* Submit Button */}

            <button

              type="submit"

              disabled={loading}

              style={{

                width: "100%",

                padding: "14px",

                border: "none",

                borderRadius: "14px",

                background:
                  "linear-gradient(to right, #2563eb, #3b82f6)",

                color: "white",

                fontSize: "15px",

                fontWeight: "700",

                cursor: "pointer",

                boxShadow:
                  "0px 0px 16px rgba(37,99,235,0.30)"

              }}

            >

              {

                loading

                  ? "Creating..."

                  : "Create Community"

              }

            </button>

            {/* Back Button */}

            <button

              type="button"

              onClick={() =>
                navigate("/home")
              }

              style={{

                width: "100%",

                marginTop: "14px",

                padding: "13px",

                borderRadius: "14px",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                background:
                  "rgba(255,255,255,0.04)",

                color: "#cbd5e1",

                fontSize: "14px",

                fontWeight: "600",

                cursor: "pointer"

              }}

            >

              Back To Home

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default CreateCommunityForm;
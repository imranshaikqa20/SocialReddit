import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Navbar({

  searchTerm,

  setSearchTerm

}) {

  /* =========================================
     Navigation
  ========================================= */

  const navigate = useNavigate();

  /* =========================================
     Search State
  ========================================= */

  const [search, setSearch] =
    useState(searchTerm || "");

  /* =========================================
     Logged User
  ========================================= */

  const userEmail =
    localStorage.getItem("username");

  /* =========================================
     Username
  ========================================= */

  const displayName =

    userEmail

      ? userEmail.split("@")[0]

      : "User";

  /* =========================================
     Logout
  ========================================= */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    localStorage.removeItem("email");

    alert(
      "Logout Successful ✅"
    );

    navigate("/login");

  };

  /* =========================================
     Search
  ========================================= */

  const handleSearch = (e) => {

    const value =
      e.target.value;

    setSearch(value);

    if (setSearchTerm) {

      setSearchTerm(value);

    }

  };

  return (

    <nav

      style={{

        position: "sticky",

        top: 0,

        zIndex: 1000,

        width: "100%",

        padding: "14px 24px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        gap: "18px",

        background:
          "rgba(2,6,23,0.88)",

        backdropFilter: "blur(14px)",

        borderBottom:
          "1px solid rgba(59,130,246,0.10)",

        boxShadow:
          "0px 4px 20px rgba(0,0,0,0.28)",

        flexWrap: "wrap",

        boxSizing: "border-box"

      }}

    >

      {/* =========================================
         Left Section
      ========================================= */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          gap: "14px",

          minWidth: "210px"

        }}

      >

        {/* Avatar */}

        <div

          style={{

            width: "44px",

            height: "44px",

            borderRadius: "50%",

            background:
              "linear-gradient(to right,#2563eb,#38bdf8)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "white",

            fontWeight: "700",

            fontSize: "17px",

            flexShrink: 0,

            boxShadow:
              "0px 0px 18px rgba(37,99,235,0.30)"

          }}

        >

          {

            displayName
              .charAt(0)
              .toUpperCase()

          }

        </div>

        {/* Logo */}

        <div>

          <Link
            to="/home"
            style={{
              textDecoration: "none"
            }}
          >

            <h2

              style={{

                margin: 0,

                cursor: "pointer",

                fontSize: "25px",

                fontWeight: "800",

                color: "#f8fafc",

                letterSpacing: "0.5px",

                textShadow:
                  "0px 0px 10px rgba(59,130,246,0.20)"

              }}

            >

              Social Reddit

            </h2>

          </Link>

          <span

            style={{

              color: "#94a3b8",

              fontSize: "12px"

            }}

          >

            Welcome,
            {" "}
            {displayName}

          </span>

        </div>

      </div>

      {/* =========================================
         Search Bar
      ========================================= */}

      <div

        style={{

          flex: 1,

          minWidth: "220px",

          maxWidth: "520px"

        }}

      >

        <input

          type="text"

          placeholder="Search posts..."

          value={search}

          onChange={handleSearch}

          style={{

            width: "100%",

            padding: "13px 18px",

            borderRadius: "15px",

            border:
              "1px solid rgba(59,130,246,0.16)",

            outline: "none",

            background:
              "rgba(15,23,42,0.92)",

            color: "#f8fafc",

            fontSize: "14px",

            boxSizing: "border-box"

          }}

        />

      </div>

      {/* =========================================
         Right Buttons
      ========================================= */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          gap: "10px",

          flexWrap: "wrap"

        }}

      >

        {/* Home */}

        <Link to="/home">

          <button

            style={{

              padding: "10px 16px",

              background:
                "rgba(30,41,59,0.92)",

              color: "#f8fafc",

              border:
                "1px solid rgba(59,130,246,0.12)",

              borderRadius: "12px",

              cursor: "pointer",

              fontSize: "13px",

              fontWeight: "600"

            }}

          >

            🏠 Home

          </button>

        </Link>

        {/* Profile */}

        <Link to="/profile">

          <button

            style={{

              padding: "10px 16px",

              background:
                "linear-gradient(to right,#0f766e,#14b8a6)",

              color: "white",

              border: "none",

              borderRadius: "12px",

              cursor: "pointer",

              fontSize: "13px",

              fontWeight: "700"

            }}

          >

            👤 Profile

          </button>

        </Link>

        {/* Create Post */}

        <Link to="/post">

          <button

            style={{

              padding: "10px 16px",

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              color: "white",

              border: "none",

              borderRadius: "12px",

              cursor: "pointer",

              fontSize: "13px",

              fontWeight: "700"

            }}

          >

             Post

          </button>

        </Link>

        {/* Community */}

        <Link to="/create-community">

          <button

            style={{

              padding: "10px 16px",

              background:
                "linear-gradient(to right,#7c3aed,#8b5cf6)",

              color: "white",

              border: "none",

              borderRadius: "12px",

              cursor: "pointer",

              fontSize: "13px",

              fontWeight: "700"

            }}

          >

             Community

          </button>

        </Link>

        {/* Logout */}

        <button

          onClick={handleLogout}

          style={{

            padding: "10px 16px",

            background:
              "linear-gradient(to right,#ef4444,#dc2626)",

            color: "white",

            border: "none",

            borderRadius: "12px",

            cursor: "pointer",

            fontSize: "13px",

            fontWeight: "700"

          }}

        >

          Logout

        </button>

      </div>

    </nav>

  );

}

export default Navbar;
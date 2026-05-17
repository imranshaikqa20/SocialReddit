import { useState } from "react";

import Navbar from "../components/layout/Navbar";

import PostList from "../components/posts/PostList";

import CommunitySidebar from "../components/community/CommunitySidebar";

function HomePage() {

  /* =========================================
     SEARCH STATE
  ========================================= */

  const [searchTerm, setSearchTerm] =
    useState("");

  return (

    <div

      style={{

        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617 0%,#071028 45%,#020617 100%)",

        color: "white",

        overflowX: "hidden",

        position: "relative"

      }}

    >

      {/* =========================================
         GLOBAL STYLES
      ========================================= */}

      <style>

        {`

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            background: #020617;
            font-family: Arial, sans-serif;
          }

          img {
            max-width: 100%;
            display: block;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #020617;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(
              to bottom,
              #2563eb,
              #3b82f6
            );
            border-radius: 20px;
          }

          @media (max-width: 1100px) {

            .home-layout {
              flex-direction: column;
            }

            .sidebar-wrapper {
              width: 100%;
            }

            .feed-wrapper {
              width: 100%;
            }

          }

        `}

      </style>

      {/* =========================================
         BACKGROUND GLOW EFFECTS
      ========================================= */}

      <div

        style={{

          position: "fixed",

          top: "-120px",

          left: "-120px",

          width: "260px",

          height: "260px",

          background:
            "rgba(37,99,235,0.14)",

          filter: "blur(120px)",

          zIndex: 0

        }}

      />

      <div

        style={{

          position: "fixed",

          bottom: "-120px",

          right: "-120px",

          width: "260px",

          height: "260px",

          background:
            "rgba(59,130,246,0.12)",

          filter: "blur(120px)",

          zIndex: 0

        }}

      />

      {/* =========================================
         NAVBAR
      ========================================= */}

      <div

        style={{

          position: "sticky",

          top: 0,

          zIndex: 100

        }}

      >

        <Navbar

          searchTerm={searchTerm}

          setSearchTerm={setSearchTerm}

        />

      </div>

      {/* =========================================
         MAIN LAYOUT
      ========================================= */}

      <div

        className="home-layout"

        style={{

          width: "92%",

          maxWidth: "1500px",

          margin: "26px auto",

          display: "flex",

          gap: "24px",

          alignItems: "flex-start",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           SIDEBAR
        ========================================= */}

        <div className="sidebar-wrapper">

          <CommunitySidebar />

        </div>

        {/* =========================================
           FEED SECTION
        ========================================= */}

        <div

          className="feed-wrapper"

          style={{

            flex: 1,

            minWidth: 0

          }}

        >

          {/* =========================================
             FEED HEADER
          ========================================= */}

          <div

            style={{

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: "26px",

              flexWrap: "wrap",

              gap: "18px"

            }}

          >

            {/* =========================================
               LEFT CONTENT
            ========================================= */}

            <div>

              <h1

                style={{

                  margin: 0,

                  fontSize: "42px",

                  fontWeight: "800",

                  color: "#f8fafc",

                  letterSpacing: "0.5px",

                  lineHeight: "52px",

                  textShadow:
                    "0px 0px 14px rgba(59,130,246,0.22)"

                }}

              >

                Trending Posts 🚀

              </h1>

              <p

                style={{

                  marginTop: "10px",

                  color: "#94a3b8",

                  fontSize: "15px",

                  lineHeight: "28px",

                  maxWidth: "760px"

                }}

              >

                Discover trending discussions,
                memes, technology updates,
                gaming news, ISRO launches
                and community posts from
                creators around the world.

              </p>

            </div>

            {/* =========================================
               RIGHT BADGE
            ========================================= */}

            <div

              style={{

                background:
                  "rgba(15,23,42,0.72)",

                border:
                  "1px solid rgba(59,130,246,0.16)",

                backdropFilter: "blur(12px)",

                padding: "14px 20px",

                borderRadius: "16px",

                color: "#dbeafe",

                fontSize: "13px",

                fontWeight: "700",

                boxShadow:
                  "0px 0px 20px rgba(37,99,235,0.12)"

              }}

            >

              🔴 Live Community Feed

            </div>

          </div>

          {/* =========================================
             POSTS CONTAINER
          ========================================= */}

          <div

            style={{

              background:
                "rgba(15,23,42,0.50)",

              borderRadius: "28px",

              padding: "24px",

              border:
                "1px solid rgba(255,255,255,0.05)",

              backdropFilter: "blur(14px)",

              boxShadow:
                "0px 10px 35px rgba(0,0,0,0.34)",

              minHeight: "400px"

            }}

          >

            {/* =========================================
               POSTS LIST
            ========================================= */}

            <PostList

              searchTerm={searchTerm || ""}

            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default HomePage;
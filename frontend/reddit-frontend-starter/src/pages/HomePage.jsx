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

          @media (max-width: 768px) {

            .main-heading {
              font-size: 32px !important;
              line-height: 42px !important;
            }

            .main-subtext {
              font-size: 14px !important;
              line-height: 26px !important;
            }

          }

        `}

      </style>

      {/* =========================================
         BLUE GLOW EFFECTS
      ========================================= */}

      <div

        style={{

          position: "fixed",

          top: "-140px",

          left: "-140px",

          width: "280px",

          height: "280px",

          background:
            "rgba(37,99,235,0.14)",

          filter: "blur(120px)",

          zIndex: 0

        }}

      />

      <div

        style={{

          position: "fixed",

          bottom: "-140px",

          right: "-140px",

          width: "280px",

          height: "280px",

          background:
            "rgba(59,130,246,0.10)",

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

          width: "93%",

          maxWidth: "1450px",

          margin: "14px auto",

          display: "flex",

          gap: "22px",

          alignItems: "flex-start",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           SIDEBAR
        ========================================= */}

        <div

          className="sidebar-wrapper"

          style={{

            width: "260px",

            flexShrink: 0

          }}

        >

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
             TOP HEADER
          ========================================= */}

          <div

            style={{

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              flexWrap: "wrap",

              gap: "14px",

              marginBottom: "20px"

            }}

          >

            {/* =========================================
               LEFT TEXT
            ========================================= */}

            <div>

              <h1

                className="main-heading"

                style={{

                  margin: 0,

                  fontSize: "36px",

                  fontWeight: "800",

                  lineHeight: "46px",

                  color: "#f8fafc",

                  letterSpacing: "-1px",

                  textShadow:
                    "0px 0px 16px rgba(59,130,246,0.16)"

                }}

              >

                Trending Posts

              </h1>

              <p

                className="main-subtext"

                style={{

                  marginTop: "10px",

                  color: "#94a3b8",

                  fontSize: "15px",

                  lineHeight: "28px",

                  maxWidth: "680px",

                  fontWeight: "400"

                }}

              >

                Discover trending discussions,
                memes, gaming updates,
                technology news, ISRO launches
                and community posts from creators
                around the world.

              </p>

            </div>

            {/* =========================================
               LIVE FEED
            ========================================= */}

            <div

              style={{

                background:
                  "rgba(15,23,42,0.82)",

                border:
                  "1px solid rgba(59,130,246,0.16)",

                padding: "12px 20px",

                borderRadius: "14px",

                color: "#dbeafe",

                fontSize: "13px",

                fontWeight: "700",

                backdropFilter: "blur(14px)",

                boxShadow:
                  "0px 0px 18px rgba(37,99,235,0.08)"

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
                "rgba(15,23,42,0.56)",

              border:
                "1px solid rgba(255,255,255,0.04)",

              borderRadius: "26px",

              padding: "22px",

              backdropFilter: "blur(16px)",

              boxShadow:
                "0px 10px 36px rgba(0,0,0,0.30)",

              minHeight: "500px",

              display: "flex",

              flexDirection: "column",

              alignItems: "flex-start"

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
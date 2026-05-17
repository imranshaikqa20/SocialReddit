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
              font-size: 36px !important;
              line-height: 46px !important;
            }

            .main-subtext {
              font-size: 15px !important;
              line-height: 28px !important;
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

          width: "320px",

          height: "320px",

          background:
            "rgba(37,99,235,0.18)",

          filter: "blur(140px)",

          zIndex: 0

        }}

      />

      <div

        style={{

          position: "fixed",

          bottom: "-140px",

          right: "-140px",

          width: "320px",

          height: "320px",

          background:
            "rgba(59,130,246,0.14)",

          filter: "blur(140px)",

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

          width: "94%",

          maxWidth: "1600px",

          margin: "20px auto",

          display: "flex",

          gap: "26px",

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

            width: "280px",

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

              gap: "18px",

              marginBottom: "28px"

            }}

          >

            {/* LEFT */}

            <div>

              <h1

                className="main-heading"

                style={{

                  margin: 0,

                  fontSize: "42px",

                  fontWeight: "800",

                  lineHeight: "54px",

                  color: "#f8fafc",

                  letterSpacing: "-1px",

                  textShadow:
                    "0px 0px 18px rgba(59,130,246,0.18)"

                }}

              >

                Trending Posts

              </h1>

              <p

                className="main-subtext"

                style={{

                  marginTop: "12px",

                  color: "#94a3b8",

                  fontSize: "16px",

                  lineHeight: "30px",

                  maxWidth: "760px",

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

            {/* LIVE FEED */}

            <div

              style={{

                background:
                  "rgba(15,23,42,0.82)",

                border:
                  "1px solid rgba(59,130,246,0.18)",

                padding: "14px 22px",

                borderRadius: "16px",

                color: "#dbeafe",

                fontSize: "14px",

                fontWeight: "700",

                backdropFilter: "blur(16px)",

                boxShadow:
                  "0px 0px 20px rgba(37,99,235,0.10)"

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
                "rgba(15,23,42,0.62)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              borderRadius: "30px",

              padding: "30px",

              backdropFilter: "blur(18px)",

              boxShadow:
                "0px 14px 50px rgba(0,0,0,0.38)",

              minHeight: "600px"

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
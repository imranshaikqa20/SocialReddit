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

        overflowX: "hidden"

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

          @media (max-width: 1024px) {

            .home-layout {
              flex-direction: column;
            }

            .feed-container {
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

          width: "90%",

          maxWidth: "1450px",

          margin: "24px auto",

          display: "flex",

          gap: "20px",

          alignItems: "flex-start",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           COMMUNITY SIDEBAR
        ========================================= */}

        <CommunitySidebar />

        {/* =========================================
           FEED SECTION
        ========================================= */}

        <div

          className="feed-container"

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

              marginBottom: "22px",

              flexWrap: "wrap",

              gap: "14px"

            }}

          >

            {/* LEFT CONTENT */}

            <div>

              <h1

                style={{

                  margin: 0,

                  fontSize: "34px",

                  fontWeight: "800",

                  color: "#f8fafc",

                  letterSpacing: "0.5px",

                  textShadow:
                    "0px 0px 12px rgba(59,130,246,0.22)"

                }}

              >

                Trending Posts

              </h1>

              <p

                style={{

                  marginTop: "8px",

                  color: "#94a3b8",

                  fontSize: "14px",

                  lineHeight: "24px",

                  maxWidth: "700px"

                }}

              >

                Discover trending discussions,
                memes, technology updates,
                ISRO news and community
                posts from different topics.

              </p>

            </div>

            {/* RIGHT BADGE */}

            <div

              style={{

                background:
                  "rgba(15,23,42,0.72)",

                border:
                  "1px solid rgba(59,130,246,0.16)",

                backdropFilter: "blur(10px)",

                padding: "12px 18px",

                borderRadius: "14px",

                color: "#dbeafe",

                fontSize: "13px",

                fontWeight: "600",

                boxShadow:
                  "0px 0px 18px rgba(37,99,235,0.12)"

              }}

            >

              🔴 Live Community Feed

            </div>

          </div>

          {/* =========================================
             FEED WRAPPER
          ========================================= */}

          <div

            style={{

              background:
                "rgba(15,23,42,0.46)",

              borderRadius: "24px",

              padding: "22px",

              border:
                "1px solid rgba(255,255,255,0.04)",

              backdropFilter: "blur(14px)",

              boxShadow:
                "0px 8px 30px rgba(0,0,0,0.30)",

              minHeight: "300px"

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
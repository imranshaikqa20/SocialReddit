import Navbar from "../components/layout/Navbar";

import CreatePostForm from "../components/posts/CreatePostForm";

function CreatePostPage() {

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

        `}

      </style>

      {/* =========================================
         BACKGROUND GLOW
      ========================================= */}

      <div

        style={{

          position: "fixed",

          top: "-100px",

          left: "-100px",

          width: "240px",

          height: "240px",

          background:
            "rgba(37,99,235,0.10)",

          filter: "blur(100px)",

          zIndex: 0

        }}

      />

      <div

        style={{

          position: "fixed",

          bottom: "-100px",

          right: "-100px",

          width: "240px",

          height: "240px",

          background:
            "rgba(59,130,246,0.08)",

          filter: "blur(100px)",

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

        <Navbar />

      </div>

      {/* =========================================
         MAIN WRAPPER
      ========================================= */}

      <div

        style={{

          width: "100%",

          display: "flex",

          justifyContent: "center",

          alignItems: "flex-start",

          padding: "50px 20px",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           CREATE POST CARD
        ========================================= */}

        <div

          style={{

            width: "100%",

            maxWidth: "760px",

            background:
              "rgba(15,23,42,0.72)",

            border:
              "1px solid rgba(255,255,255,0.05)",

            borderRadius: "28px",

            padding: "34px",

            backdropFilter: "blur(14px)",

            boxShadow:
              "0px 10px 35px rgba(0,0,0,0.35)"

          }}

        >

          {/* =========================================
             HEADER
          ========================================= */}

          <div

            style={{

              marginBottom: "32px"

            }}

          >

            <h1

              style={{

                margin: 0,

                marginBottom: "14px",

                fontSize: "42px",

                fontWeight: "800",

                color: "#f8fafc",

                letterSpacing: "0.5px"

              }}

            >

              Create New Post

            </h1>

            <p

              style={{

                margin: 0,

                color: "#94a3b8",

                fontSize: "15px",

                lineHeight: "28px",

                maxWidth: "620px"

              }}

            >

              Share your thoughts,
              memes, images,
              technology updates and
              community discussions
              with the world.

            </p>

          </div>

          {/* =========================================
             FORM
          ========================================= */}

          <CreatePostForm />

        </div>

      </div>

    </div>

  );

}

export default CreatePostPage;
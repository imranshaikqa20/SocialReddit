import Navbar from "../components/layout/Navbar";

import CreatePostForm from "../components/posts/CreatePostForm";

function CreatePostPage() {

  return (

    <div

      style={{

        minHeight: "100vh",

        background:
          "linear-gradient(180deg, #020617 0%, #071028 45%, #020617 100%)",

        color: "white",

        overflowX: "hidden",

        position: "relative"

      }}

    >

      {/* =========================================
         Background Glow
      ========================================= */}

      <div

        style={{

          position: "fixed",

          top: "-100px",

          left: "-100px",

          width: "220px",

          height: "220px",

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

          width: "220px",

          height: "220px",

          background:
            "rgba(59,130,246,0.08)",

          filter: "blur(100px)",

          zIndex: 0

        }}

      />

      {/* =========================================
         Navbar
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
         Main Wrapper
      ========================================= */}

      <div

        style={{

          width: "100%",

          display: "flex",

          justifyContent: "center",

          alignItems: "flex-start",

          padding: "40px 20px",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           Form Container
        ========================================= */}

        <div

          style={{

            width: "100%",

            maxWidth: "700px",

            background:
              "rgba(15,23,42,0.60)",

            border:
              "1px solid rgba(255,255,255,0.05)",

            borderRadius: "22px",

            padding: "24px",

            backdropFilter: "blur(12px)",

            boxShadow:
              "0px 6px 24px rgba(0,0,0,0.30)"

          }}

        >

          <CreatePostForm />

        </div>

      </div>

    </div>

  );

}

export default CreatePostPage;
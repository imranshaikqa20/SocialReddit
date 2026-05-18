import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";

import PostCard from "../components/posts/PostCard";

import api from "../services/api";

function ProfilePage() {

  /* =========================================
     USER INFO
  ========================================= */

  const username =
    localStorage.getItem("username") || "";

  const displayName = username
    ? username.split("@")[0]
    : "User";

  /* =========================================
     STATES
  ========================================= */

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH USER POSTS
  ========================================= */

  const fetchUserPosts = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/api/posts");

      const allPosts =
        Array.isArray(response.data)
          ? response.data
          : [];

      /* =========================================
         FILTER USER POSTS
      ========================================= */

      const userPosts =
        allPosts.filter((post) => {

          if (
            !post ||
            !post.author
          ) {
            return false;
          }

          return (

            String(post.author)
              .trim()
              .toLowerCase()

            ===

            String(username)
              .trim()
              .toLowerCase()

          );

        });

      /* =========================================
         SORT POSTS
      ========================================= */

      const sortedPosts =
        [...userPosts].sort(
          (a, b) => b.id - a.id
        );

      setPosts(sortedPosts);

    } catch (error) {

      console.log(
        "PROFILE POSTS ERROR :",
        error.response?.data || error.message
      );

      setPosts([]);

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     LOAD POSTS
  ========================================= */

  useEffect(() => {

    fetchUserPosts();

  }, []);

  return (

    <div

      style={{

        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617 0%,#071028 50%,#020617 100%)",

        color: "white",

        overflowX: "hidden"

      }}

    >

      {/* =========================================
         BACKGROUND GLOW
      ========================================= */}

      <div

        style={{

          position: "fixed",

          top: "-120px",

          left: "-120px",

          width: "240px",

          height: "240px",

          background:
            "rgba(37,99,235,0.12)",

          filter: "blur(120px)",

          zIndex: 0

        }}

      />

      <div

        style={{

          position: "fixed",

          bottom: "-120px",

          right: "-120px",

          width: "240px",

          height: "240px",

          background:
            "rgba(59,130,246,0.10)",

          filter: "blur(120px)",

          zIndex: 0

        }}

      />

      {/* =========================================
         NAVBAR
      ========================================= */}

      <Navbar />

      {/* =========================================
         MAIN CONTENT
      ========================================= */}

      <div

        style={{

          width: "90%",

          maxWidth: "1050px",

          margin: "30px auto",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* =========================================
           PROFILE CARD
        ========================================= */}

        <div

          style={{

            background:
              "rgba(15,23,42,0.82)",

            border:
              "1px solid rgba(59,130,246,0.10)",

            borderRadius: "26px",

            padding: "30px",

            boxShadow:
              "0px 6px 24px rgba(0,0,0,0.30)",

            backdropFilter: "blur(10px)",

            marginBottom: "30px"

          }}

        >

          <div

            style={{

              display: "flex",

              alignItems: "center",

              gap: "24px",

              flexWrap: "wrap"

            }}

          >

            {/* AVATAR */}

            <div

              style={{

                width: "100px",

                height: "100px",

                borderRadius: "50%",

                background:
                  "linear-gradient(to right,#2563eb,#38bdf8)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "white",

                fontSize: "40px",

                fontWeight: "800",

                boxShadow:
                  "0px 0px 24px rgba(37,99,235,0.35)"

              }}

            >

              {

                displayName
                  .charAt(0)
                  .toUpperCase()

              }

            </div>

            {/* USER INFO */}

            <div>

              <h1

                style={{

                  margin: 0,

                  fontSize: "36px",

                  fontWeight: "800",

                  color: "#f8fafc"

                }}

              >

                {displayName}

              </h1>

              <p

                style={{

                  marginTop: "8px",

                  color: "#94a3b8",

                  fontSize: "14px"

                }}

              >

                {username}

              </p>

              <p

                style={{

                  marginTop: "14px",

                  color: "#cbd5e1",

                  fontSize: "14px",

                  lineHeight: "26px",

                  maxWidth: "650px"

                }}

              >

                Welcome to your profile dashboard.
                Here you can manage all your
                posts, edit content, and delete
                posts anytime.

              </p>

            </div>

          </div>

        </div>

        {/* =========================================
           POSTS SECTION
        ========================================= */}

        <div>

          <h2

            style={{

              fontSize: "26px",

              marginBottom: "20px",

              color: "#f8fafc",

              fontWeight: "700"

            }}

          >

            My Posts

          </h2>

          {/* =========================================
             LOADING
          ========================================= */}

          {

            loading && (

              <div

                style={{

                  textAlign: "center",

                  padding: "30px",

                  color: "#94a3b8",

                  fontSize: "16px"

                }}

              >

                Loading posts...

              </div>

            )

          }

          {/* =========================================
             EMPTY STATE
          ========================================= */}

          {

            !loading &&
            posts.length === 0 && (

              <div

                style={{

                  background:
                    "rgba(15,23,42,0.82)",

                  padding: "30px",

                  borderRadius: "20px",

                  textAlign: "center",

                  color: "#94a3b8",

                  fontSize: "16px"

                }}

              >

                No posts created yet

              </div>

            )

          }

          {/* =========================================
             POSTS LIST
          ========================================= */}

          <div

            style={{

              display: "flex",

              flexDirection: "column",

              gap: "20px"

            }}

          >

            {

              posts.map((post) => (

                <PostCard

                  key={post.id}

                  id={post.id}

                  title={post.title}

                  content={post.content}

                  imageUrl={post.imageUrl}

                  votes={post.votes || 0}

                  comments={post.comments || 0}

                  author={post.author || "Anonymous"}

                  communityName={
                    post.community?.name ||
                    "General"
                  }

                  communityId={
                    post.community?.id
                  }

                  onPostUpdated={
                    fetchUserPosts
                  }

                  /* IMPORTANT */

                  showActions={true}

                />

              ))

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProfilePage;
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

      /* =========================================
         FETCH POSTS
      ========================================= */

      const response =
        await api.get("/api/posts");

      const allPosts =
        Array.isArray(response.data)
          ? response.data
          : [];

      /* =========================================
         FILTER CURRENT USER POSTS
      ========================================= */

      const userPosts =
        allPosts.filter((post) => {

          /* IMPORTANT SAFE CHECKS */

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
         SORT LATEST FIRST
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

  /* =========================================
     PAGE
  ========================================= */

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

          width: "220px",

          height: "220px",

          background:
            "rgba(37,99,235,0.12)",

          filter: "blur(110px)",

          zIndex: 0

        }}

      />

      <div

        style={{

          position: "fixed",

          bottom: "-120px",

          right: "-120px",

          width: "220px",

          height: "220px",

          background:
            "rgba(59,130,246,0.10)",

          filter: "blur(110px)",

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

          width: "88%",

          maxWidth: "1000px",

          margin: "28px auto",

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

            borderRadius: "24px",

            padding: "28px",

            boxShadow:
              "0px 6px 22px rgba(0,0,0,0.30)",

            backdropFilter: "blur(10px)",

            marginBottom: "28px"

          }}

        >

          <div

            style={{

              display: "flex",

              alignItems: "center",

              gap: "22px",

              flexWrap: "wrap"

            }}

          >

            {/* AVATAR */}

            <div

              style={{

                width: "95px",

                height: "95px",

                borderRadius: "50%",

                background:
                  "linear-gradient(to right,#2563eb,#38bdf8)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "white",

                fontSize: "38px",

                fontWeight: "800",

                boxShadow:
                  "0px 0px 22px rgba(37,99,235,0.35)"

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

                  fontSize: "34px",

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

                  lineHeight: "24px",

                  maxWidth: "620px"

                }}

              >

                Welcome to your profile.
                Here you can view all
                posts created by you.

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

              fontSize: "24px",

              marginBottom: "18px",

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

                  padding: "28px",

                  color: "#94a3b8",

                  fontSize: "16px"

                }}

              >

                Loading posts...

              </div>

            )

          }

          {/* =========================================
             NO POSTS
          ========================================= */}

          {

            !loading &&
            posts.length === 0 && (

              <div

                style={{

                  background:
                    "rgba(15,23,42,0.82)",

                  padding: "28px",

                  borderRadius: "18px",

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

              gap: "18px"

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
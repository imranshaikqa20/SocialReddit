import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";

import PostCard from "../components/posts/PostCard";

import api from "../services/api";

function ProfilePage() {

  /* =========================================
     Logged User
  ========================================= */

  const username =
    localStorage.getItem("username") || "";

  const displayName = username
    ? username.split("@")[0]
    : "User";

  /* =========================================
     States
  ========================================= */

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     Fetch User Posts
  ========================================= */

  const fetchUserPosts = async () => {

    try {

      setLoading(true);

      /* IMPORTANT FIX */

      const response =
        await api.get("/api/posts");

      const allPosts =
        response.data || [];

      /* =========================================
         Filter Current User Posts
      ========================================= */

      const userPosts =
        allPosts.filter((post) => {

          if (!post.author) {

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

      /* Latest First */

      const sortedPosts =
        userPosts.sort(

          (a, b) => b.id - a.id

        );

      setPosts(sortedPosts);

    } catch (error) {

      console.log(
        "Profile Posts Error :",
        error.response?.data || error
      );

      setPosts([]);

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     Load Posts
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
         Background Glow
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
         Navbar
      ========================================= */}

      <Navbar />

      {/* =========================================
         Main Content
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
           Profile Card
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

            {/* Avatar */}

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

            {/* User Info */}

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
           Posts Section
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
             Loading
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
             No Posts
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
             Posts
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

                  votes={post.votes}

                  comments={post.comments}

                  author={post.author}

                  communityName={
                    post.communityName
                  }

                  communityId={
                    post.communityId
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
import { useEffect, useState } from "react";

import api from "../../services/api";

import PostCard from "./PostCard";

function PostList({

  searchTerm

}) {

  /* =========================================
     States
  ========================================= */

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     Fetch Posts
  ========================================= */

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/posts");

      /* Latest First */

      const sortedPosts =

        response.data.sort(

          (a, b) => b.id - a.id

        );

      console.log(
        "POSTS =>",
        sortedPosts
      );

      setPosts(sortedPosts);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load posts ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     Load Posts
  ========================================= */

  useEffect(() => {

    fetchPosts();

  }, []);

  /* =========================================
     Filter Posts
  ========================================= */

  const filteredPosts = posts.filter(

    (post) =>

      post.title
        ?.toLowerCase()
        .includes(

          searchTerm
            ?.toLowerCase() || ""

        )

  );

  return (

    <div

      style={{

        display: "flex",

        flexDirection: "column",

        gap: "18px",

        width: "100%"

      }}

    >

      {/* =========================================
         Loading
      ========================================= */}

      {

        loading && (

          <div

            style={{

              textAlign: "center",

              padding: "40px 20px",

              color: "#94a3b8"

            }}

          >

            <div

              style={{

                fontSize: "18px",

                marginBottom: "8px"

              }}

            >

              🚀

            </div>

            <div

              style={{

                fontSize: "15px",

                fontWeight: "500"

              }}

            >

              Loading posts...

            </div>

          </div>

        )

      }

      {/* =========================================
         Empty State
      ========================================= */}

      {

        !loading &&

        filteredPosts.length === 0 && (

          <div

            style={{

              background:
                "rgba(15,23,42,0.78)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              borderRadius: "20px",

              padding: "38px",

              textAlign: "center",

              backdropFilter:
                "blur(10px)"

            }}

          >

            <h2

              style={{

                margin: 0,

                marginBottom: "10px",

                color: "#f8fafc",

                fontSize: "24px"

              }}

            >

              No Posts Found 🔍

            </h2>

            <p

              style={{

                margin: 0,

                color: "#94a3b8",

                fontSize: "14px",

                lineHeight: "24px"

              }}

            >

              Try another search keyword
              or create a new post.

            </p>

          </div>

        )

      }

      {/* =========================================
         Posts
      ========================================= */}

      {

        !loading &&

        filteredPosts.map((post) => (

          <PostCard

            key={post.id}

            id={post.id}

            title={post.title}

            content={post.content}

            imageUrl={

              post.imageUrl || ""

            }

            votes={

              post.votes || 0

            }

            /* IMPORTANT FIX */

            author={

              post.author || ""

            }

            comments={

              post.comments || 0

            }

            communityName={

              post.communityName

            }

            communityId={

              post.communityId

            }

            /* Refresh Feed */

            onPostUpdated={
              fetchPosts
            }

          />

        ))

      }

    </div>

  );

}


export default PostList;
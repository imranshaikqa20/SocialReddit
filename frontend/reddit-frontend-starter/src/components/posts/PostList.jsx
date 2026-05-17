import { useEffect, useState } from "react";

import api from "../../services/api";

import PostCard from "./PostCard";

function PostList({

  searchTerm

}) {

  /* =========================================
     STATES
  ========================================= */

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH POSTS
  ========================================= */

  const fetchPosts = async () => {

    try {

      setLoading(true);

      /* =========================================
         API CALL
      ========================================= */

      const response =
        await api.get("/api/posts");

      /* =========================================
         SAFE ARRAY CHECK
      ========================================= */

      const postsData =

        Array.isArray(response.data)

          ? response.data

          : [];

      /* =========================================
         FORMAT POSTS
      ========================================= */

      const formattedPosts =

        postsData.map((post) => ({

          ...post,

          /* SAFE COMMUNITY */

          communityName:

            post.community?.name ||

            "General",

          communityId:

            post.community?.id ||

            null,

          /* SAFE AUTHOR */

          author:

            post.author ||

            "Anonymous",

          /* SAFE VALUES */

          votes:

            post.votes || 0,

          comments:

            post.comments || 0,

          imageUrl:

            post.imageUrl || ""

        }));

      /* =========================================
         SORT LATEST FIRST
      ========================================= */

      const sortedPosts =

        [...formattedPosts].sort(

          (a, b) => b.id - a.id

        );

      console.log(
        "POSTS =>",
        sortedPosts
      );

      setPosts(sortedPosts);

    } catch (error) {

      console.log(
        "FETCH POSTS ERROR :",
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

    fetchPosts();

  }, []);

  /* =========================================
     FILTER POSTS
  ========================================= */

  const filteredPosts = posts.filter(

    (post) =>

      post?.title
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
         LOADING
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
         EMPTY STATE
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
         POSTS LIST
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
              post.imageUrl
            }

            votes={
              post.votes
            }

            author={
              post.author
            }

            comments={
              post.comments
            }

            communityName={
              post.communityName
            }

            communityId={
              post.communityId
            }

            /* REFRESH FEED */

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
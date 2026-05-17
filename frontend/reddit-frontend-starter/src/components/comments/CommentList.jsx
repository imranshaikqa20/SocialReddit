import { useEffect, useState } from "react";

import api from "../../services/api";

import CommentCard from "./CommentCard";

function CommentList({

  postId,

  refreshTrigger

}) {

  /* =========================================
     STATES
  ========================================= */

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH COMMENTS
  ========================================= */

  const fetchComments = async () => {

    try {

      setLoading(true);

      /* =========================================
         API CALL
      ========================================= */

      const response = await api.get(

        `/api/comments/post/${postId}`

      );

      /* =========================================
         SAFE ARRAY CHECK
      ========================================= */

      const commentsData =

        Array.isArray(response.data)

          ? response.data

          : [];

      /* =========================================
         SORT COMMENTS
      ========================================= */

      const sortedComments =

        [...commentsData].sort(

          (a, b) => b.id - a.id

        );

      setComments(sortedComments);

    } catch (error) {

      console.log(

        "FETCH COMMENTS ERROR :",

        error.response?.data ||

        error.message

      );

      setComments([]);

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     LOAD COMMENTS
  ========================================= */

  useEffect(() => {

    if (postId) {

      fetchComments();

    }

  }, [postId, refreshTrigger]);

  return (

    <div

      style={{

        marginTop: "22px"

      }}

    >

      {/* =========================================
         HEADER
      ========================================= */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          marginBottom: "18px",

          gap: "10px",

          flexWrap: "wrap"

        }}

      >

        {/* TITLE */}

        <h3

          style={{

            color: "#f8fafc",

            fontSize: "18px",

            fontWeight: "700",

            margin: 0

          }}

        >

          💬 Comments

        </h3>

        {/* COUNT */}

        <div

          style={{

            background:
              "rgba(59,130,246,0.12)",

            color: "#60a5fa",

            padding: "6px 12px",

            borderRadius: "10px",

            fontSize: "12px",

            fontWeight: "600",

            border:
              "1px solid rgba(96,165,250,0.15)"

          }}

        >

          {comments.length} Replies

        </div>

      </div>

      {/* =========================================
         LOADING
      ========================================= */}

      {

        loading ? (

          <div

            style={{

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              padding: "18px",

              borderRadius: "16px",

              color: "#94a3b8",

              fontSize: "14px",

              textAlign: "center"

            }}

          >

            🚀 Loading comments...

          </div>

        ) : comments.length === 0 ? (

          /* =========================================
             EMPTY STATE
          ========================================= */

          <div

            style={{

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              padding: "24px",

              borderRadius: "18px",

              textAlign: "center"

            }}

          >

            <p

              style={{

                margin: 0,

                color: "#94a3b8",

                fontSize: "14px"

              }}

            >

              No Comments Yet 🚀

            </p>

          </div>

        ) : (

          /* =========================================
             COMMENTS LIST
          ========================================= */

          <div

            style={{

              display: "flex",

              flexDirection: "column",

              gap: "16px"

            }}

          >

            {

              comments.map((comment) => (

                <CommentCard

                  key={comment.id}

                  author={
                    comment.author
                  }

                  content={
                    comment.content
                  }

                  createdAt={
                    comment.createdAt
                  }

                />

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default CommentList;
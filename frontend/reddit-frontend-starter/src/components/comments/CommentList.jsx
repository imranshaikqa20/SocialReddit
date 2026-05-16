import { useEffect, useState } from "react";

import api from "../../services/api";

import CommentCard from "./CommentCard";

function CommentList({ postId }) {

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* Fetch Comments */

  const fetchComments = async () => {

    try {

      setLoading(true);

      const response = await api.get(

        `/comments/post/${postId}`

      );

      setComments(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchComments();

  }, [postId]);

  return (

    <div
      style={{
        marginTop: "18px"
      }}
    >

      {/* Heading */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          marginBottom: "18px"

        }}

      >

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

      {/* Loading */}

      {

        loading ? (

          <div

            style={{

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              padding: "16px",

              borderRadius: "14px",

              color: "#94a3b8",

              fontSize: "14px",

              textAlign: "center"

            }}

          >

            Loading comments...

          </div>

        ) : comments.length === 0 ? (

          /* No Comments */

          <div

            style={{

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              padding: "20px",

              borderRadius: "16px",

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

          /* Comment List */

          <div

            style={{

              display: "flex",

              flexDirection: "column",

              gap: "14px"

            }}

          >

            {

              comments.map((comment) => (

                <CommentCard

                  key={comment.id}

                  author={comment.author}

                  content={comment.content}

                  createdAt={comment.createdAt}

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
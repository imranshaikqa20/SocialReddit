import React, { useEffect, useState } from "react";

import {
  FaArrowUp,
  FaArrowDown,
  FaComment,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import EditPostModal from "./EditPostModal";

import AddCommentForm from "../comments/AddCommentForm";
import CommentList from "../comments/CommentList";

/* =========================================
   API BASE
========================================= */

const API_BASE =
  "https://socialreddit-backend.onrender.com";

/* =========================================
   COMPONENT
========================================= */

function PostCard({

  id,
  title,
  content,
  imageUrl,
  votes,
  author,
  communityName,
  onPostUpdated,
  showActions = false

}) {

  /* =========================================
     STATES
  ========================================= */

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [commentsList, setCommentsList] =
    useState([]);

  const [showComments, setShowComments] =
    useState(false);

  /* =========================================
     IMAGE URL
  ========================================= */

  let finalImageUrl = "";

  if (imageUrl) {

    if (imageUrl.startsWith("http")) {

      finalImageUrl = imageUrl;

    } else {

      finalImageUrl =
        `${API_BASE}/${imageUrl.replace(/^\/+/, "")}`;

    }

  }

  /* =========================================
     FETCH COMMENTS
  ========================================= */

  const fetchComments = async () => {

    try {

      const response = await fetch(

        `${API_BASE}/api/comments/post/${id}`

      );

      const data =
        await response.json();

      setCommentsList(

        Array.isArray(data)
          ? data
          : []

      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComments();

  }, [id]);

  /* =========================================
     DELETE POST
  ========================================= */

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Delete this post?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(

        `${API_BASE}/api/posts/${id}`,

        {
          method: "DELETE"
        }

      );

      if (onPostUpdated) {

        onPostUpdated();

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <>

      {/* =========================================
         MAIN CARD
      ========================================= */}

      <div

        style={{

          background:
            "linear-gradient(180deg,#081028 0%, #0b132b 100%)",

          border:
            "1px solid rgba(59,130,246,0.08)",

          borderRadius: "18px",

          padding: "14px",

          width: "100%",

          maxWidth: "620px",

          margin: "0 auto 18px auto",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.18)",

          color: "white"

        }}

      >

        {/* =========================================
           COMMUNITY TAG
        ========================================= */}

        <div

          style={{

            display: "inline-flex",

            alignItems: "center",

            justifyContent: "center",

            padding: "4px 10px",

            borderRadius: "999px",

            background:
              "rgba(59,130,246,0.12)",

            color: "#60a5fa",

            fontSize: "9px",

            fontWeight: "700",

            marginBottom: "12px"

          }}

        >

          {communityName || "General"}

        </div>

        {/* =========================================
           AUTHOR
        ========================================= */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            marginBottom: "14px"

          }}

        >

          <div

            style={{

              width: "38px",

              height: "38px",

              borderRadius: "50%",

              background:
                "linear-gradient(135deg,#3b82f6,#2563eb)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: "800",

              fontSize: "14px",

              marginRight: "10px"

            }}

          >

            {author?.charAt(0)?.toUpperCase() || "A"}

          </div>

          <div>

            <div

              style={{

                fontSize: "14px",

                fontWeight: "700"

              }}

            >

              {author || "Anonymous"}

            </div>

            <div

              style={{

                fontSize: "10px",

                color: "#94a3b8",

                marginTop: "2px"

              }}

            >

              Posted in community

            </div>

          </div>

          {/* VOTES */}

          <div

            style={{

              marginLeft: "auto",

              background:
                "rgba(37,99,235,0.18)",

              padding: "5px 10px",

              borderRadius: "10px",

              color: "#60a5fa",

              fontWeight: "700",

              fontSize: "10px"

            }}

          >

            {votes || 0} Votes

          </div>

        </div>

        {/* =========================================
           TITLE
        ========================================= */}

        <h2

          style={{

            fontSize: "20px",

            lineHeight: "30px",

            fontWeight: "800",

            marginBottom: "10px"

          }}

        >

          {title}

        </h2>

        {/* =========================================
           CONTENT
        ========================================= */}

        <p

          style={{

            color: "#cbd5e1",

            lineHeight: "24px",

            fontSize: "13px",

            marginBottom: "14px"

          }}

        >

          {content}

        </p>

        {/* =========================================
           IMAGE
        ========================================= */}

        {

          finalImageUrl && (

            <div

              style={{

                marginBottom: "14px",

                borderRadius: "14px",

                overflow: "hidden",

                padding: "6px",

                background:
                  "rgba(15,23,42,0.70)",

                border:
                  "1px solid rgba(59,130,246,0.08)"

              }}

            >

              <img

                src={finalImageUrl}

                alt="post"

                style={{

                  width: "100%",

                  maxHeight: "260px",

                  objectFit: "cover",

                  borderRadius: "10px",

                  display: "block"

                }}

              />

            </div>

          )

        }

        {/* =========================================
           ACTIONS
        ========================================= */}

        <div

          style={{

            display: "flex",

            gap: "6px",

            flexWrap: "wrap",

            marginTop: "8px"

          }}

        >

          {/* UPVOTE */}

          <button

            style={{

              background:
                "linear-gradient(to right,#22c55e,#16a34a)",

              border: "none",

              color: "white",

              padding: "8px 12px",

              borderRadius: "10px",

              display: "flex",

              alignItems: "center",

              gap: "4px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "11px"

            }}

          >

            <FaArrowUp />

            Upvote

          </button>

          {/* DOWNVOTE */}

          <button

            style={{

              background:
                "linear-gradient(to right,#ef4444,#dc2626)",

              border: "none",

              color: "white",

              padding: "8px 12px",

              borderRadius: "10px",

              display: "flex",

              alignItems: "center",

              gap: "4px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "11px"

            }}

          >

            <FaArrowDown />

            Downvote

          </button>

          {/* COMMENTS */}

          <button

            onClick={() =>
              setShowComments(
                !showComments
              )
            }

            style={{

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              border: "none",

              color: "white",

              padding: "8px 12px",

              borderRadius: "10px",

              display: "flex",

              alignItems: "center",

              gap: "4px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "11px"

            }}

          >

            <FaComment />

            {

              showComments
                ? "Hide"
                : commentsList.length

            }

          </button>

          {/* EDIT DELETE */}

          {

            showActions && (

              <>

                <button

                  onClick={() =>
                    setShowEditModal(true)
                  }

                  style={{

                    background:
                      "linear-gradient(to right,#f59e0b,#d97706)",

                    border: "none",

                    color: "white",

                    padding: "8px 12px",

                    borderRadius: "10px",

                    display: "flex",

                    alignItems: "center",

                    gap: "4px",

                    fontWeight: "700",

                    cursor: "pointer",

                    fontSize: "11px"

                  }}

                >

                  <FaEdit />

                  Edit

                </button>

                <button

                  onClick={handleDelete}

                  style={{

                    background:
                      "linear-gradient(to right,#dc2626,#b91c1c)",

                    border: "none",

                    color: "white",

                    padding: "8px 12px",

                    borderRadius: "10px",

                    display: "flex",

                    alignItems: "center",

                    gap: "4px",

                    fontWeight: "700",

                    cursor: "pointer",

                    fontSize: "11px"

                  }}

                >

                  <FaTrash />

                  Delete

                </button>

              </>

            )

          }

        </div>

        {/* =========================================
           COMMENTS
        ========================================= */}

        {

          showComments && (

            <div
              style={{
                marginTop: "16px"
              }}
            >

              <AddCommentForm

                postId={id}

                onCommentAdded={() => {

                  fetchComments();

                }}

              />

              <div
                style={{
                  marginTop: "14px"
                }}
              >

                <CommentList

                  postId={id}

                  refreshTrigger={
                    commentsList.length
                  }

                />

              </div>

            </div>

          )

        }

      </div>

      {/* =========================================
         EDIT MODAL
      ========================================= */}

      {

        showEditModal && (

          <EditPostModal

            post={{
              id,
              title,
              content,
              imageUrl
            }}

            onClose={() =>
              setShowEditModal(false)
            }

            onPostUpdated={
              onPostUpdated
            }

          />

        )

      }

    </>

  );

}

export default PostCard;
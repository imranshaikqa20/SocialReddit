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
            "1px solid rgba(59,130,246,0.10)",

          borderRadius: "20px",

          padding: "18px",

          width: "100%",

          maxWidth: "760px",

          margin: "0 auto 20px auto",

          boxShadow:
            "0 4px 18px rgba(0,0,0,0.25)",

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

            padding: "5px 12px",

            borderRadius: "999px",

            background:
              "rgba(59,130,246,0.12)",

            color: "#60a5fa",

            fontSize: "10px",

            fontWeight: "700",

            marginBottom: "14px"

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

            marginBottom: "18px"

          }}

        >

          <div

            style={{

              width: "44px",

              height: "44px",

              borderRadius: "50%",

              background:
                "linear-gradient(135deg,#3b82f6,#2563eb)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: "800",

              fontSize: "16px",

              marginRight: "12px"

            }}

          >

            {author?.charAt(0)?.toUpperCase() || "A"}

          </div>

          <div>

            <div

              style={{

                fontSize: "15px",

                fontWeight: "700"

              }}

            >

              {author || "Anonymous"}

            </div>

            <div

              style={{

                fontSize: "11px",

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

              padding: "7px 12px",

              borderRadius: "10px",

              color: "#60a5fa",

              fontWeight: "700",

              fontSize: "11px"

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

            fontSize: "28px",

            lineHeight: "38px",

            fontWeight: "800",

            marginBottom: "12px"

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

            lineHeight: "28px",

            fontSize: "15px",

            marginBottom: "20px"

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

                marginBottom: "20px",

                borderRadius: "18px",

                overflow: "hidden",

                padding: "10px",

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

                  maxHeight: "420px",

                  objectFit: "cover",

                  borderRadius: "14px",

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

            gap: "8px",

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

              padding: "10px 16px",

              borderRadius: "12px",

              display: "flex",

              alignItems: "center",

              gap: "6px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "13px"

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

              padding: "10px 16px",

              borderRadius: "12px",

              display: "flex",

              alignItems: "center",

              gap: "6px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "13px"

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

              padding: "10px 16px",

              borderRadius: "12px",

              display: "flex",

              alignItems: "center",

              gap: "6px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "13px"

            }}

          >

            <FaComment />

            {

              showComments

                ? "Hide"

                : commentsList.length

            }

          </button>

          {/* EDIT */}

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

                    padding: "10px 16px",

                    borderRadius: "12px",

                    display: "flex",

                    alignItems: "center",

                    gap: "6px",

                    fontWeight: "700",

                    cursor: "pointer",

                    fontSize: "13px"

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

                    padding: "10px 16px",

                    borderRadius: "12px",

                    display: "flex",

                    alignItems: "center",

                    gap: "6px",

                    fontWeight: "700",

                    cursor: "pointer",

                    fontSize: "13px"

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
                marginTop: "18px"
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
                  marginTop: "16px"
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
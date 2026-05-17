import React, { useEffect, useState } from "react";

import {
  FaArrowUp,
  FaArrowDown,
  FaComment,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import EditPostModal from "./EditPostModal";

/* COMMENTS */

import AddCommentForm from "../comments/AddCommentForm";
import CommentList from "../comments/CommentList";

/* =========================================
   BACKEND URL
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

  const [imageError, setImageError] =
    useState(false);

  /* =========================================
     FIX IMAGE URL
  ========================================= */

  let finalImageUrl = "";

  if (imageUrl) {

    if (imageUrl.startsWith("http")) {

      finalImageUrl =
        `${imageUrl}?t=${Date.now()}`;

    } else {

      const cleanPath =
        imageUrl.replace(/^\/+/, "");

      finalImageUrl =
        `${API_BASE}/${cleanPath}?t=${Date.now()}`;

    }

  }

  console.log("POST IMAGE URL =>", finalImageUrl);

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

      setCommentsList([]);

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

    if (!confirmDelete) {

      return;

    }

    try {

      await fetch(

        `${API_BASE}/api/posts/${id}`,

        {
          method: "DELETE"
        }

      );

      alert(
        "Post deleted successfully"
      );

      if (onPostUpdated) {

        onPostUpdated();

      }

    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }

  };

  return (

    <>

      <div

        style={{

          background:
            "rgba(15,23,42,0.94)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "20px",

          padding: "18px",

          color: "white",

          width: "100%",

          maxWidth: "720px",

          margin: "0 auto",

          boxShadow:
            "0px 8px 26px rgba(0,0,0,0.24)",

          backdropFilter: "blur(12px)"

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

            fontSize: "11px",

            fontWeight: "700",

            marginBottom: "16px"

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

            marginBottom: "16px"

          }}

        >

          <div

            style={{

              width: "42px",

              height: "42px",

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

                fontWeight: "700",

                fontSize: "15px",

                color: "#f8fafc"

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

        </div>

        {/* =========================================
           TITLE
        ========================================= */}

        <h2

          style={{

            fontSize: "22px",

            lineHeight: "32px",

            marginBottom: "12px",

            fontWeight: "800",

            color: "#f8fafc"

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

            marginBottom: "18px",

            fontSize: "15px"

          }}

        >

          {content}

        </p>

        {/* =========================================
           IMAGE
        ========================================= */}

        {

          finalImageUrl &&
          !imageError && (

            <div

              style={{

                width: "100%",

                marginBottom: "18px",

                overflow: "hidden",

                borderRadius: "16px",

                background: "#0f172a",

                border:
                  "1px solid rgba(255,255,255,0.06)"

              }}

            >

              <img

                src={finalImageUrl}

                alt="post"

                loading="lazy"

                style={{

                  width: "100%",

                  maxHeight: "320px",

                  objectFit: "cover",

                  display: "block",

                  borderRadius: "16px"

                }}

                onLoad={() => {

                  console.log(
                    "Image Loaded Successfully"
                  );

                }}

                onError={(e) => {

                  console.log(
                    "IMAGE LOAD FAILED =>",
                    finalImageUrl
                  );

                  setImageError(true);

                }}

              />

            </div>

          )

        }

        {/* =========================================
           IMAGE FALLBACK
        ========================================= */}

        {

          imageError && (

            <div

              style={{

                width: "100%",

                height: "220px",

                borderRadius: "16px",

                marginBottom: "18px",

                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px dashed rgba(255,255,255,0.12)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "#94a3b8",

                fontSize: "14px",

                fontWeight: "600"

              }}

            >

              Image not available

            </div>

          )

        }

        {/* =========================================
           DIVIDER
        ========================================= */}

        <hr

          style={{

            border: "none",

            borderTop:
              "1px solid rgba(255,255,255,0.06)",

            marginBottom: "18px"

          }}

        />

        {/* =========================================
           ACTION BUTTONS
        ========================================= */}

        <div

          style={{

            display: "flex",

            gap: "10px",

            marginBottom: "16px",

            flexWrap: "wrap"

          }}

        >

          {/* UPVOTE */}

          <button

            style={{

              background:
                "linear-gradient(to right,#22c55e,#16a34a)",

              border: "none",

              color: "white",

              padding: "9px 14px",

              borderRadius: "10px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "8px",

              fontSize: "12px"

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

              padding: "9px 14px",

              borderRadius: "10px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "8px",

              fontSize: "12px"

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

              padding: "9px 14px",

              borderRadius: "10px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "8px",

              fontSize: "12px"

            }}

          >

            <FaComment />

            {

              showComments

                ? "Hide Comments"

                : `${commentsList.length} Comments`

            }

          </button>

          {/* EDIT & DELETE */}

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

                    padding: "9px 14px",

                    borderRadius: "10px",

                    fontWeight: "700",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    gap: "8px",

                    fontSize: "12px"

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

                    padding: "9px 14px",

                    borderRadius: "10px",

                    fontWeight: "700",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    gap: "8px",

                    fontSize: "12px"

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
           COMMENTS SECTION
        ========================================= */}

        {

          showComments && (

            <>

              <div
                style={{
                  marginTop: "16px"
                }}
              >

                <AddCommentForm

                  postId={id}

                  onCommentAdded={() => {

                    fetchComments();

                    setShowComments(true);

                  }}

                />

              </div>

              <div

                style={{

                  marginTop: "22px",

                  background:
                    "rgba(15,23,42,0.45)",

                  border:
                    "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "16px",

                  padding: "16px"

                }}

              >

                <CommentList

                  postId={id}

                  refreshTrigger={
                    commentsList.length
                  }

                />

              </div>

            </>

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
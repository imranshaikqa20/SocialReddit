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

  /* =========================================
     FIX IMAGE URL
  ========================================= */

  let finalImageUrl = "";

  if (imageUrl) {

    if (imageUrl.startsWith("http")) {

      finalImageUrl = imageUrl;

    } else {

      const cleanPath =
        imageUrl.replace(/^\/+/, "");

      finalImageUrl =
        `${API_BASE}/${cleanPath}`;

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

      {/* =========================================
         MAIN POST CARD
      ========================================= */}

      <div

        style={{

          background:
            "rgba(15,23,42,0.94)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "16px",

          padding: "14px",

          color: "white",

          width: "100%",

          maxWidth: "540px",

          margin: "0 auto 18px auto",

          boxShadow:
            "0px 4px 14px rgba(0,0,0,0.20)",

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

                fontWeight: "700",

                fontSize: "13px",

                color: "#f8fafc"

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

          {/* =========================================
             VOTES
          ========================================= */}

          <div

            style={{

              marginLeft: "auto",

              background:
                "rgba(37,99,235,0.18)",

              padding: "5px 10px",

              borderRadius: "8px",

              color: "#60a5fa",

              fontWeight: "700",

              fontSize: "9px"

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

            lineHeight: "28px",

            marginBottom: "10px",

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

            lineHeight: "22px",

            marginBottom: "14px",

            fontSize: "13px"

          }}

        >

          {content}

        </p>

        {/* =========================================
           IMAGE SECTION
        ========================================= */}

        {

          finalImageUrl && (

            <div

              style={{

                width: "100%",

                marginBottom: "14px",

                borderRadius: "14px",

                overflow: "hidden",

                background:
                  "#0f172a",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center"

              }}

            >

              <img

                src={finalImageUrl}

                alt="post"

                style={{

                  width: "100%",

                  height: "auto",

                  maxHeight: "320px",

                  objectFit: "contain",

                  display: "block",

                  borderRadius: "14px"

                }}

                onError={(e) => {

                  e.target.style.display =
                    "none";

                }}

              />

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

            marginBottom: "14px"

          }}

        />

        {/* =========================================
           ACTION BUTTONS
        ========================================= */}

        <div

          style={{

            display: "flex",

            gap: "6px",

            marginBottom: "14px",

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

              padding: "7px 12px",

              borderRadius: "10px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "5px",

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

              padding: "7px 12px",

              borderRadius: "10px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "5px",

              fontSize: "11px"

            }}

          >

            <FaArrowDown />

            Downvote

          </button>

          {/* COMMENTS BUTTON */}

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

              padding: "7px 12px",

              borderRadius: "10px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "5px",

              fontSize: "11px"

            }}

          >

            <FaComment />

            {

              showComments

                ? "Hide"

                : `${commentsList.length}`

            }

          </button>

          {/* =========================================
             EDIT & DELETE
          ========================================= */}

          {

            showActions && (

              <>

                {/* EDIT */}

                <button

                  onClick={() =>
                    setShowEditModal(true)
                  }

                  style={{

                    background:
                      "linear-gradient(to right,#f59e0b,#d97706)",

                    border: "none",

                    color: "white",

                    padding: "7px 12px",

                    borderRadius: "10px",

                    fontWeight: "700",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    gap: "5px",

                    fontSize: "11px"

                  }}

                >

                  <FaEdit />

                  Edit

                </button>

                {/* DELETE */}

                <button

                  onClick={handleDelete}

                  style={{

                    background:
                      "linear-gradient(to right,#dc2626,#b91c1c)",

                    border: "none",

                    color: "white",

                    padding: "7px 12px",

                    borderRadius: "10px",

                    fontWeight: "700",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    gap: "5px",

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
           COMMENTS SECTION
        ========================================= */}

        {

          showComments && (

            <>

              {/* ADD COMMENT */}

              <div
                style={{
                  marginTop: "14px"
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

              {/* COMMENTS LIST */}

              <div

                style={{

                  marginTop: "18px",

                  background:
                    "rgba(15,23,42,0.45)",

                  border:
                    "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "14px",

                  padding: "14px"

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
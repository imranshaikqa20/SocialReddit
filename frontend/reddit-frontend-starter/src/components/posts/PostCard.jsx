import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import CommentList from "../comments/CommentList";

import AddCommentForm from "../comments/AddCommentForm";

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
  comments,
  communityName,
  communityId,
  onPostUpdated

}) {

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [showComments, setShowComments] =
    useState(false);

  const [voteCount, setVoteCount] =
    useState(votes || 0);

  const [loading, setLoading] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [deleted, setDeleted] =
    useState(false);

  /* =========================================
     EDIT STATES
  ========================================= */

  const [editTitle, setEditTitle] =
    useState(title);

  const [editContent, setEditContent] =
    useState(content);

  const [editImageUrl, setEditImageUrl] =
    useState(imageUrl || "");

  /* =========================================
     USER
  ========================================= */

  const loggedInUser =

    localStorage.getItem("username")

    ||

    "User";

  /* =========================================
     AUTHOR
  ========================================= */

  const cleanAuthor =

    author &&
    typeof author === "string" &&
    author.trim() !== ""

      ? author

      : "Anonymous";

  const displayAuthor =

    cleanAuthor.split("@")[0];

  const isOwner =

    loggedInUser
      .trim()
      .toLowerCase()

    ===

    cleanAuthor
      .trim()
      .toLowerCase();

  /* =========================================
     DELETE
  ========================================= */

  if (deleted) {

    return null;

  }

  /* =========================================
     IMAGE FIX
  ========================================= */

  let finalImageUrl = "";

  if (editImageUrl) {

    /* FULL URL */

    if (
      editImageUrl.startsWith("http")
    ) {

      finalImageUrl =
        editImageUrl;

    } else {

      /* REMOVE EXTRA SLASHES */

      const cleanPath =

        editImageUrl.replace(
          /^\/+/,
          ""
        );

      /* FINAL IMAGE URL */

      finalImageUrl =
        `${API_BASE}/${cleanPath}`;

    }

  }

  console.log(
    "FINAL IMAGE URL =>",
    finalImageUrl
  );

  /* =========================================
     UPVOTE
  ========================================= */

  const handleUpvote = async () => {

    try {

      setLoading(true);

      const response =
        await api.put(
          `/posts/${id}/upvote`
        );

      setVoteCount(
        response.data.votes
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     DOWNVOTE
  ========================================= */

  const handleDownvote = async () => {

    try {

      setLoading(true);

      const response =
        await api.put(
          `/posts/${id}/downvote`
        );

      setVoteCount(
        response.data.votes
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     DELETE
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

      await api.delete(
        `/posts/${id}`
      );

      setDeleted(true);

      if (onPostUpdated) {

        onPostUpdated();

      }

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed ❌"
      );

    }

  };

  /* =========================================
     SAVE EDIT
  ========================================= */

  const handleSaveEdit = async () => {

    try {

      await api.put(

        `/posts/${id}`,

        {

          title: editTitle,

          content: editContent,

          imageUrl: editImageUrl

        }

      );

      setEditing(false);

      if (onPostUpdated) {

        onPostUpdated();

      }

      alert(
        "Post Updated 🚀"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update failed ❌"
      );

    }

  };

  return (

    <div

      style={{

        background:
          "linear-gradient(135deg,#0f172a,#111827)",

        border:
          "1px solid rgba(59,130,246,0.08)",

        borderRadius: "16px",

        padding: "16px",

        boxShadow:
          "0 6px 18px rgba(0,0,0,0.24)",

        overflow: "hidden",

        maxWidth: "720px",

        margin: "0 auto",

        color: "white"

      }}

    >

      {/* =========================================
         COMMUNITY
      ========================================= */}

      {

        communityName && (

          <button

            onClick={() =>

              navigate(
                `/community/${communityId}`
              )

            }

            style={{

              background:
                "rgba(37,99,235,0.12)",

              border:
                "1px solid rgba(59,130,246,0.14)",

              color: "#60a5fa",

              padding: "5px 12px",

              borderRadius: "999px",

              fontSize: "10px",

              fontWeight: "700",

              cursor: "pointer",

              marginBottom: "14px"

            }}

          >

            {communityName}

          </button>

        )

      }

      {/* =========================================
         HEADER
      ========================================= */}

      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: "14px"

        }}

      >

        {/* USER */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: "10px"

          }}

        >

          {/* AVATAR */}

          <div

            style={{

              width: "38px",

              height: "38px",

              borderRadius: "50%",

              background:
                "linear-gradient(to right,#2563eb,#38bdf8)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              color: "white",

              fontWeight: "700",

              fontSize: "14px"

            }}

          >

            {

              displayAuthor
                .charAt(0)
                .toUpperCase()

            }

          </div>

          {/* INFO */}

          <div>

            <h4

              style={{

                margin: 0,

                color: "#f8fafc",

                fontSize: "14px"

              }}

            >

              {displayAuthor}

            </h4>

            <p

              style={{

                margin: "2px 0 0 0",

                color: "#94a3b8",

                fontSize: "11px"

              }}

            >

              Posted in community

            </p>

          </div>

        </div>

        {/* VOTES */}

        <div

          style={{

            background:
              "rgba(37,99,235,0.12)",

            color: "#60a5fa",

            padding: "6px 10px",

            borderRadius: "10px",

            fontSize: "11px",

            fontWeight: "700"

          }}

        >

          {voteCount} Votes

        </div>

      </div>

      {/* =========================================
         EDIT MODE
      ========================================= */}

      {

        editing ? (

          <div>

            <input

              type="text"

              value={editTitle}

              onChange={(e) =>

                setEditTitle(
                  e.target.value
                )

              }

              style={{

                width: "100%",

                padding: "10px",

                marginBottom: "10px",

                borderRadius: "10px",

                border: "none",

                background: "#1e293b",

                color: "white"

              }}

            />

            <textarea

              value={editContent}

              onChange={(e) =>

                setEditContent(
                  e.target.value
                )

              }

              rows={4}

              style={{

                width: "100%",

                padding: "10px",

                marginBottom: "10px",

                borderRadius: "10px",

                border: "none",

                background: "#1e293b",

                color: "white"

              }}

            />

            <input

              type="text"

              value={editImageUrl}

              onChange={(e) =>

                setEditImageUrl(
                  e.target.value
                )

              }

              placeholder="Image URL"

              style={{

                width: "100%",

                padding: "10px",

                marginBottom: "10px",

                borderRadius: "10px",

                border: "none",

                background: "#1e293b",

                color: "white"

              }}

            />

            <button

              onClick={handleSaveEdit}

              style={{

                background:
                  "#2563eb",

                border: "none",

                color: "white",

                padding: "10px 16px",

                borderRadius: "10px",

                cursor: "pointer",

                fontWeight: "700"

              }}

            >

              Save Changes

            </button>

          </div>

        ) : (

          <>

            {/* TITLE */}

            <h2

              style={{

                color: "#f8fafc",

                fontSize: "18px",

                fontWeight: "700",

                marginBottom: "10px"

              }}

            >

              {editTitle}

            </h2>

            {/* CONTENT */}

            <p

              style={{

                color: "#cbd5e1",

                fontSize: "13px",

                lineHeight: "22px",

                marginBottom: "14px"

              }}

            >

              {editContent}

            </p>

            {/* IMAGE */}

            {

              finalImageUrl && (

                <img

                  src={finalImageUrl}

                  alt="Post"

                  style={{

                    width: "100%",

                    maxHeight: "280px",

                    objectFit: "cover",

                    borderRadius: "12px",

                    marginBottom: "14px",

                    border:
                      "1px solid rgba(255,255,255,0.08)"

                  }}

                  onLoad={() => {

                    console.log(
                      "IMAGE LOADED SUCCESS"
                    );

                  }}

                  onError={(e) => {

                    console.log(
                      "IMAGE FAILED =>",
                      finalImageUrl
                    );

                    e.target.style.display =
                      "none";

                  }}

                />

              )

            }

          </>

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

          marginTop: "14px",

          paddingTop: "14px",

          borderTop:
            "1px solid rgba(255,255,255,0.06)"

        }}

      >

        {/* UPVOTE */}

        <button

          onClick={handleUpvote}

          disabled={loading}

          style={{

            background: "#16a34a",

            border: "none",

            color: "white",

            padding: "8px 14px",

            borderRadius: "10px",

            fontWeight: "700",

            cursor: "pointer",

            fontSize: "12px"

          }}

        >

          👍 {voteCount}

        </button>

        {/* DOWNVOTE */}

        <button

          onClick={handleDownvote}

          disabled={loading}

          style={{

            background: "#dc2626",

            border: "none",

            color: "white",

            padding: "8px 14px",

            borderRadius: "10px",

            fontWeight: "700",

            cursor: "pointer",

            fontSize: "12px"

          }}

        >

          👎

        </button>

        {/* COMMENTS */}

        <button

          onClick={() =>

            setShowComments(
              !showComments
            )

          }

          style={{

            background: "#2563eb",

            border: "none",

            color: "white",

            padding: "8px 14px",

            borderRadius: "10px",

            fontWeight: "700",

            cursor: "pointer",

            fontSize: "12px"

          }}

        >

          💬 {comments || 0}

        </button>

        {/* EDIT */}

        {

          isOwner && (

            <button

              onClick={() =>

                setEditing(!editing)

              }

              style={{

                background: "#f59e0b",

                border: "none",

                color: "white",

                padding: "8px 14px",

                borderRadius: "10px",

                fontWeight: "700",

                cursor: "pointer",

                fontSize: "12px"

              }}

            >

              ✏ Edit

            </button>

          )

        }

        {/* DELETE */}

        {

          isOwner && (

            <button

              onClick={handleDelete}

              style={{

                background: "#ef4444",

                border: "none",

                color: "white",

                padding: "8px 14px",

                borderRadius: "10px",

                fontWeight: "700",

                cursor: "pointer",

                fontSize: "12px"

              }}

            >

              🗑 Delete

            </button>

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

            />

            <CommentList

              postId={id}

            />

          </div>

        )

      }

    </div>

  );

}

export default PostCard;
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import CommentList from "../comments/CommentList";

import AddCommentForm from "../comments/AddCommentForm";

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
  onPostUpdated,

  /* NEW PROP */

  showActions = false

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
    useState(title || "");

  const [editContent, setEditContent] =
    useState(content || "");

  const [editImageUrl, setEditImageUrl] =
    useState(imageUrl || "");

  /* =========================================
     LOGGED USER
  ========================================= */

  const loggedInUser =

    localStorage.getItem("username")

    ||

    "";

  /* =========================================
     SAFE AUTHOR
  ========================================= */

  const cleanAuthor =

    author &&

    typeof author === "string" &&

    author.trim() !== "" &&

    author !== "undefined" &&

    author !== "null"

      ? author

      : "Anonymous";

  /* =========================================
     DISPLAY AUTHOR
  ========================================= */

  const displayAuthor =

    cleanAuthor.split("@")[0];

  /* =========================================
     OWNER CHECK
  ========================================= */

  const isOwner =

    loggedInUser &&

    cleanAuthor &&

    loggedInUser
      .trim()
      .toLowerCase()

    ===

    cleanAuthor
      .trim()
      .toLowerCase();

  /* =========================================
     HIDE DELETED
  ========================================= */

  if (deleted) {

    return null;

  }

  /* =========================================
     UPVOTE
  ========================================= */

  const handleUpvote = async () => {

    try {

      setLoading(true);

      const response = await api.put(
        `/api/posts/${id}/upvote`
      );

      setVoteCount(
        response?.data?.votes || 0
      );

    } catch (error) {

      console.log(
        "UPVOTE ERROR :",
        error.response?.data || error.message
      );

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

      const response = await api.put(
        `/api/posts/${id}/downvote`
      );

      setVoteCount(
        response?.data?.votes || 0
      );

    } catch (error) {

      console.log(
        "DOWNVOTE ERROR :",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };

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

      await api.delete(
        `/api/posts/${id}`
      );

      setDeleted(true);

      if (onPostUpdated) {

        onPostUpdated();

      }

    } catch (error) {

      console.log(
        "DELETE ERROR :",
        error.response?.data || error.message
      );

      alert(
        "Failed to delete ❌"
      );

    }

  };

  /* =========================================
     SAVE EDIT
  ========================================= */

  const handleSaveEdit = async () => {

    try {

      await api.put(

        `/api/posts/${id}`,

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
        "Post Updated Successfully 🚀"
      );

    } catch (error) {

      console.log(
        "UPDATE ERROR :",
        error.response?.data || error.message
      );

      alert(
        "Failed to update ❌"
      );

    }

  };

  return (

    <div

      style={{

        background:
          "linear-gradient(135deg,#0f172a,#111827)",

        border:
          "1px solid rgba(59,130,246,0.10)",

        borderRadius: "22px",

        padding: "18px",

        boxShadow:
          "0 8px 24px rgba(0,0,0,0.24)",

        overflow: "hidden",

        backdropFilter: "blur(10px)"

      }}

    >

      {/* =========================================
         COMMUNITY BADGE
      ========================================= */}

      {

        communityName && (

          <button

            onClick={() =>

              communityId &&

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

              fontWeight: "600",

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

          marginBottom: "14px",

          gap: "10px",

          flexWrap: "wrap"

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

              width: "42px",

              height: "42px",

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

                fontSize: "15px"

              }}

            >

              {displayAuthor}

            </h4>

            <p

              style={{

                margin: "3px 0 0 0",

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

            padding: "7px 12px",

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

                padding: "12px",

                marginBottom: "12px",

                borderRadius: "12px",

                border: "none",

                background: "#1e293b",

                color: "white",

                fontSize: "15px"

              }}

            />

            <textarea

              value={editContent}

              onChange={(e) =>

                setEditContent(
                  e.target.value
                )

              }

              rows={5}

              style={{

                width: "100%",

                padding: "12px",

                marginBottom: "12px",

                borderRadius: "12px",

                border: "none",

                background: "#1e293b",

                color: "white",

                fontSize: "14px"

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

                padding: "12px",

                marginBottom: "12px",

                borderRadius: "12px",

                border: "none",

                background: "#1e293b",

                color: "white",

                fontSize: "14px"

              }}

            />

            <button

              onClick={handleSaveEdit}

              style={{

                background:
                  "linear-gradient(to right,#2563eb,#3b82f6)",

                border: "none",

                color: "white",

                padding: "10px 16px",

                borderRadius: "12px",

                fontWeight: "700",

                cursor: "pointer"

              }}

            >

              Save Changes

            </button>

          </div>

        ) : (

          <>

            <h2

              style={{

                color: "#f8fafc",

                fontSize: "21px",

                fontWeight: "700",

                marginBottom: "10px"

              }}

            >

              {editTitle}

            </h2>

            <p

              style={{

                color: "#cbd5e1",

                fontSize: "14px",

                lineHeight: "26px",

                marginBottom: "16px"

              }}

            >

              {editContent}

            </p>

            {

              editImageUrl && (

                <div

                  style={{

                    width: "100%",

                    overflow: "hidden",

                    borderRadius: "18px",

                    marginBottom: "18px"

                  }}

                >

                  <img

                    src={editImageUrl}

                    alt="Post"

                    style={{

                      width: "100%",

                      objectFit: "cover"

                    }}

                    onError={(e) => {

                      e.target.style.display =
                        "none";

                    }}

                  />

                </div>

              )

            }

          </>

        )

      }

      {/* =========================================
         ACTION BUTTONS
      ========================================= */}

      <div

        style={{

          display: "flex",

          gap: "12px",

          flexWrap: "wrap",

          marginTop: "18px",

          paddingTop: "16px",

          borderTop:
            "1px solid rgba(255,255,255,0.06)"

        }}

      >

        <button

          onClick={handleUpvote}

          disabled={loading}

          style={{

            background:
              "linear-gradient(to right,#16a34a,#22c55e)",

            border: "none",

            color: "white",

            padding: "10px 16px",

            borderRadius: "12px",

            fontWeight: "700",

            cursor: "pointer",

            fontSize: "13px"

          }}

        >

          👍 Upvote

        </button>

        <button

          onClick={handleDownvote}

          disabled={loading}

          style={{

            background:
              "linear-gradient(to right,#dc2626,#ef4444)",

            border: "none",

            color: "white",

            padding: "10px 16px",

            borderRadius: "12px",

            fontWeight: "700",

            cursor: "pointer",

            fontSize: "13px"

          }}

        >

          👎 Downvote

        </button>

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

            fontWeight: "700",

            cursor: "pointer",

            fontSize: "13px"

          }}

        >

          💬 {comments || 0}

        </button>

        {/* =========================================
           SHOW ONLY IN PROFILE PAGE
        ========================================= */}

        {

          showActions &&

          isOwner && (

            <button

              onClick={() =>

                setEditing(!editing)

              }

              style={{

                background:
                  "linear-gradient(to right,#f59e0b,#fbbf24)",

                border: "none",

                color: "white",

                padding: "10px 16px",

                borderRadius: "12px",

                fontWeight: "700",

                cursor: "pointer",

                fontSize: "13px"

              }}

            >

              ✏ Edit

            </button>

          )

        }

        {

          showActions &&

          isOwner && (

            <button

              onClick={handleDelete}

              style={{

                background:
                  "linear-gradient(to right,#dc2626,#ef4444)",

                border: "none",

                color: "white",

                padding: "10px 16px",

                borderRadius: "12px",

                fontWeight: "700",

                cursor: "pointer",

                fontSize: "13px"

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

              marginTop: "20px"

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
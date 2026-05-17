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
     VOTE STATE
  ========================================= */

  const [voteCount, setVoteCount] =
    useState(votes || 0);

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

      console.log(
        "FETCH COMMENTS ERROR:",
        error
      );

    }

  };

  useEffect(() => {

    fetchComments();

  }, [id]);

  /* =========================================
     HANDLE UPVOTE
  ========================================= */

  const handleUpvote = async () => {

    try {

      const response = await fetch(

        `${API_BASE}/api/posts/${id}/upvote`,

        {
          method: "PUT"
        }

      );

      const data =
        await response.json();

      console.log(
        "UPVOTE RESPONSE:",
        data
      );

      /* =========================================
         UPDATE VOTE COUNT
      ========================================= */

      setVoteCount(

        data?.votes ??

        voteCount + 1

      );

    } catch (error) {

      console.log(
        "UPVOTE ERROR:",
        error
      );

      alert("Failed to upvote ❌");

    }

  };

  /* =========================================
     HANDLE DOWNVOTE
  ========================================= */

  const handleDownvote = async () => {

    try {

      const response = await fetch(

        `${API_BASE}/api/posts/${id}/downvote`,

        {
          method: "PUT"
        }

      );

      const data =
        await response.json();

      console.log(
        "DOWNVOTE RESPONSE:",
        data
      );

      /* =========================================
         UPDATE VOTE COUNT
      ========================================= */

      setVoteCount(

        data?.votes ??

        voteCount - 1

      );

    } catch (error) {

      console.log(
        "DOWNVOTE ERROR:",
        error
      );

      alert("Failed to downvote ❌");

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

      console.log(
        "DELETE ERROR:",
        error
      );

    }

  };

  return (

    <>

      {/* =========================================
         POST CARD
      ========================================= */}

      <div

        style={{

          background:
            "rgba(15,23,42,0.96)",

          border:
            "1px solid rgba(255,255,255,0.04)",

          borderRadius: "16px",

          padding: "12px",

          color: "white",

          width: "100%",

          maxWidth: "500px",

          margin: "0 0 14px 0",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.20)"

        }}

      >

        {/* =========================================
           COMMUNITY TAG
        ========================================= */}

        <div

          style={{

            display: "inline-flex",

            padding: "4px 10px",

            borderRadius: "999px",

            background:
              "rgba(59,130,246,0.12)",

            color: "#60a5fa",

            fontSize: "8px",

            fontWeight: "700",

            marginBottom: "10px"

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

            marginBottom: "12px"

          }}

        >

          <div

            style={{

              width: "34px",

              height: "34px",

              borderRadius: "50%",

              background:
                "linear-gradient(135deg,#3b82f6,#2563eb)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: "800",

              fontSize: "12px",

              marginRight: "8px"

            }}

          >

            {author?.charAt(0)?.toUpperCase() || "A"}

          </div>

          <div>

            <div

              style={{

                fontSize: "12px",

                fontWeight: "700"

              }}

            >

              {author || "Anonymous"}

            </div>

            <div

              style={{

                fontSize: "9px",

                color: "#94a3b8"

              }}

            >

              Posted in community

            </div>

          </div>

          {/* =========================================
             VOTE COUNT
          ========================================= */}

          <div

            style={{

              marginLeft: "auto",

              background:
                "rgba(37,99,235,0.18)",

              padding: "4px 8px",

              borderRadius: "8px",

              color: "#60a5fa",

              fontWeight: "700",

              fontSize: "8px"

            }}

          >

            {voteCount} Votes

          </div>

        </div>

        {/* =========================================
           TITLE
        ========================================= */}

        <h2

          style={{

            fontSize: "17px",

            lineHeight: "24px",

            fontWeight: "800",

            marginBottom: "8px"

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

            lineHeight: "20px",

            fontSize: "12px",

            marginBottom: "12px"

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

                width: "100%",

                marginBottom: "12px",

                borderRadius: "12px",

                overflow: "hidden"

              }}

            >

              <img

                src={finalImageUrl}

                alt="post"

                style={{

                  width: "100%",

                  height: "240px",

                  objectFit: "cover",

                  display: "block"

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
           ACTIONS
        ========================================= */}

        <div

          style={{

            display: "flex",

            gap: "5px",

            flexWrap: "wrap"

          }}

        >

          {/* =========================================
             UPVOTE
          ========================================= */}

          <button

            onClick={handleUpvote}

            style={{

              background:
                "linear-gradient(to right,#22c55e,#16a34a)",

              border: "none",

              color: "white",

              padding: "6px 10px",

              borderRadius: "8px",

              display: "flex",

              alignItems: "center",

              gap: "4px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "10px"

            }}

          >

            <FaArrowUp />

            Upvote

          </button>

          {/* =========================================
             DOWNVOTE
          ========================================= */}

          <button

            onClick={handleDownvote}

            style={{

              background:
                "linear-gradient(to right,#ef4444,#dc2626)",

              border: "none",

              color: "white",

              padding: "6px 10px",

              borderRadius: "8px",

              display: "flex",

              alignItems: "center",

              gap: "4px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "10px"

            }}

          >

            <FaArrowDown />

            Downvote

          </button>

        </div>

      </div>

    </>

  );

}

export default PostCard;
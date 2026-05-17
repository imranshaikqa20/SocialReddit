import React, { useState } from "react";

import {
  FaArrowUp,
  FaArrowDown,
  FaComment,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import EditPostModal from "./EditPostModal";

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
  onPostUpdated,
  showActions = false

}) {

  const [comment, setComment] =
    useState("");

  const [showEditModal, setShowEditModal] =
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

          borderRadius: "22px",

          padding: "22px",

          color: "white",

          width: "100%",

          maxWidth: "900px",

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

            padding: "6px 14px",

            borderRadius: "999px",

            background:
              "rgba(59,130,246,0.12)",

            color: "#60a5fa",

            fontSize: "11px",

            fontWeight: "700",

            marginBottom: "18px"

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

            marginBottom: "20px"

          }}

        >

          <div

            style={{

              width: "48px",

              height: "48px",

              borderRadius: "50%",

              background:
                "linear-gradient(135deg,#3b82f6,#2563eb)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: "800",

              fontSize: "18px",

              marginRight: "14px"

            }}

          >

            {author?.charAt(0)?.toUpperCase() || "A"}

          </div>

          <div>

            <div

              style={{

                fontWeight: "700",

                fontSize: "16px",

                color: "#f8fafc"

              }}

            >

              {author || "Anonymous"}

            </div>

            <div

              style={{

                fontSize: "12px",

                color: "#94a3b8",

                marginTop: "3px"

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

            fontSize: "28px",

            lineHeight: "40px",

            marginBottom: "14px",

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

            lineHeight: "30px",

            marginBottom: "20px",

            fontSize: "16px"

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

                marginBottom: "20px",

                overflow: "hidden",

                borderRadius: "18px"

              }}

            >

              <img

                src={finalImageUrl}

                alt="post"

                style={{

                  width: "100%",

                  maxHeight: "420px",

                  objectFit: "cover",

                  borderRadius: "18px",

                  border:
                    "1px solid rgba(255,255,255,0.06)"

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

            marginBottom: "20px"

          }}

        />

        {/* =========================================
           ACTION BUTTONS
        ========================================= */}

        <div

          style={{

            display: "flex",

            gap: "10px",

            marginBottom: "20px",

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

              padding: "10px 16px",

              borderRadius: "12px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "8px",

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

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "8px",

              fontSize: "13px"

            }}

          >

            <FaArrowDown />

            Downvote

          </button>

          {/* COMMENTS */}

          <div

            style={{

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              padding: "10px 16px",

              borderRadius: "12px",

              fontWeight: "700",

              display: "flex",

              alignItems: "center",

              gap: "8px",

              fontSize: "13px"

            }}

          >

            <FaComment />

            {comments || 0}

          </div>

          {/* =========================================
             EDIT & DELETE
          ========================================= */}

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

                    fontWeight: "700",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    gap: "8px",

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

                    fontWeight: "700",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    gap: "8px",

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
           COMMENT SECTION
        ========================================= */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: "12px",

            width: "100%"

          }}

        >

          {/* INPUT */}

          <input

            type="text"

            placeholder="Write a comment..."

            value={comment}

            onChange={(e) =>
              setComment(e.target.value)
            }

            style={{

              flex: 1,

              height: "50px",

              padding: "0 18px",

              borderRadius: "14px",

              border:
                "1px solid rgba(255,255,255,0.06)",

              background:
                "rgba(17,24,39,0.92)",

              color: "white",

              outline: "none",

              fontSize: "14px"

            }}

          />

          {/* BUTTON */}

          <button

            style={{

              minWidth: "130px",

              height: "50px",

              borderRadius: "14px",

              border: "none",

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              color: "white",

              cursor: "pointer",

              fontWeight: "700",

              fontSize: "14px",

              boxShadow:
                "0 4px 18px rgba(37,99,235,0.35)"

            }}

          >

            Comment

          </button>

        </div>

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
import React, { useState } from "react";

import {
  FaArrowUp,
  FaArrowDown,
  FaComment
} from "react-icons/fa";

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

  const [comment, setComment] =
    useState("");

  /* =========================================
     FIX IMAGE URL
  ========================================= */

  const finalImageUrl =

    imageUrl
      ? `${API_BASE}${imageUrl}`
      : null;

  console.log(
    "FINAL IMAGE URL =>",
    finalImageUrl
  );

  return (

    <div

      style={{

        background:
          "rgba(15,23,42,0.82)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        borderRadius: "26px",

        padding: "22px",

        color: "white",

        boxShadow:
          "0px 8px 30px rgba(0,0,0,0.28)",

        backdropFilter:
          "blur(12px)"

      }}

    >

      {/* =========================================
         COMMUNITY
      ========================================= */}

      <div

        style={{

          display: "inline-block",

          padding: "7px 16px",

          borderRadius: "999px",

          background:
            "rgba(59,130,246,0.12)",

          color: "#60a5fa",

          fontSize: "12px",

          fontWeight: "700",

          marginBottom: "20px"

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

              fontSize: "17px"

            }}

          >

            {author || "Anonymous"}

          </div>

          <div

            style={{

              fontSize: "13px",

              color: "#94a3b8"

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

          fontSize: "34px",

          marginBottom: "16px",

          fontWeight: "800"

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

          lineHeight: "1.8",

          marginBottom: "22px"

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

              marginBottom: "24px"

            }}

          >

            <img

              src={finalImageUrl}

              alt="post"

              style={{

                width: "100%",

                maxHeight: "520px",

                objectFit: "cover",

                borderRadius: "20px",

                border:
                  "1px solid rgba(255,255,255,0.08)"

              }}

              onError={(e) => {

                console.log(

                  "IMAGE LOAD FAILED =>",

                  finalImageUrl

                );

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
            "1px solid rgba(255,255,255,0.08)",

          marginBottom: "20px"

        }}

      />

      {/* =========================================
         ACTIONS
      ========================================= */}

      <div

        style={{

          display: "flex",

          gap: "14px",

          marginBottom: "20px"

        }}

      >

        <button

          style={{

            background: "#22c55e",

            border: "none",

            color: "white",

            padding: "12px 22px",

            borderRadius: "14px",

            fontWeight: "700",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            cursor: "pointer"

          }}

        >

          <FaArrowUp />

          Upvote

        </button>

        <button

          style={{

            background: "#ef4444",

            border: "none",

            color: "white",

            padding: "12px 22px",

            borderRadius: "14px",

            fontWeight: "700",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            cursor: "pointer"

          }}

        >

          <FaArrowDown />

          Downvote

        </button>

        <div

          style={{

            background: "#2563eb",

            padding: "12px 18px",

            borderRadius: "14px",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            fontWeight: "700"

          }}

        >

          <FaComment />

          {votes || 0}

        </div>

      </div>

      {/* =========================================
         COMMENT BOX
      ========================================= */}

      <div

        style={{

          display: "flex",

          gap: "12px"

        }}

      >

        <input

          type="text"

          placeholder="Write a comment..."

          value={comment}

          onChange={(e) =>
            setComment(e.target.value)
          }

          style={{

            flex: 1,

            padding: "14px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.08)",

            background: "#111827",

            color: "white"

          }}

        />

        <button

          style={{

            background: "#3b82f6",

            border: "none",

            color: "white",

            padding: "14px 22px",

            borderRadius: "14px",

            cursor: "pointer",

            fontWeight: "700"

          }}

        >

          Comment

        </button>

      </div>

    </div>

  );

}

export default PostCard;
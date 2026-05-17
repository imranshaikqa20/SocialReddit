import React, { useState } from "react";

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
  communityName

}) {

  const [comment, setComment] =
    useState("");

  /* =========================================
     IMAGE URL FIX
  ========================================= */

  let finalImageUrl = null;

  if (imageUrl) {

    /* IF IMAGE ALREADY FULL URL */

    if (imageUrl.startsWith("http")) {

      finalImageUrl = imageUrl;

    } else {

      /* APPEND BACKEND URL */

      finalImageUrl =
        `${API_BASE}${imageUrl}`;

    }

  }

  console.log(
    "FINAL IMAGE URL =>",
    finalImageUrl
  );

  return (

    <div

      style={{

        background:
          "rgba(15,23,42,0.92)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        borderRadius: "18px",

        padding: "18px",

        color: "white",

        width: "100%",

        maxWidth: "760px",

        margin: "0 auto",

        boxShadow:
          "0px 4px 18px rgba(0,0,0,0.22)"

      }}

    >

      {/* =========================================
         COMMUNITY
      ========================================= */}

      <div

        style={{

          display: "inline-block",

          padding: "6px 14px",

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

          marginBottom: "18px"

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

              fontSize: "16px"

            }}

          >

            {author || "Anonymous"}

          </div>

          <div

            style={{

              fontSize: "12px",

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

          fontSize: "22px",

          marginBottom: "12px",

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

          lineHeight: "1.6",

          marginBottom: "16px",

          fontSize: "14px"

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

              marginBottom: "18px"

            }}

          >

            <img

              src={finalImageUrl}

              alt="post"

              style={{

                width: "100%",

                maxHeight: "350px",

                objectFit: "cover",

                borderRadius: "14px",

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

          marginBottom: "16px"

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

        <button

          style={{

            background: "#22c55e",

            border: "none",

            color: "white",

            padding: "10px 18px",

            borderRadius: "12px",

            fontWeight: "700",

            cursor: "pointer"

          }}

        >

          👍 Upvote

        </button>

        <button

          style={{

            background: "#ef4444",

            border: "none",

            color: "white",

            padding: "10px 18px",

            borderRadius: "12px",

            fontWeight: "700",

            cursor: "pointer"

          }}

        >

          👎 Downvote

        </button>

        <div

          style={{

            background: "#2563eb",

            padding: "10px 16px",

            borderRadius: "12px",

            fontWeight: "700"

          }}

        >

          💬 {votes || 0}

        </div>

      </div>

      {/* =========================================
         COMMENT BOX
      ========================================= */}

      <div

        style={{

          display: "flex",

          gap: "10px"

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

            padding: "12px",

            borderRadius: "12px",

            border:
              "1px solid rgba(255,255,255,0.08)",

            background: "#111827",

            color: "white",

            outline: "none"

          }}

        />

        <button

          style={{

            background: "#3b82f6",

            border: "none",

            color: "white",

            padding: "12px 18px",

            borderRadius: "12px",

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
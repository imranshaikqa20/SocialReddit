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

  title,
  content,
  imageUrl,
  votes,
  author,
  communityName

}) {

  const [comment, setComment] =
    useState("");

  /* =========================================
     FIX IMAGE URL
  ========================================= */

  let finalImageUrl = "";

  if (imageUrl) {

    /* FULL URL */

    if (imageUrl.startsWith("http")) {

      finalImageUrl = imageUrl;

    } else {

      /* REMOVE EXTRA SLASHES */

      const cleanPath =
        imageUrl.replace(/^\/+/, "");

      /* FINAL IMAGE URL */

      finalImageUrl =
        `${API_BASE}/${cleanPath}`;

    }

  }

  console.log(
    "POST IMAGE =>",
    finalImageUrl
  );

  return (

    <div

      style={{

        background:
          "rgba(10,18,40,0.95)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        borderRadius: "16px",

        padding: "16px",

        color: "white",

        width: "100%",

        maxWidth: "720px",

        margin: "0 auto",

        boxShadow:
          "0px 4px 14px rgba(0,0,0,0.22)"

      }}

    >

      {/* =========================================
         COMMUNITY
      ========================================= */}

      <div

        style={{

          display: "inline-block",

          padding: "5px 12px",

          borderRadius: "999px",

          background:
            "rgba(59,130,246,0.14)",

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

              fontSize: "15px"

            }}

          >

            {author || "Anonymous"}

          </div>

          <div

            style={{

              fontSize: "11px",

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

          fontSize: "18px",

          marginBottom: "10px",

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

          color: "#d1d5db",

          lineHeight: "1.5",

          marginBottom: "14px",

          fontSize: "13px"

        }}

      >

        {content}

      </p>

      {/* =========================================
         IMAGE
      ========================================= */}

      {

        finalImageUrl && (

          <img

            src={finalImageUrl}

            alt="post"

            style={{

              width: "100%",

              maxHeight: "260px",

              objectFit: "cover",

              borderRadius: "12px",

              marginBottom: "14px",

              border:
                "1px solid rgba(255,255,255,0.06)"

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
         ACTIONS
      ========================================= */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          gap: "8px",

          marginBottom: "14px"

        }}

      >

        <button

          style={{

            background: "#22c55e",

            border: "none",

            color: "white",

            padding: "8px 14px",

            borderRadius: "10px",

            fontWeight: "700",

            fontSize: "13px",

            cursor: "pointer"

          }}

        >

          👍 {votes || 0}

        </button>

        <button

          style={{

            background: "#ef4444",

            border: "none",

            color: "white",

            padding: "8px 14px",

            borderRadius: "10px",

            fontWeight: "700",

            fontSize: "13px",

            cursor: "pointer"

          }}

        >

          👎

        </button>

        <button

          style={{

            background: "#2563eb",

            border: "none",

            color: "white",

            padding: "8px 14px",

            borderRadius: "10px",

            fontWeight: "700",

            fontSize: "13px"

          }}

        >

          💬

        </button>

      </div>

      {/* =========================================
         COMMENT BOX
      ========================================= */}

      <div

        style={{

          display: "flex",

          gap: "8px"

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

            padding: "10px",

            borderRadius: "10px",

            border:
              "1px solid rgba(255,255,255,0.08)",

            background: "#111827",

            color: "white",

            outline: "none",

            fontSize: "13px"

          }}

        />

        <button

          style={{

            background: "#3b82f6",

            border: "none",

            color: "white",

            padding: "10px 16px",

            borderRadius: "10px",

            cursor: "pointer",

            fontWeight: "700",

            fontSize: "13px"

          }}

        >

          Comment

        </button>

      </div>

    </div>

  );

}

export default PostCard;
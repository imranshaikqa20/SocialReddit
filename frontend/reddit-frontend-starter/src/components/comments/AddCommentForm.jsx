import { useState } from "react";

import api from "../../services/api";

function AddCommentForm({

  postId,

  onCommentAdded

}) {

  /* =========================================
     STATES
  ========================================= */

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     USERNAME
  ========================================= */

  const username =

    localStorage.getItem("username")

    ||

    "Anonymous";

  /* =========================================
     SUBMIT COMMENT
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* VALIDATION */

    if (

      !content ||

      content.trim() === ""

    ) {

      alert(
        "Please enter comment ❌"
      );

      return;

    }

    try {

      setLoading(true);

      /* =========================================
         API CALL
      ========================================= */

      await api.post(

        "/api/comments",

        {

          author: username,

          content,

          postId

        }

      );

      /* SUCCESS */

      setContent("");

      alert(
        "Comment Added 🚀"
      );

      /* REFRESH COMMENTS */

      if (onCommentAdded) {

        onCommentAdded();

      }

      /* OPTIONAL REFRESH */

      window.location.reload();

    } catch (error) {

      console.log(

        "COMMENT ERROR :",

        error.response?.data ||

        error.message

      );

      alert(
        "Failed To Add Comment ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div

      style={{

        marginTop: "18px",

        background:
          "linear-gradient(135deg,#111827,#0f172a)",

        border:
          "1px solid rgba(59,130,246,0.12)",

        borderRadius: "18px",

        padding: "18px",

        boxShadow:
          "0 4px 18px rgba(0,0,0,0.25)",

        position: "relative",

        overflow: "hidden"

      }}

    >

      {/* GLOW */}

      <div

        style={{

          position: "absolute",

          top: "-40px",

          right: "-40px",

          width: "120px",

          height: "120px",

          borderRadius: "50%",

          background:
            "rgba(59,130,246,0.10)",

          filter: "blur(40px)"

        }}

      />

      {/* HEADER */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          gap: "10px",

          marginBottom: "16px",

          position: "relative",

          zIndex: 2

        }}

      >

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

            fontWeight: "bold",

            fontSize: "15px"

          }}

        >

          💬

        </div>

        <div>

          <h3

            style={{

              margin: 0,

              color: "#f8fafc",

              fontSize: "16px",

              fontWeight: "600"

            }}

          >

            Add Comment

          </h3>

          <p

            style={{

              margin: "3px 0 0 0",

              color: "#94a3b8",

              fontSize: "11px"

            }}

          >

            Share your thoughts

          </p>

        </div>

      </div>

      {/* FORM */}

      <form

        onSubmit={handleSubmit}

        style={{

          position: "relative",

          zIndex: 2

        }}

      >

        {/* COMMENT */}

        <textarea

          placeholder="Write your comment..."

          value={content}

          onChange={(e) =>

            setContent(
              e.target.value
            )

          }

          rows="4"

          style={{

            width: "100%",

            background:
              "rgba(255,255,255,0.04)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "12px",

            padding: "14px",

            marginBottom: "16px",

            color: "white",

            fontSize: "14px",

            lineHeight: "24px",

            resize: "none",

            outline: "none",

            boxSizing: "border-box"

          }}

        />

        {/* BUTTON */}

        <button

          type="submit"

          disabled={loading}

          style={{

            background:
              "linear-gradient(to right,#2563eb,#3b82f6)",

            border: "none",

            color: "white",

            padding: "11px 18px",

            borderRadius: "12px",

            fontSize: "13px",

            fontWeight: "600",

            cursor: "pointer"

          }}

        >

          {

            loading

              ? "Adding..."

              : "🚀 Add Comment"

          }

        </button>

      </form>

    </div>

  );

}

export default AddCommentForm;
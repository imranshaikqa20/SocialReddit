import { useState } from "react";

import api from "../../services/api";

function AddCommentForm({ postId }) {

  const [author, setAuthor] =
    useState("");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* Submit Comment */

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* Validation */

    if (!author || !content) {

      alert("Please fill all fields ❌");

      return;

    }

    try {

      setLoading(true);

      await api.post(

        "/comments",

        {

          author,

          content,

          postId

        }

      );

      alert("Comment Added 🚀");

      setAuthor("");

      setContent("");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed To Add Comment ❌");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div

      style={{

        marginTop: "18px",

        background:
          "linear-gradient(135deg, #111827, #0f172a)",

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

      {/* Glow */}

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

      {/* Heading */}

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
              "linear-gradient(to right, #2563eb, #38bdf8)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "white",

            fontWeight: "bold",

            fontSize: "15px",

            boxShadow:
              "0 0 14px rgba(59,130,246,0.35)"

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

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 2
        }}
      >

        {/* Author Input */}

        <input

          type="text"

          placeholder="Your Name"

          value={author}

          onChange={(e) =>
            setAuthor(e.target.value)
          }

          style={{

            width: "100%",

            background:
              "rgba(255,255,255,0.04)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "12px",

            padding: "12px 14px",

            marginBottom: "14px",

            color: "white",

            fontSize: "14px",

            outline: "none",

            boxSizing: "border-box"

          }}

        />

        {/* Comment Textarea */}

        <textarea

          placeholder="Write your comment..."

          value={content}

          onChange={(e) =>
            setContent(e.target.value)
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

        {/* Button */}

        <button

          type="submit"

          disabled={loading}

          style={{

            background:
              "linear-gradient(to right, #2563eb, #3b82f6)",

            border: "none",

            color: "white",

            padding: "11px 18px",

            borderRadius: "12px",

            fontSize: "13px",

            fontWeight: "600",

            cursor: "pointer",

            boxShadow:
              "0 4px 14px rgba(37,99,235,0.30)",

            transition: "0.3s"

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
import { useState } from "react";

import api from "../../services/api";

function EditPostModal({

  post,
  onClose,
  onPostUpdated

}) {

  /* =========================================
     STATES
  ========================================= */

  const [title, setTitle] =
    useState(post.title || "");

  const [content, setContent] =
    useState(post.content || "");

  const [imageUrl, setImageUrl] =
    useState(post.imageUrl || "");

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     HANDLE SAVE
  ========================================= */

  const handleSave = async () => {

    if (
      !title.trim() ||
      !content.trim()
    ) {

      alert(
        "Please fill all fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      /* =========================================
         FIX IMAGE URL
      ========================================= */

      let finalImageUrl =
        imageUrl || "";

      /* REMOVE BLOB URL */

      if (

        finalImageUrl.startsWith(
          "blob:"
        )

      ) {

        finalImageUrl = "";

      }

      /* REMOVE DOMAIN */

      if (

        finalImageUrl.includes(
          "socialreddit-backend.onrender.com"
        )

      ) {

        finalImageUrl =
          finalImageUrl.replace(

            "https://socialreddit-backend.onrender.com",

            ""

          );

      }

      console.log(
        "FINAL IMAGE URL:",
        finalImageUrl
      );

      /* =========================================
         UPDATE PAYLOAD
      ========================================= */

      const payload = {

        title:
          title.trim(),

        content:
          content.trim(),

        imageUrl:
          finalImageUrl

      };

      console.log(
        "UPDATE PAYLOAD:",
        payload
      );

      /* =========================================
         API UPDATE
      ========================================= */

      const response =
        await api.put(

          `/api/posts/${post.id}`,

          payload

        );

      console.log(
        "UPDATE RESPONSE:",
        response.data
      );

      alert(
        "Post Updated Successfully 🚀"
      );

      /* =========================================
         REFRESH POSTS
      ========================================= */

      if (onPostUpdated) {

        onPostUpdated();

      }

      /* =========================================
         CLOSE MODAL
      ========================================= */

      onClose();

    } catch (error) {

      console.log(
        "UPDATE ERROR:",
        error.response?.data || error
      );

      alert(
        "Failed to update post ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div

      style={{

        position: "fixed",

        inset: 0,

        background:
          "rgba(0,0,0,0.72)",

        backdropFilter: "blur(6px)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        zIndex: 9999,

        padding: "20px"

      }}

    >

      {/* MODAL CARD */}

      <div

        style={{

          width: "100%",

          maxWidth: "650px",

          background:
            "linear-gradient(135deg,#0f172a,#111827)",

          border:
            "1px solid rgba(59,130,246,0.12)",

          borderRadius: "24px",

          padding: "28px",

          boxShadow:
            "0 10px 35px rgba(0,0,0,0.45)",

          position: "relative"

        }}

      >

        {/* CLOSE BUTTON */}

        <button

          onClick={onClose}

          style={{

            position: "absolute",

            top: "16px",

            right: "16px",

            width: "36px",

            height: "36px",

            borderRadius: "50%",

            border: "none",

            background:
              "rgba(255,255,255,0.08)",

            color: "white",

            cursor: "pointer",

            fontSize: "18px",

            fontWeight: "700"

          }}

        >

          ✕

        </button>

        {/* HEADING */}

        <h2

          style={{

            marginBottom: "20px",

            color: "#f8fafc",

            fontSize: "28px",

            fontWeight: "800"

          }}

        >

          Edit Post

        </h2>

        {/* TITLE */}

        <input

          type="text"

          value={title}

          onChange={(e) =>
            setTitle(e.target.value)
          }

          placeholder="Post title"

          style={{

            width: "100%",

            padding: "14px",

            borderRadius: "14px",

            border:
              "1px solid rgba(59,130,246,0.14)",

            background:
              "rgba(30,41,59,0.85)",

            color: "#fff",

            marginBottom: "18px",

            outline: "none",

            boxSizing: "border-box"

          }}

        />

        {/* CONTENT */}

        <textarea

          rows="6"

          value={content}

          onChange={(e) =>
            setContent(e.target.value)
          }

          placeholder="Update content"

          style={{

            width: "100%",

            padding: "16px",

            borderRadius: "14px",

            border:
              "1px solid rgba(59,130,246,0.14)",

            background:
              "rgba(30,41,59,0.85)",

            color: "#fff",

            marginBottom: "18px",

            outline: "none",

            resize: "none",

            boxSizing: "border-box"

          }}

        />

        {/* IMAGE URL */}

        <input

          type="text"

          value={imageUrl}

          onChange={(e) =>
            setImageUrl(
              e.target.value
            )
          }

          placeholder="Image URL"

          style={{

            width: "100%",

            padding: "14px",

            borderRadius: "14px",

            border:
              "1px solid rgba(59,130,246,0.14)",

            background:
              "rgba(30,41,59,0.85)",

            color: "#fff",

            marginBottom: "20px",

            outline: "none",

            boxSizing: "border-box"

          }}

        />

        {/* IMAGE PREVIEW */}

        {

          imageUrl && (

            <img

              src={imageUrl}

              alt="preview"

              style={{

                width: "100%",

                maxHeight: "260px",

                objectFit: "cover",

                borderRadius: "14px",

                marginBottom: "20px"

              }}

            />

          )

        }

        {/* BUTTONS */}

        <div

          style={{

            display: "flex",

            justifyContent: "flex-end",

            gap: "12px"

          }}

        >

          {/* CANCEL */}

          <button

            onClick={onClose}

            style={{

              padding: "12px 18px",

              borderRadius: "12px",

              border: "none",

              background:
                "#334155",

              color: "white",

              cursor: "pointer"

            }}

          >

            Cancel

          </button>

          {/* SAVE */}

          <button

            onClick={handleSave}

            disabled={loading}

            style={{

              padding: "12px 20px",

              borderRadius: "12px",

              border: "none",

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              color: "white",

              cursor: "pointer",

              fontWeight: "700",

              opacity:
                loading ? 0.7 : 1

            }}

          >

            {

              loading
                ? "Saving..."
                : "💾 Save Changes"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default EditPostModal;
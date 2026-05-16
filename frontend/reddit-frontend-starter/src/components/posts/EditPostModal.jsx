import { useState } from "react";

import api from "../../services/api";

function EditPostModal({

  post,

  onClose,

  onPostUpdated

}) {

  /* =========================================
     States
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
     Save Edit
  ========================================= */

  const handleSave = async () => {

    if (!title || !content) {

      alert(
        "Please fill all fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      await api.put(

        `/posts/${post.id}`,

        {

          title,

          content,

          imageUrl

        }

      );

      alert(
        "Post Updated Successfully 🚀"
      );

      /* Refresh Parent */

      if (onPostUpdated) {

        onPostUpdated();

      }

      /* Close Modal */

      onClose();

    } catch (error) {

      console.log(error);

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

      {/* =========================================
         Modal Card
      ========================================= */}

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

        {/* Close */}

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

        {/* Heading */}

        <div
          style={{
            marginBottom: "24px"
          }}
        >

          <h2

            style={{

              margin: 0,

              color: "#f8fafc",

              fontSize: "30px",

              fontWeight: "800"

            }}

          >

            Edit Post

          </h2>

          <p

            style={{

              marginTop: "10px",

              color: "#94a3b8",

              fontSize: "14px",

              lineHeight: "24px"

            }}

          >

            Update your post content
            and image.

          </p>

        </div>

        {/* Title */}

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <label

            style={{

              display: "block",

              marginBottom: "10px",

              color: "#dbeafe",

              fontWeight: "600",

              fontSize: "14px"

            }}

          >

            Post Title

          </label>

          <input

            type="text"

            value={title}

            onChange={(e) =>
              setTitle(e.target.value)
            }

            placeholder="Enter post title"

            style={{

              width: "100%",

              padding: "15px",

              borderRadius: "14px",

              border:
                "1px solid rgba(59,130,246,0.14)",

              background:
                "rgba(30,41,59,0.85)",

              color: "#f8fafc",

              outline: "none",

              fontSize: "14px",

              boxSizing: "border-box"

            }}

          />

        </div>

        {/* Content */}

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <label

            style={{

              display: "block",

              marginBottom: "10px",

              color: "#dbeafe",

              fontWeight: "600",

              fontSize: "14px"

            }}

          >

            Content

          </label>

          <textarea

            rows="6"

            value={content}

            onChange={(e) =>
              setContent(e.target.value)
            }

            placeholder="Write updated content..."

            style={{

              width: "100%",

              padding: "16px",

              borderRadius: "14px",

              border:
                "1px solid rgba(59,130,246,0.14)",

              background:
                "rgba(30,41,59,0.85)",

              color: "#f8fafc",

              outline: "none",

              resize: "none",

              fontSize: "14px",

              lineHeight: "26px",

              boxSizing: "border-box"

            }}

          />

        </div>

        {/* Image URL */}

        <div
          style={{
            marginBottom: "24px"
          }}
        >

          <label

            style={{

              display: "block",

              marginBottom: "10px",

              color: "#dbeafe",

              fontWeight: "600",

              fontSize: "14px"

            }}

          >

            Image URL

          </label>

          <input

            type="text"

            value={imageUrl}

            onChange={(e) =>
              setImageUrl(
                e.target.value
              )
            }

            placeholder="Enter image URL"

            style={{

              width: "100%",

              padding: "15px",

              borderRadius: "14px",

              border:
                "1px solid rgba(59,130,246,0.14)",

              background:
                "rgba(30,41,59,0.85)",

              color: "#f8fafc",

              outline: "none",

              fontSize: "14px",

              boxSizing: "border-box"

            }}

          />

        </div>

        {/* Preview */}

        {

          imageUrl && (

            <div
              style={{
                marginBottom: "24px"
              }}
            >

              <img

                src={imageUrl}

                alt="Preview"

                style={{

                  width: "100%",

                  maxHeight: "320px",

                  objectFit: "cover",

                  borderRadius: "16px",

                  border:
                    "1px solid rgba(255,255,255,0.08)"

                }}

              />

            </div>

          )

        }

        {/* Buttons */}

        <div

          style={{

            display: "flex",

            justifyContent: "flex-end",

            gap: "12px",

            flexWrap: "wrap"

          }}

        >

          {/* Cancel */}

          <button

            onClick={onClose}

            style={{

              padding: "12px 18px",

              borderRadius: "14px",

              border:
                "1px solid rgba(255,255,255,0.10)",

              background:
                "rgba(255,255,255,0.05)",

              color: "#f8fafc",

              cursor: "pointer",

              fontWeight: "600",

              fontSize: "14px"

            }}

          >

            Cancel

          </button>

          {/* Save */}

          <button

            onClick={handleSave}

            disabled={loading}

            style={{

              padding: "12px 20px",

              borderRadius: "14px",

              border: "none",

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              color: "white",

              cursor: "pointer",

              fontWeight: "700",

              fontSize: "14px"

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
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getAllCommunities
} from "../../services/communityService";

/* =========================================
   API BASE
========================================= */

const API_BASE =
  "https://socialreddit-backend.onrender.com";

/* =========================================
   COMPONENT
========================================= */

function CreatePostForm() {

  /* =========================================
     NAVIGATION
  ========================================= */

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [communityId, setCommunityId] =
    useState("");

  const [communities, setCommunities] =
    useState([]);

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
     FETCH COMMUNITIES
  ========================================= */

  useEffect(() => {

    fetchCommunities();

  }, []);

  const fetchCommunities = async () => {

    try {

      const response =
        await fetch(

          `${API_BASE}/api/communities`

        );

      const data =
        await response.json();

      setCommunities(

        Array.isArray(data)
          ? data
          : []

      );

    } catch (error) {

      console.log(error);

      setCommunities([]);

    }

  };

  /* =========================================
     HANDLE IMAGE
  ========================================= */

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) {

      return;

    }

    setImageFile(file);

    /* LOCAL PREVIEW */

    const previewURL =
      URL.createObjectURL(file);

    setImagePreview(previewURL);

  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !title.trim() ||

      !content.trim() ||

      !communityId

    ) {

      alert(
        "Please fill all required fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      /* =========================================
         FORM DATA
      ========================================= */

      const formData =
        new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "content",
        content.trim()
      );

      formData.append(
        "author",
        username
      );

      formData.append(
        "communityId",
        communityId
      );

      /* IMAGE */

      if (imageFile) {

        formData.append(
          "image",
          imageFile
        );

      }

      /* =========================================
         API CALL
      ========================================= */

      const response =
        await fetch(

          `${API_BASE}/api/posts/create`,

          {

            method: "POST",

            body: formData

          }

        );

      if (!response.ok) {

        throw new Error(
          "Failed to create post"
        );

      }

      alert(
        "Post Created Successfully 🚀"
      );

      /* RESET */

      setTitle("");

      setContent("");

      setImageFile(null);

      setImagePreview("");

      setCommunityId("");

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create post ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form onSubmit={handleSubmit}>

      {/* =========================================
         COMMUNITY
      ========================================= */}

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

            fontWeight: "700",

            fontSize: "14px"

          }}

        >

          Select Community

        </label>

        <select

          value={communityId}

          onChange={(e) =>

            setCommunityId(
              e.target.value
            )

          }

          style={{

            width: "100%",

            padding: "16px",

            borderRadius: "16px",

            border:
              "1px solid rgba(59,130,246,0.18)",

            background:
              "rgba(30,41,59,0.92)",

            color: "#f8fafc",

            outline: "none",

            fontSize: "15px"

          }}

        >

          <option value="">
            Choose Community
          </option>

          {

            communities.map(
              (community) => (

                <option

                  key={community.id}

                  value={community.id}

                >

                  {community.name}

                </option>

              )
            )

          }

        </select>

      </div>

      {/* =========================================
         TITLE
      ========================================= */}

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

            fontWeight: "700",

            fontSize: "14px"

          }}

        >

          Post Title

        </label>

        <input

          type="text"

          placeholder="Enter your post title..."

          value={title}

          onChange={(e) =>

            setTitle(
              e.target.value
            )

          }

          style={{

            width: "100%",

            padding: "16px",

            borderRadius: "16px",

            border:
              "1px solid rgba(59,130,246,0.18)",

            background:
              "rgba(30,41,59,0.92)",

            color: "#f8fafc",

            outline: "none",

            fontSize: "15px",

            boxSizing: "border-box"

          }}

        />

      </div>

      {/* =========================================
         CONTENT
      ========================================= */}

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

            fontWeight: "700",

            fontSize: "14px"

          }}

        >

          Content

        </label>

        <textarea

          rows="7"

          placeholder="Write your post content..."

          value={content}

          onChange={(e) =>

            setContent(
              e.target.value
            )

          }

          style={{

            width: "100%",

            padding: "18px",

            borderRadius: "16px",

            border:
              "1px solid rgba(59,130,246,0.18)",

            background:
              "rgba(30,41,59,0.92)",

            color: "#f8fafc",

            outline: "none",

            resize: "vertical",

            fontSize: "15px",

            lineHeight: "28px",

            boxSizing: "border-box"

          }}

        />

      </div>

      {/* =========================================
         IMAGE UPLOAD
      ========================================= */}

      <div
        style={{
          marginBottom: "24px"
        }}
      >

        <label

          style={{

            display: "block",

            marginBottom: "12px",

            color: "#dbeafe",

            fontWeight: "700",

            fontSize: "14px"

          }}

        >

          Upload Image 🖼️

        </label>

        <input

          type="file"

          accept="image/*"

          onChange={handleImageChange}

          style={{

            width: "100%",

            padding: "14px",

            borderRadius: "16px",

            border:
              "1px solid rgba(59,130,246,0.18)",

            background:
              "rgba(30,41,59,0.92)",

            color: "#f8fafc",

            cursor: "pointer",

            fontSize: "14px"

          }}

        />

      </div>

      {/* =========================================
         IMAGE PREVIEW
      ========================================= */}

      {

        imagePreview && (

          <div

            style={{

              marginBottom: "28px",

              background:
                "rgba(15,23,42,0.70)",

              border:
                "1px solid rgba(59,130,246,0.12)",

              borderRadius: "20px",

              padding: "14px",

              overflow: "hidden"

            }}

          >

            <div

              style={{

                marginBottom: "12px",

                color: "#cbd5e1",

                fontSize: "13px",

                fontWeight: "600"

              }}

            >

              Image Preview

            </div>

            <img

              src={imagePreview}

              alt="Preview"

              style={{

                width: "100%",

                maxHeight: "420px",

                objectFit: "cover",

                borderRadius: "16px"

              }}

            />

          </div>

        )

      }

      {/* =========================================
         SUBMIT BUTTON
      ========================================= */}

      <button

        type="submit"

        disabled={loading}

        style={{

          width: "100%",

          padding: "18px",

          border: "none",

          borderRadius: "18px",

          background:
            "linear-gradient(to right,#2563eb,#3b82f6)",

          color: "white",

          fontSize: "16px",

          fontWeight: "800",

          cursor: "pointer",

          opacity:
            loading ? 0.7 : 1

        }}

      >

        {

          loading

            ? "Publishing Post..."

            : "🚀 Publish Post"

        }

      </button>

    </form>

  );

}

export default CreatePostForm;
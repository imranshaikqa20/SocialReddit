import { useEffect, useState } from "react";

import api from "../../services/api";

import { createPost } from "../../services/postService";

import {
  getAllCommunities
} from "../../services/communityService";

function CreatePostForm() {

  /* =========================================
     Form States
  ========================================= */

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [communityId, setCommunityId] =
    useState("");

  /* =========================================
     Image States
  ========================================= */

  const [image, setImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [imageUploading, setImageUploading] =
    useState(false);

  /* =========================================
     Communities
  ========================================= */

  const [communities, setCommunities] =
    useState([]);

  /* =========================================
     Loading
  ========================================= */

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     Logged User
  ========================================= */

  const username =

    localStorage.getItem("username")

      ||

    localStorage.getItem("user")

      ||

    "Anonymous";

  /* =========================================
     Fetch Communities
  ========================================= */

  useEffect(() => {

    fetchCommunities();

  }, []);

  const fetchCommunities = async () => {

    try {

      const data =
        await getAllCommunities();

      setCommunities(data);

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================================
     Handle Image
  ========================================= */

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    /* Validate Size */

    if (file.size > 5 * 1024 * 1024) {

      alert(
        "Image size must be below 5MB ❌"
      );

      return;

    }

    setImage(file);

    setImagePreview(

      URL.createObjectURL(file)

    );

  };

  /* =========================================
     Upload Image
  ========================================= */

  const uploadImage = async () => {

    if (!image) return "";

    try {

      setImageUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        image
      );

      const response =
        await api.post(

          "/posts/upload",

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }

        );

      return response.data.imageUrl;

    } catch (error) {

      console.log(error);

      alert(
        "Image upload failed ❌"
      );

      return "";

    } finally {

      setImageUploading(false);

    }

  };

  /* =========================================
     Submit
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !title ||

      !content ||

      !communityId

    ) {

      alert(
        "Please fill all fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      let imageUrl = "";

      if (image) {

        imageUrl =
          await uploadImage();

      }

      /* IMPORTANT FIX */

      await createPost({

        title,

        content,

        imageUrl,

        author: username,

        communityId:
          Number(communityId)

      });

      alert(
        "Post Created Successfully 🚀"
      );

      /* Reset */

      setTitle("");

      setContent("");

      setCommunityId("");

      setImage(null);

      setImagePreview("");

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

    <div

      style={{

        display: "flex",

        justifyContent: "center",

        padding: "16px"

      }}

    >

      {/* =========================================
         Main Card
      ========================================= */}

      <div

        style={{

          width: "100%",

          maxWidth: "700px",

          background:
            "linear-gradient(135deg,#0f172a,#111827)",

          border:
            "1px solid rgba(59,130,246,0.08)",

          borderRadius: "22px",

          padding: "24px",

          boxShadow:
            "0 6px 24px rgba(0,0,0,0.30)",

          backdropFilter: "blur(10px)"

        }}

      >

        {/* Heading */}

        <div
          style={{
            marginBottom: "22px"
          }}
        >

          <h1

            style={{

              margin: 0,

              color: "#f8fafc",

              fontSize: "28px",

              fontWeight: "800"

            }}

          >

            Create New Post

          </h1>

          <p

            style={{

              marginTop: "8px",

              color: "#94a3b8",

              fontSize: "13px",

              lineHeight: "22px"

            }}

          >

            Share discussions, news,
            images and updates with
            your community.

          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          {/* Community */}

          <div
            style={{
              marginBottom: "18px"
            }}
          >

            <label

              style={{

                display: "block",

                marginBottom: "8px",

                color: "#dbeafe",

                fontWeight: "600",

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

                padding: "13px",

                borderRadius: "14px",

                border:
                  "1px solid rgba(59,130,246,0.14)",

                background:
                  "rgba(30,41,59,0.85)",

                color: "#f8fafc",

                outline: "none",

                fontSize: "14px"

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

          {/* Title */}

          <div
            style={{
              marginBottom: "18px"
            }}
          >

            <label

              style={{

                display: "block",

                marginBottom: "8px",

                color: "#dbeafe",

                fontWeight: "600",

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

                padding: "14px",

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
              marginBottom: "18px"
            }}
          >

            <label

              style={{

                display: "block",

                marginBottom: "8px",

                color: "#dbeafe",

                fontWeight: "600",

                fontSize: "14px"

              }}

            >

              Content

            </label>

            <textarea

              rows="5"

              placeholder="Write your post content..."

              value={content}

              onChange={(e) =>

                setContent(
                  e.target.value
                )

              }

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

                resize: "none",

                fontSize: "14px",

                lineHeight: "24px",

                boxSizing: "border-box"

              }}

            />

          </div>

          {/* Upload */}

          <div
            style={{
              marginBottom: "20px"
            }}
          >

            <label

              style={{

                display: "block",

                marginBottom: "8px",

                color: "#dbeafe",

                fontWeight: "600",

                fontSize: "14px"

              }}

            >

              Upload Image

            </label>

            <div

              style={{

                border:
                  "2px dashed rgba(59,130,246,0.18)",

                borderRadius: "16px",

                padding: "22px",

                textAlign: "center",

                background:
                  "rgba(15,23,42,0.55)"

              }}

            >

              <input

                type="file"

                accept="image/*"

                onChange={handleImageChange}

                style={{
                  color: "#cbd5e1"
                }}

              />

            </div>

          </div>

          {/* Preview */}

          {

            imagePreview && (

              <div
                style={{
                  marginBottom: "20px"
                }}
              >

                <img

                  src={imagePreview}

                  alt="Preview"

                  style={{

                    width: "100%",

                    maxHeight: "360px",

                    objectFit: "cover",

                    borderRadius: "18px",

                    border:
                      "1px solid rgba(59,130,246,0.12)"

                  }}

                />

              </div>

            )

          }

          {/* Submit */}

          <button

            type="submit"

            disabled={
              loading ||
              imageUploading
            }

            style={{

              width: "100%",

              padding: "14px",

              border: "none",

              borderRadius: "15px",

              background:
                "linear-gradient(to right,#2563eb,#3b82f6)",

              color: "white",

              fontSize: "15px",

              fontWeight: "700",

              cursor: "pointer",

              boxShadow:
                "0 6px 18px rgba(37,99,235,0.30)"

            }}

          >

            {

              loading ||

              imageUploading

                ? "Publishing Post..."

                : "Publish Post"

            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default CreatePostForm;
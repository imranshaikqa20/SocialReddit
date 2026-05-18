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

    }

  };

  /* =========================================
     HANDLE IMAGE
  ========================================= */

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setImagePreview(

      URL.createObjectURL(file)

    );

  };

  /* =========================================
     UPLOAD IMAGE
  ========================================= */

  const uploadImage = async () => {

    if (!imageFile) {

      return "";

    }

    const formData =
      new FormData();

    formData.append(
      "file",
      imageFile
    );

    const response =
      await fetch(

        `${API_BASE}/api/posts/upload`,

        {

          method: "POST",

          body: formData

        }

      );

    if (!response.ok) {

      throw new Error(
        "Image upload failed"
      );

    }

    const data =
      await response.json();

    return data.imageUrl;

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
        "Please fill all fields ❌"
      );

      return;

    }

    try {

      setLoading(true);

      /* =========================================
         STEP 1 -> UPLOAD IMAGE
      ========================================= */

      let uploadedImageUrl = "";

      if (imageFile) {

        uploadedImageUrl =
          await uploadImage();

      }

      /* =========================================
         STEP 2 -> CREATE POST
      ========================================= */

      const payload = {

        title:
          title.trim(),

        content:
          content.trim(),

        imageUrl:
          uploadedImageUrl,

        author:
          username,

        communityId:
          Number(communityId)

      };

      const response =
        await fetch(

          `${API_BASE}/api/posts`,

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify(payload)

          }

        );

      if (!response.ok) {

        throw new Error(
          "Failed to create post"
        );

      }

      alert(
        "Post Created Successfully "
      );

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

      {/* COMMUNITY */}

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
            fontWeight: "700"
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

            background:
              "rgba(30,41,59,0.92)",

            color: "white",

            border:
              "1px solid rgba(59,130,246,0.18)"

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

      {/* TITLE */}

      <div
        style={{
          marginBottom: "24px"
        }}
      >

        <input

          type="text"

          placeholder="Post title..."

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

            background:
              "rgba(30,41,59,0.92)",

            color: "white",

            border:
              "1px solid rgba(59,130,246,0.18)"

          }}

        />

      </div>

      {/* CONTENT */}

      <div
        style={{
          marginBottom: "24px"
        }}
      >

        <textarea

          rows="7"

          placeholder="Write content..."

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

            background:
              "rgba(30,41,59,0.92)",

            color: "white",

            border:
              "1px solid rgba(59,130,246,0.18)"

          }}

        />

      </div>

      {/* IMAGE */}

      <div
        style={{
          marginBottom: "24px"
        }}
      >

        <input

          type="file"

          accept="image/*"

          onChange={handleImageChange}

          style={{

            width: "100%",

            padding: "14px",

            borderRadius: "16px",

            background:
              "rgba(30,41,59,0.92)",

            color: "white"

          }}

        />

      </div>

      {/* PREVIEW */}

      {

        imagePreview && (

          <div
            style={{
              marginBottom: "24px"
            }}
          >

            <img

              src={imagePreview}

              alt="preview"

              style={{

                width: "100%",

                borderRadius: "18px",

                maxHeight: "420px",

                objectFit: "cover"

              }}

            />

          </div>

        )

      }

      {/* BUTTON */}

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

          fontWeight: "800",

          fontSize: "16px"

        }}

      >

        {

          loading

            ? "Publishing Post..."

            : " Publish Post"

        }

      </button>

    </form>

  );

}

export default CreatePostForm;
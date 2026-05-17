import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { createPost } from "../../services/postService";

import {
  getAllCommunities
} from "../../services/communityService";

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

  const [imageUrl, setImageUrl] =
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

      const data =
        await getAllCommunities();

      setCommunities(

        Array.isArray(data)

          ? data

          : []

      );

    } catch (error) {

      console.log(
        "COMMUNITY ERROR :",
        error.response?.data || error.message
      );

      setCommunities([]);

    }

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

      const payload = {

        title:
          title.trim(),

        content:
          content.trim(),

        imageUrl:
          imageUrl.trim(),

        author:
          username,

        communityId:
          Number(communityId)

      };

      await createPost(payload);

      alert(
        "Post Created Successfully 🚀"
      );

      /* RESET */

      setTitle("");

      setContent("");

      setImageUrl("");

      setCommunityId("");

      navigate("/home");

    } catch (error) {

      console.log(
        "CREATE POST ERROR :",
        error.response?.data || error.message
      );

      alert(

        error?.response?.data?.message ||

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
         IMAGE URL
      ========================================= */}

      <div
        style={{
          marginBottom: "18px"
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

          Add Image URL 🖼️

        </label>

        <input

          type="text"

          placeholder="Paste image URL..."

          value={imageUrl}

          onChange={(e) =>

            setImageUrl(
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
         IMAGE PREVIEW
      ========================================= */}

      {

        imageUrl && (

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

              src={imageUrl}

              alt="Preview"

              style={{

                width: "100%",

                maxHeight: "420px",

                objectFit: "cover",

                borderRadius: "16px"

              }}

              onError={(e) => {

                e.target.style.display =
                  "none";

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

          boxShadow:
            "0px 8px 24px rgba(37,99,235,0.30)",

          transition: "0.3s ease",

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
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { createPost } from "../../services/postService";

import {
  getAllCommunities
} from "../../services/communityService";

function CreatePostForm() {

  /* =========================================
     Navigation
  ========================================= */

  const navigate = useNavigate();

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

      setCommunities(data || []);

    } catch (error) {

      console.log(error);

      setCommunities([]);

    }

  };

  /* =========================================
     Submit
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
         Create Post
      ========================================= */

      await createPost({

        title:
          title.trim(),

        content:
          content.trim(),

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

      /* Redirect */

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(

        error?.response?.data?.error ||

        "Failed to create post ❌"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div

      style={{

        minHeight: "100vh",

        background:
          "linear-gradient(to bottom,#020617,#020617)",

        padding: "40px 16px",

        display: "flex",

        justifyContent: "center",

        alignItems: "flex-start"

      }}

    >

      {/* Main Card */}

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

            Share discussions and
            updates with your
            community.

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
              marginBottom: "24px"
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

              rows="6"

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

          {/* Submit */}

          <button

            type="submit"

            disabled={loading}

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

              opacity:
                loading ? 0.7 : 1

            }}

          >

            {

              loading

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
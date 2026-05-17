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
     FORM STATES
  ========================================= */

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [communityId, setCommunityId] =
    useState("");

  /* =========================================
     COMMUNITIES
  ========================================= */

  const [communities, setCommunities] =
    useState([]);

  /* =========================================
     LOADING
  ========================================= */

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     LOGGED USER
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

      const safeData =

        Array.isArray(data)

          ? data

          : [];

      setCommunities(safeData);

    } catch (error) {

      console.log(
        "COMMUNITY FETCH ERROR :",
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

    /* VALIDATION */

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
         CREATE POST
      ========================================= */

      const payload = {

        title:
          title.trim(),

        content:
          content.trim(),

        imageUrl:
          imageUrl.trim(),

        author:
          username || "Anonymous",

        communityId:
          Number(communityId)

      };

      console.log(
        "POST PAYLOAD =>",
        payload
      );

      await createPost(payload);

      alert(
        "Post Created Successfully 🚀"
      );

      /* RESET FORM */

      setTitle("");

      setContent("");

      setImageUrl("");

      setCommunityId("");

      /* REDIRECT */

      navigate("/home");

    } catch (error) {

      console.log(
        "CREATE POST ERROR :",
        error.response?.data || error.message
      );

      alert(

        error?.response?.data?.message ||

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

        width: "100%"

      }}

    >

      {/* =========================================
         HEADING
      ========================================= */}

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

          Create New Post 🚀

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

      {/* =========================================
         FORM
      ========================================= */}

      <form onSubmit={handleSubmit}>

        {/* =========================================
           COMMUNITY
        ========================================= */}

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

        {/* =========================================
           TITLE
        ========================================= */}

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

        {/* =========================================
           CONTENT
        ========================================= */}

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

        {/* =========================================
           IMAGE URL
        ========================================= */}

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

            Image URL (Optional)

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

        {/* =========================================
           SUBMIT
        ========================================= */}

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

  );

}

export default CreatePostForm;
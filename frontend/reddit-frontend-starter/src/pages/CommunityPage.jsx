import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import PostCard from "../components/posts/PostCard";

import {

  getCommunityById,

  getPostsByCommunity,

  joinCommunity,

  leaveCommunity,

  getMemberCount,

  isJoined

} from "../services/communityService";

function CommunityPage() {

  /* =========================================
     Route Param
  ========================================= */

  const { id } = useParams();

  const navigate = useNavigate();

  /* =========================================
     Logged User
  ========================================= */

  const username =
    localStorage.getItem("username");

  /* =========================================
     States
  ========================================= */

  const [community, setCommunity] =
    useState(null);

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [members, setMembers] =
    useState(0);

  const [joined, setJoined] =
    useState(false);

  const [joinLoading, setJoinLoading] =
    useState(false);

  /* =========================================
     FIX FOR /community ROUTE
  ========================================= */

  useEffect(() => {

    if (!id) {

      navigate("/community/1");

      return;

    }

  }, [id, navigate]);

  /* =========================================
     Load Data
  ========================================= */

  useEffect(() => {

    if (!id) return;

    fetchCommunity();

    fetchPosts();

    fetchMembers();

    fetchJoinedStatus();

  }, [id]);

  /* =========================================
     Fetch Community
  ========================================= */

  const fetchCommunity = async () => {

    try {

      const data =
        await getCommunityById(id);

      setCommunity(data);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load community ❌"
      );

    }

  };

  /* =========================================
     Fetch Posts
  ========================================= */

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const data =
        await getPostsByCommunity(id);

      const sortedPosts =

        data.sort(
          (a, b) => b.id - a.id
        );

      setPosts(sortedPosts);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load posts ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     Fetch Members
  ========================================= */

  const fetchMembers = async () => {

    try {

      const count =
        await getMemberCount(id);

      setMembers(count);

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================================
     Joined Status
  ========================================= */

  const fetchJoinedStatus =
    async () => {

      try {

        const status =
          await isJoined(
            id,
            username
          );

        setJoined(status);

      } catch (error) {

        console.log(error);

      }

    };

  /* =========================================
     Join Community
  ========================================= */

  const handleJoin = async () => {

    try {

      setJoinLoading(true);

      await joinCommunity(
        id,
        username
      );

      setJoined(true);

      setMembers((prev) => prev + 1);

    } catch (error) {

      console.log(error);

      alert("Failed to join ❌");

    } finally {

      setJoinLoading(false);

    }

  };

  /* =========================================
     Leave Community
  ========================================= */

  const handleLeave = async () => {

    try {

      setJoinLoading(true);

      await leaveCommunity(
        id,
        username
      );

      setJoined(false);

      setMembers((prev) => prev - 1);

    } catch (error) {

      console.log(error);

      alert("Failed to leave ❌");

    } finally {

      setJoinLoading(false);

    }

  };

  return (

    <div

      style={{

        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617 0%,#071028 50%,#020617 100%)",

        color: "white",

        overflowX: "hidden"

      }}

    >

      {/* Background */}

      <Navbar />

      <div

        style={{

          width: "88%",

          maxWidth: "1100px",

          margin: "22px auto",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* Header */}

        {

          community && (

            <div

              style={{

                background:
                  "rgba(15,23,42,0.72)",

                border:
                  "1px solid rgba(59,130,246,0.12)",

                borderRadius: "22px",

                padding: "24px",

                marginBottom: "24px"

              }}

            >

              <div

                style={{

                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  gap: "18px",

                  flexWrap: "wrap"

                }}

              >

                <div>

                  <h1

                    style={{

                      margin: 0,

                      fontSize: "32px",

                      fontWeight: "700"

                    }}

                  >

                    {community.name}

                  </h1>

                  <p

                    style={{

                      marginTop: "10px",

                      color: "#94a3b8"

                    }}

                  >

                    {

                      community.description ||

                      "Community discussions"

                    }

                  </p>

                </div>

                {

                  joined ? (

                    <button

                      onClick={handleLeave}

                      disabled={joinLoading}

                      style={buttonLeave}

                    >

                      Joined ✓

                    </button>

                  ) : (

                    <button

                      onClick={handleJoin}

                      disabled={joinLoading}

                      style={buttonJoin}

                    >

                      Join Community

                    </button>

                  )

                }

              </div>

              <div

                style={{

                  marginTop: "18px",

                  display: "flex",

                  gap: "12px"

                }}

              >

                <div style={statsBlue}>

                  {posts.length} Posts

                </div>

                <div style={statsPurple}>

                  {members} Members

                </div>

              </div>

            </div>

          )

        }

        {/* Title */}

        <h2

          style={{

            marginBottom: "18px"

          }}

        >

          Community Discussions

        </h2>

        {/* Loading */}

        {

          loading && (

            <div

              style={{

                textAlign: "center",

                padding: "40px",

                color: "#94a3b8"

              }}

            >

              🚀 Loading posts...

            </div>

          )

        }

        {/* Empty */}

        {

          !loading &&

          posts.length === 0 && (

            <div

              style={{

                background:
                  "rgba(15,23,42,0.72)",

                borderRadius: "20px",

                padding: "40px",

                textAlign: "center"

              }}

            >

              <h3>

                No Posts Yet 🚀

              </h3>

            </div>

          )

        }

        {/* Posts */}

        <div

          style={{

            display: "flex",

            flexDirection: "column",

            gap: "18px"

          }}

        >

          {

            posts.map((post) => (

              <PostCard

                key={post.id}

                id={post.id}

                title={post.title}

                content={post.content}

                imageUrl={
                  post.imageUrl || ""
                }

                votes={
                  post.votes || 0
                }

                author={
                  post.author || ""
                }

                comments={
                  post.comments || 0
                }

                communityName={
                  post.communityName
                }

                communityId={id}

                onPostUpdated={
                  fetchPosts
                }

              />

            ))

          }

        </div>

      </div>

    </div>

  );

}

/* Styles */

const buttonJoin = {

  background:
    "linear-gradient(to right,#2563eb,#3b82f6)",

  border: "none",

  color: "white",

  padding: "11px 18px",

  borderRadius: "12px",

  fontWeight: "700",

  cursor: "pointer"

};

const buttonLeave = {

  background:
    "linear-gradient(to right,#dc2626,#ef4444)",

  border: "none",

  color: "white",

  padding: "11px 18px",

  borderRadius: "12px",

  fontWeight: "700",

  cursor: "pointer"

};

const statsBlue = {

  background:
    "rgba(37,99,235,0.12)",

  border:
    "1px solid rgba(59,130,246,0.16)",

  borderRadius: "12px",

  padding: "8px 14px",

  color: "#dbeafe",

  fontSize: "12px",

  fontWeight: "600"

};

const statsPurple = {

  background:
    "rgba(124,58,237,0.12)",

  border:
    "1px solid rgba(139,92,246,0.16)",

  borderRadius: "12px",

  padding: "8px 14px",

  color: "#ddd6fe",

  fontSize: "12px",

  fontWeight: "600"

};

export default CommunityPage;
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getAllCommunities
} from "../../services/communityService";

function CommunitySidebar() {

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [communities, setCommunities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     LOAD COMMUNITIES
  ========================================= */

  useEffect(() => {

    fetchCommunities();

  }, []);

  /* =========================================
     FETCH COMMUNITIES
  ========================================= */

  const fetchCommunities = async () => {

    try {

      setLoading(true);

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

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     OPEN COMMUNITY
  ========================================= */

  const openCommunity = (communityId) => {

    if (!communityId) {

      return;

    }

    navigate(
      `/community/${communityId}`
    );

  };

  return (

    <div

      style={{

        width: "280px",

        position: "sticky",

        top: "90px"

      }}

    >

      {/* =========================================
         SIDEBAR CARD
      ========================================= */}

      <div

        style={{

          background:
            "rgba(15,23,42,0.72)",

          border:
            "1px solid rgba(59,130,246,0.12)",

          borderRadius: "24px",

          padding: "22px",

          backdropFilter: "blur(14px)",

          boxShadow:
            "0px 8px 28px rgba(0,0,0,0.32)"

        }}

      >

        {/* =========================================
           TITLE
        ========================================= */}

        <h2

          style={{

            marginTop: 0,

            marginBottom: "8px",

            color: "#f8fafc",

            fontSize: "22px",

            fontWeight: "800"

          }}

        >

          Communities

        </h2>

        {/* =========================================
           SUBTITLE
        ========================================= */}

        <p

          style={{

            color: "#94a3b8",

            fontSize: "13px",

            marginBottom: "18px",

            lineHeight: "24px"

          }}

        >

          Explore subreddit communities

        </p>

        {/* =========================================
           LOADING
        ========================================= */}

        {

          loading && (

            <div

              style={{

                textAlign: "center",

                padding: "20px",

                color: "#94a3b8",

                fontSize: "14px"

              }}

            >

              🚀 Loading communities...

            </div>

          )

        }

        {/* =========================================
           EMPTY STATE
        ========================================= */}

        {

          !loading &&

          communities.length === 0 && (

            <div

              style={{

                background:
                  "rgba(255,255,255,0.03)",

                borderRadius: "18px",

                padding: "22px",

                textAlign: "center",

                color: "#94a3b8",

                fontSize: "14px"

              }}

            >

              No Communities Found 🚀

            </div>

          )

        }

        {/* =========================================
           COMMUNITIES LIST
        ========================================= */}

        <div

          style={{

            display: "flex",

            flexDirection: "column",

            gap: "14px"

          }}

        >

          {

            communities.map((community) => (

              <div

                key={community.id}

                onClick={() =>

                  openCommunity(
                    community.id
                  )

                }

                style={{

                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.06)",

                  borderRadius: "20px",

                  padding: "18px",

                  cursor: "pointer",

                  transition: "0.3s ease",

                  boxShadow:
                    "0px 4px 14px rgba(0,0,0,0.18)"

                }}

                onMouseEnter={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(-3px)";

                  e.currentTarget.style.border =
                    "1px solid rgba(59,130,246,0.28)";

                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(0px)";

                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.06)";

                }}

              >

                {/* =========================================
                   COMMUNITY NAME
                ========================================= */}

                <h3

                  style={{

                    marginTop: 0,

                    marginBottom: "10px",

                    color: "#f8fafc",

                    fontSize: "18px",

                    fontWeight: "700"

                  }}

                >

                  {community.name}

                </h3>

                {/* =========================================
                   DESCRIPTION
                ========================================= */}

                <p

                  style={{

                    margin: 0,

                    color: "#94a3b8",

                    fontSize: "13px",

                    lineHeight: "24px"

                  }}

                >

                  {

                    community.description ||

                    "Community discussions"

                  }

                </p>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default CommunitySidebar;
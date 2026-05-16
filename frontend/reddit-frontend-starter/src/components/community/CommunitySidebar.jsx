import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {

  getAllCommunities

} from "../../services/communityService";

function CommunitySidebar() {

  const navigate = useNavigate();

  /* =========================================
     State
  ========================================= */

  const [communities, setCommunities] =
    useState([]);

  /* =========================================
     Load Communities
  ========================================= */

  useEffect(() => {

    fetchCommunities();

  }, []);

  /* =========================================
     Fetch Communities
  ========================================= */

  const fetchCommunities = async () => {

    try {

      const data =
        await getAllCommunities();

      setCommunities(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div

      style={{

        width: "260px",

        position: "sticky",

        top: "90px"

      }}

    >

      {/* =========================================
         Sidebar Card
      ========================================= */}

      <div

        style={{

          background:
            "rgba(15,23,42,0.70)",

          border:
            "1px solid rgba(59,130,246,0.12)",

          borderRadius: "22px",

          padding: "20px",

          backdropFilter: "blur(12px)",

          boxShadow:
            "0px 6px 24px rgba(0,0,0,0.28)"

        }}

      >

        {/* =========================================
           Title
        ========================================= */}

        <h2

          style={{

            marginTop: 0,

            marginBottom: "8px",

            color: "#f8fafc",

            fontSize: "18px",

            fontWeight: "700"

          }}

        >

          Communities

        </h2>

        {/* =========================================
           Subtitle
        ========================================= */}

        <p

          style={{

            color: "#94a3b8",

            fontSize: "13px",

            marginBottom: "10px",

            lineHeight: "22px"

          }}

        >

          Explore subreddit communities

        </p>

        {/* =========================================
           Communities List
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

                  navigate(

                    `/community/${community.id}`

                  )

                }

                style={{

                  background:
                    "rgba(255,255,255,0.03)",

                  border:
                    "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "18px",

                  padding: "16px",

                  cursor: "pointer",

                  transition: "0.3s"

                }}

              >

                {/* =========================================
                   Community Name
                ========================================= */}

                <h3

                  style={{

                    marginTop: 0,

                    marginBottom: "10px",

                    color: "#f8fafc",

                    fontSize: "18px"

                  }}

                >

                  {community.name}

                </h3>

                {/* =========================================
                   Description
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
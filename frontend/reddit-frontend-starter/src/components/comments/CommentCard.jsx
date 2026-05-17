function CommentCard({

  author,
  content,
  createdAt

}) {

  /* =========================================
     SAFE AUTHOR
  ========================================= */

  const displayAuthor =

    author &&

    author !== "undefined" &&

    author !== "null" &&

    author.trim() !== ""

      ? author

      : "Anonymous";

  /* =========================================
     FORMAT DATE
  ========================================= */

  const formattedDate =

    createdAt

      ? new Date(createdAt)
          .toLocaleString()

      : "Recently";

  return (

    <div

      style={{

        background:
          "linear-gradient(135deg,#111827,#0f172a)",

        border:
          "1px solid rgba(59,130,246,0.12)",

        borderRadius: "18px",

        padding: "18px",

        marginBottom: "16px",

        boxShadow:
          "0 4px 18px rgba(0,0,0,0.25)",

        transition: "0.3s",

        position: "relative",

        overflow: "hidden"

      }}

    >

      {/* =========================================
         GLOW EFFECT
      ========================================= */}

      <div

        style={{

          position: "absolute",

          top: "-30px",

          right: "-30px",

          width: "90px",

          height: "90px",

          borderRadius: "50%",

          background:
            "rgba(59,130,246,0.10)",

          filter: "blur(35px)"

        }}

      />

      {/* =========================================
         HEADER
      ========================================= */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          gap: "12px",

          marginBottom: "14px",

          position: "relative",

          zIndex: 2,

          flexWrap: "wrap"

        }}

      >

        {/* USER INFO */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: "12px"

          }}

        >

          {/* AVATAR */}

          <div

            style={{

              width: "44px",

              height: "44px",

              borderRadius: "50%",

              background:
                "linear-gradient(to right,#2563eb,#38bdf8)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              color: "white",

              fontWeight: "700",

              fontSize: "16px",

              boxShadow:
                "0 0 14px rgba(59,130,246,0.35)"

            }}

          >

            {

              displayAuthor
                .charAt(0)
                .toUpperCase()

            }

          </div>

          {/* AUTHOR */}

          <div>

            <h4

              style={{

                margin: 0,

                color: "#f8fafc",

                fontSize: "15px",

                fontWeight: "600"

              }}

            >

              {displayAuthor}

            </h4>

            <p

              style={{

                margin: "4px 0 0 0",

                color: "#94a3b8",

                fontSize: "11px"

              }}

            >

              Community Member

            </p>

          </div>

        </div>

        {/* DATE */}

        <div

          style={{

            background:
              "rgba(37,99,235,0.10)",

            color: "#93c5fd",

            padding: "6px 10px",

            borderRadius: "10px",

            fontSize: "11px",

            fontWeight: "600"

          }}

        >

          🕒 {formattedDate}

        </div>

      </div>

      {/* =========================================
         COMMENT CONTENT
      ========================================= */}

      <div

        style={{

          position: "relative",

          zIndex: 2

        }}

      >

        <p

          style={{

            color: "#dbeafe",

            fontSize: "14px",

            lineHeight: "26px",

            margin: 0,

            wordBreak: "break-word"

          }}

        >

          {content}

        </p>

      </div>

      {/* =========================================
         FOOTER
      ========================================= */}

      <div

        style={{

          marginTop: "16px",

          paddingTop: "12px",

          borderTop:
            "1px solid rgba(255,255,255,0.05)",

          display: "flex",

          justifyContent: "flex-end",

          position: "relative",

          zIndex: 2

        }}

      >

        <div

          style={{

            background:
              "rgba(37,99,235,0.12)",

            color: "#60a5fa",

            padding: "6px 12px",

            borderRadius: "10px",

            fontSize: "11px",

            fontWeight: "600",

            border:
              "1px solid rgba(96,165,250,0.15)"

          }}

        >

          💬 Comment

        </div>

      </div>

    </div>

  );

}

export default CommentCard;
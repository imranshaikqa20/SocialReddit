function CommentCard({

  author,
  content,
  createdAt

}) {

  /* Default Author */

  const displayAuthor =

    author &&
    author !== "undefined" &&
    author.trim() !== ""

      ? author

      : "Anonymous";

  return (

    <div

      style={{

        background:
          "linear-gradient(135deg, #111827, #0f172a)",

        border:
          "1px solid rgba(59,130,246,0.12)",

        borderRadius: "16px",

        padding: "16px",

        marginBottom: "14px",

        boxShadow:
          "0 4px 16px rgba(0,0,0,0.25)",

        transition: "0.3s",

        position: "relative",

        overflow: "hidden"

      }}

    >

      {/* Glow Effect */}

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

      {/* Header */}

      <div

        style={{

          display: "flex",

          alignItems: "center",

          gap: "12px",

          marginBottom: "12px",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* Avatar */}

        <div

          style={{

            width: "42px",

            height: "42px",

            borderRadius: "50%",

            background:
              "linear-gradient(to right, #2563eb, #38bdf8)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "white",

            fontWeight: "700",

            fontSize: "15px",

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

        {/* Author Info */}

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

              margin: "3px 0 0 0",

              color: "#94a3b8",

              fontSize: "11px"

            }}

          >

            Commented recently

          </p>

        </div>

      </div>

      {/* Comment Content */}

      <p

        style={{

          color: "#dbeafe",

          fontSize: "14px",

          lineHeight: "24px",

          marginBottom: "14px",

          position: "relative",

          zIndex: 2

        }}

      >

        {content}

      </p>

      {/* Footer */}

      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          position: "relative",

          zIndex: 2

        }}

      >

        {/* Date */}

        <small

          style={{

            color: "#64748b",

            fontSize: "11px"

          }}

        >

          🕒 {createdAt}

        </small>

        {/* Badge */}

        <div

          style={{

            background:
              "rgba(37,99,235,0.12)",

            color: "#60a5fa",

            padding: "5px 10px",

            borderRadius: "10px",

            fontSize: "11px",

            fontWeight: "600",

            border:
              "1px solid rgba(96,165,250,0.15)"

          }}

        >

          💬 Reply

        </div>

      </div>

    </div>

  );

}

export default CommentCard;
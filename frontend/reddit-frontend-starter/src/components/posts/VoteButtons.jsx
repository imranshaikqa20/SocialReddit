import { useState } from "react";

import api from "../../services/api";

function VoteButtons({

  postId,
  votes,
  onVoteUpdate

}) {

  /* =========================================
     VOTE STATE
  ========================================= */

  const [voteCount, setVoteCount] =
    useState(votes || 0);

  /* =========================================
     LOADING STATE
  ========================================= */

  const [loading, setLoading] =
    useState(false);

  /* =========================================
     HANDLE UPVOTE
  ========================================= */

  const handleUpvote = async () => {

    try {

      setLoading(true);

      console.log(
        "Upvoting Post ID:",
        postId
      );

      const response = await api.put(

        `/posts/${postId}/upvote`

      );

      console.log(
        "Upvote Response:",
        response.data
      );

      /* =========================================
         UPDATED VOTES
      ========================================= */

      const updatedVotes =

        response.data?.votes ??
        response.data ??
        voteCount + 1;

      setVoteCount(updatedVotes);

      /* =========================================
         OPTIONAL CALLBACK
      ========================================= */

      if (onVoteUpdate) {

        onVoteUpdate(updatedVotes);

      }

    } catch (error) {

      console.log(
        "Upvote Error:",
        error
      );

      alert("Failed to upvote ❌");

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     HANDLE DOWNVOTE
  ========================================= */

  const handleDownvote = async () => {

    try {

      setLoading(true);

      console.log(
        "Downvoting Post ID:",
        postId
      );

      const response = await api.put(

        `/posts/${postId}/downvote`

      );

      console.log(
        "Downvote Response:",
        response.data
      );

      /* =========================================
         UPDATED VOTES
      ========================================= */

      const updatedVotes =

        response.data?.votes ??
        response.data ??
        voteCount - 1;

      setVoteCount(updatedVotes);

      /* =========================================
         OPTIONAL CALLBACK
      ========================================= */

      if (onVoteUpdate) {

        onVoteUpdate(updatedVotes);

      }

    } catch (error) {

      console.log(
        "Downvote Error:",
        error
      );

      alert("Failed to downvote ❌");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div

      style={{

        display: "flex",

        alignItems: "center",

        gap: "6px",

        flexWrap: "wrap"

      }}

    >

      {/* =========================================
         UPVOTE BUTTON
      ========================================= */}

      <button

        onClick={handleUpvote}

        disabled={loading}

        style={{

          background:
            "linear-gradient(to right,#22c55e,#16a34a)",

          border: "none",

          color: "white",

          padding: "6px 12px",

          borderRadius: "8px",

          fontSize: "11px",

          fontWeight: "700",

          cursor: loading
            ? "not-allowed"
            : "pointer",

          opacity: loading
            ? 0.7
            : 1,

          transition: "0.3s",

          display: "flex",

          alignItems: "center",

          gap: "4px"

        }}

      >

        👍 Upvote

      </button>

      {/* =========================================
         DOWNVOTE BUTTON
      ========================================= */}

      <button

        onClick={handleDownvote}

        disabled={loading}

        style={{

          background:
            "linear-gradient(to right,#ef4444,#dc2626)",

          border: "none",

          color: "white",

          padding: "6px 12px",

          borderRadius: "8px",

          fontSize: "11px",

          fontWeight: "700",

          cursor: loading
            ? "not-allowed"
            : "pointer",

          opacity: loading
            ? 0.7
            : 1,

          transition: "0.3s",

          display: "flex",

          alignItems: "center",

          gap: "4px"

        }}

      >

        👎 Downvote

      </button>

      {/* =========================================
         VOTE COUNT
      ========================================= */}

      <div

        style={{

          background:
            "rgba(37,99,235,0.16)",

          color: "#60a5fa",

          padding: "6px 10px",

          borderRadius: "8px",

          fontSize: "11px",

          fontWeight: "700"

        }}

      >

        {voteCount} Votes

      </div>

    </div>

  );

}

export default VoteButtons;
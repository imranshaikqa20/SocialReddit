import { useState } from "react";

import api from "../../services/api";

function VoteButtons({

  postId,
  votes

}) {

  /* Vote Count State */

  const [voteCount, setVoteCount] =
    useState(votes || 0);

  /* Loading State */

  const [loading, setLoading] =
    useState(false);

  /* Handle Upvote */

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

      /* Update Vote Count */

      setVoteCount(
        response.data.votes
      );

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

  /* Handle Downvote */

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

      /* Update Vote Count */

      setVoteCount(
        response.data.votes
      );

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

    <div className="flex items-center gap-4 flex-wrap">

      {/* Upvote Button */}

      <button

        onClick={handleUpvote}

        disabled={loading}

        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"

      >

        👍 Upvote

      </button>

      {/* Downvote Button */}

      <button

        onClick={handleDownvote}

        disabled={loading}

        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"

      >

        👎 Downvote

      </button>

      {/* Vote Count */}

      <span className="font-semibold text-gray-700">

        {voteCount} Votes

      </span>

    </div>

  );

}

export default VoteButtons;
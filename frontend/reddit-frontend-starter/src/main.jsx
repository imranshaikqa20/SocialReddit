import React from "react";

import ReactDOM from "react-dom/client";

import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

/* Auth Pages */

import SignupForm
  from "./components/auth/SignupForm";

import LoginForm
  from "./components/auth/LoginForm";

/* Main Pages */

import HomePage
  from "./pages/HomePage";

import CreatePostPage
  from "./pages/create-post";

import CommunityPage
  from "./pages/CommunityPage";

import ProfilePage
  from "./pages/ProfilePage";

/* Community Components */

import CreateCommunityForm
  from "./components/community/CreateCommunityForm";

/* Global CSS */

import "./styles/globals.css";

function AppRoutes() {

  /* Check Login */

  const token =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Route */}

        <Route

          path="/"

          element={

            token

              ? <Navigate to="/home" />

              : <Navigate to="/login" />

          }

        />

        {/* Home */}

        <Route

          path="/home"

          element={

            token

              ? <HomePage />

              : <Navigate to="/login" />

          }

        />

        {/* PROFILE PAGE */}

        <Route

          path="/profile"

          element={

            token

              ? <ProfilePage />

              : <Navigate to="/login" />

          }

        />

        {/* Signup */}

        <Route

          path="/signup"

          element={

            token

              ? <Navigate to="/home" />

              : <SignupForm />

          }

        />

        {/* Login */}

        <Route

          path="/login"

          element={

            token

              ? <Navigate to="/home" />

              : <LoginForm />

          }

        />

        {/* Create Post */}

        <Route

          path="/create-post"

          element={

            token

              ? <CreatePostPage />

              : <Navigate to="/login" />

          }

        />

        {/* Create Community */}

        <Route

          path="/create-community"

          element={

            token

              ? <CreateCommunityForm />

              : <Navigate to="/login" />

          }

        />

        {/* Community Page */}

        <Route

          path="/community/:id"

          element={

            token

              ? <CommunityPage />

              : <Navigate to="/login" />

          }

        />

        {/* Invalid Routes */}

        <Route

          path="*"

          element={<Navigate to="/" />}

        />

      </Routes>

    </BrowserRouter>

  );

}

ReactDOM.createRoot(

  document.getElementById("root")

).render(

  <React.StrictMode>

    <AppRoutes />

  </React.StrictMode>

);
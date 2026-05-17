import React from "react";

import ReactDOM from "react-dom/client";

import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

/* =========================================
   Auth Pages
========================================= */

import SignupForm
  from "./components/auth/SignupForm";

import LoginForm
  from "./components/auth/LoginForm";

/* =========================================
   Main Pages
========================================= */

import HomePage
  from "./pages/HomePage";

import CreatePostPage
  from "./pages/CreatePostPage";

import CommunityPage
  from "./pages/CommunityPage";

import ProfilePage
  from "./pages/ProfilePage";

/* =========================================
   Community Components
========================================= */

import CreateCommunityForm
  from "./components/community/CreateCommunityForm";

/* =========================================
   Global CSS
========================================= */

import "./styles/globals.css";

function AppRoutes() {

  /* =========================================
     Check Login
  ========================================= */

  const token =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================================
            DEFAULT ROUTE
        ========================================= */}

        <Route

          path="/"

          element={

            token

              ? <Navigate to="/home" />

              : <Navigate to="/login" />

          }

        />

        {/* =========================================
            HOME
        ========================================= */}

        <Route

          path="/home"

          element={

            token

              ? <HomePage />

              : <Navigate to="/login" />

          }

        />

        {/* =========================================
            PROFILE
        ========================================= */}

        <Route

          path="/profile"

          element={

            token

              ? <ProfilePage />

              : <Navigate to="/login" />

          }

        />

        {/* =========================================
            SIGNUP
        ========================================= */}

        <Route

          path="/signup"

          element={

            token

              ? <Navigate to="/home" />

              : <SignupForm />

          }

        />

        {/* =========================================
            LOGIN
        ========================================= */}

        <Route

          path="/login"

          element={

            token

              ? <Navigate to="/home" />

              : <LoginForm />

          }

        />

        {/* =========================================
            CREATE POST
        ========================================= */}

        <Route

          path="/post"

          element={

            token

              ? <CreatePostPage />

              : <Navigate to="/login" />

          }

        />

        {/* =========================================
            CREATE COMMUNITY
        ========================================= */}

        <Route

          path="/create-community"

          element={

            token

              ? <CreateCommunityForm />

              : <Navigate to="/login" />

          }

        />

        {/* =========================================
            COMMUNITY PAGE
        ========================================= */}

        <Route

          path="/community"

          element={

            token

              ? <CommunityPage />

              : <Navigate to="/login" />

          }

        />

        <Route

          path="/community/:id"

          element={

            token

              ? <CommunityPage />

              : <Navigate to="/login" />

          }

        />

        {/* =========================================
            INVALID ROUTES
        ========================================= */}

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
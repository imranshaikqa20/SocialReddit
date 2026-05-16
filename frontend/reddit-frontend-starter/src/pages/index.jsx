import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

/* Pages */

import LoginPage from "./login";

import SignupPage from "./signup";

import HomePage from "./HomePage";

import CreatePostPage from "./create-post";

import CommunityPage from "./CommunityPage";

import ProfilePage from "./ProfilePage";

/* Communities */

import CreateCommunityPage
from "./communities/CreateCommunityPage";

/* =========================================
   Protected Route
========================================= */

function ProtectedRoute({

  children

}) {

  const token =
    localStorage.getItem("token");

  return token

    ? children

    : <Navigate to="/login" />;

}

/* =========================================
   Main Routes
========================================= */

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================================
           Login
        ========================================= */}

        <Route

          path="/login"

          element={<LoginPage />}

        />

        {/* =========================================
           Signup
        ========================================= */}

        <Route

          path="/signup"

          element={<SignupPage />}

        />

        {/* =========================================
           Home
        ========================================= */}

        <Route

          path="/home"

          element={

            <ProtectedRoute>

              <HomePage />

            </ProtectedRoute>

          }

        />

        {/* =========================================
           Create Post
        ========================================= */}

        <Route

          path="/create-post"

          element={

            <ProtectedRoute>

              <CreatePostPage />

            </ProtectedRoute>

          }

        />

        {/* =========================================
           Create Community
        ========================================= */}

        <Route

          path="/create-community"

          element={

            <ProtectedRoute>

              <CreateCommunityPage />

            </ProtectedRoute>

          }

        />

        {/* =========================================
           Community Page
        ========================================= */}

        <Route

          path="/community/:id"

          element={

            <ProtectedRoute>

              <CommunityPage />

            </ProtectedRoute>

          }

        />

        {/* =========================================
           Profile Page
        ========================================= */}

        <Route

          path="/profile"

          element={

            <ProtectedRoute>

              <ProfilePage />

            </ProtectedRoute>

          }

        />

        {/* =========================================
           Default Redirect
        ========================================= */}

        <Route

          path="*"

          element={
            <Navigate to="/home" />
          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;
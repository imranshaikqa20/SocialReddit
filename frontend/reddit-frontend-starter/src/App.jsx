import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

/* =========================================
   Auth Components
========================================= */

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

/* =========================================
   Pages
========================================= */

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";

/* =========================================
   Community Components
========================================= */

import CreateCommunityForm
  from "./components/community/CreateCommunityForm";

function App() {

  /* =========================================
     Check Authentication
  ========================================= */

  const token =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================================
            ROOT ROUTE
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
            COMMUNITY REDIRECT
        ========================================= */}

        <Route
          path="/community"
          element={
            token
              ? <Navigate to="/community/1" />
              : <Navigate to="/login" />
          }
        />

        {/* =========================================
            COMMUNITY PAGE
        ========================================= */}

        <Route
          path="/community/:id"
          element={
            token
              ? <CommunityPage />
              : <Navigate to="/login" />
          }
        />

        {/* =========================================
            FALLBACK ROUTE
        ========================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                token
                  ? "/home"
                  : "/login"
              }
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
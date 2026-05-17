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
import CreatePostPage from "./pages/create-post";

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
            ROOT REDIRECT
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
          element={<LoginForm />}
        />

        {/* =========================================
            SIGNUP
        ========================================= */}

        <Route
          path="/signup"
          element={<SignupForm />}
        />

        {/* =========================================
            HOME PAGE
        ========================================= */}

        <Route
          path="/home"
          element={<HomePage />}
        />

        {/* =========================================
            PROFILE PAGE
        ========================================= */}

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        {/* =========================================
            CREATE POST PAGE
        ========================================= */}

        <Route
          path="/post"
          element={<CreatePostPage />}
        />

        {/* =========================================
            CREATE COMMUNITY
        ========================================= */}

        <Route
          path="/create-community"
          element={<CreateCommunityForm />}
        />

        {/* =========================================
            COMMUNITY PAGE
        ========================================= */}

        <Route
          path="/community"
          element={<CommunityPage />}
        />

        <Route
          path="/community/:id"
          element={<CommunityPage />}
        />

        {/* =========================================
            FALLBACK ROUTE
        ========================================= */}

        <Route
          path="*"
          element={

            token
              ? <Navigate to="/home" />
              : <Navigate to="/login" />

          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
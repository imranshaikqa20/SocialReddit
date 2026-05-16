import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

/* Auth */

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

/* Pages */

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/create-post";

/* Components */

import CreateCommunityForm
  from "./components/community/CreateCommunityForm";

function App() {

  const token =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* ROOT */}

        <Route
          path="/"
          element={
            token
              ? <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<LoginForm />}
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<SignupForm />}
        />

        {/* HOME */}

        <Route
          path="/home"
          element={<HomePage />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        {/* CREATE POST */}

        <Route
          path="/create-post"
          element={<CreatePostPage />}
        />

        {/* CREATE COMMUNITY */}

        <Route
          path="/create-community"
          element={<CreateCommunityForm />}
        />

        {/* COMMUNITY */}

        <Route
          path="/community/:id"
          element={<CommunityPage />}
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <div
              style={{
                color: "white",
                padding: "40px"
              }}
            >
              PAGE NOT FOUND
            </div>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
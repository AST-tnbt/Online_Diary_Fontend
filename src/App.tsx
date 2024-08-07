import { ReactNode } from "react";
import AccountPage from "./Components/AccountPage";
import AddPostPage from "./Components/AddPostPage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import PostPage from "./Components/PostPage";
import RegisterPage from "./Components/RegisterPage";
import AuthProvider, { useAuth } from "./Components/security/AuthContext";
import WelcomePage from "./Components/WelcomePage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

interface AuthenticateRoutePropType {
  children: ReactNode;
}

function AuthenticateRoute({children} : AuthenticateRoutePropType) {
  const authContext = useAuth();
  if (authContext?.isAuthenticated)
    return children;
  return <Navigate to="/login"/>
}
export default function App() {
  const authContext = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/home/:username" element={
            <AuthenticateRoute>
              <HomePage />
            </AuthenticateRoute>
            }/>
          <Route path="/account" element={
            <AuthenticateRoute>
              <AccountPage username={`${authContext?.username}`}/>
            </AuthenticateRoute>}
            />
          <Route path="/addpost" element={
            <AuthenticateRoute>
              <AddPostPage username={`${authContext?.username}`}/>
            </AuthenticateRoute>
          }/>
          <Route path="/post" element={
            <AuthenticateRoute>
              <PostPage username={`${authContext?.username}`}/>
            </AuthenticateRoute>
            }/>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}
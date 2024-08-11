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
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";
import UpdatePostPage from "./Components/UpdatePostPage";

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
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/home/:userId" element={
            <AuthenticateRoute>
              <HomePage />
            </AuthenticateRoute>
            }/>
          <Route path="/account/:userId" element={
            <AuthenticateRoute>
              <AccountPage />
            </AuthenticateRoute>}
            />
          <Route path="/addpost/:userId" element={
            <AuthenticateRoute>
              <AddPostPage />
            </AuthenticateRoute>
          }/>
          <Route path="/post/:postId" element={
            <AuthenticateRoute>
              <PostPage />
            </AuthenticateRoute>
            }/>
          <Route path="/post/update/:postId" element={
            <AuthenticateRoute>
              <UpdatePostPage />
            </AuthenticateRoute>
            }/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}
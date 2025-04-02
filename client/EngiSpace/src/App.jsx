import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CategoryPosts from './components/CategoryPosts';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import Profile from './components/Profile';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Welcome />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
        />
        <Route path="/category/:flagId" element={<CategoryPosts />} />
        <Route 
          path="/category/:flagId/posts/create-post" 
          element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/category/:flagId/posts/:postId" 
          element={<PostPage />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CategoryPosts from './components/CategoryPosts';
import CreatePost from './components/CreatePost';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Welcome />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
        />
        <Route 
          path="/category/:flagId" 
          element={isAuthenticated ? <CategoryPosts /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/category/:flagId/posts/create-post" 
          element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { NavLink } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';


export default function PostsSection({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/api/posts')
      .then(res => {
        setTimeout(() => {
          setPosts(res.data);
          setFilteredPosts(res.data);
          setLoading(false);
        }, 2000);

      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      });
  }, []);

  const handleDeletePost = (deletedId) => {
    setPosts(prevPosts => prevPosts.filter(post => post._id !== deletedId));
    setSnackbarMessage('Post deleted successfully!');
    setSnackbarOpen(true);
  };


  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(lowerSearch)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <>
      {loading ? (
        <div style={{ marginBottom: '1rem', color: '#626F47' }}>
          <LoadingState />
        </div>
      ) : posts.length === 0 ? (
        <EmptyState message="No Posts available yet." />
      ) : filteredPosts.length === 0 ? (
        <EmptyState message="No Posts match your search." />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
          {filteredPosts.map(post => (
            <PostCard key={post._id} post={post} onDelete={handleDeletePost} />
          ))}
        </div>
      )}
      {isLoggedIn && <NavLink
        to="/create" style={{ width: '6.8ch', height: '6.8ch', borderRadius: '100%', backgroundColor: '#626F47', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F8F3D9', fontSize: '2ch', fontFamily: 'Irish Grover', cursor: 'pointer', position: 'sticky', bottom: '1ch', left: '159ch' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '4ch' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </NavLink>}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

import { use, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteDialog from './DeleteDialog';
import LoadingState from './LoadingState';
import { useNavigate } from 'react-router-dom';
export default function PostCard({ post, onDelete }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const authorName = post.author?.username || 'Unknown';

  const currentUserId = localStorage.getItem('userId');
  const isAuthor = currentUserId === post.author?._id;

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '5.3ch 0 0 0' }}>
        <Card sx={{ maxWidth: 400, minHeight: 450 }} style={{ backgroundColor: '#E3D095' }}>
          <CardHeader
            style={{
              backgroundColor: '#626F47'
            }}
            avatar={
              <div style={{ width: '45px', height: '45px', borderRadius: '100%', backgroundColor: '#F8F3D9', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#626F47', fontSize: '2ch', fontFamily: 'Irish Grover', cursor: 'pointer' }}>
                {authorName.split(' ')[0][0]?.toUpperCase() + authorName.split(' ')[1][0]?.toUpperCase()}
              </div>
            }
            action={
              isLoggedIn && isAuthor && (
                <div style={{ display: 'flex', gap: '1ch', color: '#F8F3D9', width: '7ch', marginTop: '2ch' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ cursor: 'pointer' }}  onClick={() => navigate(`/posts/edit/${post._id}`)} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ cursor: 'pointer' }} onClick={handleOpenDialog}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} postId={post._id}
                    onDelete={(deletedId) => {
                      onDelete(deletedId);
                      handleCloseDialog();
                    }} />

                </div>
              )
            }

            title={post.title}
            subheader={`By ${authorName}`}
            titleTypographyProps={{
              fontSize: '2ch',
              color: '#F8F3D9',
              fontWeight: 'bold',
            }}
            subheaderTypographyProps={{
              fontSize: '1.8ch',
              color: '#E0E0E0',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1ch' }}>

            {loading && (
              <div style={{ marginBottom: '5rem', color: '#626F47' ,height: '25vh',display: 'flex',
                justifyContent: 'center'}}>
                <LoadingState />
              </div>
            )}
            <CardMedia
              component="img"
              height="235"
              image={post.imageUrl}
              alt="Paella dish"
              style={{ width: '48ch' , display: loading ? 'none' : 'block'  }}
              onLoad={() => {
                setTimeout(() => {
                  setLoading(false);
                }, 1000); 
              }}

              onError={() => setLoading(false)}
            />
          </div>
          <CardContent>
            <Typography variant="body2" style={{ color: '#414A2F', fontSize: '2ch' }}>
              {post.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>

  );
}

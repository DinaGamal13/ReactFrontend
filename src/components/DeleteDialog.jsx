import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

function DeleteDialog({ open, onClose, postId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`);
      onDelete(postId);
      onClose();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor: '#F8F3D9',
          height: '311px',
          width: '500px',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '40px',
          alignItems: 'center',
        }
      }}
    >
      <div style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30" height="30" viewBox="0 0 450 450"
          style={{
            boxShadow: '0px 4px 20px rgba(255, 0, 0, 0.84)',
            borderRadius: '100%',
            backgroundColor: '#FE646F'
          }}>
          <g><g fillRule="evenodd" clipRule="evenodd">
            <g fill="#E6E9ED">
              <path d="M225.26 281.35c-4.09 0-7.59-3.49-8.3-8.29l-20.92-141.1c-2.63-17.77 8.85-34.06 24-34.06h10.43c15.15 0 26.63 16.29 24 34.06l-20.92 141.1c-.7 4.8-4.2 8.29-8.29 8.29zM244.4 334.43c0-10.54-8.6-19.14-19.14-19.14s-19.14 8.6-19.14 19.14 8.6 19.14 19.14 19.14 19.14-8.59 19.14-19.14z" />
            </g>
          </g></g>
        </svg>

        <DialogTitle id="alert-dialog-title" style={{
          fontFamily: 'Irish Grover',
          color: '#626F47'
        }}>
          {"Delete Post"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{
            width: '27ch',
            textAlign: 'center',
            fontFamily: 'Irish Grover',
            color: 'rgba(98, 111, 71,0.62)'
          }}>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            variant="outlined"
            style={{ borderColor: '#626F47', color: '#626F47', textTransform: 'none', padding: '0.7ch 8.2ch', fontSize: '2ch' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            style={{
              color: '#F8F3D9',
              backgroundColor: '#626F47',
              textTransform: 'none',
              padding: '0.7ch 8.2ch',
              fontSize: '2ch',
            }}>
            Delete
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteDialog;

import { Box, TextField } from '@mui/material';
const UploadIcon = ({ uploaded }) => (
  <svg
    style={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 40,
      color: '#626F47',
      pointerEvents: 'none',
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    viewBox="0 0 512 512"
  >
    <g>
      <path
        d="M395.29 270.85c5.87-1.38 8.16-8.52 4.18-13.05l-78.29-89.3a32.02 32.02 0 0 0-24.06-10.91h-.02c-9.22.01-18 3.99-24.07 10.94L166.75 290.09l-49.28-56.21a32.02 32.02 0 0 0-24.06-10.91h-.02c-9.23.01-18 3.99-24.07 10.94L16 294.89V102c0-23.2 18.8-42 42-42h332c23.2 0 42 18.8 42 42v159.81c0 3.84 2.76 7.13 6.55 7.79l.16.03c4.85.85 9.29-2.89 9.29-7.81V102c0-32.03-25.97-58-58-58H58C25.97 44 0 69.97 0 102v224c0 32.03 25.97 58 58 58h246.08c4.36 0 7.92-3.56 7.92-7.92V376c0-51.05 35.61-93.95 83.29-105.15z"
        fill="currentColor"
      />
      <circle cx="164.77" cy="132.13" r="39.35" fill="currentColor" />
      {uploaded ? (
        <path
          d="M420 284c-50.73 0-92 41.27-92 92s41.27 92 92 92 92-41.27 92-92-41.27-92-92-92zm31.11 111.8c3.12 3.12 3.12 8.19 0 11.31s-8.19 3.12-11.31 0l-19.8-19.8-19.8 19.8c-3.12 3.12-8.19 3.12-11.31 0s-3.12-8.19 0-11.31l19.8-19.8-19.8-19.8c-3.12-3.12-3.12-8.19 0-11.31s8.19-3.12 11.31 0l19.8 19.8 19.8-19.8c3.12-3.12 8.19-3.12 11.31 0s3.12 8.19 0 11.31l-19.8 19.8z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M420 284c-50.73 0-92 41.27-92 92s41.27 92 92 92 92-41.27 92-92-41.27-92-92-92zm-28.28 77.34 21.39-21.4c1.39-2.36 3.95-3.95 6.89-3.95s5.5 1.59 6.89 3.95l21.39 21.4c3.12 3.12 3.12 8.19 0 11.31-3.13 3.12-8.19 3.12-11.31 0l-8.97-8.97V408c0 4.42-3.58 8-8 8s-8-3.58-8-8v-44.31l-8.97 8.97c-3.12 3.12-8.19 3.12-11.31 0a7.997 7.997 0 0 1 0-11.32z"
          fill="currentColor"
        />
      )}
    </g>
  </svg>
);
const UploadImage = ({ previewImage, setPreviewImage, setSelectedImage }) => {
  return (
    <Box sx={{ position: 'relative', width: '408px' }}>
      <TextField
        multiline
        rows={5}
        sx={{
          width: '100%',
          '& .MuiInputLabel-root': { color: '#B9BC9C' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#626F47' },
          '& .MuiInputLabel-root.Mui-error': { color: '#B9BC9C' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { border: '1px dashed #626F47' },
            '&:hover fieldset': { borderColor: '#626F47' },
            '&.Mui-focused fieldset': { borderColor: '#626F47' },
          },
        }}
      />

      <UploadIcon uploaded={!!previewImage} />

      <h1
        style={{
          position: 'absolute',
          top: '68%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 18,
          color: '#626F47',
          pointerEvents: 'none',
        }}
      >
        {previewImage ? 'Image Uploaded' : 'Click to Upload Image'}
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
          }
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          top: 0,
          left: 0,
          cursor: 'pointer',
          border: 'none',
        }}
      />
    </Box>
  );
};

export default UploadImage;

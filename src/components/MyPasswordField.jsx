import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const MyPasswordField = ({
  formik,
  name,
  label,
  value,
  showPassword,
  handleTogglePassword,
  handleMouseDown,
  handleMouseUp,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1ch' }}>
      <FormControl
        sx={{
          m: 0,
          width: '408px',
          '& .MuiInputLabel-root': { color: '#B9BC9C' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#626F47' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#626F47' },
            '&:hover fieldset': { borderColor: '#626F47' },
            '&.Mui-focused fieldset': { borderColor: '#626F47' },
          },
        }}
        variant="outlined"
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => {
            formik.setFieldValue(name, e.target.value);
            formik.setFieldTouched(name, true, false);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePassword}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>

      {formik.touched[name] && formik.errors[name] && (
        Array.isArray(formik.errors[name]) ? (
          <ul style={{ color: 'red', fontSize: '14px' }}>
            {formik.errors[name].map((err, index) => (
              <li key={index} style={{ listStyleType: 'none' }}>{err}</li>
            ))}
          </ul>
        ) : (
          <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors[name]}</div>
        )
      )}
    </div>
  );
};

export default MyPasswordField;

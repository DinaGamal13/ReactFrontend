import { TextField } from '@mui/material';

const MyTextField = ({
    formik,
    name,
    label,
    multiline = false,
    rows = 1
}) => {
    return (
        <div style={{ display: 'flex', gap: '1ch', flexDirection: 'column' }}>
            <TextField
                id={name}
                name={name}
                label={label}
                variant="outlined"
                multiline={multiline}
                rows={rows}
                value={formik.values[name]}
                onChange={(e) => {
                    formik.setFieldValue(name, e.target.value);
                    formik.setFieldTouched(name, true, false);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                sx={{
                    m: 0,
                    width: '408px',
                    '& .MuiInputLabel-root': { color: '#B9BC9C' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#626F47' },
                    '& .MuiInputLabel-root.Mui-error': { color: '#B9BC9C' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#626F47' },
                        '&:hover fieldset': { borderColor: '#626F47' },
                        '&.Mui-focused fieldset': { borderColor: '#626F47' },
                    },
                }}
            />
            {formik.touched[name] && formik.errors[name] && (
                <ul style={{ color: 'red', fontSize: '14px', textAlign: 'left' ,listStyleType: 'none'}}>
                    {Array.isArray(formik.errors[name])
                        ? formik.errors[name].map((err, index) => (
                            <li key={index} style={{ listStyleType: 'none' }}>{err}</li>
                        ))
                        : <li>{formik.errors[name]}</li>}
                </ul>
            )}

        </div>
    );
};
export default MyTextField;

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchStudents } from '../../features/students/studentSlices.js';
import { fetchReports } from '../../features/students/reportSlices.js';
import { useEffect,useState } from 'react';
import { filterReport } from '../../features/students/reportSlices.js';

export default function SearchName() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ label: 'All' }); // Set initial value with the entire object
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const changeHandler = (newValue) => { // Use newValue directly, it contains the selected option object
    setValue(newValue);
    dispatch(filterReport(newValue.label));
  };

  const nameStore = useSelector((state) => state.student.students);
  const names = nameStore.map((value) => ({ label: value.name }));
  names.push({ label: 'All' });
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8e24aa',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '180px',
          },
        },
      },
      MuiPickersStaticWrapper: {
        styleOverrides: {
          root: {
            maxWidth: '200px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={names}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value} // Use the entire object for value
        sx={{ width: 200, color: 'red' }}
        onChange={(event, newValue) => changeHandler(newValue)} // Directly use newValue
        renderInput={(params) => <TextField {...params} label="Name" />}
      />
    </ThemeProvider>
  );
}

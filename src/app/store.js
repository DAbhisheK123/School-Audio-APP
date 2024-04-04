import {configureStore} from '@reduxjs/toolkit';

import studentSlices from '../features/students/studentSlices';
import reportSlices from '../features/students/reportSlices';
import recordSlices from '../features/students/recordsSlices';
import utilitySlices from '../features/students/utilitySlices';
export const store = configureStore({
    reducer: {
        student:studentSlices,
        report:reportSlices,
        record:recordSlices,
        utility:utilitySlices,
    }
})
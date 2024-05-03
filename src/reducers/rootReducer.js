import { combineReducers } from 'redux';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
    // Add other reducers here if needed
    location: locationReducer,
});

export default rootReducer;
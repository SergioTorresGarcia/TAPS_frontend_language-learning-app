
// Action types
export const UPDATE_USERNAME = 'UPDATE_USERNAME';

// Action creators
export const updateUsername = (newUsername) => ({
    type: UPDATE_USERNAME,
    payload: newUsername,
});

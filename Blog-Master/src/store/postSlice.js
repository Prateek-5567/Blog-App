import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        }
    }
});
/**
 * setPosts = “replace all posts with new ones” : inOrder to initialize the structure of your posts list in state.
 * addPost = “append one new post to the existing list”
 */

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
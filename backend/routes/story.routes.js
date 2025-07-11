import express from 'express';
import upload from '../middlewares/multer.js';
import { createStory, getAllStories, getCurrentUserStories, getStory, likeStory, viewStory } from '../controllers/story.controller.js';
const storyRouter = express.Router();


storyRouter.post('/createstory', upload.single('image'), createStory);
storyRouter.get('/getallstories', getAllStories);
storyRouter.get('/getstory/:storyid', getStory);
storyRouter.get('/getcurrentuserstories', getCurrentUserStories);
storyRouter.put('/viewstory/:storyid', viewStory);
storyRouter.put('/likestory/:storyid', likeStory);




export default storyRouter;  
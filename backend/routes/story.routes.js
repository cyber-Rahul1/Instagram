import express from 'express';
import upload from '../middlewares/multer.js';
import { createStory, deleteStory, getAllStories, getCurrentUserStories, getStory, likeStory, viewStory } from '../controllers/story.controller.js';
const storyRouter = express.Router();


storyRouter.post('/createstory', upload.single('image'), createStory);
storyRouter.delete('/deletestory/:storyid', deleteStory);
storyRouter.get('/getallstories', getAllStories);
storyRouter.get('/getstory/:storyid', getStory);
storyRouter.get('/getcurrentuserstories', getCurrentUserStories);
storyRouter.get('/viewstory/:storyid', viewStory);
storyRouter.get('/likestory/:storyid', likeStory);




export default storyRouter;  
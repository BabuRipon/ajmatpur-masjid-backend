import express from "express";
import {getAllUsers, getUser, createUser, updateUser} from '../controllers/user.controller.js'
const router = express.Router();

router.get('/user/all', getAllUsers);
router.get('/user/:id', getUser);
router.post('/user/new', createUser);
router.patch('/user/:id', updateUser);

export default router;

import {register} from '../controllers/user.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/api/auth/register',register);
export {router};
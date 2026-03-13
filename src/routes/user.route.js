
import {register, login} from '../controllers/user.controller.js';
import { Router } from 'express';
import Validate from '../middleware/validate.js';
import {check} from 'express-validator';
import {auth} from '../middleware/authToken.js'

const router = Router();

router.post('/api/auth/register',
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    Validate,
    register);
router.post('/api/auth/login', 
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    Validate,
    login 
)

export {router};
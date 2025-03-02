import { Router } from 'express'
import { signIn, signUp, singOut } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.post('/sign-out', singOut)

export default authRouter

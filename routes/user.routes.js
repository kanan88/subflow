import { Router } from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const userRouter = Router()

userRouter.get('/', authMiddleware, getUsers)

userRouter.get('/:id', authMiddleware, getUser)

userRouter.post('/', (req, res) => res.send({ title: 'CREATE a new user' }))

userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE a user' }))

userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE a user' }))

export default userRouter

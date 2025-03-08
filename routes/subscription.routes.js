import { Router } from 'express'
import { createSubscription } from '../controllers/subscription.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send({ title: 'Get all subscriptions' }))

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'Get subscription details' }))

subscriptionRouter.post('/', authMiddleware, createSubscription)

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'Update a subscription' }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'Delete a subscription' }))

subscriptionRouter.get('/user/:id', (req, res) => res.send({ title: 'Get all user subscriptions' }))

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'Cancel a subscription' }))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'Get upcoming renewals' }))

export default subscriptionRouter

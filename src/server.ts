import express from 'express'

import { Case } from './model/case'
import { getKnex } from './model/database'

const server = express()

const router = express.Router()

router.get('/case', (req) => {
    let offset = req.param('offset', 0)
})

router.get('/case/:id', (req) => {
    let id = req.param('id')
})

router.get('/stat', (req) => {
})

server.use('/', router)
server.listen(3000)
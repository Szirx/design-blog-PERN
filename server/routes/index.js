const Router = require('express')
const router = new Router()
const postRouter = require('./postRouter')
const themeRouter = require('./themeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/theme', themeRouter)
router.use('/post', postRouter)

module.exports = router
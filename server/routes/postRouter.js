const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', postController.create)

router.get('/', postController.getAll)
router.get('/:id', postController.getOne)

router.put('/:id/Name', postController.updateName)
router.put('/:id/img', postController.updatePic)
router.put('/:id/Des', postController.updateDes)

router.delete('/:id', postController.delete)
module.exports = router
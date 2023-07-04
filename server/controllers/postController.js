const uuid = require('uuid')
const path = require('path');
const {Post} = require('../models/models')
const ApiError = require('../error/ApiError')
class PostController {
    async create(req, res, next) {
        try {
            const {name, theme_id, description} = req.body
            const {img} = req.files
            let arr = []
            for (let i = 0; i < img.length; i++)
            {
                let fileName = uuid.v4() + '.jpg'
                arr.push(fileName)
                img[i].mv(path.resolve(__dirname, '..','static', fileName))

            }
            console.log(arr)
            const post = await Post.create({name, theme_id, description, img: arr})
    
            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {theme_id} = req.query
        let posts;
        if (!theme_id) {
            posts = await Post.findAndCountAll()
        }
        if (theme_id) {
            posts = await Post.findAndCountAll({where:{theme_id}})
        }
        return res.json(posts)
    }

    async getOne(req, res) {
        const {id} = req.params
        const post = await Post.findOne(
            {where: {id}}
        )
        return res.json(post)
    }

    async delete(req, res) {
        const {id} = req.params
        const post = await Post.destroy(
            {where: {id}}
        )
            return res.json(post)
    }

    async updateName(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const updatedPost = await Post.update(
                { name },
                { where: { id } }
            )
            return res.json(updatedPost);
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updatePic(req, res, next) {
        try {
            const { id } = req.params
            const { img } = req.files
            let arr = []
            for (let i = 0; i < img.length; i++)
            {
                let fileName = uuid.v4() + '.jpg'
                arr.push(fileName)
                img[i].mv(path.resolve(__dirname, '..','static', fileName))

            }
            const updatedPost = await Post.update(
                { img: arr },
                { where: { id } }
            )
            return res.json(updatedPost);
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async updateDes(req, res, next) {
        try {
            const { id } = req.params
            const { description } = req.body
            const updatedPost = await Post.update(
                { description },
                { where: { id } }
            )
            return res.json(updatedPost);
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new PostController()
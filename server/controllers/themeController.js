const {Theme} = require('../models/models')
const ApiError = require('../error/ApiError');

class ThemeController {
    async create(req, res) {
        const {name} = req.body
        const theme = await Theme.create({name})
        
        return res.json(theme)
    }

    async getAll(req, res) {
        const themes = await Theme.findAll()
        return res.json(themes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const theme = await Theme.findOne(
            {
                where: {id}
            }
        )
        return res.json(theme)
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body
            const updateTheme = await Theme.update(
                {name},
                {where: {id}}
            )
            return res.json(updateTheme);
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ThemeController()
const content_list = require('./src/mock/content_list.json')

module.exports = {
    devServer: {
        before(app) {
            app.get('/api/content_list', (req, res) => {
                res.json(content_list)
            })
        }
    }
}
// const Project = require('../models/projectmgr.model')

module.exports.index = ( request, response ) => {
	response.json({
		message: "Index from controller working as expected"
	})
}
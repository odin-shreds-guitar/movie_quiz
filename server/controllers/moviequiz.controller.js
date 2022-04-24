// const Project = require('../models/projectmgr.model')

module.exports.index = ( request, response ) => {
	response.json({
		message: "Index from controller working as expected"
	})
}

// // create a new game
// module.exports.createProject = ( request, response ) => {
// 	const { title, price, description } = request.body;
// 	Project.create({
// 		title, 
// 		price, 
// 		description
// 		})
// 		.then( project => response.json(project))
// 		.catch( err => {
// 			response.status(400).json(err)
// 		} )
// }

// module.exports.getAllProjects = ( request, response ) => {
// 	console.log("Getting all projects...")
// 	Project.find({})
// 		.then( project => response.json(project))
// 		.catch( err => response.json(err))
// }

// module.exports.getProject = ( request, response ) => {
// 	Project.findOne({_id : request.params.id})
// 		.then(project => response.json(project))
// 		.catch(err => response.json(err))
// }

// module.exports.updateProject = ( request, response ) => {
// 	Project.findOneAndUpdate({_id : request.params.id}, request.body, {new:true})
// 		.then(updatedProject => response.json(updatedProject))
// 		.catch(err => response.json(err))
// }

// module.exports.deleteProject = ( request, response ) => {
// 	Project.findOneAndDelete({_id : request.params.id })
// 		.then(deleteConfirmation => response.json(deleteConfirmation))
// 		.catch(err => response.json(err))
// }
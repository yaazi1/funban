const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
	},
	status: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "todo"
	}
})

module.exports = Task
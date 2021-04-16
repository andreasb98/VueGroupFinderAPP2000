// Tommy
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Group = sequelize.define('Group', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    organizer: {
        type: Sequelize.STRING   
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
    },
    time: {
        type: Sequelize.STRING,     
    }

    },{
    timestamps: false

    });


module.exports = Group;
// Tommy og Anders
const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const GroupMembership = sequelize.define('GroupMembership', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    },{
    timestamps: false

    });
module.exports = GroupMembership;
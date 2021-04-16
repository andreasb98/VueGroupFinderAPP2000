
const Group = require('../models/Group');
const GroupMembership = require('../models/GroupMembership');
const { QueryTypes } = require('sequelize');
const sequelize = require('../util/database');

// Tommy
exports.getMyEvent = async (req, res, next) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findOne({
        where: {
            id: groupId
        }
        });
        
        
        const groupJSON = JSON.stringify(group);
        res.send(groupJSON);
    } catch (err) {console.log(err)}
};

// Tommy
exports.getMyEvent = async (req, res, next) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findOne({
        where: {
            id: groupId
        }
        });
        
        
        const groupJSON = JSON.stringify(group);
        res.send(groupJSON);
    } catch (err) {console.log(err)}
};
// Tommy
exports.getMyEvents = async (req, res, next) => {
    try { 
        const id = req.userData.id;
        
        const groups = await sequelize.query(`SELECT g.id, g.category, g.organizer, g.title, g.description, g.location, g.date, g.time FROM Groups AS g WHERE g.id IN(SELECT GroupId FROM groupmemberships WHERE StudentId = :id)`,
         {replacements: { id: `${id}`}, type: QueryTypes.SELECT});
        
        
              
        const groupsJSON = JSON.stringify(groups);
        console.log(groupsJSON);
        res.send(groupsJSON);
    } catch (err) {console.log(err)}
};






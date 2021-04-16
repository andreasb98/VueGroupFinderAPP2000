
const Group = require('../models/Group');
const GroupMembership = require('../models/GroupMembership');
const { QueryTypes } = require('sequelize');
const sequelize = require('../util/database');
// Returnerer 1 gruppe basert på parameter fra URL 
// Tommy
exports.getEvent = async (req, res, next) => {
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
// Returnerer alle grupper fra spesifikk studentID videresendt fra middlewareUser. <-- Gammel
// Ny henter ut alle
// Tommy
exports.getEvents = async (req, res, next) => {
    try { 
        const id = req.userData.id;
       
        
        const groups = await Group.findAll();      
        const groupsJSON = JSON.stringify(groups);
        console.log(groupsJSON);
        res.send(groupsJSON);
    } catch (err) {console.log(err)}
};
// Tommy
const isValid = (title, category, location, description) => {
    if(title === null || title === '' || category === null || category === '' || location === null || location === ''
    || description === null || description === '') {
        return false;
    }
    return true;

};

// Tommy
exports.postRegisterEvent = async (req, res, next) => {
    try {
        const userId = req.userData.id;
        const userIdFromPost = req.body.params.studentid;
        const title = req.body.params.title;
        const category = req.body.params.category;
        const location = req.body.params.location;
        const description = req.body.params.description;

        if(userId !== userIdFromPost) {
            return res.send({error: "auth failed"});
        }      
        else if(!isValid(title, category, location, description)) {
            return res.send({error: "empty values"});
        }
        
        else {
            const [results, metadata] = await sequelize.query(`INSERT INTO groups(category, title, description, location, StudentId) 
                VALUES(:category, :title, :description, :location, :studentid)`,
                {replacements: {category: `${category}`, title: `${title}`, description: `${description}`,
                location: `${location}`, studentid: `${userId}`}, type: QueryTypes.INSERT});
            let idFromResults = results;
            let affectedRows = metadata;
               
            if(affectedRows > 0) {
                const result = await sequelize.query(`INSERT INTO groupmemberships(StudentId, GroupId)
                VALUES(:studentid, :groupid)`, {replacements: {studentid: `${userId}`, groupid: `${idFromResults}`}, type: QueryTypes.INSERT});
                return res.send({success: "success"});
            }   
            return res.send({error: "something went wrong"});
            
            


        }

      
    } catch (err) {console.log(err)}

};






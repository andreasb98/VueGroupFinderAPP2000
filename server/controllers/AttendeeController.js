// Tenk på replacements som prepared statements. Trengs ikke når man bruker ORM sine egne metoder. 
const { QueryTypes } = require('sequelize');
const sequelize = require('../util/database');
const GroupMembership = require('../models/GroupMembership');
const Group = require('../models/Group');
// Tommy
exports.getAttendees = async (req, res, next) => {
    try { 
        const groupId = req.params.id;
        const attendees = await sequelize.query(`SELECT CONCAT(firstname, ' ', lastname) AS name, students.id AS id from students, groupmemberships WHERE students.id = groupmemberships.StudentId AND groupmemberships.GroupId = :groupid;`,
         {replacements: {groupid: `${groupId}`},type: QueryTypes.SELECT});
        const attendeesJSON = JSON.stringify(attendees);
        res.send(attendeesJSON);
    } catch (err) {console.log(err)}
    
};
// Tommy
exports.postJoinEvent =  async (req, res, next) => {
    
    try {
        const userId = req.userData.id;
        const userIdFromPost = req.body.params.studentid;
        const groupIdFromPost = req.body.params.gruppeid;

        const foundGroup = await Group.findOne({ where: {id: groupIdFromPost} });
        
        if(foundGroup === null|| userId !== userIdFromPost) {
            return res.status(403).send({ error: 'Auth failed'});   
        }
        else {

            const result = await GroupMembership.findOne({ where: {studentid: userId, groupid: groupIdFromPost} });
            if (result === null) {
            
                const result = await sequelize.query(`INSERT INTO groupmemberships(StudentId, GroupId) 
                VALUES(:userid, :groupid)`,
                {replacements: {userid: `${userId}`, groupid: `${groupIdFromPost}`}, type: QueryTypes.INSERT});
                
                // Oppdaterer attendees retur
                const updatedAttendees = await sequelize.query(`SELECT CONCAT(firstname, ' ', lastname) AS name from students, groupmemberships WHERE students.id = groupmemberships.StudentId AND groupmemberships.GroupId = :groupid;`, {replacements: { groupid: `${groupIdFromPost}`}, type: QueryTypes.SELECT});
                const updatedAttendeesJSON = JSON.stringify(updatedAttendees);
                return res.send(updatedAttendeesJSON);              
            }
            return res.status(403).send({ error: 'Auth failed'}); 
            
        }

    } catch (err) {console.log(err)}

};








const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');
const Joi = require('joi');

const { registerValidation } = require('../policies/validation');
const { loginValidation } = require('../policies/validation');
const { emailValidation } = require('../policies/validation');

// REGISTER ANDERS
exports.register = async (req, res) => {
    // Bruker funksjonen i policies/validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Sjekker om studenten er i db'en
    const emailExist = await Student.findOne({
        where: {
            email: req.body.email
        }
    });
    if (emailExist) return res.status(400).send('E-Mail already exists');

    // Hash passord
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);

    try {
        // Ny student
        const savedStudent = await Student.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: hashedPw
        });
        res.status(200).send(({
            msg: `New user created, ID: ${savedStudent.id}`
        }));

    }catch (e) {
        res.status(400).send({
            error: 'E-post er allerede registrert!'
        })
    }
};
// LOGIN ANDERS
exports.login = async (req, res) => {
    try {
        // Validere data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Sjekker om studenten er i db'en
    const student = await Student.findOne({
        where: {
            email: req.body.email
        }
    });
    // if (!student) return res.status(400).send('E-Mail not found');
    if (!student) {
        res.status(403).send({
            error: 'The login information was incorrect'
        })
    }
    // ER PASSORD KORREKT?
    const validPass = await bcrypt.compare(req.body.password, student.password);
    // if (!validPass) return res.status(400).send('Invalid password');
    if (!validPass) {
        res.status(403).send({
            error: 'The login information was incorrect'
        });

    }

    // Lager / tildeler token når man logger inn
    const token = await jwt.sign({
            email: student.email,
            id: student.id
        },
        'SECRETKEY', {
            expiresIn: '7d'
        }
    );

    const savedStudent = ({
        id: student.id,
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        phonenumber: student.phonenumber
    });

    res.status(200).send({
        msg: 'Logged in!',
        token,
        user: savedStudent
    });
    } catch (err) {console.log(err)}
    
};
// Tommy

exports.updateFirstName = async(req, res) => {
    try {
        const userId = req.userData.id;
        const userIdFromPatch = req.body.params.studentid;
        const newFirstName = req.body.params.newfirstname;
        
        // Sjekker at det er innlogget bruker som faktisk registrerer endringen. 
        if(userId !== userIdFromPatch) {
            return res.send({error: "auth failed"});
        }    
        else if(newFirstName === null || newFirstName === '') {
            return res.send({error: "something went wrong"});
        } else {
            const result = await sequelize.query(`UPDATE students SET students.firstname = :newFirstName WHERE students.id = :userid`, {replacements: {newFirstName: `${newFirstName}`, userid: `${userId}`} ,type: QueryTypes.UPDATE});

            const student = await Student.findOne({
                where: {
                    id: userId
                }
            });
        
            const savedStudent = ({
                id: student.id,
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                phonenumber: student.phonenumber
            });
            res.status(200).send({
                user: savedStudent,
                msg: 'Lagret'
            });
        }      
    } catch (err) {console.log(err)}
    
};
// Tommy
exports.updateLastName = async(req, res) => {
    try {
        const userId = req.userData.id;
        const userIdFromPatch = req.body.params.studentid;
        const newLastName = req.body.params.newlastname;
        
        // Sjekker at det er innlogget bruker som faktisk registrerer endringen. 
        if(userId !== userIdFromPatch) {
            return res.send({error: "auth failed"});
        }      
        else if(newLastName === null || newLastName === '') {
            return res.send({error: "something went wrong"});
        } else {

            const result = await sequelize.query(`UPDATE students SET students.lastname = :newLastName WHERE students.id = :userid`, {replacements: {newLastName: `${newLastName}`, userid: `${userId}`}, type: QueryTypes.UPDATE});

            const student = await Student.findOne({
                where: {
                    id: userId
                }
            });       
            const savedStudent = ({
                id: student.id,
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                phonenumber: student.phonenumber
            });
            res.status(200).send({
                user: savedStudent,
                msg: 'Lagret'
            });
        }
    } catch (err) {console.log(err)}
    
};
// Tommy
exports.updatePhone = async(req, res) => {
    try {
        const userId = req.userData.id;
        const userIdFromPatch = req.body.params.studentid;
        const newPhone = req.body.params.newphone;
        // Sjekker at det er innlogget bruker som faktisk registrerer endringen. 
        if(userId !== userIdFromPatch) {
            return res.send({error: "auth failed"});
        } 
        else if(newPhone === null || newPhone.length !== 8 || isNaN(newPhone)) {
            return res.send({error: "something went wrong"});
        } else {
            const result = await sequelize.query(`UPDATE students SET students.phonenumber = :newPhone WHERE students.id = :userid`, {replacements: {newPhone: `${newPhone}`, userid: `${userId}`},type: QueryTypes.UPDATE});

            const student = await Student.findOne({
                where: {
                    id: userId
                }
            });
        
            const savedStudent = ({
                id: student.id,
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                phonenumber: student.phonenumber
            });
            res.status(200).send({
                user: savedStudent,
                msg: 'Lagret'
            });
        }
        
    } catch (err) {console.log(err)}
    
};
// Tommy
exports.updateEmail = async(req, res) => {
    try {
        const userId = req.userData.id;
        const userIdFromPatch = req.body.params.studentid;
        const newEmail = req.body.params.newemail;
        
        // Sjekk om email allerede eksisterer
        const foundStudent = await Student.findOne({
            where: {
                email: newEmail
            }
        });
        if(foundStudent) {
            return res.send({error: "Email allerede i bruk"});
        } 
        // Sjekker at det er innlogget bruker som faktisk registrerer endringen. 
        if(userId !== userIdFromPatch) {
            return res.send({error: "auth failed"});
        }
        // Mangler ekstra e-mail validering via regex. Får ikke Joi.validate til å fungere på single properties. 
        else if(newEmail === null || newEmail === '') {
            return res.send({error: "something went wrong"});
        } else {

            const result = await sequelize.query(`UPDATE students SET students.email = :newEmail WHERE students.id = :userid`, {replacements: {newEmail: `${newEmail}`, userid: `${userId}`},type: QueryTypes.UPDATE});

            const student = await Student.findOne({
                where: {
                    id: userId
                }
            });
            
            const savedStudent = ({
                id: student.id,
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                phonenumber: student.phonenumber
            });
            res.status(200).send({
                user: savedStudent,
                msg: 'Lagret'
            });          
        }      
    } catch (err) {console.log(err)}
    
};











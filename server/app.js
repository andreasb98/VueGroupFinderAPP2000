// Tommy og Anders hele fila
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const authRoute = require('./routes/authRoutes');
const homeRoute = require('./routes/home');
const eventRoutes = require('./routes/eventRoutes');
const myEventRoutes = require('./routes/myEventRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const calendarRoute = require('./routes/calendarRoutes');



const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

// Route middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Api routes
app.use('/api/auth', authRoute);
app.use('/api/user', homeRoute);
app.use('/api/user', calendarRoute);
app.use('/events', eventRoutes);
app.use('/myevents', myEventRoutes);
app.use('/attendees', attendeeRoutes);

//app.use('/chat', chatRoute);



// Import av databasemodeller
const Student = require('./models/Student');
const Group = require('./models/Group');
const GroupMembership = require('./models/GroupMembership');
const Room = require('./models/RoomModels/Room');
const RoomReservation = require('./models/RoomModels/RoomReservation');
const RoomType = require('./models/RoomModels/RoomType');
const ChatMessage = require('./models/ChatMessage');
const CourseCode = require('./models/CourseCode');
const CourseRegister = require('./models/CourseRegister');


// DB forhold
Room.hasOne(RoomReservation);
Group.hasMany(RoomReservation);
RoomType.hasOne(Room);

Student.belongsToMany(Group, { through: { model: GroupMembership, unique: false } });

Student.belongsToMany(Group, {through: ChatMessage});
Group.belongsTo(Student);
CourseCode.belongsToMany(Student, {through: CourseRegister});

sequelize
    .sync()
    .then(() => {
        app.listen(PORT);
        console.log(`Server started on port ${PORT}`)
    })
    .catch(error => {
        console.log(error);
    });








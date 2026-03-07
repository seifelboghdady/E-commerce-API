/*
User
- id
- name
- email
- password
- role (user/admin)
- createdAt
*/

// const { Sequelize, DataTypes } = require('sequelize');

// //Passing parameters separately (sqlite)
// //Disable SQL logging in the console to keep the output clean.
// const sequelize = new Sequelize('sqlite::memory:',{logging: false});

// sequelize.define(
//     'BOOK',
//     {
//         title: {
//             type: DataTypes.STRING,
//             allowNull : false
//         },
//         author:{
//             type: DataTypes.STRING,
//             defaultValue: "Unknown Author"
//         },
//         pages:{
//             type: DataTypes.INTEGER
//         },
//         isAvailable:{
//             type: DataTypes.BOOLEAN,
//             defaultValue: true
//         }
//     },{sequelize, timestamps: false}
// );

// async function StartApp(){
    
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
    
//     await User.sync();
// }

// StartApp();
// const book1= await BOOK.create({title: "programming lang",page:100, isAvailable: true})
// console.log(book1.name);







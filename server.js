import { raw } from 'express';
import { Sequelize, DataTypes, Model, json, Op } from 'sequelize';


//Passing parameters separately (sqlite)
//Disable SQL logging in the console to keep the output clean.
const sequelize = new Sequelize('sqlite::memory:',{logging: false});

class BOOK extends Model{}

BOOK.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull : false
        },
        author:{
            type: DataTypes.STRING,
            defaultValue: "Unknown Author"
        },
        pages:{
            type: DataTypes.INTEGER
        },
        isAvailable:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{sequelize, timestamps: false}
);

// async function StartApp(){
    
    await BOOK.sync();
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
    
    
// }    

// // StartApp();
const book1= await BOOK.create({title: "programming lang",pages:100, isAvailable: true})
// // console.log(book1.title);
// // console.log(JSON.stringify(book1));
// //update ada manuall

// book1.pages= 200;
// book1.author = "seif ashraf";
// book1.save();
// //-------------------------------------------------
// console.log(JSON.stringify(book1));


const book2= await BOOK.create({author: "seif elboghdady" ,title : 'cpp', pages :180, isAvailable: false});
const book3= await BOOK.create({author: "Samir" ,title : 'cpp', pages :500, isAvailable: true});
// console.log(JSON.stringify(book2));
// book2.set({
//     title : 'cpp with seif',
//     pages : 181,
//     author: 'samir',
//     isAvailable: true
// })

// console.log(JSON.stringify(book2));
// book2.increment('pages');
// book2.save();
// console.log(JSON.stringify(book2));


// const users = await BOOK.findAll(
//     {
//         attributes :["author", [sequelize.fn('COUNT', sequelize.col('pages')),'TotalBooks']],
//         where : {
//             pages : {
//                 [Op.gt]:100
//             },
//             isAvailable:{
//                 [Op.eq]:true
//             }

//         }
//     }
// );

// const users2 = await BOOK.findAll({
//     attributes:[
//         'pages',
//         'author',
//         'isAvailable'
//     ],
//     order: [
//         ['pages', 'DESC']
//     ]
// });


// // console.log(JSON.stringify(users));
// console.log(JSON.stringify(users2));




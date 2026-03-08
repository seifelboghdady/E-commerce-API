import { raw } from 'express';
import { Sequelize, DataTypes, Model, json, Op, where, QueryTypes } from 'sequelize';



//Passing parameters separately (sqlite)
//Disable SQL logging in the console to keep the output clean.
const sequelize = new Sequelize('sqlite::memory:',{logging: false});

class BOOK extends Model{}

BOOK.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull : false,
            get(){
                const rawdata = this.getDataValue('title');
                return rawdata? rawdata.toUpperCase(): null;
            },
            validate:{
                noForbidden(value){
                    if(value.includes('Forbidden')){
                        throw new Error("Title cannot contain the word 'Forbidden'");
                    }
                }
            }
        },
        author:{
            type: DataTypes.STRING,
            defaultValue: "Unknown Author",
            set(val){
                this.setDataValue('author',val.trim());
            }
            //we want return every member in uppercase
        },
        pages:{
            type: DataTypes.INTEGER,
            validate:{
                min:10
            }
        },
        isAvailable:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        shortDescription:{
            type: DataTypes.VIRTUAL,
            get(){
                return `Title is ${this.title} by Author ${this.author} `;
            }
        }
    },{sequelize, timestamps: false, modelName:'Books',tableName:'Books'}
);

// async function StartApp(){
    
    await BOOK.sync();
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
try {
    
    const book1 = await BOOK.create({title: 'Node.js Guide', author: 'John Doe', pages :200});
    const book2= await BOOK.create({author: "Jane Smith" ,title : 'Sequelize Master', pages :150});
    const book3= await BOOK.create({title : 'Database Design', pages :300});
    const book4 = await BOOK.create({title:'Cashing StraTegies'});
    const book5= await BOOK.create({author: "Jane tramb" ,title : 'Prompt Engineering', pages :140, isAvailable: false});
    console.log('tableName =', BOOK.getTableName());
    console.log(book1.author);
    console.log(book2.author);
    console.log(book3.author);
    console.log(book4.title);
    console.log();
    
    const getall = await sequelize.query('SELECT * FROM Books',{
        type : QueryTypes.SELECT
    });
    console.log(getall);

    const status = false
    const testQuery = await sequelize.query(`SELECT * FROM Books WHERE isAvailable =$status`,
        {
        bind: {status: status},
        type: QueryTypes.SELECT
    });

    console.log(JSON.stringify(testQuery));
    




    
    // const [res, meta] = await sequelize.query("SELECT * FROM Books WHERE title = 'Node.js Guide'");
    // const [res, meta] = await sequelize.query("UPDATE Books SET title = 'Node.js Guide' WHERE pages < 160");
    // console.log(res);
    // console.log(meta);
    
    // console.log(JSON.stringify(book2));
    // console.log(JSON.stringify(book5));

    

} catch (error) {
   console.log(error.message); 
    
}    


// // }    
// // // StartApp();
// // const book1= await BOOK.create({title: "programming lang",pages:100, isAvailable: true})
// // // console.log(book1.title);
// // // console.log(JSON.stringify(book1));
// // //update ada manuall

// // book1.pages= 200;
// // book1.author = "seif ashraf";
// // book1.save();
// // //-------------------------------------------------
// // console.log(JSON.stringify(book1));
// /*
// Your Task:
// Write a Node.js script that performs the following sequential operations inside an async function:

// Bulk Creation (Insert):

// Add at least 3 books to the database in one go (or using multiple create calls).

// Data example: * Book 1: Title "Node.js Guide", Author "John Doe", Pages 200.

// Book 2: Title "Sequelize Master", Author "Jane Smith", Pages 150.

// Book 3: Title "Database Design", Pages 300 (keep Author as default).

// Smart Searching (Finders):

// Find one book by its ID (Primary Key) and print its title.

// Find the first book written by "Jane Smith" using findOne.

// Search for all books that have more than 180 pages.

// Updating Data:

// Find the book "Node.js Guide" and change its isAvailable status to false.

// Use the increment method to add 10 pages to the book "Sequelize Master".

// Pagination & Counting:

// Use findAndCountAll to get only the first 2 books (limit: 2) and print the total count of books in the database.

// Cleanup (Delete):

// Delete the book with ID: 3 from the database.

// */
// const book1 = await BOOK.create({title: 'Node.js Guide', author: 'John Doe', pages :200});
// const book2= await BOOK.create({author: "Jane Smith" ,title : 'Sequelize Master', pages :150});
// const book3= await BOOK.create({title : 'Database Design', pages :300});



// //Find one book by its ID (Primary Key) and print its title.
// const Books1 = await BOOK.findByPk(1,{
//     attributes: ['title']
// });
// console.log(JSON.stringify(Books1));

// //Find the first book written by "Jane Smith" using findOne.
// const bookq1 = await BOOK.findOne({
//     where:{
//         author:{

//             [Op.like] : 'Jane Smith'
//         }
//     }
// });
// console.log(JSON.stringify(bookq1));


// //Search for all books that have more than 180 pages.
// const books2= await  BOOK.findAll({
//     where:{
//         pages:{
//             [Op.gt]: 180
//         }
//     }
// });
// console.log(JSON.stringify(books2));
// console.log();
// console.log();


// //Find the book "Node.js Guide" and change its isAvailable status to false.
// const updatedelement= await BOOK.update({isAvailable: false},
//     {
//         where:{
//             title:{
//                 [Op.like]: "Node.js Guide"
//             }
//         }
//     }
// );

// // console.log(JSON.stringify(await BOOK.findAll({where: {title:"Node.js Guide"}})));
// console.log(JSON.stringify(updatedelement));

// console.log();




// //Use the increment method to add 10 pages to the book "Sequelize Master".
// const incrementedelement = await BOOK.increment({pages : 10}, {where: {title : {[Op.like]: "Sequelize Master"}}});

// console.log(`this is incremented` ,JSON.stringify(incrementedelement));
// console.log();



// // console.log(JSON.stringify(await BOOK.findAll({where: {title:"Sequelize Master"}})));

// //Use findAndCountAll to get only the first 2 books (limit: 2) and print the total count of books in the database.
// const {count, rows}= await BOOK.findAndCountAll({limit:2});
// console.log(count);
// console.log();



// //Delete the book with ID: 3 from the database.
// const deletebook = await BOOK.destroy({
//     where:{
//         id :3
//     }
// })
// console.log(deletebook);





// // console.log(JSON.stringify(book2));
// // book2.set({
// //     title : 'cpp with seif',
// //     pages : 181,
// //     author: 'samir',
// //     isAvailable: true
// // })

// // console.log(JSON.stringify(book2));
// // book2.increment('pages');
// // book2.save();
// // console.log(JSON.stringify(book2));


// // const users = await BOOK.findAll(
// //     {
// //         attributes :["author", [sequelize.fn('COUNT', sequelize.col('pages')),'TotalBooks']],
// //         where : {
// //             pages : {
// //                 [Op.gt]:100
// //             },
// //             isAvailable:{
// //                 [Op.eq]:true
// //             }

// //         }
// //     }
// // );

// // const users2 = await BOOK.findAll({
// //     attributes:[
// //         'pages',
// //         'author',
// //         'isAvailable'
// //     ],
// //     order: [
// //         ['pages', 'DESC']
// //     ]
// // });


// // // console.log(JSON.stringify(users));
// // console.log(JSON.stringify(users2));




// import { raw } from 'express';
// import { Sequelize, DataTypes, Model, json, Op, where, QueryTypes } from 'sequelize';



// //Passing parameters separately (sqlite)
// //Disable SQL logging in the console to keep the output clean.
// const sequelize = new Sequelize('sqlite::memory:',{logging: false});

// class BOOK extends Model{}

// BOOK.init(
//     {
//         title: {
//             type: DataTypes.STRING,
//             allowNull : false,
//             get(){
//                 const rawdata = this.getDataValue('title');
//                 return rawdata? rawdata.toUpperCase(): null;
//             },
//             validate:{
//                 noForbidden(value){
//                     if(value.includes('Forbidden')){
//                         throw new Error("Title cannot contain the word 'Forbidden'");
//                     }
//                 }
//             }
//         },
//         author:{
//             type: DataTypes.STRING,
//             defaultValue: "Unknown Author",
//             set(val){
//                 this.setDataValue('author',val.trim());
//             }
//             //we want return every member in uppercase
//         },
//         pages:{
//             type: DataTypes.INTEGER,
//             validate:{
//                 min:10
//             }
//         },
//         isAvailable:{
//             type: DataTypes.BOOLEAN,
//             defaultValue: true
//         },
//         shortDescription:{
//             type: DataTypes.VIRTUAL,
//             get(){
//                 return `Title is ${this.title} by Author ${this.author} `;
//             }
//         }
//     },{sequelize, timestamps: false, modelName:'Books',tableName:'Books'}
// );

// // async function StartApp(){
    
//     await BOOK.sync();
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
    
// try {
    
//     const book1 = await BOOK.create({title: 'Node.js Guide', author: 'John Doe', pages :200});
//     const book2= await BOOK.create({author: "Jane Smith" ,title : 'Sequelize Master', pages :150});
//     const book3= await BOOK.create({title : 'Database Design', pages :300});
//     const book4 = await BOOK.create({title:'Cashing StraTegies'});
//     const book5= await BOOK.create({author: "Jane tramb" ,title : 'Prompt Engineering', pages :140, isAvailable: false});
//     console.log('tableName =', BOOK.getTableName());
//     console.log(book1.author);
//     console.log(book2.author);
//     console.log(book3.author);
//     console.log(book4.title);
//     console.log();
    
//     const getall = await sequelize.query('SELECT * FROM Books',{
//         type : QueryTypes.SELECT
//     });
//     console.log(getall);

//     const status = false
//     const testQuery = await sequelize.query(`SELECT * FROM Books WHERE isAvailable =$status`,
//         {
//         bind: {status: status},
//         type: QueryTypes.SELECT
//     });

//     console.log(JSON.stringify(testQuery));
    




    
//     // const [res, meta] = await sequelize.query("SELECT * FROM Books WHERE title = 'Node.js Guide'");
//     // const [res, meta] = await sequelize.query("UPDATE Books SET title = 'Node.js Guide' WHERE pages < 160");
//     // console.log(res);
//     // console.log(meta);
    
//     // console.log(JSON.stringify(book2));
//     // console.log(JSON.stringify(book5));

    

// } catch (error) {
//    console.log(error.message); 
    
// }    


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



// import { DataTypes, Model, Sequelize,QueryTypes } from "sequelize";

// const sequelize = new Sequelize({
//    dialect: 'sqlite', 
//    storage: 'database.sqlite',
//    logging: false
// });

// class Author extends Model{
// }
// class Book extends Model{
// }



// Author.init({
//   name:{
//     type: DataTypes.STRING,
//     allowNull: false,
//     set(value){
//       this.setDataValue('name',value.trim());
//     }
//     //Association: An Author hasMany Books.
//   },

// },{sequelize});

// Book.init(
//   {
//     /*
//     title: String (with a Getter to Uppercase).
//     price: Integer (with a Validation to be at least 10).
//     status: Virtual field that returns "Expensive" if price > 100, else "Affordable".
//     Settings: Enable paranoid: true (Soft Delete).
//     Association: A Book belongsTo Author.
//     */

//     title:{
//       type: DataTypes.STRING,
//       get(){
//          const rawdata = this.getDataValue('title');
//          return rawdata? rawdata.toUpperCase(): null
//       }
//     },

//     price:{
//       type: DataTypes.INTEGER,
//       validate:{
//           min: 10
//       }
//     },

//     status:{
//       type:DataTypes.VIRTUAL,
//       get(){
//         const price = this.getDataValue('price');
//         return price>100 ? 'Expensive': 'Affordable';
//       },
//       set(value) 
//       { 
//         throw new Error('Do not try to set the `fullName` value!');
//       },
//     },
//   },
//   {sequelize, paranoid: true, deletedAt: 'Settings'});

// //Association: An Author hasMany Books.
// Author.hasMany(Book);
// //Association: A Book belongsTo Author.
// Book.belongsTo(Author);



// await sequelize.sync();

// try { await sequelize.authenticate(); console.log('Connection has been established successfully.');
// } catch (error) { console.error('Unable to connect to the database:', error);
// }



/*
Write a script to:

  Create an Author named "  Robert Martin  " (Use a Setter to trim spaces).

  Create 2 Books for this author.

  Soft Delete one of the books.

  Try to find all books for this author using findAll. (Verify the deleted book doesn't appear).

  Restore the deleted book.
  ---
  Use sequelize.query (Raw Query) to find the total sum of prices for all books in the database.

Use Replacements or Bind Parameters to find books where the price is greater than a value provided by the user (e.g., 50).
*/
// try {
//   const Robert = await Author.create({name: "  Robert Martin  "});
//   const cleanCode = await Book.create({
//     title:'Clean Code',
//     price: 50,
//   });
//   const DesigningObjectOriented = await Book.create({
//     title:"Designing Object-Oriented",
//     price: 150
//   })

//   await Robert.setBooks([cleanCode, DesigningObjectOriented]);

//   await cleanCode.destroy();

//   //Try to find all books for this author using findAll. (Verify the deleted book doesn't appear).
//   const getAllBooks = JSON.stringify(await Author.findAll({
//     where:{
//         AuthorId: Robert.id
//     }
//   }));
//   await cleanCode.restore();

//   await sequelize.query('SELECT SUM(price) FROM Book',{
//     QueryTypes.SELECT
//   })
//   console.log(getAllBooks);
//   console.log(Robert.name);
//   console.log(cleanCode.status);
//   console.log(await Robert.countBooks());

// } catch (e) {
//   if(e instanceof Error)
//     console.log(e.message);
// }


// import { DataTypes, Model, Sequelize, QueryTypes } from "sequelize";

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'database.sqlite',
//   logging: false
// });

// class Author extends Model {}
// class Book extends Model {}

// Author.init({
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     set(value) {
//       this.setDataValue('name', value.trim());
//     }
//   },
// }, { sequelize, modelName: 'Author' });

// Book.init({
//   title: {
//     type: DataTypes.STRING,
//     get() {
//       const rawdata = this.getDataValue('title');
//       return rawdata ? rawdata.toUpperCase() : null;
//     }
//   },
//   price: {
//     type: DataTypes.INTEGER,
//     validate: { min: 10 }
//   },
//   status: {
//     type: DataTypes.VIRTUAL,
//     get() {
//       const price = this.getDataValue('price');
//       return price > 100 ? 'Expensive' : 'Affordable';
//     }
//   },
// }, { 
//   sequelize, 
//   modelName: 'Book',
//   paranoid: true // Essential for Soft Delete
// });

// // Associations
// Author.hasMany(Book);
// Book.belongsTo(Author);

// async function runChallenge() {
//   await sequelize.sync({ force: true }); // force: true for a clean test run

//   try {
//     // 1. Create Author with trimmed name
//     const robert = await Author.create({ name: "   Robert Martin   " });
//     console.log(`✅ Author Created: "${robert.name}"`);

//     // 2. Create 2 Books
//     const cleanCode = await Book.create({ title: 'Clean Code', price: 50, AuthorId: robert.id });
//     const designingOO = await Book.create({ title: "Designing OO", price: 150, AuthorId: robert.id });
//     console.log(`✅ Books Created: ${cleanCode.title} and ${designingOO.title}`);

//     // 3. Soft Delete one book
//     await cleanCode.destroy();
//     console.log(`🗑️  Soft Deleted: ${cleanCode.title}`);

//     // 4. Verify deleted book doesn't appear (Paranoid check)
//     const availableBooks = await robert.getBooks();
//     console.log(`📚 Available Books count (should be 1): ${availableBooks.length}`);

//     // 5. Restore the book
//     await cleanCode.restore();
//     console.log(`♻️  Book Restored: ${cleanCode.title}`);

//     // 6. Raw Query: Total Sum
//     const totalSum = await sequelize.query(
//       'SELECT SUM(price) AS total FROM Books', 
//       { type: QueryTypes.SELECT }
//     );
//     console.log(`💰 Total Price Sum (Raw Query): ${totalSum[0].total}`);

//     // 7. Raw Query: Protection with Bind Parameters
//     const minPrice = 60;
//     const expensiveBooks = await sequelize.query(
//       'SELECT title FROM Books WHERE price > $minPrice AND deletedAt IS NULL',
//       {
//         bind: { minPrice },
//         type: QueryTypes.SELECT
//       }
//     );
//     console.log(`🛡️  Books > $${minPrice} (Protected Query):`, expensiveBooks);

//     // 8. Validation Test
//     console.log("🧪 Testing Validation (Price: 5)...");
//     await Book.create({ title: 'Cheap Book', price: 5, AuthorId: robert.id });

//   } catch (e) {
//     console.log(`❌ Caught Expected Error: ${e.message}`);
//   }
// }

// runChallenge();
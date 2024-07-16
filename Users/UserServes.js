const bcrypt = require('bcryptjs');

const sql = require('mssql')
require('dotenv').config()
const { Expo } = require('expo-server-sdk');
const { generateToken } = require('../utils');

const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_API,
    
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
        port:1433,
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
sql.connect(sqlConfig)

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    login:login,
	gettoken,
};

async function getAll() {
 
 //const result = await sql.query`select * from Proce`
 const result = await sql.query` select * from Users`
  
 return await result.recordset
  
   
}

async function gettoken() {
 
    //const result = await sql.query`select * from Proce`
    const result = await sql.query` select token from Users`
  
      return await result.recordset
}



async function getById(id) {
    const result =  sql.query`select * from Users where id=${id}`
    return (await result).recordset
}

async function getusertoken() {
     const result = await sql.query` select token from Users`
  
      return await result.recordset
}


async function create(params) {

    // hash password
    const passwordHash = await bcrypt.hash(params.pass, 10);

    // save user
    return await  sql.query`INSERT INTO [dbo].[Users]
    ([username]
    ,[pass]
    ,[token]
    ,[phone])
VALUES (${params.username},${passwordHash},${params.token},${params.phone})`
}

async function update( params) {

      // hash password
      const passwordHash = await bcrypt.hash(params.pass, 10);

    return await  sql.query `UPDATE [dbo].[Users] SET 
    [username] = ${params.username}
    ,[pass] = ${passwordHash}
    ,[phone] = ${params.phone}
WHERE id = ${params.id}`
}

async function _delete(params) {
    return await  sql.query`DELETE FROM [dbo].[Users] WHERE id=${params.id} `

}

async function login(params) {
  const result = await sql.query`select pass from Users where phone=${params.phone} `
  console.log(result.recordset.length)
if(result.recordset.length>0)
      {

 const resultlogin =  await bcrypt.compare(params.pass, result.recordset[0].pass);
  if(resultlogin)
      {
          const result = await sql.query`select username,phone,id from Users where phone=${params.phone} `
          return await ({
            token: generateToken(result.recordset[0].username,result.recordset[0].phone,result.recordset[0].id)
            ,data:true,id:result.recordset[0].id
          })
      }
      else{
         return await ({
           
            data:false
          })
      }
    
  }
 else{return await ({
           
            data:false
          })}

}


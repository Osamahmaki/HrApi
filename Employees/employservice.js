
const sql = require('mssql')
require('dotenv').config()

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
    delete: _delete
    ,getsection,getdivision,GetMaxNumberEmpl,getAllby,addDivision
    ,addsection,GetdivisionbyidSection
};




async function GetdivisionbyidSection(id) {

  const result =await new sql.Request()
  .input('idSection', sql.Int,id)
  .execute('GetdivisionbyidSection')
	   return await result.recordset
     
  
  }


async function getAllby(id) {

  const result =await new sql.Request()
  .input('Admin', sql.Int,id)
  .input('Section', 1)
  .execute('GetAllEmployees')
	   return await result.recordset
     
  
  }


async function getAll() {

  const result =await new sql.Request()
  .input('Admin', 1)
  .input('Section', 1)
  .execute('GetAllEmployees')
	   return await result.recordset
     
  
  }


  async function getdivision() {
    const result =  sql.query`select * from Division`
    return (await result).recordset

}


  async function getsection() {
    const result =  sql.query`select * from Section`
    return (await result).recordset

}

  async function getById(id) {
      const result =  sql.query`select * from Employees where id=${id}`
      return (await result).recordset
  
  }

  async function GetMaxNumberEmpl() {
    const result = await  sql.query`SELECT isnull(max([NumEmploye]),1)+1 as num  FROM Employees`
    console.log((await result).recordset[0].num)
    return (await result).recordset[0].num

    
}

  
  async function create(params) {
      const result = await  sql.query`SELECT isnull(max([NumEmploye]),1)+1 as num  FROM Employees`
      const numberempl =(await result).recordset[0].num
  
      return await  sql.query`
INSERT INTO [dbo].[Employees]
           ([Section]
           ,[Division]
           ,[NameEmploye]
           ,[Phone]
           ,[Address]
           ,[Dateofcontract]
           ,[Salary]
           ,[NumEmploye]
           ,[JobTitle]) 
      VALUES (${params.Section},${params.Division},${params.NameEmploye},${params.Phone},${params.Address},${params.Dateofcontract},${params.Salary},${numberempl},${params.JobTitle})`
  }
  


  async function update(params) {
      
    return await  sql.query `UPDATE [dbo].[Employees] SET [Section] = ${params.Section}
    ,[Division] = ${params.Division}
    ,[NameEmploye] = ${params.NameEmploye}
    ,[Phone] = ${params.Phone}
    ,[Address] = ${params.Address}
    ,[Dateofcontract] = ${params.Dateofcontract}
    ,[Salary] = ${params.Salary}
    ,[JobTitle] = ${params.JobTitle}
WHERE id = ${params.id}`
}


async function _delete(params) {
 return await  sql.query`DELETE FROM [dbo].[Employees] WHERE id=${params.id} `

}



async function addsection(params) {
 
  return await  sql.query`
INSERT INTO [dbo].[Section]([Name]) VALUES (${params.Name})`
}



async function addDivision(params) {
 
  return await  sql.query`
INSERT INTO [dbo].[Division](idSection,[Name]) VALUES (${params.idSection},${params.Name})`
}



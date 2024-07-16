
const jwt = require("jsonwebtoken");
require('dotenv').config()



 const generateToken =(username,phone,iduser) => {
  return jwt.sign(
    {
      _id: iduser,
      username: username,
      phone: phone,
     
     
    },
    process.env.JWT_SECRET ,
    {
      expiresIn: '30d',
    }
  );
};


 const isAuth = (req, res, next) => {
   
     const authorization = req.headers.authorization; 
     

  if (authorization) {

    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX


    jwt.verify(
      token,
      process.env.JWT_SECRET ,
      (err, decode) => {
        if (err) {
          res.status(203).send({ message: 'Invalid Token',data:[] });
        } else {

          //console.log(decode)
   
          req.user = decode;
          next();
         
        }
      }
    );
  } else {
    res.status(203).send({ message: 'UnAuthorized',data:[] });
  }
};



module.exports = {generateToken,isAuth };
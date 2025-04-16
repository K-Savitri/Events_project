
 const register =  async (req, res)=>{
    const sql = "SELECT * FROM users WHERE  email = ? OR username= ?"

    try{
        
        
    db.query(sql, [req.body.email, req.body.name], (err, data)=>{
        if(err) return  res.json(err)
        if(data.length) return res.staus(409).res.json("user already exists")
            

            //hash the apssword and create user 
            const salt = bcrypt.getSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)


            const sql = "INSERT INTO users (`username`, `email`,`password`) VALUES (?)"


            const values = [
                req.body.username,
                req.body.email,
                hash
            ]

            db.query(sql, [values], (err, data)=>{
                if(err) return res.status(200).json("user has been created")
            })
    
        })
    }catch(err){
        console.error("Error ", err);
        res.status(500).json({ error: "Internal server error" });

    }
} 
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('decoded token:', decoded);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error('Token verification error:', err);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { verifyToken };

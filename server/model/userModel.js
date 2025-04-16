const db = require('../db');


const getUserInfo = async (id) => {
    const sql = 'SELECT * FROM user WHERE user_id = ?';
    try {
        const [rows] = await db.query(sql, [id]);
        console.log('findByEmail rows:', rows);
        return rows[0];
    } catch (err) {
        console.error('Error in findByEmail:', err);
        throw err;
    }
}

// user_id, name, email, phone, year_of_study, hashed_password

const editUserInfo  = async (id, name, email, phone) =>{
  const sql = 'UPDATE user SET name = ?, email = ?, phone = ? WHERE user_id = ?;';
  try {
    const [rows] = await db.query(sql, [name, email, phone, id]);
    console.log('find user rows:', rows);
    return rows[0];
  } catch (err) { 
    console.error('Error in findByEmail:', err);
    throw err;
  }
}




    // Register user for an event
const  regEvent= async(userId, eventId) =>{
      const query = 'INSERT INTO registration (user_id, event_id, registered_at) VALUES (?, ?, NOW())';
      try {
        const [result] = await db.query(query, [userId, eventId]);
        return result.insertId;
      } catch (error) {
        throw new Error('Registration failed: ' + error.message);
      }
    }


const cancelRegEvent = async (userId, eventId) => {
    const query = 'Delete from registration where user_id = ? and event_id = ?';    
      try {
        const [result] = await db.query(query, [userId, eventId]);
        return result.affectedRows > 0;
      } catch (error) {
        throw new Error('Cancellation failed: ' + error.message);
      }
    }


const checkReg = async(userId, eventId) => {
    const query = 'SELECT * FROM registration where user_id = ? and event_id = ?';    
      try {
        const [result] = await db.query(query, [userId, eventId]);
        return result;
      } catch (error) {
        throw new Error('Cancellation failed: ' + error.message);
      } 
}



    // Get list of registered events for a user
const getRegEvents = async (user_id) => {
    const sql = `
    SELECT 
  e.event_id, 
  e.title, 
  e.date, 
  e.time, 
  e.duration, 
  e.location, 
  e.description, 
  e.organizer_id, 
  e.share_counter
FROM registration r
JOIN event e ON r.event_id = e.event_id
WHERE r.user_id = ?;`

try{
  const [rows] = await db.query(sql, [user_id]);
  console.log('findAll events rows:', rows);
  return rows;
}catch(err){
  console.error('Error in findAll events:', err);
  throw err;
}
}



const userReminder = async (user_id) => {
    const sql = `
   SELECT 
   e.event_id,
   e.title,
   e.date,
   r.reminder_time,
   e.duration
   FROM reminder  r
   JOIN event e ON e.event_id = r.event_id
   WHERE user_id = ?;`    
try{
  const [rows] = await db.query(sql, [user_id]);
  console.log('findAll reminder rows:', rows);
  return rows;
}catch(err){
  console.error('Error in findAll reminders:', err);
  throw err;
}
  
}



module.exports = {getUserInfo, regEvent, getRegEvents ,cancelRegEvent,editUserInfo, checkReg, userReminder}
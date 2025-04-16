const db = require('../db');

const getAllEvents = async () => {
    const sql = `SELECT 
  e.event_id,
  e.title,
  e.date,
  e.time,
  e.location,
  e.description,
  e.organizer_id,
  c.category_id,
  o.name AS organizer_name,
  c.name AS category_name
FROM event e
JOIN event_category ec ON e.event_id = ec.event_id
JOIN category c ON ec.category_id = c.category_id
JOIN organizer o ON o.organizer_id = e.organizer_id;
`;
    try {
      const [rows] = await db.query(sql);
      console.log('findAll events rows:', rows);
      return rows;
    } catch (err) {
      console.error('Error in findAll events:', err);
      throw err;
    }
  }

 const  getNoReg = async (id) => {
    const sql = 'SELECT COUNT(*) FROM registration WHERE event_id = ?';
    try {
      const [rows] = await db.query(sql, [id]);
      console.log('no og reg in events rows:', rows);
      return rows[0];
    } catch (err) {
      console.error('Error in reg no :', err);
      throw err;
    }
  }






const EventDetails = async (id) => {
  const sql = `SELECT 
  e.event_id,
  e.title,
  e.date,
  e.time,
  e.duration,
  e.location,
  e.description,
  ec.category_id,
  c.name AS category_name,
  o.organizer_id AS organizer_id,
  o.name AS organizer_name
FROM event e
JOIN event_category ec ON e.event_id = ec.event_id
JOIN category c ON ec.category_id = c.category_id
JOIN organizer o ON o.organizer_id = e.organizer_id
WHERE e.event_id = ?;`

  try {
    const [rows] = await db.query(sql, [id]);
    console.log('findAll events rows:', rows);
    return rows[0];
  } catch (err) {
    console.error('Error in findAll events:', err);
    throw err;
  }
}; 


const getCategories = async () => {
  const sql = 'SELECT * FROM category';
  try {
    const [rows] = await db.query(sql);
    console.log('get categories rows:', rows);
    return rows;
  } catch (err) {
    console.error('Error in get categories :', err);
    throw err;
  }

}

//increase share counter

const increaseShareCounter = async (event_id) => {  
  const sql = 'UPDATE event SET share_counter = share_counter + 1 WHERE event_id = ?';
  try{
    const [result] = await db.query(sql, [event_id]);
    return result.affectedRows > 0;
  }catch(err){
    console.error('Error in increase share counter:', err);
    throw err;
  }
}



// add review
// review_id, user_id, event_id, rating, review_text, submmitted_at

const addReview = async(user_id, event_id, rating, review_text) =>{ 
  const sql = 'INSERT INTO review (user_id, event_id, rating, review_text, submmitted_at) VALUES (?, ?, ?, ?, NOW())';
  try{
    const [result] = await db.query(sql, [user_id, event_id, rating, review_text]);
    return result.insertId;
  }catch(err){
    console.error('Error in add review:', err);
    throw err;
  }
}

// add photo url photo_id, event_id, event_url, uploaded_at
const addPhoto = async(event_id, event_url) =>{

  const sql = `INSERT INTO photo (event_id, event_url, uploaded_at) VALUES (?, ?, NOW())`;
  try{
    const [result] = await db.query(sql, [event_id, event_url]); 
    return result.insertId;
  }catch(err){
    console.error('Error in add photo:', err);
    throw err;
  }   
}


const editPhoto = async (event_id, event_url) =>{ 

  const sql = `UPDATE photo SET event_url = ? WHERE event_id = ?`;
  try{  
    const [result] = await db.query(sql, [event_url, event_id]);
    return result.affectedRows > 0;
  }catch(err){
    console.error('Error in edit photo:', err);
    throw err;
  }
}


// module.exports = ;
module.exports = {getAllEvents,getNoReg,EventDetails, getCategories, increaseShareCounter,   addReview, addPhoto, editPhoto}
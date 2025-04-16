const Event = require('../model/eventModel');
const eventModel = require('../model/eventModel');




const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();
    console.log('getAllEvents response:', events);
    res.status(200).json(events);
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getNoReg = async (req, res) => {
  const id = req.params.id;
  try {
    const events = await eventModel.getNoReg(id);
    console.log('getAllEvents response:', events);
    res.status(200).json(events);
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 



const getEventDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const events = await eventModel.EventDetails(id);
    console.log('getAllEvents response:', events);
    res.status(200).json(events);
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};  


const getCategories = async (req, res) => {
  try {
    const categories = await eventModel.getCategories();
    console.log('getAllEvents response:', categories);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const increaseShareCounter = async (req, res) => {   
  try {
    const event_id = req.params.id;
    const share = await eventModel.increaseShareCounter(event_id);
    console.log('getAllEvents response:', share);
    res.status(200).json("successfully increased counter",share);  
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const addReview = async (req, res) => {   
  try {
    const user_id = req.body.user_id;
    const event_id = req.body.event_id;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const review = await eventModel.addReview(user_id, event_id, rating, comment);
    console.log('getAllEvents response:', review);
    res.status(200).json(review);  
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const addPhoto = async (req, res) => {   
  try {
    const event_id = req.body.event_id;
    const event_url = req.body.event_url;
    const photo = await eventModel.addPhoto(event_id, event_url);
    console.log('getAllEvents response:', photo);
    res.status(200).json(photo);  
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const editPhoto = async (req, res) => {   
  try {
    const event_id = req.body.event_id;    
    const event_url = req.body.event_url;    
    const photo = await eventModel.editPhoto(event_id, event_url);
    console.log('getAllEvents response:', photo);
    res.status(200).json(photo);  
  } catch (err) {
    console.error('Error in getAllEvents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}







module.exports = { getAllEvents, getNoReg ,getEventDetails, getCategories, increaseShareCounter,  addReview,addPhoto, editPhoto};
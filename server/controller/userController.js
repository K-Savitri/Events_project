const userModel = require('../model/userModel');

const getUserInfo = async(req, res)=>{
    const id = req.body.user_id;

    try{
        const user = await userModel.getUserInfo(id);
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   

}

const editUserInfo = async(req, res)=>{
    const id = req.body.user_id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    try{
        const user = await userModel.editUserInfo(id, name, email, phone);
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   
}


const regEvent = async(req, res)=>{
    const userId = req.body.user_id;    
    const eventId = req.body.event_id;    
    try{
        const user = await userModel.regEvent(userId, eventId);
        res.status(200).json("registration successful",user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   

}   


const cancelRegEvent = async(req, res)=>{
    const userId = req.body.user_id;    
    const eventId = req.body.event_id;    
    try{
        const user = await userModel.cancelRegEvent(userId, eventId);
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   

}


const checkReg = async(req, res)=>{
    const userId = req.body.user_id;    
    const eventId = req.body.event_id;    
    try{
        const user = await userModel.checkReg(userId, eventId);
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   

}



const getRegEvents = async(req, res)=>{
    const userId = req.body.user_id;    
    try{
        const user = await userModel.getRegEvents(userId);
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   

}   



const userReminder = async(req, res)=>{
    const userId = req.body.user_id;    
    try{
        const user = await userModel.userReminder(userId);
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserInfo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }   

}



module.exports = {getUserInfo,editUserInfo, regEvent, getRegEvents,cancelRegEvent, checkReg, userReminder};
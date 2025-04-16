const db = require('../db');

const Organiser = {
    getOrganiserDetails: async (id) => {
        try {
            const sql = 'SELECT * FROM organizer WHERE organizer_id = ?';
            const [rows] = await db.query(sql, [id]);
            console.log('getOrganiserDetails rows:', rows);
            return rows[0];
        } catch (err) {
            console.error('Error in getOrganiserDetails:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    fetchOrganizers: async () => {
        try {
            const sql = 'SELECT * FROM organizer';
            const [rows] = await db.query(sql);
            console.log('fetchOrganizers rows:', rows);
            return rows;
        } catch (err) {
            console.error('Error in fetchOrganizers:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }   
};    

module.exports = Organiser;
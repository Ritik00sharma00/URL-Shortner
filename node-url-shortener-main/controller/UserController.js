import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../config/env' });

const authenticate = (req, res) => {
    const {
        email
    } = req.body;

    const token = jwt.sign({
        email
    }, JWT_SECRET, {
        expiresIn: '1h'
    });

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.json({
        message: 'Token generated successfully',
        token
    });
};



export default    authenticate;
    

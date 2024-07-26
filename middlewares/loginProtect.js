// login Protect middleware
const jwt = require("jsonwebtoken");
const { supabase } = require("../config/supabaseClient");

const loginProtect = async (req, res, next) => {
    let token;
    
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
        return res.status(401).json({ error: "Not authorized to access this route" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data, error } = await supabase
        .from("Gym")
        .select("*")
        .eq("id", decoded.id)
        .single();
    
        if (error) {
        return res.status(401).json({ error: "Not authorized to access this route" });
        }
    
        req.gym = data;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized to access this route" });
    }
    }

module.exports = loginProtect;

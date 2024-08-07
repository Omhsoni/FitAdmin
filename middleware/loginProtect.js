// login Protect middleware
const jwt = require("jsonwebtoken");
const { supabase } = require("../config/supabaseClient");
require("dotenv").config();

// const loginProtect = async (req, res, next) => {
//   let token;
//   console.log("req.headers", req.headers);

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     console.log("req.headers.Authorization", req.headers.authorization);

//     token = req.headers.authorization.split(" ")[1];
//     console.log("\n\n\n\n\n\n\n\n\ntoken", token);
//   }

//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: "Not authorized to access this route" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { data, error } = await supabase
//       .from("Gym")
//       .select("*")
//       .eq("id", decoded.id)
//       .single();

//     if (error) {
//       return res
//         .status(401)
//         .json({ error: "Not authorized to access this route" });
//     }

//     req.gym = data;
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ error: "Not authorized to access this route" });
//   }
// };

const loginProtect = async (req, res, next) => {
  let token;
  console.log("req.headers", req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("req.headers.Authorization", req.headers.authorization);

    token = req.headers.authorization.split(" ")[1];
    // console.log("token", token);
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);

    const { data, error } = await supabase
      .from("Gym")
      .select("*")
      .eq("email", decoded.email)
      .single();

    if (error) {
      console.error("Supabase error", error);
      return res
        .status(401)
        .json({ error: "Not authorized to access this route11" });
    }

    req.gym = data;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }
};

module.exports = loginProtect;

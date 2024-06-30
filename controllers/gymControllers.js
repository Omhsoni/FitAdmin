const crypto = require("crypto");
const { supabase } = require("../config/supabaseClient");

// addGym controller
exports.signup = async (req, res) => {
  const { gymName, address, logo, contact, email, password } = req.body;

  if (!gymName || !address || !contact || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if gym already exists
    const { data: existingGym, error: existingGymError } = await supabase
      .from("Gym")
      .select("email")
      .eq("email", email)
      .single();

    if (existingGym) {
      return res.status(400).json({ error: "Gym already exists" });
    }

    if (existingGymError && existingGymError.code !== "PGRST116") {
      // PGRST116 indicates no rows found, which is not an error in this context
      throw existingGymError;
    }

    // Sign up user
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { gymName, address, logo, contact },
      },
    });

    if (authError) {
      throw authError;
    }

    // Hash password
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Insert new gym
    const { data, error: insertError } = await supabase
      .from("Gym")
      .insert({
        gymName,
        address,
        logo,
        contact,
        email,
        password: hashedPassword,
      })
      .select("*")
      .single();

    if (insertError) {
      throw insertError;
    }

    res.status(200).json({ message: "Gym registered successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Gym login successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

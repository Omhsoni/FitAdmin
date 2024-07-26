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

    return res
      .status(200)
      .json({ success: true, message: "Gym registered successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
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

    // send data from the Gym table
    const { data: gymData, error: gymError } = await supabase
      .from("Gym")
      .select("*")
      .eq("email", email)
      .single();

    if (gymError) throw gymError;

    return res
      .status(200)
      .json({ success: true, message: "Gym login successfully", gymData,data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Send password recovery email
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;

    return res.status(200).json({ message: "Password recovery email sent" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { password, token } = req.body;

  // Validate presence of password and token
  if (!password || !token) {
    return res.status(400).json({
      success: false,
      error: "Password and token are required",
    });
  }

  try {
    // Verify the OTP to set the auth session
    const { error: sessionError } = await supabaseInstance.auth.verifyOtp({
      token_hash: token,
      type: "recovery",
    });

    if (sessionError) {
      return res.status(400).json({
        success: false,
        error: sessionError.message,
      });
    }

    // Update the password for the authenticated user
    const { data, error: updateError } = await supabaseInstance.auth.updateUser(
      {
        password,
      }
    );

    if (updateError) {
      return res.status(400).json({
        success: false,
        error: updateError.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
      message: "Password reset successful",
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to reset password",
    });
  }
};

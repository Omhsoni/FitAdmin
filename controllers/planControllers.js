const { supabase } = require("../config/supabaseClient");

exports.addPlan = async (req, res) => {
  const gymId = req.gym.id;
  const { planName, price, validity } = req.body;
  console.log('gymId', gymId);

  if (!price || !validity || !planName || !gymId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data: existingPlan, error: existingPlanError } = await supabase
      .from("Plan")
      .select("planName")
      .eq("planName", planName)
      .eq("gymId", gymId)
      .single();

    if (existingPlan) {
      return res.status(400).json({ error: "Plan already exists" });
    }

    if (existingPlanError && existingPlanError.code !== "PGRST116") {
      throw existingPlanError;
    }

    const { data , error } = await supabase
      .from("Plan")
      .insert({
        planName,
        price,
        validity,
        gymId,
      })
      .select("*");

    if (error) {
      throw error;
    }

    return res
      .status(200)
      .json({ success: true, message: "Plan added successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const gymId = req.gym.id;
    console.log('gymId', gymId);

    const { data, error } = await supabase
      .from("Plan")
      .select("*")
      .eq("gymId", gymId);

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.deletePlan = async (req, res) => {
    const gymId = req.gym.id;
  const { planId } = req.params;

  if (!planId) {
    return res.status(400).json({ error: "Plan ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("Plan")
      .delete()
      .eq("id", planId)
      .eq("gymId", gymId);

    if (error) {
      throw error;
    }

    return res
      .status(200)
      .json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updatePlan = async (req, res) => {
    const gymId = req.gym.id;
  const { planId } = req.params;
  const { planName, price, validity } = req.body;

  if (!planId || !price || !validity || !planName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase
      .from("Plan")
      .update({
        planName,
        price,
        validity,
      })
      .eq("planId", planId)
      .eq("gymId", gymId);

    if (error) {
      throw error;
    }

    return res
      .status(200)
      .json({ success: true, message: "Plan updated successfully" , data});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
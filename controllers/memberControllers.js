const { supabase } = require("../config/supabaseClient");
let gymId = "0584684f-67ea-4ac8-84bf-ea4c348e2e9e";

/*
memberId	
uuid

string	
created_at	
timestamp with time zone

string	
name	
text

string	
mobile	
text

string	
trainerId	
uuid

string	
dob	
date

string	
height	
numeric

number	
isActive	
boolean

boolean	
joiningDate	
date

string	
gender	
public.gender

string	
planId	
bigint

number	
gymId	
uuid

string
*/

exports.addMember = async (req, res) => {
    const gymId = req.gym.id;
    const name = req.body.memberName;
  const { mobile, trainerId, dob, height, joiningDate, gender, planId } =
    req.body;
  if (
    !name 
    // !mobile ||
    // !dob ||
    // !height ||
    // !joiningDate ||
    // !gender ||
    // !planId
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const { data, error: insertError } = await supabase.from("Member").insert({
      name,
      mobile,
      trainerId,
      dob,
      height,
      joiningDate,
      gender,
      planId,
      gymId,
      isActive: true,
    });
    if (insertError) {
      throw insertError;
    }
    return res
      .status(200)
      .json({ success: true, message: "Member added successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMembers = async (req, res) => {
    const gymId = req.gym.id;
  try {
    const { data, error } = await supabase
      .from("Member")
      .select("memberId, name, mobile, gender , Plan(planName)")
      .eq("gymId", gymId)
      .eq("isActive", true);
    if (error) {
      throw error;
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMember = async (req, res) => {
    const gymId = req.gym.id;
  const { memberId } = req.params;
  try {
    const { data, error } = await supabase
      .from("Member")
      .select("*")
      .eq("gymId", gymId)
      .eq("memberId", memberId)
      .eq("isActive", true)
      .single();
    if (error) {
      throw error;
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteMember = async (req, res) => {
    const gymId = req.gym.id;
  const { memberId } = req.params;
  try {
    const { data, error } = await supabase
      .from("Member")
      .update({ isActive: false })
      .eq("gymId", gymId)
      .eq("memberId", memberId)
      .single();
    if (error) {
      throw error;
    }
    return res
      .status(200)
      .json({ success: true, message: "Member deleted", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateMember = async (req, res) => {
    const gymId = req.gym.id;
  const { memberId } = req.params;
  const {
    name,
    mobile,
    trainerId,
    dob,
    height,
    joiningDate,
    gender,
    planId,
    isActive,
  } = req.body;

  if (
    !name ||
    !mobile ||
    !trainerId ||
    !dob ||
    !height ||
    !joiningDate ||
    !gender ||
    !planId ||
    isActive === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase
      .from("Member")
      .update({
        name,
        mobile,
        trainerId,
        dob,
        height,
        joiningDate,
        gender,
        planId,
        isActive,
      })
      .eq("memberId", memberId)
      .eq("gymId", gymId)
      .single();
    if (error) {
      throw error;
    }
    return res
      .status(200)
      .json({ success: true, message: "Member updated successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

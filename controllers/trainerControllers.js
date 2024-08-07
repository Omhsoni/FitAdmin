const { supabase } = require("../config/supabaseClient");

// crud operations for trainer
exports.getTrainers = async (req, res) => {
  try {
    const { data, error } = await supabase.from("Trainer").select("*");

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.addTrainer = async (req, res) => {
    const gymId = req.gym.id;
  const { name, email, contact } = req.body;
  

    if (!name || !email || !contact || !gymId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const { data: existingTrainer, error: existingTrainerError } = await supabase
        .from("Trainer")
        .select("email")
        .eq("email", email)
        .eq("gymId", gymId)
        .single();

        if (existingTrainer) {
        return res.status(400).json({ error: "Trainer already exists" });
        }

        if (existingTrainerError && existingTrainerError.code !== "PGRST116") {
        throw existingTrainerError;
        }

        const { data:newTrainer, error } = await supabase
        .from("Trainer")
        .insert({
            name,
            email,
            phone:contact,
            gymId,
        })
        .select("*");

        console.log("newTrainer",newTrainer);

        if (error) {
        throw error;
        }

        // get all trainers
        const { data, error: trainersError } = await supabase
        .from("Trainer")
        .select("*")
        .eq("gymId", gymId);

        if (trainersError) {
        throw trainersError;
        }

        return res
        .status(200)
        .json({ success: true, message: "Trainer added successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}   

exports.getTrainer = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.id;

    try {
        const { data, error } = await supabase
        .from("Trainer")
        .select("*")
        .eq("id", trainerId)
        .eq("gymId", gymId)
        .single();

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateTrainer = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.id;
    const { name, email, phone } = req.body;

    try {
        const { data, error } = await supabase
        .from("Trainer")
        .update({
            name,
            email,
            phone,
        })
        .eq("id", trainerId)
        .eq("gymId", gymId)
        .returning("*");

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, message: "Trainer updated successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.id;

    try {
        const { data, error } = await supabase
        .from("Trainer")
        .delete()
        .eq("id", trainerId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, message: "Trainer deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrainerClients = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.id;

    try {
        const { data, error } = await supabase
        .from("Client")
        .select("*")
        .eq("trainerId", trainerId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrainerClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;

    try {
        const { data, error } = await supabase
        .from("Client")
        .select("*")
        .eq("id", clientId)
        .eq("trainerId", trainerId)
        .eq("gymId", gymId)
        .single();

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.addTrainerClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.id;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const { data, error } = await supabase
        .from("Client")
        .insert({
            name,
            email,
            phone,
            trainerId,
            gymId,
        })
        .select("*");

        if (error) {
        throw error;
        }

        return res
        .status(200)
        .json({ success: true, message: "Client added successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

exports.updateTrainerClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;
    const { name, email, phone } = req.body;

    try {
        const { data, error } = await supabase
        .from("Client")
        .update({
            name,
            email,
            phone,
        })
        .eq("id", clientId)
        .eq("trainerId", trainerId)
        .eq("gymId", gymId)
        .returning("*");

        if (error) {
        throw error;
        }

        return res
        .status(200)
        .json({ success: true, message: "Client updated successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteTrainerClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;

    try {
        const { data, error } = await supabase
        .from("Client")
        .delete()
        .eq("id", clientId)
        .eq("trainerId", trainerId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, message: "Client deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrainerClientPlans = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;

    try {
        const { data, error } = await supabase
        .from("Plan")
        .select("*")
        .eq("trainerId", trainerId)
        .eq("clientId", clientId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrainerClientPlan = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;
    const planId = req.params.planId;

    try {
        const { data, error } = await supabase
        .from("Plan")
        .select("*")
        .eq("id", planId)
        .eq("trainerId", trainerId)
        .eq("clientId", clientId)
        .eq("gymId", gymId)
        .single();

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.addTrainerClientPlan = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;
    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const { data, error } = await supabase
        .from("Plan")
        .insert({
            title,
            description,
            duration,
            trainerId,
            clientId,
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
}

exports.updateTrainerClientPlan = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;
    const planId = req.params.planId;
    const { title, description, duration } = req.body;

    try {
        const { data, error } = await supabase
        .from("Plan")
        .update({
            title,
            description,
            duration,
        })
        .eq("id", planId)
        .eq("trainerId", trainerId)
        .eq("clientId", clientId)
        .eq("gymId", gymId)
        .returning("*");

        if (error) {
        throw error;
        }

        return res
        .status(200)
        .json({ success: true, message: "Plan updated successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteTrainerClientPlan = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const clientId = req.params.clientId;
    const planId = req.params.planId;

    try {
        const { data, error } = await supabase
        .from("Plan")
        .delete()
        .eq("id", planId)
        .eq("trainerId", trainerId)
        .eq("clientId", clientId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, message: "Plan deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrainerPlanClients = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const planId = req.params.planId;

    try {
        const { data, error } = await supabase
        .from("Client")
        .select("*")
        .eq("trainerId", trainerId)
        .eq("planId", planId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrainerPlanClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const planId = req.params.planId;
    const clientId = req.params.clientId;

    try {
        const { data, error } = await supabase
        .from("Client")
        .select("*")
        .eq("id", clientId)
        .eq("trainerId", trainerId)
        .eq("planId", planId)
        .eq("gymId", gymId)
        .single();

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message
        });
    }
}

exports.addTrainerPlanClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const planId = req.params.planId;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const { data, error } = await supabase
        .from("Client")
        .insert({
            name,
            email,
            phone,
            trainerId,
            planId,
            gymId,
        })
        .select("*");

        if (error) {
        throw error;
        }

        return res
        .status(200)
        .json({ success: true, message: "Client added successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

exports.updateTrainerPlanClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const planId = req.params.planId;
    const clientId = req.params.clientId;
    const { name, email, phone } = req.body;

    try {
        const { data, error } = await supabase
        .from("Client")
        .update({
            name,
            email,
            phone,
        })
        .eq("id", clientId)
        .eq("trainerId", trainerId)
        .eq("planId", planId)
        .eq("gymId", gymId)
        .returning("*");

        if (error) {
        throw error;
        }

        return res
        .status(200)
        .json({ success: true, message: "Client updated successfully", data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

exports.deleteTrainerPlanClient = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const planId = req.params.planId;
    const clientId = req.params.clientId;

    try {
        const { data, error } = await supabase
        .from("Client")
        .delete()
        .eq("id", clientId)
        .eq("trainerId", trainerId)
        .eq("planId", planId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, message: "Client deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

exports.getTrainerPlanClientWorkouts = async (req, res) => {
    const gymId = req.gym.id;
    const trainerId = req.params.trainerId;
    const planId = req.params.planId;
    const clientId = req.params.clientId;

    try {
        const { data, error } = await supabase
        .from("Workout")
        .select("*")
        .eq("trainerId", trainerId)
        .eq("planId", planId)
        .eq("clientId", clientId)
        .eq("gymId", gymId);

        if (error) {
        throw error;
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


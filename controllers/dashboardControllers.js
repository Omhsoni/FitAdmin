const { supabase } = require("../config/supabaseClient");
let gymId = "0584684f-67ea-4ac8-84bf-ea4c348e2e9e";

exports.getDashboardData = async (req, res) => {
      const gymId = req.gym.id;

  //   get only dates
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  try {
    const { data: revenue, error: revenueError } = await supabase
      .from("Member")
      .select("Plan(price)")
      .eq("gymId", gymId)
      .gte("joiningDate", firstDayOfYear)
      .lte("joiningDate", today);

    if (revenueError && revenueError.code !== "PGRST116") {
      throw revenueError;
    }

    const totalRevenue = revenue.reduce(
      (acc, member) => acc + member.Plan.price,
      0
    );

    // use count to get count from suopabase
    const {
      data: memberData,
      error: memberError,
      count: memberCount,
    } = await supabase
      .from("Member")
      .select("memberId", { count: "exact" })
      .eq("gymId", gymId);

    if (memberError && memberError.code !== "PGRST116") {
      throw memberError;
    }

    const {
      data: trainerData,
      error: trainerError,
      count: trainerCount,
    } = await supabase
      .from("Trainer")
      .select("trainerId", { count: "exact" })
      .eq("gymId", gymId);

    if (trainerError && trainerError.code !== "PGRST116") {
      throw trainerError;
    }

    return res
      .status(200)
      .json({ success: true, totalRevenue, memberCount, trainerCount });
  } catch (error) {
    console.error("Error getting revenue data", error);
    return res.status(500).json({ error: "Error getting revenue data" });
  }
};


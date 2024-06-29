const express = require("express");
const app = express();
const cors = require("cors");

const { supabase } = require("./config"); // supabase instance

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post('/signup', async (req, res) => {
  

  const { email, password, gymName, address, gymLogo, contact } = req.body;

  if (!email || !password || !gymName || !address || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new user with email and password
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
         gymName,
         address,
         gymLogo,
         contact
        },
      },
    });

    if (authError) {
      throw authError;
    }

    

    res.status(201).json({ message: 'Gym registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log("========> ", req.body);
  const { email, password } = req.body;

  try {
    // Create a new user with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    res.status(201).json({ message: "Gym login successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("This is root of FitAdmin");
});

app.listen(4080, () => {
  console.log("server is ready and listening");
});

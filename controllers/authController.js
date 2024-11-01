const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  console.log("Request Body:", req.body); 
  const { firstname, lastname, email, phone, password, confirmPw } = req.body;

  if (!firstname || !lastname || !email || !phone || !password || !confirmPw) {
    return res.status(400).json({ message: 'All fields are required' });


  }

  

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {

    return res.status(400).json({ message: 'Invalid email format' });
  }


  const passwordLength = 8;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < passwordLength || !passwordRegex.test(password)) {

    return res.status(400).json({
      message: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character',
    });

  }


  const trimmedPassword = password.trim();
  const trimmedConfirmPw = confirmPw.trim();

  if (trimmedPassword !== trimmedConfirmPw) {

    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    
    const existingUser = await User.findOne({ email });

          if (existingUser) {

      return res.status(400).json({ message: 'User already exists' });
    }

  
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      confirmPw: hashedPassword,
    });

 
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {

    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
  
};


exports.logout = (req, res) => {
  
  res.json({ message: "Successfully logged out" });
};






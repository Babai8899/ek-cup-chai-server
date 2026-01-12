import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { username, name, password, email, mobile, dob, gender } = req.body;
    // Validate required fields
    if (!username || !email || !password || !name || !mobile || !dob  || !gender) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ username }) || await UserModel.findOne({ email }) || await UserModel.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ message: "Username, email, or mobile already exists" });
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character" });
    }
    // Validate Name
    const nameRegex = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ message: "Name must start with an uppercase letter and contain only alphabets" });
    }
    // Validate phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobile)) {
        return res.status(400).json({ message: "Phone number must be a 10-digit number" });
    }
    // Validate dob
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
        return res.status(400).json({ message: "Date of birth must be a valid date and not in the future" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user instance
        const newUser = new UserModel({
            name,
            username,
            email,
            mobile,
            password: hashedPassword,
            dob: dobDate,
            gender
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    console.log("Login attempt:", username);

    //validate username and password are not empty
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await UserModel.findOne({ username }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" });
        }

                // Remove profileImage from user object before storing in JWT
                const { profileImage, password: userPassword, ...userPayload } = user.toObject ? user.toObject() : user;

                // generate JWT token
                const accessToken = jwt.sign({ user: userPayload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });


                // Set the refresh token in a cookie
                res
                    .cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: true, // Use secure cookies in production
                        sameSite: 'None', // Adjust as necessary for your application
                        maxAge: 60 * 60 * 1000 // 1 hour
                    });

                res.status(200).json({
                    message: "Login successful",
                });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const logout = (req, res) => {
    // Clear the refresh token cookie
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Logged out successfully" });
}

const getUser = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "No access token provided" });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const { profileImage, password: userPassword, ...userPayload } = decoded.user;
    // Return user details (without profileImage and password)
    res.status(200).json(userPayload);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(403).json({ message: "Forbidden" });
    }
}


export {
    register,
    login,
    logout,
    getUser
};
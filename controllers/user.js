import User from "../models/user.js";


class UserController {

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    }

    // Add user
    async addUser(req, res) {
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                passwordHash: req.body.passwordHash, // In a real app, you'd hash the password before storing it
                isAdmin: req.body.isAdmin || false
            });
            res.status(201).json({ message: 'User created successfully', userId: user.id });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Failed to create user' });
        }
    }
}

export default new UserController();
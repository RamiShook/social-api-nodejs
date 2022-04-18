import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export async function signup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ mesasge: 'Email already exist' });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPass,
      fullName: `${firstName} ${lastName}`,
    });

    return res.status(201).json({ message: 'success user created!' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'wrong email or password' });
    }
    const username = user.fullName;
    // eslint-disable-next-line no-underscore-dangle
    const userId = user._id.toString();
    return res.status(200).json({
      message: 'Signed in succssfully',
      token: jwt.sign({ username, userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      }),
    });
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
}

export async function findById(req, res) {
  try {
    const { UserId } = req.params;
    const result = await User.findById(UserId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
}

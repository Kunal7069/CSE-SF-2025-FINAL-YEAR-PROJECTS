import Expert from '../models/expert.model.js';
// import Service from '../models/service.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import imagekit from '../utils/imagekit.js';

import fs from 'fs';


import path from 'path';


const JWT_SECRET = process.env.JWT_SECRET; // 🔐 Use env in production

// ----------------------
// Expert Signup
// ----------------------
export const signUpExpert = async (req, res) => {
  try {
    const { name, email, password, aboutMe } = req.body;

    const existingExpert = await Expert.findOne({ email });
    if (existingExpert) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newExpert = await Expert.create({
      name,
      email,
      password: hashedPassword,
      aboutMe,
      services: []
    });

    // 🔥 Generate JWT token just like in sign-in
    const token = jwt.sign({ id: newExpert._id, role: 'expert' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Expert registered successfully',
      token,
      user: {
        _id: newExpert._id,
        name: newExpert.name,
        email: newExpert.email,
        aboutMe: newExpert.aboutMe || '',
        services: newExpert.services,
        photo: newExpert.photo || null
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ----------------------
// Expert Signin
// ----------------------
export const signInExpert = async (req, res) => {
  try {
    const { email, password } = req.body;

    const expert = await Expert.findOne({ email });
    if (!expert) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, expert.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: expert._id, role: 'expert' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: expert._id,
        name: expert.name,
        email: expert.email,
        aboutMe: expert.aboutMe || '',
        services: expert.services,
        photo: expert.photo || null
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------
// Get Expert by ID (with services populated)
// ----------------------
export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id)
      .select('-password')
      .populate('services');

     

    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    res.status(200).json({ user: expert });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------
// Update Expert Profile
// ----------------------
export const updateExpertProfile = async (req, res) => {
  try {
    const expert = req.expert;
    const { name, email, password, aboutMe } = req.body;

    if (name) expert.name = name;
    if (email) expert.email = email;
    if (aboutMe) expert.aboutMe = aboutMe;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      expert.password = hashed;
    }

    // ✅ Handle Image Upload to ImageKit
    if (req.file) {
      // Delete old image using fileId (not from URL!)
      if (expert.photoFileId) {
        try {
          await imagekit.deleteFile(expert.photoFileId);
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }

      const uploaded = await imagekit.upload({
        file: fs.readFileSync(req.file.path),
        fileName: req.file.originalname,
        folder: "/experts",
      });

      fs.unlinkSync(req.file.path); // delete local file after upload

      expert.photo = uploaded.url;
      expert.photoFileId = uploaded.fileId; // ✅ save fileId
    }

    await expert.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: expert._id,
        name: expert.name,
        email: expert.email,
        aboutMe: expert.aboutMe || '',
        services: expert.services,
        photo: expert.photo || null
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
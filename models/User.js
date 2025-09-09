import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    image: { type: String },
    emailVerified: { type: Date },
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot-reload in Next.js
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;



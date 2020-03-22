import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  profilePicture: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

userSchema.index({ username: 1, email: 1 });
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});
userSchema.methods.comparePassword = function (password) {
  const user = bcrypt.compareSync(password, this.password);
  return user ? this : null;
};

const User = mongoose.model('user', userSchema);

export default User;

/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";

/**
 * @typedef User Represents users
 * @property {string} username Username for user
 * @property {string} password Password for user
 * @property {string} firstName First name for user
 * @property {string} lastName Last name for user
 * @property {string} email Email for user
 * @property {string} profilePhoto Profile photo for user
 * @property {string} headerImage Header image for user
 * @property {AccountType} accountType Account type for user
 * @property {MaritalStatus} maritalStatus Marital status for user
 * @property {string} biography Biography for user
 * @property {Date} dateOfBirth Date of birth for user
 * @property {Date} joined Date that user joined
 * @property {Location} location Location for user
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;
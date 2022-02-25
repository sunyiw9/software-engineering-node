/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message Represents message
 * @property {ObjectId} to User who received message
 * @property {ObjectId} from User who sent message
 * @property {string} message Message that one user sent to another user
 * @property {Date} sentOn Date that message sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: {type: String, required: true},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;
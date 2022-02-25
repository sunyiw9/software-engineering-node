/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages another user
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between users
 * @property {string} message Message being sent
 * @property {Date} sentOn Message being sent data
 * @property {User} to User who sends message
 * @property {User} from User who received message
 */
export default class Message {
    private message: string = '';
    private sentOn: Date = new Date();
    private to: User | null = null;
    private from: User | null = null;
}

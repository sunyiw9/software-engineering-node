/**
 * @file Declares Tuit data type representing tuits
 */
import User from "./User";

/**
 * @typedef Tuit Represents tuits
 * @property {string} tuit Tuit
 * @property {Date} postedOn Date that the tuit posted
 * @property {User} postedBy User posting tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}

/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
import User from "./User";

/**
 * @typedef Follow Represents follows relationship between a user and another user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing The following user
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
};
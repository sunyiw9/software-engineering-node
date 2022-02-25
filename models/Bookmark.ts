/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 * @property {User} bookmarkBy User bookmarking the tuit
 */
export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};
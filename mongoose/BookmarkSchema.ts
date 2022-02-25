/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * @typedef Bookmark Represents bookmark
 * @property {ObjectId} bookmarkedTuit Tuit being bookmarked
 * @property {ObjectId} bookmarkedBy User bookmarked tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;
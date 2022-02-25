import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userUnBookmarkTuit (tid: string, uid: string): Promise<any>;
    userBookmarkTuit (tid: string, uid: string): Promise<Bookmark>;
};
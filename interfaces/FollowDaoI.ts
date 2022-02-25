import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersThatFollowing (uid: string): Promise<Follow[]>;
    findAllUsersThatFollowed (uid: string): Promise<Follow[]>;
    userUnFollowsAnotherUser (uid1: string, uid2: string): Promise<any>;
    userFollowsAnotherUser (uid1: string, uid2: string): Promise<Follow>;
};
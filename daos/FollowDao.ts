/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Uses FollowModel to retrieve all users that following documents from users collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the users are retrieved from the database
     */
    findAllUsersThatFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all users that followed documents from users collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the users are retrieved from the database
     */
    findAllUsersThatFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Inserts follow instance into the database
     * @param {string} uid1 Primary key of user
     * @param {string} uid2 Primary key of user
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowed: uid1, userFollowing: uid2});

    /**
     * Remove follow from the database
     * @param {string} uid1 Primary key of user
     * @param {string} uid2 Primary key of user
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnFollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid1, userFollowing: uid2});
}
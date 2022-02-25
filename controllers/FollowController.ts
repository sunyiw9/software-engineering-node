/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the users following
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve all users' followers
 *     </li>
 *     <li>POST /api/users/:uid1/follows/:uid2 to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/unfollows/:uid2 to record that a user
 *     no longer follows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersThatFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowed);
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnFollowsAnotherUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users that following from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who follows other users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed
     */
    findAllUsersThatFollowed = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowed(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that follow other user
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is unfollowing
     * the another user and the another user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
};

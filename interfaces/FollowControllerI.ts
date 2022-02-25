import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllUsersThatFollowing (req: Request, res: Response): void;
    findAllUsersThatFollowed (req: Request, res: Response): void;
    userUnFollowsAnotherUser (req: Request, res: Response): void;
    userFollowsAnotherUser (req: Request, res: Response): void;
};
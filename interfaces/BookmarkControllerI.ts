import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarkTuit (req: Request, res: Response): void;
    userUnBookmarkTuit (req: Request, res: Response): void;
};
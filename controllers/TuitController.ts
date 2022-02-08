import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import {Express, Request, Response} from "express";
import TuitControllerI from "../interfaces/TuitController";

//Code reference: https://github.com/jannunzi/software-engineering-node/tree/a2
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.post("/users/:uid/tuits", TuitController.tuitController.createTuit); //creat by user
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() {}

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then((tuit: Tuit) => res.json(tuit));
    //creat by user
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.send(status));
};
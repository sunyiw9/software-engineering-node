/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/messages to retrieve all messages that received by a user
 *     </li>
 *     <li>POST /api/users/:uid1/messages/:uid2 to record that a user send a message to another user
 *     </li>
 *     <li>DELETE /api/messages/:mid to record that a user
 *     wants to delete a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesUserSent);
            app.get("/api/users/:uid/messagesfrom", MessageController.messageController.findAllMessagesSentToThem);
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userSendsMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages that sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesUserSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesUserSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages received by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user received the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesSentToThem = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentToThem(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that sending message
     * and the user received message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.uid1, req.params.uid2, req.body)
            .then((message: Message) => res.json(message));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the message that is the user
     * wants to delete
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
};

/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Uses MessageModel to retrieve all messages that sent by user documents from users collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findAllMessagesUserSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();

    /**
     * Uses MessageModel to retrieve all messages that sent to user documents from users collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findAllMessagesSentToThem = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message")
            .exec();

    /**
     * Inserts like instance into the database
     * @param {string} uid1 Primary key of user
     * @param {string} uid2 Primary key of user
     * @param {Message} message Message object containing properties and their new values
     * @returns Promise To be notified when message is inserted into the database
     */
    userSendsMessage = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from: uid1, to: uid2});

    /**
     * Remove message from the database
     * @param {string} mid Primary key of message
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}
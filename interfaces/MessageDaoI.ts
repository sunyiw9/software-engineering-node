import Message from "../models/Message";
import Tuit from "../models/Tuit";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesUserSent (uid: string): Promise<Message[]>;
    findAllMessagesSentToThem (uid: string): Promise<Message[]>;
    userDeletesMessage (mid: string): Promise<any>;
    userSendsMessage (uid1: string, uid2: string, message: Message): Promise<Message>;
};
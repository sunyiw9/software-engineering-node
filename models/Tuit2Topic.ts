import Tuit from "./Tuit";

/**
 * @typedef Tuit2Topic Represents a relationship between tuit and topic
 * @property {string} topic
 * @property {Tuit} tuit
 */
export default class Tuit2Topic {
    private topic: string = "";
    private tuit: Tuit | null = null;
}
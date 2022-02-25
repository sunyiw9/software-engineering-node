import Tuit from "./Tuit";

/**
 * @typedef Tuit2Tag Represents a relationship between tuit and tag
 * @property {string} tag
 * @property {Tuit} tuit Tuit being taged
 */
export default class Tuit2Tag {
    private tag: string = "";
    private tuit: Tuit | null = null;
}
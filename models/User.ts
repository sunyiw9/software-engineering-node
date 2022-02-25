/**
 * @file Declares User data type representing users
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents users
 * @property {string} username
 * @property {string} password
 * @property {string} first name
 * @property {string} last name
 * @property {string} email
 * @property {string} profile photo
 * @property {string} header image
 * @property {AccountType} account type
 * @property {MaritalStatus} marital status
 * @property {string} biography
 * @property {Date} date of birth
 * @property {Date} date user joined
 * @property {Location} location
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}

import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

// Initialize Appwrite SDK
// This is a service class to handle authentication related operations
//we will export its object to use its methods.

export class AuthService { 
    client = new Client(); // why const is not used here? Answer : Because we are defining a class property, not a constant variable.
    account;

    constructor(){
        this.client 
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.account = new Account(this.client);  // Initialize account service
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });

            if (userAccount) {
                return this.login(email, password);
            } else {
                return userAccount; // null
            }
        } catch (error) {
            throw error;
        }
    } // calls login after account is created and login returns a emailPass session.

    async login(email, password) {
        try{
            return await this.account.createEmailPasswordSession({
                email,
                password
            } );
        }catch(error){
            console.log(`Error in login: ${error}`);
        }
    }

    async logout() {
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    } // this is a async func. => all async functions implicitly returns a promise so we can use .then() with them.

    async getCurrentUser() {
        try{
            return await this.account.get();
        }catch(error){
            console.log(`Error in getCurrentUser: ${error}`);
        }
    } // return current user data.
}

const authService = new AuthService();
export default authService;

// JUST BECAUSE YOU HAVE EXPORTED authService as default := so you can import it by any namew
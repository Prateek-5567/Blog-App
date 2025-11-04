import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

// Initialize Appwrite SDK
// This is a service class to handle authentication related operations

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
        try{

            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );  
            // first parameter is always unique id.

            if(userAccount){  // if the account is created successfully 
                return this.login(email, password); // when account is created successfully, log the user in.
            }else{
                return userAccount; // it will be null if account creation failed. ~ return null;
            }

        }catch(error){
            throw error;
        }
    }

    async login(email, password) {
        try{
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
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
    }

    async getCurrentUser() {
        try{
            return await this.account.get();
        }catch(error){
            console.log(`Error in getCurrentUser: ${error}`);
        }
    }
}

const authService = new AuthService();
export default authService;

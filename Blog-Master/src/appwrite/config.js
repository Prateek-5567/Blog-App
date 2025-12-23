import conf from '../conf/conf.js';
import {
  Client,
  ID,
  TablesDB,
  Storage,
  Query,
  Permission,
  Role
} from 'appwrite';

// we have created an article table in our database to handle post related features.
// post.$id = its slug , post.userid = to which user post belongs...

export class Service {
  client = new Client();
  tableDB;
  storage;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.tableDB = new TablesDB(this.client); // what is tableDB here? 
        this.storage = new Storage(this.client); // what is storage here? 
        // file related operations are done using storage object. that is connected with Bucket.
    }
// this class will have only one instance throughout the app, so all diffrent users use the same database table and bucket to store their posts and images.

    async createPost(title, slug, content, featuredImage, userId, status) {
    try {
        const newPost = await this.tableDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        // rowId is optional – let Appwrite generate one on its own
        data: {
            title,
            slug,
            content,
            featuredImage,
            userId,
            status,
        },
        permissions: [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ],
        // all users have permission to read blog but only current user have permission to update or delete it.
        });

        if (newPost) console.log(newPost.$id);
        return newPost; // you probably want to return it
    } catch (error) {
        console.log(`Error in createPost: ${error.message}`);
        return null;
    }
    } // createPost returns the post data after successful creation.

    async updatePost(slug, { title, content, featuredImage, userId, status }) {
    try {
        const response = await this.tableDB.listRows({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteTableId,
            queries: [Query.equal("slug", slug)],
        });

        if (!response.rows || response.rows.length === 0) {
            console.log("No post found");
            return null;      // you must return here to avoid crash
        }

        const rowId = response.rows[0].$id;

        return await this.tableDB.updateRow({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteTableId,
            rowId,
            data: {
                title,
                slug,
                content,
                featuredImage,
                userId,
                status,
            },
        });
    } 
    catch (error) {
        console.log(`Error in updatePostBySlug: ${error.message}`);
        return null;
    }
    }

    async deletePost(slug) {
    try {
        const response = await this.tableDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries: [Query.equal("slug", slug)],
        });

        if (!response.rows || response.rows.length === 0) {
        console.log("No post found");
        return false;
        }

        const rowId = response.rows[0].$id;
// response.rows is an array of rows that match the query. since slug is unique,array will contain only 1 element and 
//  we are taking first element of array and that is the only element in array because it will be the only match 
// and from that array we are taking $id property which is the rowId of that post.
        await this.tableDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId,
        });

        return true;
    } 
    catch (error) {
        console.log(`Error in deletePostBySlug: ${error.message}`);
        return false;
    }
    }

    async getPost(slug) {
    try {
        const response = await this.tableDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries: [Query.equal("slug", slug)],
        });

        if (!response.rows || response.rows.length === 0) {
        return null;
        }

        return response.rows[0];
    } catch (error) {
        console.log("Error in getPost: ", error);
        return null;
    }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        const response = await this.tableDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
        });

        if (!response.rows || response.rows.length === 0) {
        return null; // your choice: null vs []
        }

        return response.rows;
    } 
    catch (error) {
        console.log("error in get all posts: ", error);
        return null;
    }
    }

    async uploadFile(file) {
    try {
        const response = await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
        permissions: [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ],
        });
        return response.$id;  // return the fileId generated by appwrite after uploading the file
    } 
    catch (error) {
        console.log("error in file upload: ", error);
        return null;
    }
    }
 
    // above function uploaded the file and returned the fileId generated by appwrite which we can store in our posts table.

    async deleteFile(fileId) {
    try {
        await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
        });
        return true;
    } catch (error) {
        console.log("error in file delete: ", error);
        return false;
    }
    }

// from where will i get the fileId? => from the post data where we stored it while creating the post.
    
    getFilePreview(fileId) {
    try {
        return this.storage.getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId,
        });
    } catch (error) {
        console.log("error in getting file preview: ", error);
    }
    }
    // no need to make this func async as this function just returns the url to preview the image. that is very fast operation.
}

const service = new Service();
export default service;

// JUST BECAUSE YOU HAVE EXPORTED service as default := so you can import it by any name usually it is : import appWriteService from ...
// all methods in class are diffrent services that we provide to user and are used to interact with appwrite database and storage.

/**
 *:=> 
client
    Just a JS object that knows:
    Which Appwrite endpoint (URL) to talk to
    Which project ID to use
    Which session/cookies to send (this is how it knows which user is logged in)

tableDB
    A helper object from the SDK that wraps all TablesDB APIs (createRow, listRows, updateRow, deleteRow).
    It does not “contain” the database; it just knows how to talk to the database service on the server.

storage
    A helper object that wraps all Storage APIs (createFile, deleteFile, getFilePreview).
    Again: it does not hold files in memory; it just sends requests to Appwrite Storage on the server.
 
client is required just to where the requests are sent.
we have only one object of this class and that is what we are returning at the end of the file.
*/

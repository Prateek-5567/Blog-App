import conf from './config.js';
import {
  Client,
  ID,
  TablesDB,
  Storage,
  Query,
  Permission,
  Role
} from 'appwrite';

export class Service {
  client = new Client();
  tableDB;
  storage;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.tableDB = new TablesDB(this.client); // what is tableDB here? => used to interact with appwrite database tables.
        this.storage = new Storage(this.client); // what is storage here? => used to upload files in appwrite.
        // file related operations are done using storage object. that is connected with Bucket.
    }

    async createPost(title, slug, content, featuredImage, userId, status) {
        try {
            const newPost = await this.tableDB.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    userId,
                    status,
                } // no need of rowid as it is auto generated in appwrite now.
                // data can be passed in any order irrespective to the order of columns of your database cols in appwrite
                // Appwrite doesn’t care about the order of the keys. It looks at the field names (keys) and maps them to your table columns internally.
                ,
                [
                    // Permissions array
                    Permission.read(Role.any()),               // anyone can read
                    Permission.update(Role.user(userId)),      // only creator can update
                    Permission.delete(Role.user(userId)),      // only creator can delete
                ]
            );
            if(newPost) console.log(newPost.$id) // this is your rowId generated auto by appwrite for everyrow you insert.           
        } 
        catch (error) {
        console.log(`Error in createPost: ${error.message}`);
        return null;
        }
    }

    async updatePost(slug,{title, content, featuredImage, userId, status}) {
        try {
            // fetch the Row with matching slug 
            const response = await this.tableDB.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                [Query.equal("slug", slug)]
                );

            if (!response.rows || response.rows.length === 0) console.log('No post found')

            const rowId = response.rows[0].$id;

            // update the row as now we have the rowId that appwrite generated.
            return await this.tableDB.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                rowId,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    userId,
                    status,
                }
            );
        } catch (error) {
            console.log(`Error in updatePostBySlug: ${error.message}`);
            return null;
        }
    }

    async deletePost(slug){
        try{
            // fetch the Row with matching slug 
            const response =  await this.tableDB.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                [Query.equal("slug", slug)]
                );

            if (!response.rows || response.rows.length === 0) console.log('No post found')

            const rowId = response.rows[0].$id;

            // delete the row as now we have the rowId that appwrite generated.
            return await this.tableDB.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                rowId
            );          
        }
        catch (error) {
            console.log(`Error in deletePostBySlug: ${error.message}`);
            return false; // return false if Post deletion failed.
        }
    }

    async getPost(slug){
        const response = await this.tableDB.listRows(
            conf.appwriteDatabaseId,
            conf.appwriteTableId,
            [Query.equal("slug",slug)]  // left "slug" is for columns of table and right slug is to match i.e get the specific row whose "slug"=slug.
        )
        if (!response.rows || response.rows.length === 0){
            return null;
        }
        return response.rows[0]; // return the object only matching given slug. (structure of response if written in notes.)
    }

    async getPosts(queries = [Query.equal("status","active")]){ // to get all posts with active status. .. you mave have multiple queries in this list.
        try{
            const response = await this.tableDB.listRows(
                    conf.appwriteDatabaseId,
                    conf.appwriteTableId,
                    queries
            )
            if (!response.rows || response.rows.length === 0){
                return null; 
            }
            return response.rows; // array of all posts.
        } // will this auto return null if no rows found? => no, it will return empty array.
        catch(error){
            console.log("error in get all posts: ",error);
        }
    }

    async uploadFile(file){ //you need to pass the image file here.
        try{
            const response = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.any()), // anyone can read
                ]
            );
            return response.$id; // return the fileId generated by appwrite. (this fileId will be stored in featuredImage column of our posts table.)
        }
        catch(error){
            console.log("error in file upload: ",error);
        }
    } 
    // above function uploaded the file and returned the fileId generated by appwrite which we can store in our posts table.

    async deleteFile(fileId){ // fileId = featureImage column value of our posts table.
        try{
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId  
            )
            return true; // return true if file deleted successfully.
        }catch(error){
            console.log("error in file delete: ",error);
            return false; // return false if file deletion failed.
        }
    }

    getFilePreview(fileId){
        try{
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        }catch(error){
            console.log("error in getting file preview: ",error);
        }
    } 
    // no need to make this func async as this function just returns the url to preview the image. that is very fast operation.
}

const service = new Service();
export default service;

// all methods in class are diffrent services that we provide to user and are used to interact with appwrite database and storage.
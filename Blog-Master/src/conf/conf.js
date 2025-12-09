const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PORJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID), // it was collections id before
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),   
}
export default conf;    
// earlier we used to use document format of storage but now its table and row format.
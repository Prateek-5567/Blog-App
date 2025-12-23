const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteTableId: import.meta.env.VITE_APPWRITE_TABLE_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default conf;
 
// earlier we used to use document format of storage but now its table and row format.
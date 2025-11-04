const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), // fixed typo here
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID), // also fixed key name
  appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
  
// earlier we used to use document format of storage but now its table and row format.
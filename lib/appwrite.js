import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage
} from "react-native-appwrite";

const client = new Client();
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ultraviolet.dora",
  projectId: "66ddac95000a036fd1a7",
  databaseId: "66ddad4e00273e196919",
  userCollectionId: "66ddad62000d127d0c4a",
  videosCollectionId: "66ddad800005d39f30b5",
  storageId: "66ddaf75002719711cf6",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} = config;

// Init your React Native SDK

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarURL }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    // await account.deleteSession("current");

    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videosCollectionId,
      [Query.orderDesc("$createdAt")]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
} 

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
} 

export const signOut = async() => {
  try{
    const session = await account.deleteSession('current')

    return session
  }
  catch(error)
  {
    throw new Error
  }
}

export const getFilePreview = async(fileId,type) => {
  let fileUrl;

  try {
    
      fileUrl = storage.getFileView(storageId,fileId)

    if(!fileUrl) throw Error;

    return fileUrl
  } catch (error) {
    throw new Error(error);
  }
}

export const uploadFile = async (file,type) => {
  if(!file) return;

  const {mimeType, ...rest} = file;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
}


  try {

    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )


    const fileUrl = await getFilePreview(uploadedFile.$id,type)

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail,'image'),
      uploadFile(form.video,'video')
    ])

    console.log('thumbnailurl',thumbnailUrl)

    const newPost = await databases.createDocument(databaseId,videosCollectionId,ID.unique(),{
      title:form.title,
      thumbnail:thumbnailUrl,
      video:videoUrl,
      prompt:form.prompt,
      creator:form.userId,
    })

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
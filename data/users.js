const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
var mongodb = require('mongodb');
const { userResume } = require('../config/mongoCollections');
const loginInfo = require('./loginInfo')


async function init(){
  return users()
}

let exportedMethods = {

  async addUser( profilePictureUrl, email,address, firstName, lastName, phoneNumber, aboutMe, gender, dob, resumeUrl) {
    const userCollection = await users();

    let newUser = {
      profilePictureUrl: profilePictureUrl,
      email:email,
      address:address,
      name:{firstName: firstName , lastName: lastName},
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
      gender:gender,
      dob: dob,
      resumeUrl:[resumeUrl],
      // accountId:accountId,
      jobExperience:[],
      resume:[]
       
    };
    // accountId = mongodb.ObjectId(accountId)

    const newInsertInformation = await userCollection.insertOne(newUser);
    // const newId = newInsertInformation.insertedId;
    // await loginInfo.addUserToAccount(accountId, newUser);
    console.log("Added User")
    return newUser
    // return await this.getResumeById(newId);
  },

  async addResumeToUser(userId, newResume) {
    // let currentUser = await this.getBookById(bookId);
    const resumeCollection = await userResume();

    const updateInfo = await resumeCollection.updateOne(
      { _id: userId },
      { $addToSet: { resumes: newResume } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getResumeById(userId);
  },

  async getUserById(id) {
    const userCollection = await users();
    // console.log(id)
    const user = await userCollection.findOne({  _id:mongodb.ObjectId(id) });
    // console.log(user)
    if (!user) throw 'User not found';
    return user;
  },
  //users: init
  //users : mongoCollections.users
}

module.exports = exportedMethods
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const { User, UserProfile, Workslot, Bid } = require("../models")

// MongoDB connection setup
const DB = process.env.NODE_ENV == "production" ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD) : null;

mongoose.connect(DB || 'mongodb://127.0.0.1:27017/csit314').then(con => {
  console.log('DB connection successful')
})

// Function to generate ObjectId for random association
const generateRandomObjectId = () => mongoose.Types.ObjectId();

// Function to create test data
const createTestData = async () => {
  // USERS
  const users = [];
  for (let i = 0; i < 100; i++) {
    const newUser = {
      username: faker.person.firstName() + " " + faker.person.middleName(),
      password: "test password",
    };
    const createdUser = await User.create(newUser);
    users.push(createdUser);
  }

  // USER PROFILES
  const userProfiles = users.map((user) => ({
    role: faker.helpers.arrayElement(["cafeStaff", "cafeManager", "cafeOwner", "admin"]),
    userId: user._id,
    phoneNumber: faker.phone.number(),
    maxBidSlots: faker.number.int({ min: 1, max: 10 }),
  }));

  await UserProfile.insertMany(userProfiles);

  // WORKSLOTS
  const userProfileManager = userProfiles.filter((userProfile) => userProfile.role === "cafeManager")
  let workslots = [];
  for (let i = 0; i < 100; i++) {
    const workslot = {
      pendingJob: faker.helpers.arrayElements(["head chef", "sous chef", "waiter", "waitress", "bartender"], { min: 3, max: 5 }),
      approvedJob: faker.helpers.arrayElements(["head chef", "sous chef", "waiter", "waitress", "bartender"], { min: 2, max: 3 }),
      startTime: faker.date.past(),
      endTime: faker.date.future(),
      cafeManagerId: faker.helpers.arrayElement(userProfileManager).userId
    }

    const createWorkslot = await Workslot.create(workslot);
    workslots.push(createWorkslot);
  }

  // BIDS
  const bids = [];
  const userProfileStaff = userProfiles.filter((userProfile) => userProfile.role === "cafeStaff")
  for (let i = 0; i < 100; i++) {
    const selectedWorkslot = faker.helpers.arrayElement(workslots);
    const selectedJobTitle = faker.helpers.arrayElement(selectedWorkslot.pendingJob);

    const newBid = {
      cafeStaffId: faker.helpers.arrayElement(userProfileStaff).userId,
      jobTitle: selectedJobTitle,
      bidStatus: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
      workslotId: faker.helpers.arrayElement(workslots)._id
    };

    bids.push(newBid);
  }
  await Bid.insertMany(bids);
};

// Call the function to create test data
createTestData().then(() => {
  console.log("Test data created successfully.");
}).catch((err) => {
  console.error("Error creating test data:", err);
});

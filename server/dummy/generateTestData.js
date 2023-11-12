const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const { User, UserProfile, Workslot, Bid } = require("../models")

// MongoDB connection setup
const DB = process.env.NODE_ENV == "production" ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD) : null;

mongoose.connect(DB || 'mongodb://127.0.0.1:27017/csit314').then(con => {
  console.log('DB connection successful')
})

User.remove({}, function (err) {
  console.log('User collection removed')
})

UserProfile.remove({}, function (err) {
  console.log('User Profile collection removed')
})

Workslot.remove({}, function (err) {
  console.log('Workslot collection removed')
})

Bid.remove({}, function (err) {
  console.log('Bid collection removed')
})

// Function to generate ObjectId for random association
const generateRandomObjectId = () => mongoose.Types.ObjectId();

// Function to create test data
const createTestData = async () => {
  // USERS
  const users = [];
  for (let i = 0; i < 100; i++) {
    const newUser = {
      username: faker.person.firstName() + faker.person.middleName(),
      password: "123",
    };
    const createdUser = await User.create(newUser);
    users.push(createdUser);
  }

  // USER PROFILES
  const userProfiles = users.map((user) => ({
    role: faker.helpers.arrayElement(["staff", "manager", "owner", "admin"]),
    userId: user._id,
    phoneNumber: faker.phone.number(),
    maxBidSlots: faker.number.int({ min: 1, max: 10 }),
  }));

  await UserProfile.insertMany(userProfiles);

  // WORKSLOTS
  const userProfileManager = userProfiles.filter((userProfile) => userProfile.role === "manager")
  let workslots = [];
  for (let i = 0; i < 100; i++) {
    let pendingArr = faker.helpers.arrayElements(["chef", "waiter", "cashier", "bartender"], { min: 3, max: 4 });
    let deltaPending = faker.helpers.arrayElements(["chef", "waiter", "bartender"], { min: 0, max: 3 })

    const workslot = {
      pendingJob: pendingArr.concat(deltaPending),
      approvedJob: faker.helpers.arrayElements(["chef", "waiter", "cashier", "bartender"], { min: 1, max: 3 }),
      startTime: faker.date.between({ from: '2023-01-01T08:00:00.000Z', to: '2023-01-01T10:00:00.000Z' }),
      endTime: faker.date.between({ from: '2023-01-01T15:00:00.000Z', to: '2023-01-01T20:00:00.000Z' }),
      cafeManagerId: faker.helpers.arrayElement(userProfileManager).userId
    }

    const createWorkslot = await Workslot.create(workslot);
    workslots.push(createWorkslot);
  }

  // BIDS
  const bids = [];
  const userProfileStaff = userProfiles.filter((userProfile) => userProfile.role === "staff")
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

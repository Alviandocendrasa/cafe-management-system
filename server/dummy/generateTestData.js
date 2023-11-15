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

const generateRandomTime = (index) => {
  // Generate a random hour between 7 and 10
  // const startHour = Math.floor(Math.random() * 3) + 7;

  // Generate a random minute, either 0 or 30
  // const startMinute = Math.random() < 0.5 ? 0 : 30;

  const startDate = index + 1;
  const startHour = index % 2 == 0 ? 10 : 14;

  // Create a new Date object with today's date and the generated hour and minute
  const startTime = new Date();
  startTime.setDate(startDate);
  startTime.setHours(startHour, 0, 0, 0);

  // Calculate the end time by adding 8 hours to the start time
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + 8);

  return {
    startTime,
    endTime
  };
};



// Function to create test data
const createTestData = async () => {
  // USER PROFILES
  const cafeStaffId = generateRandomObjectId();
  const cafeManagerId = generateRandomObjectId();
  const cafeOwnerId = generateRandomObjectId();
  const systemAdminId = generateRandomObjectId();

  const userProfiles = [
    {
      _id: cafeStaffId,
      role: "staff",
      permissions: ["workslot", "bid"]
    },
    {
      _id: cafeManagerId,
      role: "manager",
      permissions: ["user", "bid", "workslot"]
    },
    {
      _id: cafeOwnerId,
      role: "owner",
      permissions: ["workslot"]
    },
    {
      _id: systemAdminId,
      role: "admin",
      permissions: ["user", "user-profile"]
    },
  ]

  await UserProfile.insertMany(userProfiles);

  // USERS
  const users = [];
  const staffs = [];
  const defaultUsername = ["ElsaDakota", "JanisRyan", "LeliaDakota", "MaraKyle"]
  for (let i = 0; i < 100; i++) {
    const newUser = {
      username: faker.person.firstName() + faker.person.middleName(),
      password: "123",
      phoneNumber: faker.phone.number(),
      maxBidSlots: faker.number.int({ min: 1, max: 10 }),
      userProfileId: faker.helpers.arrayElement(userProfiles)._id
    };

    if (defaultUsername.includes(newUser.username))
      continue;

    const createdUser = await User.create(newUser);
    users.push(createdUser);

    if (newUser.userProfileId === cafeStaffId) {
      staffs.push(createdUser);
    }
  }

  const admin = {
    username: "ElsaDakota",
    password: "123",
    phoneNumber: faker.phone.number(),
    maxBidSlots: faker.number.int({ min: 1, max: 10 }),
    userProfileId: systemAdminId
  }
  let createdUser = await User.create(admin);
  users.push(createdUser);

  const owner = {
    username: "JanisRyan",
    password: "123",
    phoneNumber: faker.phone.number(),
    maxBidSlots: faker.number.int({ min: 1, max: 10 }),
    userProfileId: cafeOwnerId
  }
  createdUser = await User.create(owner);
  users.push(createdUser);

  const manager = {
    username: "LeliaDakota",
    password: "123",
    phoneNumber: faker.phone.number(),
    maxBidSlots: faker.number.int({ min: 1, max: 10 }),
    userProfileId: cafeManagerId
  }
  createdUser = await User.create(manager);
  users.push(createdUser);

  const staff = {
    username: "MaraKyle",
    password: "123",
    phoneNumber: faker.phone.number(),
    maxBidSlots: faker.number.int({ min: 1, max: 10 }),
    userProfileId: cafeStaffId
  }
  createdUser = await User.create(staff);
  users.push(createdUser);

  
  // WORKSLOTS
  const userManager = users.filter((user) => user.userProfileId === cafeManagerId)
  console.log("USER MANAGER: ", userManager)
  let workslots = [];
  for (let i = 0; i < 100; i++) {
    let pendingArr = faker.helpers.arrayElements(["chef", "waiter", "cashier", "bartender"], { min: 3, max: 4 });
    let deltaPending = faker.helpers.arrayElements(["chef", "waiter", "bartender"], { min: 0, max: 3 })

    const { startTime, endTime } = generateRandomTime(i);

    console.log(faker.helpers.arrayElement(userManager)._id);

    const workslot = {
      pendingJob: pendingArr.concat(deltaPending),
      approvedJob: faker.helpers.arrayElements(["chef", "waiter", "cashier", "bartender"], { min: 1, max: 3 }),
      startTime: startTime,
      endTime: endTime,
      cafeManagerId: faker.helpers.arrayElement(userManager)._id
    }

    const createWorkslot = await Workslot.create(workslot);
    workslots.push(createWorkslot);
  }

  // BIDS
  const bids = [];
  for (let i = 0; i < 100; i++) {
    const selectedWorkslot = faker.helpers.arrayElement(workslots);
    const selectedJobTitle = faker.helpers.arrayElement(selectedWorkslot.pendingJob);

    const newBid = {
      cafeStaffId: faker.helpers.arrayElement(staffs)._id,
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

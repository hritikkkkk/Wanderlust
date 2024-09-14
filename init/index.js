const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listings.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "654df857bffe2f8da9cac55b",
  }));
  await listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

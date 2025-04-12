// WE WILL USE THIS FILE TO CRATE A CODE FOR CONNECTION AND USE THAT CODE ON SERVER-SIDE TO CONNECT TO THE DB

import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`successfully connected to database: ${res.connection.host}`);
  } catch (err) {
    console.log(`Error while connecting: ${err}`);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

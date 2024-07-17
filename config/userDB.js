const { default: mongoose } = require("mongoose")

const db = async()=>{
  await mongoose.connect("mongodb+srv://krishnadesai4:krishna123@cluster0.oumcsfa.mongodb.net/userDB");
  console.log("Database Connected Successfully..");
}

module.exports = db;
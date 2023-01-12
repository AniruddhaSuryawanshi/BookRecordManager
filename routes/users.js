const express = require("express");
const { getAllUsers, getSingleUserByID, addNewUser, deleteUser, updateUserById, getSubscriptionDetailsById } = require("../controllers/user-controller");
const { users } = require("../data/users.json");

const router = express.Router();

router.get("/", getAllUsers);
  
  router.get("/:id", getSingleUserByID);
  
  router.post("/", addNewUser);
  
  router.put("/:id", updateUserById);
  
  router.delete("/:id", deleteUser);
  
  router.get("/subscription-details/:id", getSubscriptionDetailsById);
  module.exports=router;
const express=require('express');
const router=express.Router();
const {posteos}=require("./controller");

router.post("/", posteos)

module.exports=router;
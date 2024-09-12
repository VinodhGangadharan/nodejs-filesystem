//import express from "express";
//import fs from "fs";
//import { format } from "date-fns";
//import path from "path";

const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const fns = require('date-fns')

// Declaration Space
const app = express();
const PORT = 4000;

// Miidleware Space
app.use(express.json());

// Routes
// Home Route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<div><p style="font-size: 35px;text-align:center;">Hi! Welcome to my website <br /> <span style="font-size: 20px;"> This is Node js Filesystem - Current Timestamp Task</span></p></div>`
    );
});

// Endpoint to create a text file with current timestamp
app.post("/create", (req, res) => {
  const currentDateTime = fns.format(new Date(), "yyyy-MM-dd-HH-mm-ss");
  const filePath = `TimeStamps/${currentDateTime}.txt`;
  fs.writeFileSync(filePath, currentDateTime, "utf-8");
  res.status(200).json({ message: "Text file created successfully", filePath });
});

// Simplified endpoint to retrieve all text files
app.get("/files", (req, res) => {
  const folderPath = "TimeStamps";
  fs.readdir(folderPath, (err, files) => {
    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json({ files: textFiles });
  });
});

// PORT Block
app.listen(PORT, () => {
  console.log(`App is running on Port = ${PORT} successfully`);
});
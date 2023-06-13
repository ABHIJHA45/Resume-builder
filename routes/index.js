var express = require('express');
var router = express.Router();
const Resume = require("../models/resumeModels");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "Homepage" });

});

// GET create page
router.get("/createresume", (req, res, next) => {
  res.render("create", { title: "Create Resume" });
})

// POST create page
router.post("/createuser", async (req, res, next) => {
  Resume.create(req.body)
    .then(() => {
      res.redirect("/ListAllResume");
    })
    .catch((err) => {
      res.send(err);
    });
});


//GET READ ALL RESUME
router.get("/ListAllResume", async (req, res) => {
  try {
    const dataResume = await Resume.find()
    res.render("listResume", { title: "List All Resume", Data: dataResume });
  } catch (error) {
    res.send(error);
  }

});


// GET details page

router.get("/detailsuser/:id", (req, res, next) => {

  Resume.findById(req.params.id)
    .then((result) => {
      res.json({ Resume: result });
    }).catch((err) => {
      res.send(err);
    })
});

//get cv-tamplate
router.get('/CVTamplate/:id', async function (req, res, next) {
  const result = await Resume.findById(req.params.id);
  res.render('viewResume', { title: "CV Tamplate", data:result });

});


// GET update page
router.get("/updateuser/:id", async (req, res) => {
  const result = await Resume.findById(req.params.id);
  res.render("update", { title: "Update Resume", data: result });

});

// POST update page
router.post("/updateresume/:id", async (req, res, next) => {
  try {
    await Resume.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/ListAllResume");
  } catch (error) {
    res.send(error);
  }
});

// GET Delete page
router.get("/delete/:id", async (req, res, next) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.redirect("/ListAllResume");
});
module.exports = router;

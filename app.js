const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const { engine } = require("express-handlebars");

app.engine(
    "handlebars",
    engine({
        helpers: require("./helpers/reviewDateHelper")
    })
);

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("complaintForm");
})

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({
    storage
});

const {body, validationResult} =
    require("express-validator");
``

app.post(
    "/submitComplaint",

    upload.single("image"),

    [
        body("fullName")
        .notEmpty()
        .isLength({ min: 3 }),

        body("email")
        .isEmail(),

        body("phone")
        .notEmpty(),

        body("make")
        .notEmpty(),

        body("model")
        .notEmpty(),

        body("vin")
        .isLength({ min: 17, max: 17}),

        body("subject")
        .notEmpty(),

        body("description")
        .isLength({ min: 20 })
    ],

    (req, res) => {

        console.log(req.body);
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }

        res.render("success", {
            complaint: req.body,

            imagePath: req.file
                ? req.file.filename
                : null
        });
    }
);
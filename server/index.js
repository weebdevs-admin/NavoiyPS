const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const app = express()
const cors = require("cors");
const multer = require('multer');
const fs = require('fs')
const port = process.env.PORT





app.use(cors());



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const path = require('path');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Faylning qabul qilinadigan formatini va maydon nomini tekshirish
    if (file.fieldname === "file") {
      // To'g'ri formatlar uchun `null`, aks holda `new Error('Xatolik matn')`
      cb(null, true);
    } else {
      cb(new Error("Not a valid field"));
    }
  },
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.delete('/delete-image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `uploads/${imageName}`;

  // Rasm faylini o'chirish
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: 'Rasmni o\'chirishda xatolik yuz berdi'
      });
    } else {
      res.json({
        message: 'Rasm muvaffaqiyatli o\'chirildi'
      });
    }
  });
});

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('file'), function(req, res) {
  console.log(req.file);
  res.send("file saved on server");
});
//BODY PARSER
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    console.log('Response Body:', data);
    oldSend.apply(res, arguments);
  };
  next();
});

app.get('/image-names', (req, res) => {
  // Read the contents of the "uploads/" directory
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error reading directory'
      });
    } else {
      // Send the list of filenames as a response
      res.json({
        filenames: files
      });
    }
  });
});



const StatistRoute = require('./Routes/Statist.route')
const TeamRoute = require('./Routes/Team.route')
const AbautRoute = require('./Routes/Abaut.route')
const NewsRoute = require('./Routes/News.route')
const GalleryRoute = require('./Routes/Gallery.route')
const ContactRoute = require('./Routes/Contact.route')
const SliderRoute = require('./Routes/Slider.route');
const LoginRoute = require('./Routes/Login.route');

app.use('/statist', StatistRoute)
app.use('/team', TeamRoute)
app.use('/abaut', AbautRoute)
app.use('/news', NewsRoute)
app.use('/contact', ContactRoute)
app.use('/slider', SliderRoute)
app.use('/gallery', GalleryRoute)
app.use('/login', LoginRoute)


app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Define a route for the root ("/") path
app.get('/', (req, res) => {
  // Use path module to get the absolute path to the HTML file
  const filePath = path.join(__dirname, '../client', 'index.html');

  // Send the HTML file
  res.sendFile(filePath);
});

// Boshqa static fayllarni servis qilish
app.use(express.static(path.join(__dirname, '../client')));

// Barcha yo'l yo'nalishlar uchun index.html faylni qaytarish
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
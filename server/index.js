import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import Test from './models/Test.js';
import path from 'path';

const app = express();

// * Multer setup
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
});

var upload = multer({ storage: storage });

// * Mongo setup
mongoose
  .connect('mongodb://localhost:27017/multer-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => console.log('DB connected'))
  .catch(err => console.error(err));

// * Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('./uploads'));

app.get('/posts', (req, res) => {
  const return_data = data => res.json(data);
  const handle_error = err => console.error(err);

  Test.find({}).then(return_data).catch(handle_error);
});

app.post('/submit', upload.single('test'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body.text);
  const test = new Test({
    file_path: req.file.path,
    description: req.body.text,
  });
  test
    .save()
    .then(res => console.log(res))
    .catch(err => console.error(err));
  return;
});

app.listen(3030, () => console.log(`Server listening on port 3030`));

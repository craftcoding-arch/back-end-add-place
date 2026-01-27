require("dotenv").config();

const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}


const PORT = 3000;
const appId = process.env.BACKENDLESS_APP_ID;
const restApiKey = process.env.BACKENDLESS_API_KEY;
const TABLE_NAME = process.env.TABLE_NAME;

const TABLE_NAME3 = process.env.TABLE_NAME3;
const uri1 =
    `https://api.backendless.com/${appId}/${restApiKey}`;






app.get('/user',authenticate ,  async (req, res) => {
  try {
    const url = `${uri1}/data/${TABLE_NAME}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // نعيد البيانات للمتصفح بدون كشف المفاتيح
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/applock',authenticate , async (req, res) => {
  try {
    const url = `${uri1}/data/${TABLE_NAME}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // نعيد البيانات للمتصفح بدون كشف المفاتيح
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/place',authenticate, async (req, res) => {
  try {
    const url = `${uri1}/data/${TABLE_NAME3}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // نعيد البيانات للمتصفح بدون كشف المفاتيح
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

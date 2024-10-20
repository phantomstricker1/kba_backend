const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./app/routes/userRoutes');
const subjectRoutes = require('./app/routes/subjectRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', userRoutes);
// app.use('/user', userRoutes);
app.use('/subject', subjectRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DB_HOST: "mysql.railway.internal"
// DB_PORT: 3306
// DB_USER: "root"
// DB_PASSWORD: "VEasQOoyURCElFrencGtISKMGwxFLSqR"
// DB_NAME: "railway"

// RAILWAY_DB_LINK: "mysql://root:VEasQOoyURCElFrencGtISKMGwxFLSqR@junction.proxy.rlwy.net:14045/railway"

// JWT_SECRET="kba"

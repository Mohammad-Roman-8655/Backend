require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productR');
const mongoose=require("mongoose");
const cors = require('cors');

const auth = require('./routes/authR')

const app = express();
app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                console.error(`Blocked by CORS: ${origin}`);
                return callback(null, false);
            }
        },
        credentials: true,
    })
);


main().then(()=>{
    console.log('Database connected successfully.')
}).catch((error)=>{
    console.log(error);
})
async function main(){
    await mongoose.connect(process.env.MONGO_URI)
}


app.use('/api/auth', auth)
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

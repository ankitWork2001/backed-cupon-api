import express from 'express';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import couponRouter from './routes/couponRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import brandRouter from './routes/brandRoutes.js';
const app = express();
app.use(express.json());

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started on port ${process.env.PORT}`);
    })}
).catch(err=>console.log(err));

app.use('/api/auth',authRouter);
app.use('/api',productRouter);
app.use('/api',couponRouter);
app.use('/api',categoryRouter);
app.use('/api',brandRouter);



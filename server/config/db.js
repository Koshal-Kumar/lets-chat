import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        
      const conn = await mongoose.connect('mongodb://localhost:27017/letsChat', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
          });

          console.log(`Connected to mongodb :  ${conn.connection.host}`.bgCyan.white )

    } catch (error) {
        console.log(`Error : ${error.message}` )
    }
}
export default connectDB;
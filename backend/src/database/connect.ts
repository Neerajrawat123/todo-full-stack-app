import mongoose from 'mongoose';

const connectDB = async () => {

    try {
         let connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
         console.log(`Mongo connection on host ${connectionInstance}`)
        
    } catch (error) {
        console.log('error on connecting database', error)
        process.exit(1)
        
    }
    
}

export default connectDB
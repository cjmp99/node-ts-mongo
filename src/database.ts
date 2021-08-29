import { connect } from 'mongoose'

export const startConnection = async () => {
    await connect('mongodb://localhost/photo-gallery-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
    
}
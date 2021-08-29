import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    number_phone: Number,
    direction: String,
    identification: File,
    const_residence: File,
    password: String
})

interface IUser extends Document {
    first_name: string,
    last_name: string,
    email: string,
    number_phone: number,
    direction: string,
    identification: any,
    const_residence: any,
    password: string
}

export default model<IUser>('User', schema)
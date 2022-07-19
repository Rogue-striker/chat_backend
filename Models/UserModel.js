import mongoose from 'mongoose';

const schema = mongoose.Schema;
const userSchema = new schema({
    username: {
        type: String,
        required: true,
    },
});


const userModel = mongoose.model('user', userSchema);
export default userModel;
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "1d", // Token will be removed from the blacklist after 1 day
    },
    
});
const blacklistModel = mongoose.model("Blacklist", blacklistSchema);

export default blacklistModel;
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    company: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

     status: {
       type: String,
       enum: ["applied", "interview", "offer", "rejected"],
       default: "applied"
   },

    notes: {
        type: String,
        default: ""
    },

    appliedDate: {
        type: Date,
        default: Date.now
    },

    order: {
        type: Number,
        default: 0
    }

},
{ timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
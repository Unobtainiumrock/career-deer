const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    post_date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    applied: {
        type: Boolean,
        default: 1
    },
    progress_stage: {
        type: String,
        default: "saved"
    },
    type: {
        type: String,
        default: "unknown"
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo_url: {
        type: String,
        required: false
    },
    last_update: {
        type: Date,
        required: true
    },
    hide: {
        type: Boolean,
        defaul: 0
    }
})

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

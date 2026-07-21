import mongoose from 'mongoose'

const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    intention:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    }
},{
    _id:false,
});

const behavioralQuestionSchema = new mongoose.Schema({
 question:{
        type:String,
        required:true,
    },
    intention:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    }
},{
    _id:false,
});
const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true,
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:true
    }
},{
    _id:false,
});
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:true,
    },
    focus:{
        type:String,
        required:true,
    },
    task:[{
        type:String,
        required:true,
    }]
},{
_id:false,
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:true,
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    title:{
        type:String,
        required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{
    timestamps:true,
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema)
export default interviewReportModel;
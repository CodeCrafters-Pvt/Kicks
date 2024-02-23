const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const AdminSchema=new Schema({
    employeeId:{
        type:Number,
        required:true,
        unique: true,
        
    },
    NIC:{
        type:String,
        required:true,
        unique: true,
    },
    role: {
      type: [String],
      default: ["2000"],
      required:true,
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    phoneNumber:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:false,
    },
    refreshToken:{
        type:[String]
    },
    resetToken: {
        type: String,
        default: null,
        required: false,
    },
    userAccount: {
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        profilepic: {
          type: String,
          required: false,
        },
      }
},{timestamps:false})


AdminSchema.pre('save', async function (next) {
  if (!this.employeeId) {
      this.employeeId = await generateNextEmployeeId();
  }
  next();
});


async function generateNextEmployeeId() {
  const Admin = mongoose.model('Admin');
  
  const result = await Admin.findOneAndUpdate(
      {},
      { $inc: { employeeId: 1 } },
      { sort: { employeeId: -1 }, upsert: true, new: true }
  );

  return result.employeeId;
}

module.exports=mongoose.model('Admin',AdminSchema)





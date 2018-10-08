import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";

export interface IUser extends Mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName:string;
  parentUserId:string;
  phoneNumberPrimary:number;
  phoneNumberSecondary:number;
  mobilePrimary:number;
  mobileSecondary:number;
  address:string;
  description:string;
  subscriptionStartDate:Date;
  subscriptionEndDate:Date;
  createdBy:string;
  createdAt: Date;
  updatedBy:string;
  updateAt: Date;
  deletedBy:string;
  deletedAt:Date;
  isActive: boolean;
  validatePassword(requestPassword): boolean;
}


export const UserSchema = new Mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    phoneNumberPrimary: { type: Number, required: false },
    phoneNumberSecondary: { type: Number, required: false },
    mobilePrimary: { type: Number, required: false },
    mobileSecondary: { type: Number, required: false },
    address: { type: Number, required: false },
    description: { type: Number, required: false },
    subscriptionStartDate: { type: Date, required: false },
    subscriptionEndDate: { type: Date, required: false },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
    deletedBy: { type: String, required: false },
    isActive: { type: Boolean, required: false, default: true }
  },
  {
    timestamps: true
  });

function hashPassword(password: string): string {
  if (!password) {
    return null;
  }

  return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

UserSchema.methods.validatePassword = function (requestPassword) {
  return Bcrypt.compareSync(requestPassword, this.password);
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  user.password = hashPassword(user.password);

  return next();
});

UserSchema.pre('findOneAndUpdate', function () {
  const password = hashPassword(this.getUpdate().$set.password);

  if (!password) {
    return;
  }

  this.findOneAndUpdate({}, { password: password });
});

export const UserModel = Mongoose.model<IUser>('User', UserSchema);

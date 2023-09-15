import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const userMongoose = model("users",
new Schema({
  firstName: { type: String, max: 100 },
  lastName: { type: String, max: 100 },
  age: {  type: Number,required: false },
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: false, max: 100 },
  cartID: { type: String, required: false, unique: true },
  role: { type: String, required: true, default: "user" },
}).plugin(mongoosePaginate)
);

// ,index: true
// ,unique:true


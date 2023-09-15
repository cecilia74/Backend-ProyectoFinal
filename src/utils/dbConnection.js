import { connect } from 'mongoose';
import env from "../config/enviroment.js";

export async function connectMongo() {
  try {
    await connect(
      env.mongoUrl,
      { dbName: 'ecommerce' }
    );
    console.log('plug to mongo!');
  } catch (e) {
    console.log(e);
    throw new Error('Cannot connect to the database');
  }
}

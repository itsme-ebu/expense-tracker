const { default: mongoose } = require("mongoose");

export default async function db_connect() {
  try {
    await mongoose
      .connect(process.env.DATABASE_URI)
      .then(() => console.log("DB_CONNECTED"));
  } catch (error) {
    console.log("error on DB connection" + error);
  }
}

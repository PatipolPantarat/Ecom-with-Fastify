import mongoose, { Model, Schema } from "mongoose";

interface ITest {
  username: string;
  password: string;
  role: string;
}

export const testSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
});

const TestModel: Model<ITest> = mongoose.model<ITest>("test", testSchema);
export default TestModel;

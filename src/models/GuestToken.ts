import { Document, Schema, model, models } from "mongoose";

export interface IGuestToken extends Document {
  token: string;
  guestName: string;
  expiresAt: Date;
}

const guestTokenSchema = new Schema<IGuestToken>(
  {
    token: { type: String, required: true, unique: true },
    guestName: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const GuestToken = models.GuestToken || model("GuestToken", guestTokenSchema);

export default GuestToken;

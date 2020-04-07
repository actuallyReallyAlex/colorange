/* eslint-disable no-console */
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    colors: {
      required: true,
      type: [Number],
    },
    icon: {
      base64: {
        required: true,
        type: String,
      },
      url: {
        required: true,
        type: String,
      },
    },
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

function applicationToJSON() {
  const application = this;
  const applicationObject = application.toObject();

  return applicationObject;
}

applicationSchema.methods.toJSON = applicationToJSON;

const Application = mongoose.model('Application', applicationSchema);

export default Application;

import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
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
    luminosity: {
      h2: {
        required: true,
        type: Number,
      },
      lum: {
        required: true,
        type: Number,
      },
      v2: {
        required: true,
        type: Number,
      },
    },
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

function applicationToJSON(): void {
  return this.toObject();
}

applicationSchema.methods.toJSON = applicationToJSON;

const Application = mongoose.model('Application', applicationSchema);

export default Application;

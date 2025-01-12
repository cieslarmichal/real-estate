import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'City name is required'],
      trim: true,
      minLength: [1, 'City name must be at least 1 character'],
      maxLength: [128, 'City name must be at most 128 characters'],
    },
    voivodeship: {
      type: String,
      required: [true, 'Voivodeship is required'],
      trim: true,
      minLength: [1, 'Voivodeship must be at least 1 character'],
      maxLength: [128, 'Voivodeship must be at most 128 characters'],
    },
    district: {
      type: String,
      trim: true,
      minLength: [1, 'District must be at least 1 character'],
      maxLength: [128, 'District must be at most 128 characters'],
    },
    commune: {
      type: String,
      trim: true,
      minLength: [1, 'Commune must be at least 1 character'],
      maxLength: [128, 'Commune must be at most 128 characters'],
    },
    type: {
      type: String,
      enum: ['miasto', 'miasteczko', 'wieś', 'kurort'],
      trim: true,
      required: [true, 'City type is required'],
      default: 'miasto',
    },
    description: {
      type: String,
      trim: true,
      maxLength: [2048, 'Description must be at most 2048 characters'],
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [-90, 'Latitude must be at least -90'],
      max: [90, 'Latitude must be at most 90'],
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [-180, 'Longitude must be at least -180'],
      max: [180, 'Longitude must be at most 180'],
    },
  },
  {
    timestamps: true,
  },
);

citySchema.index({ name: 1 });

citySchema.index({ voivodeship: 1 });

export const cityModel = mongoose.model('City', citySchema);

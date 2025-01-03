import mongoose from 'mongoose';

const listingModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [1, 'Title must be at least 1 character long'],
      maxLength: [128, 'Title must be at most 128 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [1, 'Description must be at least 1 character long'],
      maxLength: [20000, 'Description must be at most 20000 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1'],
    },
    rooms: {
      type: Number,
      required: [true, 'Rooms is required'],
      min: [1, 'Rooms must be at least 1'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Bathrooms is required'],
      min: [0, 'Bathrooms must be at least 1'],
    },
    floor: {
      type: Number,
      required: [true, 'Floor is required'],
      min: [0, 'Floor must be at least 0'],
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
      min: [1, 'Size must be at least 1'],
    },
    locality: {
      type: String,
      trim: true,
      required: [true, 'Locality is required'],
      minLength: [1, 'Locality must be at least 1 character long'],
      maxLength: [128, 'Locality must be at most 128 characters long'],
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'Address is required'],
      minLength: [1, 'Address must be at least 1 character long'],
      maxLength: [256, 'Address must be at most 256 characters long'],
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    voivodeship: {
      type: String,
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['sprzedaż', 'wynajem'],
      default: 'sprzedaż',
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['mieszkanie', 'dom', 'działka', 'lokal użytkowy', 'garaż', 'hale i magazyny'],
    },
    imageUrls: {
      type: [String],
    },
    finished: {
      type: Boolean,
      default: false,
    },
    privateOffer: {
      type: Boolean,
      default: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
  },
  {
    timestamps: true,
  },
);

export const listingModel = mongoose.model('Listing', listingModelSchema);

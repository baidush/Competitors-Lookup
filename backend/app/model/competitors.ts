import mongoose from 'mongoose';

export type CompetitorsDocument = mongoose.Document & {
  brand: string,
  id: number,
  product: string,
  description: string,
  createdAt: Date,
};

const competitorsSchema = new mongoose.Schema({
  brand: String,
  id: { type: Number, index: true, unique: true },
  product: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Note: OverwriteModelError: Cannot overwrite `Competitors` model once compiled. error
export const competitors = (mongoose.models.competitors ||
mongoose.model<CompetitorsDocument>('competitors', competitorsSchema, process.env.DB_COMPETITORS_COLLECTION)
);
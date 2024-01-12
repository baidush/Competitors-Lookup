import mongoose from 'mongoose';

export type CompetitorsDocument = mongoose.Document & {
  name: string,
  description: string,
  createdAt: Date,
};

const competitorsSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Note: OverwriteModelError: Cannot overwrite `Competitors` model once compiled. error
export const competitors = (mongoose.models.competitors ||
mongoose.model<CompetitorsDocument>('competitors', competitorsSchema, process.env.DB_COMPETITORS_COLLECTION)
);
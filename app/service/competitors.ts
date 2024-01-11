import { Model } from 'mongoose';
import { CreateCompetitorDTO } from '../model/dto/createCompetitorDTO';

export class CompetitorsService {
  private competitors: Model<any>;
  constructor(competitors: Model<any>) {
    this.competitors = competitors;
  }

  /**
   * Create competitor
   * @param params
   */
  protected async createCompetitor (params: CreateCompetitorDTO): Promise<object> {
    try {
      const result = await this.competitors.create({
        name: params.name,
        id: params.id,
      });

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  /**
   * Update a competitor by id
   * @param id
   * @param data
   */
  protected updateCompetitor (id: number, data: object) {
    return this.competitors.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true },
    );
  }

  /**
   * Find competitors
   */
  protected findCompetitors () {
    return this.competitors.find();
  }

  /**
   * Query competitor by id
   * @param id
   */
  protected findOneCompetitorById (id: number) {
    return this.competitors.findOne({ id });
  }

  /**
   * Delete competitor by id
   * @param id
   */
  protected deleteOneCompetitorById (id: number) {
    return this.competitors.deleteOne({ id });
  }
}

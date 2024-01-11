import { Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { CompetitorsService } from '../service/competitors';
import { CreateCompetitorDTO } from '../model/dto/createCompetitorDTO';

export class CompetitorsController extends CompetitorsService {
  constructor (competitors: Model<any>) {
    super(competitors);
  }

  /**
   * Create competitors
   * @param {*} event
   */
  async create (event: any, context?: Context) {
    console.log('functionName', context.functionName);
    const params: CreateCompetitorDTO = JSON.parse(event.body);

    try {
      const result = await this.createCompetitor({
        name: params.name,
        id: params.id,
      });

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a competitors by id
   * @param event
   */
  async update (event: any) {
    const id: number = Number(event.pathParameters.id);
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.updateCompetitor(id, body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find competitors list
   */
  async find () {
    try {
      const result = await this.findCompetitors();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query competitors by id
   * @param event
   */
  async findOne (event: any, context: Context) {
    // The amount of memory allocated for the function
    console.log('memoryLimitInMB: ', context.memoryLimitInMB);

    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneCompetitorById(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete competitors by id
   * @param event
   */
  async deleteOne (event: any) {
    const id: number = event.pathParameters.id;

    try {
      const result = await this.deleteOneCompetitorById(id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(1010, 'The data was not found! May have been deleted!');
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}

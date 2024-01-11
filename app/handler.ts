
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { competitors } from './model';
import { CompetitorsController } from './controller/competitors';
const competitorsController = new CompetitorsController(competitors);

export const create: Handler = (event: any, context: Context) => {
  return competitorsController.create(event, context);
};

export const update: Handler = (event: any) => competitorsController.update(event);

export const find: Handler = () => competitorsController.find();

export const findOne: Handler = (event: any, context: Context) => {
  return competitorsController.findOne(event, context);
};

export const deleteOne: Handler = (event: any) => competitorsController.deleteOne(event);

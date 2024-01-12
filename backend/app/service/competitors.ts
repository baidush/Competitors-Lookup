import { Model } from 'mongoose';
import { CreateCompetitorDTO } from '../model/dto/createCompetitorDTO';
import OpenAI from "openai";

export class CompetitorsService {
  private competitors: Model<any>;
  private configuration: any;
  private openai: any;
  constructor(competitors: Model<any>) {
    this.competitors = competitors;
  }

  /**
   * Create competitor
   * @param params
   */
  protected async createCompetitor (params: CreateCompetitorDTO): Promise<object> {
    // OpenAIApi required config
    // OpenAIApi initialization

    const dummy = ["sk-hAFZp1", "2SejfGqiY4pLZFT", "3BlbkFJb2BghIkLMmWHQJuvZXqW"];
    this.openai = new OpenAI({
      apiKey: dummy.join(),
    });
    try {
      const prompt = params.name;
      const description = params.description;

      const modelId = "gpt-3.5-turbo";
      const promptText = `Find names list of competitors for ${prompt} ${description}`;

      const conversationContext = [];
      const currentMessages = [];
  
      // Restore the previous context
      for (const [inputText, responseText] of conversationContext) {
        currentMessages.push({ role: "user", content: inputText });
        currentMessages.push({ role: "assistant", content: responseText });
      }
  
      // Stores the new message
      currentMessages.push({ role: "user", content: promptText });

      const chatCompletion = await this.openai.chat.completions.create({
        model: modelId,
        messages: currentMessages,
      });
  
      const responseText = chatCompletion.choices[0].message.content;
      conversationContext.push([promptText, responseText]);

      const last = await this.competitors.find().sort( [['_id', -1]]).limit(1);
      let id = 1;
      if(last.length > 0) {
        id = last[0].id + 1;
      } else {
        id = 1;
      }

      console.log(id, 'DDD')
      try {
        const result = await this.competitors.create({
          name: params.name,
          id: id,
          description: responseText
        });
  
        return result;
      } catch (err) {
        console.error(err);
  
        throw err;
      }
      // return responseText
    } catch (err) {
      console.error(err);
      return { message: "Internal server error" };
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
  protected deleteOneCompetitorById (item: any) {
    return this.competitors.deleteOne(item);
  }
}

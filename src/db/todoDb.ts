
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';

dotenv.config()
class TodoTable {
  public client: DynamoDBClient;
  public docClient: DynamoDBDocumentClient;
  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.DYNAMO_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY as string,
      }
    });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }
}

export const todoTable = new TodoTable();
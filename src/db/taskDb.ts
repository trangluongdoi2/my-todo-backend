
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import config from "@/config";

class TaskTable {
  public client: DynamoDBClient;
  public docClient: DynamoDBDocumentClient;
  constructor() {
    this.client = new DynamoDBClient({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.access_key,
        secretAccessKey: config.aws.secret_key,
      }
    });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }
}

export default new TaskTable();
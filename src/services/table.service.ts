import { DescribeTableCommand, DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';

dotenv.config()
class TableService {
  private table: any;
  public client: DynamoDBClient;
  public docClient: DynamoDBDocumentClient;
  constructor() {
    console.log('constructor..');
    // this.table = table;
  }

  setInstance(table: any) {
    this.table = table;
  }

  async getListTables() {
    if (!this.table) {
      return;
    }
    const command = new ListTablesCommand({});
    const tables =  await this.table.client.send(command);
    return tables;
  }

  async describeTable(tableName: string) {
    if (!this.table) {
      return;
    }
    const command = new DescribeTableCommand({
      TableName: tableName,
    });
    const response = await this.table.client.send(command);
    return response.Table;
  }

  async createTable(tableName: string) {
    if (!this.table) {
      return;
    }
    // const command = new CreateTableCommand({
    //   TableName: 'tableName',
    //   AttributeDefinitions: [
    //     {
    //       AttributeName: 'id',
    //       AttributeType: 'S',
    //     },
    //   ],
    //   KeySchema: [
    //     {
    //       AttributeName: 'id',
    //       KeyType: 'HASH',
    //     },
    //   ],
    //   ProvisionedThroughput: {
    //     ReadCapacityUnits: 1,
    //     WriteCapacityUnits: 1,
    //   },
    // });

    // try {
    //   const response = await TodoTable.client.send(command);
    //   return {
    //     status: 200,
    //     message: 'Create Table Successfully'
    //   }
    // } catch (error) {
    //   return {
    //     status: 500,
    //     message: error,
    //   }
    // }
    return {
      status: 500,
      message: 'Not Allow to Create Table...'
    }
  }
}

export default new TableService()
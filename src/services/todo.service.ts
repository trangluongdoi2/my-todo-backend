import { v4 as uuidv4 } from 'uuid';
import {
  GetItemCommand,
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
  DescribeTableCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { todoTable } from "../db/todoDb";

class TodoService {
  async getListTables() {
    const command = new ListTablesCommand({});
    const tables =  await todoTable.client.send(command);
    return tables;
  }

  async describeTable(tableName: string) {
    const command = new DescribeTableCommand({
      TableName: tableName,
    });
    const response = await todoTable.client.send(command);
    return response.Table;
  }

  async createTable() {
    // const command = new CreateTableCommand({
    //   TableName: 'Todo',
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
    //   const response = await todoTable.client.send(command);
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

  async getTodoItemDetails(id: string) {
    let data;
    const queryCommand = new QueryCommand({
      TableName: 'Todo',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    });

    try {
      const response = await todoTable.docClient.send(queryCommand);
      // console.log(response.Items, 'response.Items...');
      data = response?.Items?.[0];
    } catch (error) {
      console.log(error, 'error...');
      return {
        status: 500,
        message: "Todo list fetched failed",
        data: null, 
      }
    }
    return {
      status: 200,
      message: "Todo list fetched successfully",
      data,
    }
  }

  async getTodoList() {
    let data: any[] = [];
    const scanCommand = new ScanCommand({
      TableName: 'Todo',
    })

    try {
      const response = await todoTable.docClient.send(scanCommand);
      data = [...response?.Items || []] as any;
    } catch (error) {
      // console.log(error, 'error...');
      return {
        status: 500,
        message: error,
        data: [], 
      }
    }
    return {
      status: 200,
      message: "Todo list fetched successfully",
      data,
    }
  }

  async queryTodoList(query?: Record<string, any>) {
    console.log(query, 'query..');
    let data: any[] = [];
    // const queryCommand = new QueryCommand({
    //   TableName: 'Todo',
    //   KeyConditionExpression: 'Status = :status',
    //   ExpressionAttributeValues: {
    //     ':status': {
    //       S: 'PENDING',
    //     },
    // }});

    // const queryCommand = new ScanCommand({
    //   TableName: 'Todo',
    //   FilterExpression: 'status = :status',
    //   ExpressionAttributeValues: {
    //     ':status': {
    //       S: 'PENDING',
    //     },
    //   },
    //   ProjectionExpression: "status",
    // });

    const queryCommand = new ScanCommand({
      TableName: 'Todo',
      FilterExpression: 'begins_with("This is the", :title)',
      ExpressionAttributeValues: {
        // ':title': 'This is the first task7dd6c313-9572-4798-afb1-49aa87b5c865',
        ':title': {
          S: 'This is the first task7dd6c313-9572-4798-afb1-49aa87b5c865'
        },
      },
      ProjectionExpression: "title, id",
    });

    try {
      const response = await todoTable.docClient.send(queryCommand);
      console.log(response, 'response...');
      data = [...response?.Items || []] as any;
    } catch (error) {
      // console.log('Case error...');
      console.log(error, 'error...');
      return {
        status: 500,
        message: error,
        data: [], 
      }
    }
    return {
      status: 200,
      message: "Todo list fetched successfully",
      data,
    }
  };

  async getTodoById(id: string) {
    return {
      status: 200,
      message: "Todo fetched successfully"
    }
  }

  async createTodo(input?: any) {
    const { title = '', status = 'PENDING', assignee = [] } = input;
    const params = {
      TableName: 'Todo',
      Item: {
        id: uuidv4(),
        title: title + '' + uuidv4(),
        status,
        assignee,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    try {
      await todoTable.docClient.send(new PutCommand(params));
    } catch (error) {
      console.error("Error:", error);
      return {
        status: 500,
        message: 'Todo created failed'
      }
    }
    return {
      status: 200,
      message: "Todo created successfully"
    }
  }
}

export const todoService = new TodoService();
import { v4 as uuidv4 } from 'uuid';
import {
  GetItemCommand,
  DynamoDBClient,
  ListTablesCommand,
  CreateTableCommand,
  DescribeTableCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { InputToDoItem, IssueStatus, Priority, TodoItemDetails } from '@/db/type';
import TodoTable from "@/db/todoDb";

class TodoService {
  private tableName = 'Todo';
  async getTodoList() {
    let data: any[] = [];
    const scanCommand = new ScanCommand({
      TableName: this.tableName,
    })

    try {
      const response = await TodoTable.docClient.send(scanCommand);
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

  async getTodoItemDetails(id: string) {
    console.log('getTodoItemDetails...');
    let data;
    const queryCommand = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    });

    try {
      const response = await TodoTable.docClient.send(queryCommand);
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

  async queryTodoList(query?: Record<string, any>) {
    return {
      status: 200,
      message: 'queryTodoList',
      data: [],
    }
    // console.log(query, 'query..');
    // let data: any[] = [];
    // const queryCommand = new ScanCommand({
    //   TableName: this.tableName,
    //   FilterExpression: 'begins_with("This is the", :title)',
    //   ExpressionAttributeValues: {
    //     // ':title': 'This is the first task7dd6c313-9572-4798-afb1-49aa87b5c865',
    //     ':title': {
    //       S: 'This is the first task7dd6c313-9572-4798-afb1-49aa87b5c865'
    //     },
    //   },
    //   ProjectionExpression: "title, id",
    // });

    // try {
    //   const response = await TodoTable.docClient.send(queryCommand);
    //   console.log(response, 'response...');
    //   data = [...response?.Items || []] as any;
    // } catch (error) {
    //   // console.log('Case error...');
    //   console.log(error, 'error...');
    //   return {
    //     status: 500,
    //     message: error,
    //     data: [], 
    //   }
    // }
    // return {
    //   status: 200,
    //   message: "Todo list fetched successfully",
    //   data,
    // }
  }

  async createTodo(input: InputToDoItem) {
    const {
      project = '',
      name = '',
      label = '',
      description = '',
      status = IssueStatus.TODO,
      priority = Priority.MEDIUM,
    } = input;

    const item = {
      id: uuidv4(),
      project,
      name,
      label,
      status,
      description,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const params = {
      TableName: this.tableName,
      Item: item,
    }

    try {
      await TodoTable.docClient.send(new PutCommand(params));
    } catch (error) {
      console.error("Error:", error);
      return {
        status: 500,
        message: 'Todo created failed'
      }
    }
    return {
      status: 200,
      message: "Todo created successfully",
      data: { ...item }
    }
  }

  async updateTodo(input: TodoItemDetails) {
    console.log(input, 'updateTodo..');
    const updateExpression = 'set title = :title, description = :description';
    const expressionAttributeValues = {
      ':title': input.title,
      ':description': input.description,
    }
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        id: input.id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    try {
      const response = await TodoTable.docClient.send(command);
      console.log(response, 'response..');
    } catch (error) {
      return {
        status: 500,
        message: 'Todo created failed',
        data: null,
      }
    }
    return {
      status: 200,
      message: 'Todo update successfully',
      data: null,
    }
  }

  async deleteTodo(id: string) {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });

    try {
      const response = await TodoTable.docClient.send(command);
      console.log(response);
    } catch (error) {
      return {
        status: 500,
        message: "Todo deleted failed!"
      }
    }
    return {
      status: 200,
      message: "Todo deleted successfully"
    }
  }
}

export default new TodoService();
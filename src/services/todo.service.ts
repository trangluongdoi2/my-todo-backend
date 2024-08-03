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
import { TodoItemInput, TodoStatus, Priority, TodoItemDetails } from '@/db/type';
import TodoTable from "@/db/todoDb";

class TodoService {
  private tableName = 'Todo';
  // Need refactor, use query instead of scan
  async getTodoList() {
    let data: any[] = [];
    const scanCommand = new ScanCommand({
      TableName: this.tableName,
    });

    try {
      const response = await TodoTable.docClient.send(scanCommand);
      data = [...response?.Items || []] as any;
    } catch (error) {
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
  }

  async getTodoItemDetails(id: string) {
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
    console.log(query, 'query...');
    return {
      status: 200,
      message: 'queryTodoList',
      data: [],
    }
  }

  async createTodo(input: TodoItemInput) {
    const {
      projects = [],
      todoName = '',
      label = '',
      description = '',
      title = '',
      todoStatus = TodoStatus.PENDING,
      priority = Priority.MEDIUM,
    } = input;

    const item = {
      id: uuidv4(),
      title,
      projects,
      todoName,
      label,
      todoStatus,
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
    let data;
    const notChangeAttributes = ['id', 'createdAt'];
    const keyOfAttributes = Object.keys(input).filter((key: string) => !notChangeAttributes.includes(key));
    const expressions = keyOfAttributes.map((key: string) => `${key} = :${key}`).join(', ');
    const updateExpression = `set ${expressions}`;
    const expressionAttributeValues = {
      ':title': input.title,
      ':description': input.description,
      ':updatedAt': new Date().toISOString(),
      ':projects': input.projects,
      ':todoName': input.todoName,
      ':label': input.label,
      ':todoStatus': input.todoStatus,
      ':priority': input.priority,
      ':attachments': input.attachments,
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
      data = response?.Attributes as TodoItemDetails;
    } catch (error) {
      console.log(error, 'error...');
      return {
        status: 500,
        message: 'Todo update failed',
        data: null,
      }
    }
    return {
      status: 200,
      message: 'Todo update successfully',
      data,
    }
  }

  async updateAtrributeTodo<T>(input: { id: string, field: string, value: T }) {
    console.log('updateAtrributeTodo....');
    const { data: todoItem } =  await this.getTodoItemDetails(input.id);
    if (!todoItem) {
      return {
        status: 500,
        message: 'Todo update failed',
        data: null,
      }
    }
    const updateExpression = `set ${input.field} = :${input.field}, updatedAt = :updatedAt`;
    const expressionAttributeValues = {
      ':updatedAt': new Date().toISOString(),
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
      const { Attributes } = await TodoTable.docClient.send(command);
      return {
        status: 200,
        message: 'Todo update successfully',
        data: Attributes,
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Todo update failed',
        data: null,
      }
    }
  }

  async updateAttachments(input: { id: string, files: any[] }) {
    const { data: todoItem } =  await this.getTodoItemDetails(input.id);
    if (!todoItem) {
      return {
        status: 500,
        message: 'Todo update failed',
        data: null,
      }
    }
    const objectNewUrls = input.files.map((file: any) => ({
      id: uuidv4(),
      ...file,
    }))
    const currentAttachments = todoItem?.attachments || [];
    const newAttachments = [...objectNewUrls, ...currentAttachments];
    const updateExpression = 'set attachments = :attachments, updatedAt = :updatedAt';
    const expressionAttributeValues = {
      ':updatedAt': new Date().toISOString(),
      ':attachments': newAttachments,
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
      const { Attributes } = await TodoTable.docClient.send(command);
      return {
        status: 200,
        message: 'Todo update successfully',
        data: Attributes,
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Todo update failed',
        data: null,
      }
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
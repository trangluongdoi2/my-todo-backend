import dotenv from 'dotenv';
import { 
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  AuthFlowType,
  DeleteUserPoolCommand,
  AdminDeleteUserCommand,
  DeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";


type InputRegister = {
  username: string,
  password: string,
  email: string,
}

type InputRegisterConfirmation = {
  username: string,
  code: string
}

type InputLogin = {
  username: string,
  email?: string,
  password: string
}

dotenv.config();
class AuthServices {
  private cognitoClient: CognitoIdentityProviderClient;
  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_POOL_REGION,
    });
  }

  async signIn(input: InputLogin) {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: input.username,
        PASSWORD: input.password,
      },
    };
    try {
      const command = new InitiateAuthCommand(params as any);
      const { AuthenticationResult } = await this.cognitoClient.send(command);
      if (AuthenticationResult) {
        console.log(AuthenticationResult, 'AuthenticationResult..');
        const data = {
          idToken: AuthenticationResult.IdToken,
          accessToken: AuthenticationResult.AccessToken,
          refreshToken: AuthenticationResult.RefreshToken
        }
        return {
          status: 200,
          message: "User signed in successfully",
          data
        }
      }
      return {
        status: 500,
        message: "Error signing in",
        data: null,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error signing in",
        data: null,
      }
    }
  }

  async signUp(input: InputRegister) {
    const params = {
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      Username: input.username,
      Password: input.password,
      UserAttributes: [
        {
          Name: "email",
          Value: input.email,
        },
      ],
    };
    try {
      const command = new SignUpCommand(params);
      await this.cognitoClient.send(command);
      return {
        status: 200,
        message: "User signed up successfully"
      }
    } catch (error) {
      console.error("Error signing up: ", error);
      return {
        status: 500,
        message: "Error signing up"
      }
    }
  };

  async confirmSignUp(input: InputRegisterConfirmation) {
    const params = {
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      Username: input.username,
      ConfirmationCode: input.code.toString(),
    };
    try {
      const command = new ConfirmSignUpCommand(params);
      await this.cognitoClient.send(command);
      return {
        status: 200,
        message: "User confirmed successfully"
      }
    } catch (error) {
      console.error("Error confirming sign up: ", error);
      return {
        status: 500,
        message: "Error confirming sign up"
      }
    }
  }

  async refreshToken(input: any) {
    const params = {
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: input.username,
        REFRESH_TOKEN: input.token,
      },
    }

    try {
      const command = new InitiateAuthCommand(params as any);
      const { AuthenticationResult } = await this.cognitoClient.send(command);
      if (AuthenticationResult) {
        const data = {
          accessToken: AuthenticationResult.AccessToken,
          refreshToken: AuthenticationResult.RefreshToken,
          idToken: AuthenticationResult.IdToken
        }
        return {
          status: 200,
          message: "Token refreshed successfully",
          data
        }
      }
      return {
        status: 500,
        message: "Error refreshing token"
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error refreshing token"
      }
    }
  }

  async deleteUser(username: string) {
    console.log(username, 'deleteUser');
    // const command = new AdminDeleteUserCommand({
    //   UserPoolId: process.env.COGNITO_USER_POOL_ID as string,
    //   Username: username,
    // });
    // try {
    //   await this.cognitoClient.send(command);
    //   return {
    //     status: 200,
    //     message: "User deleted successfully"
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return {
    //     status: 500,
    //     message: "Error deleting user"
    //   }
    // }
    return {
      status: 500,
      message: "Error deleting user"
    }
  }
}

export default new AuthServices();
import { CognitoUserPool } from "amazon-cognito-identity-js";

const cognitoService = {
  createUserPool: () => {
    const poolData = {
      UserPoolId : process.env.USER_POOL_ID as string,
      ClientId : process.env.APP_CLIENT_ID as string,
    }
    const userPool = new CognitoUserPool(poolData);
    return userPool;
  }
}

export default cognitoService;
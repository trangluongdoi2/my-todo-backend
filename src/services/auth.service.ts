import cognitoService from "@/services/cognito.service";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";

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

class AuthServices {
  async signUp(input: InputRegister) {
    const userPool = cognitoService.createUserPool();
    const attributeList = [];
    const dataEmail = {
      Name : 'email',
      Value : input.email
    }

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    userPool.signUp(input.username, input.password, attributeList, [], (err: any, result: any) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: 'Register Failed!'
        }
      }
      const cognitoUser = result.user;
      console.log(cognitoUser, 'cognitoUser...');
    })
    return {
      status: 200,
      message: 'Register Successfully!'
    };
  }

  async signUpConfirm(input: InputRegisterConfirmation) {
    const userPool = cognitoService.createUserPool();
    const userData = {
      Username: input.username,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData);
    const promise = new Promise((resolve, reject) => {
      try {
        cognitoUser.confirmRegistration(input.code.toString(), true, (err: any, res: any) => {
          if (err) {
            return resolve(null);
          }
          return resolve(res);
        });
      } catch (error) {
        return {
          status: 500,
          message: 'Register Confirm 123Failed!'
        }
      }
    });

    const resultConfirm = await promise;
    if (resultConfirm) {
      return {
        status: 200,
        message: 'Register Confirm Successfully!'
      }
    }
    return {
      status: 500,
      message: 'Register Confirm Failed!'
    }
  }

  async signIn(input: InputLogin) {
    const userPool = cognitoService.createUserPool();
    const userData = {
      Username: input.username,
      Pool: userPool,
    };
  
    const authenticationData = {
      Username: input.username,
      Password: input.password,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const cognitoUser = new CognitoUser(userData);
    const promise = new Promise((resolve, reject) => {
      try {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (res: any) => {
            const data: any = {
              refreshToken: res.getRefreshToken().getToken(),
              accessToken: res.getAccessToken().getJwtToken(),
              accessTokenExpiresAt: res.getAccessToken().getExpiration(),
              idToken: res.getIdToken().getJwtToken(),
              idTokenExpiresAt: res.getAccessToken().getExpiration(),
            };
            resolve(data as any);
          },
          onFailure: (err: any) => {
            console.log(err, 'err...');
            resolve(null);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
    const data = await promise as any;
    if (data) {
      return {
        status: 200,
        message: 'Login Successfully!',
        data: {
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        }
      }
    }
    return {
      status: 401,
      message: 'Login Failed!'
    }
  }

  async deleteUser(input: any) {
    console.log('deleteUser...');
  }
}

export const authServices = new AuthServices();
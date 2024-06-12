# Node ToDo App

Simple node.js app that servers "ToDo App"

Great for testing simple deployments on Cloud

## Step 1: Install NodeJS and NPM using nvm
Install node version manager (nvm) by typing the following at the command line.

```bash
sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh

```
Activate nvm by typing the following at the command line.

```bash
. ~/.nvm/nvm.sh
```

Use nvm to install the latest version of Node.js by typing the following at the command line.

```bash
nvm install node
```

Test that node and npm are installed and running correctly by typing the following at the terminal:

```bash
node -v
npm -v
```

## Step 2: Install Git and clone repository from GitHub
To install git, run below commands in the terminal window:

```bash
sudo apt-get update -y
sudo apt-get install git -y
```

Just to verify if system has git installed or not, please run below command in terminal:
```bash
git — version
```

This command will print the git version in the terminal.

Run below command to clone the code repository from Github:

```bash
git clone https://github.com/trangluongdoi2/my-todo-backend.git
```

Get inside the directory and Install Packages

```bash
cd my-todo-backend
npm install
```

Start the application
To start the application, run the below command in the terminal:

```bash
npm start
```
# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# To install toastr

Run command - npm install ngx-toastr

# To install breadcrumb

Run command - npm install xng-breadcrumb
# Use -
Import breadcrumb module in the module.ts you are using it then directly use <xng-breadcrumb></xng-breadcrumb> in .html file where you want to use.

# To install bootswatch

Run command - npm install bootswatch
# Use -
To easily change theme

# To install spinner/loader

Run command - npm install ngx-spinner
# Use -
To show loading on UI while API gets data.

# To use Redis we need to install StackExchange.Redis nuget package

# Install StackExchange.Redis 
It is used to store basket/shoppingCart on client side. It is fast as it stores data in memory itself and takes screenshot of data frequently like every 1-2 mins.
We have set an expiration time of 30 days for basket.

We can install it from nuget package manager (ctrl + shift + p) in vs code or from nuget pakage manager from visual studio. 

Commands -
# redis-cli
ping -> PONG (To check if redis is installed successfully)

# redis-server
To start the redis server.

# redis-commander
We have to run it inside solution folder here D:\Projects\e-commerce>redis-commander.
It will open redis on port 8081.

# To install cuid

npm install cuid
It is used to genertate uniques strings, here we need to generate unique string type id for each basket.

# To generate a component without test file

ng g c <component name> --skip-tests

# To dry run command, it will not make any actual changes to the project. Will just do a dry run of command.  

ng g c <component name> --dry-run

# Behavior Subject

BehaviorSubject is a type of subject, a special type of observable in RxJS, that keeps track of the current value and emits it to new subscribers. In this we can have multiple subscribers that listens to it when its value gets updated.
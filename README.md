# MinhCoiStore
MinhCoiStore is a shoe sales system implemented using ASP.NET, ReactJS, SQL Server.

MinhCoiStore is designed to make online shoe shopping through the website easy. With MinhCoiStore Shoe Sales System, you can:

++ For users:
+ Easily choose shoe models by size, color, choose shoes that fit your money.
+ Easily comment (real-time with signalR) to respond to product reviews to help sellers better understand product quality.
+ Order easily, receive goods quickly.
+ Add to cart the shoes you like.
+ Search, filter (color, size), sort (price, specific amount) from low to high and vice versa.
+ Manage account (Change password, update email phone number, manage orders and shopping cart).

++ For administrators:
+ The administration page includes: monthly and yearly revenue management, order and customer management.
+ Manage, add, delete, edit: products, colors, sizes, categories, banned keywords when users comment.

++ General functions:
+ Register, log in, log out, forget password with personal gmail: we will send the password to your personal email so you can log in.
+ Dark mode: Users can switch the theme from light to dark to suit their eyes.
+ Responsive: Suitable for all types of screens, helping users to use the web comfortably on all screens from websites to phones.

+ Customers need to register an account on the website to shop for the shoes they like. After choosing the shoes they like, users will be provided with a form to enter their personal information address so that the administrator can order the shipper to deliver the goods to them.

If you find this project useful, please consider giving it a ⭐ on Github and following me on GitHub.

## How To Run
-   Backend ()
       -   Installation Laragon
            ```bash
            Install SQL Server
            Create a account and let SQL Server run as service of Windows
            Database already seeded in by code first method or you can download database in document folder
            ```
       -   Setup backend database
            ```bash
            $ Adjust the appsetting.json file with your SQL Server account
            $ Open Nuget console and run the command: "update-database"
            $ Wait for database is created and updated
            $ After finishing, Start the ASP.NET server
            ```                       
-   Frontend ()
       -   Installation NodeJS
       -   Installation dependencies
            ```bash
            $ npm i
            $ npm start
            ```

## Techs:
       -   SQL Server - A proprietary relational database management system developed by Microsoft. 
       -   ASP.NET - A server-side web-application framework designed for web development to produce dynamic web pages.
       -   ReactJS - A JavaScript library for building user interfaces.
       -   Redux - A predictable state container for JavaScript apps.
       -   NodeJS - A JavaScript runtime built on Chrome's V8 JavaScript engine
       
## Screenshots:
<h3>Login, Register, Forgot password Page:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441311496-e362e66a-d638-4d44-a209-7dc272404552.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250507T150648Z&X-Amz-Expires=300&X-Amz-Signature=38c17cd77cbc6862cf658474927a37daba8ef10c0fe83bac9447e5aa4dbaf61f&X-Amz-SignedHeaders=host" width="100%" alt="Login Page">

<h3>Home page:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441685895-4a6b0801-7b95-4278-a0d4-0884e8904a41.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T112700Z&X-Amz-Expires=300&X-Amz-Signature=ad35b79d4c0c6189bb342f5c1f5e14aa7ced84366010f4881548f734adf167aa&X-Amz-SignedHeaders=host" width="100%" alt="Home Page">

<h3>Search/Sort/Filter the shoes:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441680439-a1ede3dc-5c44-4776-9998-6a1c3799d01b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T111022Z&X-Amz-Expires=300&X-Amz-Signature=456feaf0f030ea47ab69c28264f23e04df87b6dc922d14727f2816f2933c29d9&X-Amz-SignedHeaders=host" width="100%" alt="Search/Sort/Filter the shoes">

<h3>Shoes selecting and comment (real-time) of user about shoes purchased:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441681412-d4cf3fec-ba44-419f-96ea-865eaa13ba93.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T111319Z&X-Amz-Expires=300&X-Amz-Signature=452cc007031eb449cee63cae80dcc4fe9c27e523fc59af9eb7b1cf07adf19f11&X-Amz-SignedHeaders=host" width="100%" alt="shoes selecting">

<h3>Manager Cart:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441682594-da0f9880-e906-4c18-ad01-20c713149746.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T111719Z&X-Amz-Expires=300&X-Amz-Signature=37ff292481cf08f46cc5d6e351f1be595488ad5a1a9c885d6e9e3544f14d1d09&X-Amz-SignedHeaders=host" width="100%" alt="manager cart">

<h3>Purchase confirmation:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441684338-a06d1bf6-7fec-450a-92b3-a3e655389603.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T112216Z&X-Amz-Expires=300&X-Amz-Signature=17a18dd438c3532fe87215d1ccbacfd236454aacf329aaf1912f183de737a971&X-Amz-SignedHeaders=host" width="100%" alt="purchase comfirm">

<h3>Manager Order:</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441685002-47186345-f6fa-489c-8f83-1686669e14d5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T112411Z&X-Amz-Expires=300&X-Amz-Signature=a49b2fb6f3105979cae7134763e56c4bb0ba5244b2b3b96bb9c09b4902b7ed80&X-Amz-SignedHeaders=host" width="100%" alt="manager order">

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/145688135/441685288-5ae0a537-034f-441c-b9c2-a070da69e07a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250508T112500Z&X-Amz-Expires=300&X-Amz-Signature=77d1e9f0fda841a16c24aa12998f45005b873bbd512b2a6b9539dbd463f9ce74&X-Amz-SignedHeaders=host" width="100%" alt="manager order 2">
![image]()















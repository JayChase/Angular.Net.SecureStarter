#Secure Starter

An AngularJS starter kit for ASP.NET which implements authentication and authorization (ASP.NET Identity 2.0.0) to provide:

•site based and 3rd party user authentication,
•local SPA authorization and customization based on role membership.

##Getting started

During the database initialization ([ApplicationDbInitializer](https://github.com/Useful-Software-Solutions-Ltd/Angular.Net.SecureStarter/blob/master/Angular.SecureStarter/Models/ApplicationDbInitializer.cs)) two roles are created:

* administrator
* user

A user called **Administrator** is also created with the password '**Administrator55$**' and added to both roles. 
Edit initializer if you need to change this, or add more roles and users.

###Common tasks:
[Securing a route](Securing-a-route)
[Configuring role based content](Role-based-content)

##Installation

You can fork or download the this repo. 
It is also available as a Nuget package (you find it [here](https://www.nuget.org/packages/Angular.SecureStarter/)).
To install from the Package Manager Console:

Install-Package Angular.SecureStarter


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

To get familiar with configuring security on the SPA side of things see the following wiki pages:
* [securing a route](https://github.com/Useful-Software-Solutions-Ltd/Angular.Net.SecureStarter/wiki/Securing-a-route)
* [configuring role based content](https://github.com/Useful-Software-Solutions-Ltd/Angular.Net.SecureStarter/wiki/Role-based-content)
* [setting up an external authentication provider walkthrough](https://github.com/Useful-Software-Solutions-Ltd/Angular.Net.SecureStarter/wiki/Setting-up-an-external-authentication-provider)

There are a few other features to make life a bit easier which you can read about [here](https://github.com/Useful-Software-Solutions-Ltd/Angular.Net.SecureStarter/wiki/Setting-up-an-external-authentication-provider/Other-features)

##Installation

You can fork or download the this repo. 
It is also available as a Nuget package (you find it [here](https://www.nuget.org/packages/Angular.SecureStarter)).
To install from the Package Manager Console:

Install-Package Angular.SecureStarter

##Current status

The starter kit currently implements the basic authentication funcionality equivalent to that found in the Visual Studio 2013 ASP.NET 'Single Page Application'. Future enhandements will (hopefully) include: 
* two-factor authentication
* password reset by email
* basic user management

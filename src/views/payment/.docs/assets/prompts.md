> Content in this file is only stored for example.

## Sequence diagram prompt

I have a web server, database and client application. I wantt to document the signup flow. First of all user comes in and uses email, name and passwrd to signup. then client app sends a signup request to the server. The server then signs up the user and sends a verification email to the user's email and responds with a success message to the client app and client app at this point using the password and email auto logs in to the system, server sends a successfull login with an `access_token` and `refresh_token` to client and then client auto redicts to a page called `auth_success` where the users account/profile is auto fetched from the server and cached into `localstorage`,  the client auto redicteds the user to a page where it shows verfication email has been sent user. at this point user can . User then goes to email and clicks on verification link and the link takes them to client app and client app then sends the email `verification_token` to the server. the server verifis the token and sends a success message to the cliet app, at this point server updates users profile that email status verified in db. now because the access_token and refresh_token is already into the storage the client app without sending any further request to server redirects them inside the applicationa and users happily use the app.
Now build a sequence diagram for this flow using mermaid syntex and also only inlcude mermaid syntext in your markdown formated response, build the diagram as detailed as possible and don't add nothing extra or no need tto explain.

## Signup flow sequence 
```
sequenceDiagram
    participant User
    participant ClientApp
    participant Server
    participant EmailService

    User->>ClientApp: Sign up (Email, Name, Password)
    ClientApp->>Server: Signup Request (Email, Name, Password)
    Server->>EmailService: Send Verification Email
    EmailService-->>User: Email with Verification Link
    Server-->>ClientApp: Signup Response (Success)
    ClientApp->>Server: Login Request (Email, Password)
    Server-->>ClientApp: Login Response (Access Token, Refresh Token)
    ClientApp->>ClientApp: Redirect to 'auth_success' page
    ClientApp->>Server: Fetch User Account/Profile Request
    Server-->>ClientApp: User Account/Profile Response
    ClientApp->>ClientApp: Cache User Account/Profile (Local Storage)
    ClientApp->>ClientApp: Show Verification Email Sent
    User->>ClientApp: Open Verification Email
    ClientApp->>ClientApp: Retrive token from URL
    ClientApp->>Server: Verify Email Request (Verification Token)
    Server->>Server: Update User Profile (Email Verified)
    Server-->>ClientApp: Verify Email Response (Success)
    ClientApp->>ClientApp: Redirect to Application Page
```
## logut guard flow sequence 
```
sequenceDiagram
    participant User
    participant ClientApp
    participant LocalStore
    participant Server

    User->>ClientApp: Navigate to Login/Registration/Account Verification Page
    ClientApp->>LocalStore: Check User Login Status
    LocalStore-->>ClientApp: User Login Status (Logged In/Logged Out)
    alt User Logged In
        ClientApp->>ClientApp: Show Logout Alert
        ClientApp->>ClientApp: Redirect to Logout Page
        ClientApp->>Server: Logout Request
        Server-->>ClientApp: Logout Response (Success)
        ClientApp->>ClientApp: Redirect to Target Page (Login/Registration/Account Verification)
    else User Logged Out
        ClientApp->>ClientApp: Show Target Page (Login/Registration/Account Verification)
    end

```
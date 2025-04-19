# Debugging Analysis

## Scenario 1: Authentication Middleware

-   **Breakpoint Location:** authentication.ts line 43
-   **Objective:** How the Firebase Authentication verifies ID tokens

### Debugger Observations

-   **Variable States:** token = {a valid token}
                         res.locals.role = "officer"
                         res.locals.uid = "krebQq3WsbbzUAgyFNPlCZ9Lr7u2"
-   **Call Stack:** The GetLoans Endpoint gets called and it goes through the authenticate function
-   **Behavior:** The authenticate function parses the authorization header from the request and grabs the token.
                If the token exists, it tries to verifiy that token with firebases auth.verifyIdToken function. if the token is valid,
                firebase returns a DecodedIdToken object that contains information about the token which includes email, role, and uid.
                once the authenticate functions gets the DecodedidToken object, it parses it, grabs the role and uid and 
                attaches it to the request and then passes it to the next function in the route.

### Analysis

-   I understood how the authenticaton middleware works better
-   I did not observe any unexpected behavior, the code was working as expected
-   The DecodedIdToken object contains a lot of information including stuff like if the email is a verified email.
    we can use that data to make the authentication more robust
-   I use firebase authentication for all my endpoints in my project so understanding how it works better will allow me to
    take advantage of its capabilities for other aspects of my project or to improve my authentication code.

## Scenario 2: Role-Based Access Control

-   **Breakpoint Location:** authorization.ts Line 25
-   **Objective:** How the authorization middleware enforces role restrictions

### Debugger Observations

-   **Variable States:** AuthorizationOptions.hasRole = [ "admin", "officer" ]
                        res.locals.role = "user" 
-   **Call Stack:** The reviewLoans endpoint gets called, the request goes through the authentication middleware and passes it with attached role 
                    and uid then sends the request to the isAuthorized function with the { hasRole: ["admin", "manager"] } argument.
-   **Behavior:** The isAuthorized function parses the request and grabs the role in the request then it checks if the role exists, 
                if it does the it then checks if the role of the request is included in the allowed role of the endpoint. In this case
                the role of the request is "user" and the allowed roles are "admin" and "officer" so the function sends an 
                INSUFFICIENT_ROLE error to the next fuction.


### Analysis

-   This shows how simple this function really is, it simply compares the user role to the allowed roles for the endpoint.
-   I did not observe any unexpected behavior, the code was working as expected
-   This code is so simple I dont really know how to improve it further, there was some extra code in 
    the function that my project isn't using so i deleted it.
-   I suppose it shows me that middelware doesnt have to be anything complicated, it can be simple a function 
    that changes/checks a piece of data from the request then passes it off to the next one.

## Scenario 3: Loan Application Endpoints

-   **Breakpoint Location:** authentication.ts Line 43, authorization.ts Line 25 and loanController.ts Line 53
-   **Objective:** Trying to understand what my endpoints are doing

### Debugger Observations

-   **Variable States:** token = {a valid token}
                         res.locals.role = "manager"
                         res.locals.uid = "ZlXaDh73w3P0dKwj2NbsNEUuYe92"
                         AuthorizationOptions.hasRole = [ "admin", "manager" ]
                         res.locals.role = "manager"
-   **Call Stack:** Approve Loan endpoint gets called with valid token and role
-   **Behavior:** The authenticate gets called, verifies the token and attaches the user's role of manager to the request then passes
                it on to the isAuthorized. The isAuthorized is called with { hasRole: ["admin", "manager"] }, the isAuthorized compares the
                role on the request res.locals.role = "manager" to the Authorization otions it got called with [ "admin", "manager" ] and
                checks if the users role is included then passes the request to the next function. Once the controller gets called it simply
                approves the request, i didnt include any services. So in this case, once the requests passes the authentication and authorization
                middleware the controller applies the 200 status code to the response with the message "Loan Approved".

### Analysis

-   I learned the step by step breakdown of my endpoint
-   Everything worked as expected, I got a successful response in postman
-   possibly, theres some unused code on the authentication function and the controllers basically dont do anything
    but other that that, i cant think of any ways to imporve it at the moment
-   Just knowing the call stack of one of my endpoints gives me a general idea of what the other endpoints in my project 
    are supposed to be doing letting me quickly debug them if necessary. 
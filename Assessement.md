Section 1: API Testing

Endpoint: [https://randomuser.me/api/]

Test Cases

1. Positive Cases

Test Case a — Basic Request

 Request: `GET /api/`
 Response:

   Status: 200 OK
   Response is JSON
   Contains `"results"` array with user data (name, gender, email, phone, cell, city, state, country, age  
)

Test Case b — Multiple Results

 Request: `GET /api/?results=5`
 Response:

   Status: 200 OK
   Exactly 5 users returned
   Each user contains valid (name, gender, email, phone, cell, city, state, country, age
)


 2. Validation Cases

Test Case a — Data Type Validation

 Validation:

   `"results"` is an array
   `"gender"` is a string
 Response: True

Test Case b — Parameter Validation

 Request: `GET /api/?gender=female`
 Response:

   All returned users have `"gender": "female"`


 3. Negative Cases

Test Case a — Invalid Endpoint

 Request: `GET /api/invalid`
 Response:

   Status: 404
   Not Found


 4. Edge Cases

Test Case a — Zero Results

 Request: `GET /api/?results=0`
 Response:

   Empty results array
   No system crash

Test Case b — Large Payload

 Request: `GET /api/?results=15000`
 Response:

   System enforces limit
   No timeout/crash
   Valid response structure

 Performance

Test Case c — Response Time

 Validation:

   Response time < 500ms



 Bonus: Postman Script

JavaScript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains results", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results.length).to.be.above(0);
});

pm.test("User email exists", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results[0].email).to.exist;
});

pm.test("Check if user is female", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results[0].gender).to.eql("female");
});




Section 2: Coding Task

Email Validation Function 


 Java

java
public boolean validateEmail(String email) {
    if(email == null || email.isEmpty()){
        return false;
    }
    if(email.contains(" ")){
        return false;
    }
    if(!email.contains("@")){
        return false;
    }
    if(!email.contains(".")){
        return false;
    }
    return true;
}


 Response Outputs

| Input                                   | Output |
| --------------------------------------- | ------ |
| [test@gmail.com](mailto:test@gmail.com) | true   |
| testgmail.com                           | false  |
| test@                                   | false  |
| null                                    | false  |
| test @gmail.com                         | false  |


Section 3: UI Testing Login Page

Components

 Email field
 Password field
 Login button


Functional Test Cases

1. Valid login → Redirect to dashboard
2. Empty email → Validation message
3. Empty password → Validation message
4. Invalid email format → Error displayed
5. Login button click → Request processed
6. Field persistence → Fields reset on refresh
7. Password masking → Characters hidden
8. Case sensitivity → Password is case-sensitive
9. Tab order → Email → Password → Login
10. Enter key → Triggers login


Negative Test Cases

1. Empty fields → "Fields cannot be empty"
2. Wrong password → Error message
3. SQL Injection (`' OR 1=1 --`) → Access denied
4. Extremely long email → Handled gracefully
5. Invalid format (no @) → Validation error


Possible Bugs

 Login button not clickable / unresponsive
 Error messages not clearing after correction
 Password visible instead of masked
 Enter key not triggering login

Automation Approach Selenium

java
driver.findElement(By.id("email")).sendKeys("test@gmail.com");
driver.findElement(By.id("password")).sendKeys("password");
driver.findElement(By.id("login")).click();


Section 4: Bug Report

Title: Login Button Unresponsive on Valid Credentials
	Severity: Critical 
	Priority: High

 	Environment
 	Browser: Chrome
 	OS: Windows
 	Build: v1.0

 Description

Login action does not trigger any response despite valid credentials.

 Steps to Reproduce
1. Navigate to `/login`
2. Enter valid email and password
3. Click Login

 Response Result
User redirected to dashboard
 Actual Result
No action

 Possible Causes
 API not triggered
 JavaScript event failure
 Frontend-backend integration issue


Section 5: SIT Testing Fund Transfer Issue

Investigation Steps

1. Verify request reached API/middleware
2. Check transaction ID across systems
3. Query core banking database
4. Validate third-party integrations (e.g., SWIFT/KITS)
5. Check for rollback or pending states

Systems to Check

 Mobile App logs
 API Gateway logs
 Middleware services
 Core Banking System (CBS)
 Payment switch / clearinghouse

Logs to Analyze

 Application logs (timeouts, connection errors)
 Transaction/audit logs
 Database logs (deadlocks, locks)
 Integration logs
 Network logs

Possible Root Causes

 API success but backend failure
 Message queue delays
 Core banking timeout
 Transaction rollback
 Database lock contention


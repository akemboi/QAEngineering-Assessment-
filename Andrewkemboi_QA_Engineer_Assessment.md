**Section 1: API Testing**



**Endpoint**: \[https://randomuser.me/api/]



**Test Cases**



**1. Positive Cases**



**Test Case a — Basic Request**



&#x20;Request: `GET /api/`

&#x20;Response:



&#x20;  Status: 200 OK

&#x20;  Response is JSON

&#x20;  Contains `"results"` array with user data (name, gender, email, phone, cell, city, state, country, age  

)



**Test Case b — Multiple Results**



&#x20;Request: `GET /api/?results=5`

&#x20;Response:



&#x20;  Status: 200 OK

&#x20;  Exactly 5 users returned

&#x20;  Each user contains valid (name, gender, email, phone, cell, city, state, country, age

)





&#x20;**2. Validation Cases**



**Test Case a — Data Type Validation**



&#x20;**Validation:**



&#x20;  `"results"` is an array

&#x20;  `"gender"` is a string

&#x20;Response: True



**Test Case b — Parameter Validation**



&#x20;Request: `GET /api/?gender=female`

&#x20;Response:



&#x20;  All returned users have `"gender": "female"`





&#x20;**3. Negative Cases**



**Test Case a** — Invalid Endpoint



&#x20;Request: `GET /api/invalid`

&#x20;Response:



&#x20;  Status: 404

&#x20;  Not Found





&#x20;**4. Edge Cases**



**Test Case a** — Zero Results



&#x20;Request: `GET /api/?results=0`

&#x20;Response:



&#x20;  Empty results array

&#x20;  No system crash



**Test Case b** — Large Payload



&#x20;Request: `GET /api/?results=15000`

&#x20;Response:



&#x20;  System enforces limit

&#x20;  No timeout/crash

&#x20;  Valid response structure



&#x20;Performance



**Test Case c** — Response Time



&#x20;Validation:



&#x20;  Response time < 500ms







&#x20;**Bonus: Postman Script**



JavaScript

pm.test("Status code is 200", function () {

&#x20;   pm.response.to.have.status(200);

});



pm.test("Response contains results", function () {

&#x20;   var jsonData = pm.response.json();

&#x20;   pm.expect(jsonData.results.length).to.be.above(0);

});



pm.test("User email exists", function () {

&#x20;   var jsonData = pm.response.json();

&#x20;   pm.expect(jsonData.results\[0].email).to.exist;

});



pm.test("Check if user is female", function () {

&#x20;   var jsonData = pm.response.json();

&#x20;   pm.expect(jsonData.results\[0].gender).to.eql("female");

});









**Section 2: Coding Task**



**Email Validation Function** 





&#x20;Java



java

public boolean validateEmail(String email) {

&#x20;   if(email == null || email.isEmpty()){

&#x20;       return false;

&#x20;   }

&#x20;   if(email.contains(" ")){

&#x20;       return false;

&#x20;   }

&#x20;   if(!email.contains("@")){

&#x20;       return false;

&#x20;   }

&#x20;   if(!email.contains(".")){

&#x20;       return false;

&#x20;   }

&#x20;   return true;

}





&#x20;**Response Outputs**



| Input                                   | Output |

| --------------------------------------- | ------ |

| \[test@gmail.com](mailto:test@gmail.com) | true   |

| testgmail.com                           | false  |

| test@                                   | false  |

| null                                    | false  |

| test @gmail.com                         | false  |





**Section 3: UI Testing Login Page**



Components



* &#x20;Email field
* &#x20;Password field
* &#x20;Login button





**Functional Test Cases**



1\. Valid login → Redirect to dashboard

2\. Empty email → Validation message

3\. Empty password → Validation message

4\. Invalid email format → Error displayed

5\. Login button click → Request processed

6\. Field persistence → Fields reset on refresh

7\. Password masking → Characters hidden

8\. Case sensitivity → Password is case-sensitive

9\. Tab order → Email → Password → Login

10\. Enter key → Triggers login





**Negative Test Cases**



1\. Empty fields → "Fields cannot be empty"

2\. Wrong password → Error message

3\. SQL Injection (`' OR 1=1 --`) → Access denied

4\. Extremely long email → Handled gracefully

5\. Invalid format (no @) → Validation error





**Possible Bugs**



1. &#x20;Login button not clickable / unresponsive
2. &#x20;Error messages not clearing after correction
3. &#x20;Password visible instead of masked
4. &#x20;Enter key not triggering login



**Automation Approach Selenium**



java

driver.findElement(By.id("email")).sendKeys("test@gmail.com");

driver.findElement(By.id("password")).sendKeys("password");

driver.findElement(By.id("login")).click();





**Section 4: Bug Report**



1. **Title**: Login Button Unresponsive on Valid Credentials

&#x09;Severity: Critical 

&#x09;Priority: High



&#x20;	**Environment**

&#x20;	Browser: Chrome

&#x20;	OS: Windows

&#x20;	Build: v1.0



&#x20;**Description**



Login action does not trigger any response despite valid credentials.



&#x20;**Steps to Reproduce**

1\. Navigate to `/login`

2\. Enter valid email and password

3\. Click Login



&#x20;**Response Result**

User redirected to dashboard

&#x20;**Actual Result**

No action



&#x20;**Possible Cause**s

&#x20;API not triggered

&#x20;JavaScript event failure

&#x20;Frontend-backend integration issue





**Section 5: SIT Testing Fund Transfer Issue**



**Investigation Steps**



1\. Verify request reached API/middleware

2\. Check transaction ID across systems

3\. Query core banking database

4\. Validate third-party integrations (e.g., SWIFT/KITS)

5\. Check for rollback or pending states



**Systems to Check**



&#x20;Mobile App logs

&#x20;API Gateway logs

&#x20;Middleware services

&#x20;Core Banking System (CBS)

&#x20;Payment switch / clearinghouse



**Logs to Analyze**



&#x20;Application logs (timeouts, connection errors)

&#x20;Transaction/audit logs

&#x20;Database logs (deadlocks, locks)

&#x20;Integration logs

&#x20;Network logs



**Possible Root Causes**



&#x20;API success but backend failure

&#x20;Message queue delays

&#x20;Core banking timeout

&#x20;Transaction rollback

&#x20;Database lock contention






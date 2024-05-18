#### 1. XSS vulnerability. Interviewers are especially looking out for this whenever you need to render user input. You almost never need to use .innerHTML. There's .textContent and $.text(). If you do have to render raw HTML, make sure you escape the contents first.

#### 2. User input that is being displayed in the URL has to be encoded first as well, or else there's also a potential for mischief where users can add additional query parameters.

---

### Cross Site Scripting (XSS):

- Cross-Site Scripting is a security vulnerability that **_allows an attacker to inject malicious scripts_**
- These **_scripts then execute in the context of the victim’s browser_**, potentially `stealing sensitive information`, `hijacking user sessions`, or `performing other malicious actions`.

**There are three main types of XSS attacks:**

- **Stored XSS**:

  - The malicious script is <u>**_stored on the web server_**</u> and served to users who visit a particular page or view a specific message. For example, <u>**an attacker could inject a script into a blog post’s comments section**</u> that executes when other users view the comments.
    <br>

- **Reflected XSS**:
  - The **malicious script is embedded in a URL or another input field** and the victim is tricked into clicking on a crafted link. The script is then executed in the context of the victim’s session.
    <br>
- **DOM-based XSS**:
  - The attack occurs entirely on the client side, manipulating the Document Object Model (DOM) of a web page.
  - **Attackers exploit client-side scripts that use unsanitized** user input to modify the DOM and execute malicious code.
    <br>

**Points to remember**

- To prevent XSS attacks, developers <u>**_should validate and sanitize user inputs_**</u>, **_use output encoding_**, and **_implement security headers_** like **_Content Security Policy (CSP) to restrict the sources_** of executable scripts.
- `Content-Security-Policy` is the name of a HTTP response header that modern browsers use to enhance the security of the document (or web page)

---

### Here’s how to prevent each type of XSS attack:

### a. Preventing Stored XSS:

- **Overview:** Stored XSS attacks occur when an attacker injects a malicious script into a web application’s data, such as comments or messages, which is then served to other users who view that data.

##### To prevent stored XSS attacks:

#### 1. Input Validation and Sanitization:

- Always validate and sanitize user-generated content before storing it in your database or rendering it to other users.

#### 2. Content Security Policy (CSP):

- Implement CSP headers to restrict the sources from which scripts can be executed on your website.
- This can help to mitigate the impact of XSS attacks by disallowing the execution of unauthorized scripts.
- To enable CSP, you need to <u>**configure your web server to return the Content-Security-Policy HTTP header**.</u> We **can also apply** it via a meta tag.

#### 3. Output Encoding:

- When rendering user-generated content, **ensure it is properly encoded** to prevent browsers from interpreting it as executable code. Use encoding libraries or built-in functions for this purpose.

#### 4. Contextual Output Encoding:

- Be aware of the context in which data is being used (e.g., in HTML, JavaScript, or as part of an attribute) and **apply the appropriate encoding technique**.

#### 5. Session Management:

- Implement strong session management and authentication mechanisms to prevent attackers from gaining access to authenticated user sessions and exploiting them for XSS attacks.

---

### b. Preventing Reflected XSS:

**Overview:** Reflected XSS attacks occur when an **_attacker tricks a user into <u>clicking on a crafted link</u>_** containing a malicious script.

##### To prevent reflected XSS attacks:

#### 1. Input Validation

- Validate and sanitize all user inputs, especially those that are used in generating dynamic content.
- Reject or sanitize inputs that contain potentially malicious code.

#### 2. Output Encoding:

- When rendering dynamic content, **_ensure that it is properly encoded_** to prevent script execution
- The encoding must be context-specific, considering the target output (e.g., HTML, JavaScript, or URL).

#### 3. Contextual Output Encoding:

- As with stored XSS prevention, apply encoding techniques according to the context in which the data is used.

#### 4. Content Security Policy (CSP):

- Implement CSP headers **_to limit script execution sources_** and reduce the impact of any potential reflected XSS vulnerabilities.

#### 5. Use Secure Cookies:

- **_Set the “HttpOnly” flag on cookies_** to prevent JavaScript from accessing them, reducing the risk of cookie theft in case of a successful XSS attack.

---

### c. Preventing DOM-based XSS:

**Overview:** DOM-based XSS attacks occur **when malicious code manipulates the Document Object Model (DOM)** of a web page on the client side.

##### To prevent DOM-based XSS attacks:

#### 1. Sanitize Client-Side Input:

- Avoid using unsanitized user input directly in client-side scripts
- Ensure that **user input is sanitized and validated on the server side** before it is used in JavaScript.

#### 2. Secure Data Flow:

- Be cautious when modifying the DOM dynamically.
- Always validate and sanitize user inputs before using them to update the DOM.
- **Use safe APIs and libraries** for DOM manipulation.

#### 3. Avoid Using Dangerous Functions:

- **_Avoid using JavaScript functions <u>that can lead to DOM-based XSS</u>_**, such as `eval()` and` document.write()`

#### 4. Input Validation and Contextual Output Encoding

- Validate and encode data according to its usage context when manipulating the DOM.

#### 5. Content Security Policy (CSP)

- to restrict script execution sources and help prevent DOM-based XSS.

---

### Cross-Site Request Forgery(CSRF or XSRF):

- Is an attack that **_tricks a user into executing unwanted actions_** **_<u>on a different website where the user is authenticated</u>_**.
- The attacker typically sends malicious requests on behalf of the victim, exploiting the victim's active sessions on a targeted site.
- This **can lead to action like** `changing passwords`, `making purchases` or` modifying account settings` **_without the user's consent_**.

#### How Does CSRF Work?

1. A user logs into www.example.com, which uses cookies for session management
2. The user then visits a malicious website, www.malicious.com
3. This malicious website contains a link, button, or some JS that causes the user's browser to make a request to www.example.com without user's knowledge. Because the user is still authenticated with www.example.com (for instance, their session cookie is still valid), the browser also includes authentication credentials with this request.
4. www.example.com receives this request and assumes it's legitimate because the request comes with valid session credentials. It then performs whatever action the request dictates - like changing the email or password.

```js
--------------------------------------------------------------
1. User Login to Example Site:
--------------------------------------------------------------
[User]  --------------->  [www.example.com]
              Login

[User]  <---------------  [www.example.com]
            Set Authentication Cookie

--------------------------------------------------------------
2. Unknowing Visit to Malicious Site:
--------------------------------------------------------------
[User]  --------------->  [www.malicious.com]
            Innocent Visit

--------------------------------------------------------------
3. Malicious Action Triggered:
--------------------------------------------------------------
[User]  ----(Bait)---->  [www.example.com]
       Malicious Request to Example Site with Valid Session Cookie

--------------------------------------------------------------
4. Unintended Action Performed on Example Site:
--------------------------------------------------------------
[User]  <---------------  [www.example.com]
        Action Executed (e.g., Email Changed)

--------------------------------------------------------------
```

### How to Prevent CSRF:

#### 1. Use Anti-CSRF Tokens:

- The **_<u>server sends a unique</u>, unpredictable <u>token to the client with every session</u>_**.
- For any state-changing request, the client must send back this token.
- **_If the token is missing or incorrect_**, the <u>**_server refuses the request_**</u>. (Attackers won't have access to this token)

```js
/**
Step1
When a user logs in or requests a form, the server generates a random token:
Random Token = "ABC123"


Step2
The server sets this token as a cookie and also includes it within the 
form as a hidden field.

Set-Cookie: csrf_token=ABC123; Path=/; Secure; HttpOnly

<!-- Form Data -->
<form action="/submit" method="post">
    <input type="hidden" name="csrf_token" value="ABC123">
    ...
</form>

Step3
When the user submits the form, 
the browser will automatically send the cookie 
(because that's how cookies work) and the token in the form data

POST /submit HTTP/1.1
Host: www.example.com
Cookie: csrf_token=ABC123

csrf_token=ABC123&...other_form_data...


Step4
The server then checks if the token from the cookie matches the 
token sent in the form data.

if (request.cookie["csrf_token"] === request.body["csrf_token"]) {
    // Tokens match, process the request
} else {
    // Possible CSRF attack! Deny the request.
}

**/
```

#### 2. SameSite Cookie Attribute:

- Modern browsers **support setting the SameSite attribute on cookies**.

This attribute can have two values:

- `Strict`: The cookie will only be sent in a first party context (means that <u>**it will be sent to the site from which it originates**</u> during navigation)

- `Lax`: **The cookie is withheld on cross-site sub-requests** <u>but sent when the user navigates to the URL from an external site</u>, like from their email client.

```js
Set-Cookie: session=unique_session_id; SameSite=Strict; Secure; HttpOnly;
```

#### 3. Check the Referer Header:

- **Verify the Referer header of incoming requests** to ensure that they originate from the same domain.
- <u>_While this header can be spoofed by attackers in some cases</u>_, it still provides an additional layer of security.

**Note:** All browsers consistently send the Referer header, so it should be considered an extra measure rather than the primary defense.

```js
# Get the Referer header from the incoming request.
    referer = request.headers.get("Referer")

    # Check if the Referer header is present and matches one of the trusted origins.
    if referer and any(referer.startswith(origin) for origin in trusted_origins):
        # Perform the protected action here.
        # For example, update user data, change passwords, or process payments.
        return "Action performed successfully."
    else:
        # Redirect the user to an error page or display an error message.
        return "Unauthorized request."
```

---

#### 4. Use HTTP-Only Cookies:

- This prevents JavaScript from accessing these cookies, reducing the risk of cookie theft in case of a successful CSRF attack.
- When a user logs into a web application, the server may send an authentication cookie as part of its response.
- To set this cookie as HttpOnly, the server would include the HttpOnly attribute in the Set-Cookie HTTP header:

```js
HTTP/1.1 200 OK
Set-Cookie: session_id=12345abcdef; HttpOnly; Path=/; Secure

HttpOnly means the cookie cannot be accessed by JavaScript.
Path=/ restricts the cookie to the root path.
Secure ensures the cookie is only sent over HTTPS.
```

#### 5. Require Authentication for Sensitive Actions:

- Ensure that sensitive actions or endpoints require user authentication.
- Unauthorized users should not be able to perform these actions even if a CSRF attack occurs.

#### 6. Session Timeout:

- Set session timeouts to automatically log users out after a period of inactivity to reduce the risk of an active session being exploited.

---

### Example 1: Changing Email Address

- **Scenario 1:** Alice is logged into her email account on emailservice.com.
- **Attack:** She then visits a malicious website, malicioussite.com, which <u>**_contains a hidden form that is automatically submitted by JavaScript_**.</u>
  - This form is crafted to send a POST request to emailservice.com <u>_to change her email settings (like her recovery email address)_</u>.
- **Result**: If emailservice.com <u>**_doesn't have proper CSRF protections_**</u>, it might process this request as if Alice intentionally submitted it, leading to her recovery email being changed without her knowledge.

### Example 2: Social Media PostL

- **Scenario 1:** Bob is logged into a social media platform.
- **Attack:** He clicks on a link that leads him to a malicious site.
  - This site contains a script that makes a request to the social media platform to post a message or send a message to all his contacts.
- **Result**: If the social media platform doesn’t verify the authenticity of the request, it could result in spam or malicious messages being sent from Bob’s account.

### Example 3: Changing Password

- **Scenario 1:** Dana is logged into a forum.
- **Attack:** : She receives an email with a link to an interesting article.
  - Clicking the link takes her to a website that secretly contains a form that sends a request to the forum to change her password.
- **Result**: Without CSRF protection, Dana’s password could be changed without her consent, potentially locking her out of her account.

### Q1) How to Send data to a server without a page refresh?

- To send data from a web page to a server without a page refresh, you can use techniques such as **AJAX** (Asynchronous JavaScript and XML) or the **more modern Fetch API**.
- These methods **allows you to communicate with the server in the background** <u>_and update the page content dynamically without requiring a full page reload_</u>.

#### Using AJAX (XMLHttpRequest)

```js
// Using AJAX (XMLHttpRequest)
var xhr = new XMLHttpRequest();
xhr.open('POST', 'your-server-endpoint', true);
xhr.setRequestHeader('Content-Type', 'application/json');

var data = {
  key1: 'value1',
  key2: 'value2',
};

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Handle the server response here
    console.log(xhr.responseText);
  }
};

xhr.send(JSON.stringify(data));
```

#### Using Fetch API

```js
// Using Fetch API
var data = {
  key1: 'value1',
  key2: 'value2',
};

fetch('your-server-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.text())
  .then((result) => {
    // Handle the server response here
    console.log(result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

---

### Q2) How do you get a return response for updating the page?

#### Using XMLHttpRequest

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    // Update the page with the response data
    document.querySelector('#someElement').textContent = response.message;
  }
};
xhr.send(JSON.stringify({ key: 'value' }));
```

#### Using Fetch API:

```js
fetch('https://example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
})
  .then((response) => response.json())
  .then((data) => {
    // Update the page with the response data
    document.querySelector('#someElement').textContent = data.message;
  })
  .catch((error) => console.error('Error:', error));
```

---

### Q3) What format would you choose?

#### 1. CORS:

- **When to use:** **<u>When you have control over the server** or API you’re accessing</u>, and you need to perform various types of HTTP requests (GET, POST, PUT, DELETE, etc.).
- **Advantages:** Supports all types of HTTP requests, widely recognized and adopted, and can be secured with appropriate headers.
- **Drawbacks:** Requires server configuration, can’t be used if you don’t have access to modify the server’s response headers.

#### 2. JSONP:

- **When to use:** When **_dealing with older APIs that support JSONP_** and <u>**_only need to make GET requests_**</u>.
- **Advantages:** Cross domain Request:
  - Can bypass same-origin policy <u>**_without requiring server modifications_**</u>. No Preflight Request.

**i) Cross-Domain:** <u>Enables cross-domain requests without CORS</u>.
**ii) No Preflight:** Avoids CORS-related preflight requests.
**iii) GET Requests:** Inherently uses GET, suitable for read-only public APIs.

**Drawbacks:** <u>Limited to GET requests, potential security vulnerabilities, not as popular in modern applications</u>.

#### 3. Proxy Server:

- **When to use:** When you **don’t have control over the target server to set CORS headers** ( or when you <u>**_want to hide the target server’s actual endpoint from the client_**</u>.)
- **Advantages:** Can be implemented to handle all types of HTTP requests, hides the real server endpoint.
- **Drawbacks:** Adds an additional layer (potential latency), requires maintaining an additional server component, can introduce a single point of failure.

#### 4. WebSockets:

- **When to use:** When **_you need real-time bi-directional communication between the client and server_**.
- **Advantages:** Real-time communication, not restricted by the same-origin policy.
- **Drawbacks**: Overkill for simple request-response scenarios, requires a specific server setup to support WebSockets.

---

### Q4) What is the Same-Origin Policy (SOP)?

- The Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.
- The Same-Origin Policy (SOP) is a security mechanism implemented in web browsers **to prevent potentially malicious interactions between documents (or scripts) of different origins**.
- The primary reason for SOP is security.

---

### Q5) What three components of a URL must match for two documents to be considered as having the same origin?

- An origin is determined by the combination of

  1. Protocol (e.g. http: or https:)
  2. Domain (or hostname)
  3. Port

For two pages to have same origin, all three of these parts must match. If any one of these components differs, the two pages do not have the "same origin"

**Examples:**

1.  A script on https://example.com:443 wants to make an XMLHttpRequest to https://example.com:443/api/data. This is allowed under SOP since the protocol, domain, and port are the same.
2.  A script on http://example.com wants to access an element from a page on https://example.com. This is **_disallowed under SOP_** because the **_protocols (http vs. https) are different_**, even though the domain is the same.
3.  A script on https://example.com wants to read the DOM of an iframe with a page from https://sub.example.com. This is disallowed under SOP because the subdomains are different, making them distinct origins.

---

### Q6) What are some exceptions or bypasses to the Same-Origin Policy that browsers permit?

#### Cross-Origin Resource Sharing (CORS):

- A mechanism allowing servers to specify who can access its assets.
- **By setting specific HTTP headers (Access-Control-Allow-Origin and related headers)**, a server can allow certain cross-origin requests.

#### JSONP (JSON with Padding):

- A technique to overcome the SOP by using `<script>` tags to fetch JSON data wrapped in a callback function.
- This is possible because `<script>` tags can load resources cross-origin.
- It's less secure and is being replaced by CORS in modern web applications.

#### Document.domain Property:

- **If two windows/frames have the same parent domain but different subdomains**, they can communicate **_if they both set their document.domain to the parent domain_**.
- However, **they can't reset it back to the original value <u>once changed</u>**.

#### Window.postMessage():

- **_Allows safe cross-origin communication between Window objects_** (e.g., between a page and its iframe or between two tabs).

---

### Q7) How to receive the window postMessage in JavaScript?

1. window. postMessage() — to send the message.
2. window. addEventListener(“message”,callback) — to receive and process the message.

#### Embeddable Elements:

- Some elements like `<img>`, `<script>`, `<link>`, `<video/>` can load resources from different origins.
- The Websocket protocol isn't restricted by the SOP, though the initial handshake is.
- Servers must explicitly agree( using the Sec-WebSocket-Origin header) to establish a connection.

### Service Workers:

- Service workers can intercept network requests and respond to them.
- However **_they are still subject to SOP_** when it comes to fetching resources.
- **To fetch cross origin resources**, the **_<u>external server must support CORS</u>_**.

---

### Q8) Cross-Origin Resource Sharing (CORS):

- a security feature implemented by web browsers that controls how web pages in one origin can request and interact with resources on another origin

#### HTTP Request Headers:

1. **Origin**: Specifies the origin of the request. This is always sent for cross-origin requests
2. **Access-Control-Request-Method**: Used with pre-flight requests, specifying **_which method_** will be used in the actual request.
3. **Access-Control-Request-Headers**: Used with pre-flight requests, specifying **_which HTTP headers will be used_** in the actual request.

#### HTTP Response Headers:

1. **Access-Control-Allow-Origin**: Specifies which origin sites are allowed to access the resource.
   - It can either be a specific origin or a wildcard (for any origin)
2. **Access-Control-Allow-Methods**: Specifies which **HTTP methods** are permitted for the actual request.
3. **Access-Control-Allow-Headers**: Specifies which **HTTP headers** can be used during the actual request.
4. **Access-Control-Allow-Credentials**: Indicates **_whether the browser should include credentials_** (like Cookies or HTTP authentication) with requests

---

### Q9) HOW CORS WORKS?

**Pre-flighted Requests:** before the actual request, **_the browser sends a probe (pre-flight) using the OPTIONS method_** to see if the cross-origin request is safe to send.

- It's **_triggered with non-standard headers_** or request methods beyond the simple ones.

<img src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*dVuIVcHUI_UIMQhQ.png">

---

### Q10) What are the roles of the `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers` headers in CORS?

#### <u>HTTP response headers</u>

#### <u>Access-Control-Allow-Origin:</u>

- **Role**: Specifies **_which origin(s) are allowed_** to access the resource.
- **Values**:
  - A specific origin (e.g., https://example.com)
  - `*` will allow any origin, but this approach is not recommended for sensitive operations
  - `null` (usually indicates that the resources can't be accessed by any website)
- **Note:** When credentials are involved (Cookies or HTTP Authentication) are involved, this header can't use the wildcard `*` value.
- It must specify an explicit origin.

---

#### <u>Access-Control-Allow-Methods:</u>

- **Role**: Indicates **_which HTTP methods are allowed_** when accessing the resource.
- **Values**:
  - A comma-separated list of methods (e.g., `GET`, `POST`, `PUT`, `DELETE`).

**Example:** <u>**_If a server only wants to allow GET and POST methods</u>_** for a specific resource, it would **_send `Access-Control-Allow-Methods`: `GET, POST`_**.

---

#### <u>Access-Control-Allow-Headers:</u>

- **Role**: <u>**_Lists the HTTP headers that can be used_**</u> during the actual request to the resource..
- **Values**:
  - A comma-separated list of HTTP header field names (e.g., `X-Custom-Header, Content-Type`).

**Example:**

- **_If a client-side application wants to send a custom header_** (X-Custom-Header) with its request, **_<u>the server must include this header's name in the Access-Control-Allow-Headers list_**</u> to validate its usage.

#### <u>Requests with credentials</u>

```js
const invocation = new XMLHttpRequest();
const url = 'https://bar.other/resources/credentialed-content/';

function callOtherDomain() {
  if (invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send();
  }
}
```

<img src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*pHv5lBSurq4up5HK.png">

---

### Q11) How can server-side applications restrict which websites can access their resources using CORS?

- using CORS by setting specific CORS headers in their responses.

---

### Q12) How to include cookie in HTTP request using `fetch` or `XMLHttpRequest`?

- Using the Fetch API, you need to **_set the credentials option to `'include'`_**.

```js
fetch('https://example.com/data', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

`'include'`: <u>_Always send user credentials_</u> (cookies, HTTP authentication, and client-side SSL certificates), **_even for cross-origin calls_**.

`'same-origin'`: **_Send user credentials only if the URL is on the same origin_** as the calling script. This is the default for same-origin requests.

`'omit'`: Don’t send any credentials.

---

### Q13) How do cookies and credentials behave in cross-origin requests? And how can a server allow these to be included with CORS?

- **<u>XMLHttpRequest & Fetch API</u>**: When making AJAX requests or using the Fetch API, **you must <u>explicitly indicate that you want to send cookies</u>**.
- For `XMLHttpRequest`, you'd use `withCredentials = true`. For the `Fetch API`, you'd set the `credentials option` to `include`.

**Example Showcase:**

**Client Side:**

- For XMLHttpRequest: `xhr.withCredentials = true;`
- For Fetch API: `{ credentials: 'include' }` as an option in the request.

**Server-side:**

- The **_server must include the header_** `Access-Control-Allow-Credentials: true` in its **_response_**.

**<u>Points to remember:</u>**

- The **_server cannot use the wildcard_** (\*) for `Access-Control-Allow-Origin` when `Access-Control-Allow-Credentials` **_is true_**.
- Instead, it **_must echo back the exact origin_** or **_use a specific known origin_**.

```js
 Example: Access-Control-Allow-Origin: https://example.com.
```

- Ensure the server is configured to handle cookies appropriately (e.g set the HttpOnly flag for Cookies containing sensitive data) to protect them from potential XSS attacks.

---

### What are cookies?

- Cookies are **_small piece of data stored by web browsers on a user's device_** at the request of web servers.
- They serve as **_<u>a way for servers to recognize and remember specific users, and can persist across multiple visits to a website_**</u>.

#### What are cookies used for?

- **Session Management**: To track user sessions, logins, shopping carts, and other user-specific data.
- **Personalization**: To remember user preferences, themes, and other settings.
- **Tracking**: Often used by advertisers to monitor user behavior across sites.
- **Security**: To store tokens or identifiers that can be used to authenticate users.

---

### Q14) How do you send data via cookies?

- When a **_server wants_** to set a cookie, **_it includes a Set-Cookie header in its HTTP response_**.
- This header specifies the name, value, and other attributes of the cookie.

```js
// For example:
Set-Cookie: sessionId=abc123; HttpOnly; Secure; Max-Age=3600;
```

- **_On subsequent requests to the same domain_** (or matching domain, if domain attribute is set), the **_<u>browser includes the cookie data in the Cookie HTTP header</u>_**:

```js
Cookie: sessionId = abc123;
```

#### Pros of passing data through cookies:

- Persistence: **_Cookies <u>can persist across multiple user sessions</u>, making them suitable for remembering user-specific information_**.
- Server-Side Access: **_Easily accessed on the server side during HTTP requests_**.
- Built-in Expiry: Can be set to expire after a certain date or time.
- Security Features: Attributes like Secure (ensures transmission over HTTPS only) and HttpOnly (prevents access from JavaScript) add layers of security.

#### Cons and Limitations of passing data through cookies:

- Size Limit: Each <u>**_cookie is limited to about 4KB_**</u>. The number of cookies (typically 50) and total cookie storage (typically 4KB x 50 = 200KB) per domain are also limited.
- Performance: Every time an HTTP request is made to a domain, **_all cookies for that domain are included in the request, increasing the amount of data sent_**, especially if there are many or large cookies.
- Privacy Concerns: Tracking cookies can be seen as intrusive, leading many users to block or delete them.
- Cross-Site Attacks: **_Without proper security measures_**, **_<u>cookies can be vulnerable to attacks_**</u> like Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).
- Same-Origin Policy Limitation: **Cookies are bound to a specific domain and path**. They can’t be accessed or set by other domains, **_making cross-domain data storage more challenging_**.
- Expiration: **_<u>If not set, cookies can expire when the browser session ends_**</u>, which might not always be desired.

---

### Q15) What is HttpOnly flag? When to use? Limitation?

- Use it when you want to ensure that the cookie is:

1. **Inaccessible via JavaScript:** <u>**_This protects the cookie from being accessed through client-side scripts_**</u>, which can help mitigate certain types of attacks, particularly cross-site scripting (XSS) attacks. If a malicious script runs on your page, it won’t be able to read HttpOnly cookies.
2. **Only sent in HTTP/HTTPS requests:** **_The cookie will only be transmitted in the headers of HTTP/HTTPS requests made to the server_** and cannot be accessed or manipulated from the client side via scripts.

```js
// Node.js - Express Js

res.cookie('name', 'value', { httpOnly: true });
```

#### Limitations of HttpOnly:

- It **_does not protect against Cross-Site Request Forgery (CSRF) attacks_**. For this, you’d **_need other defenses like CSRF tokens_**.
- It **_does not prevent the cookie from being intercepted_** if not using a secure connection.

**<u>Bonus Point:</u>**

- **To ensure cookies are only transmitted over secure connections**, **_<u>use the Secure flag in combination with HttpOnly</u>_**.

---

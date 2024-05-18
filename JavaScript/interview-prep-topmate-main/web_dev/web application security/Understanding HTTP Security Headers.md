### Headers as Browser Security Controls

#### Security in HTTP:

- When developing web applications, your <strong>application depends upon on the communication protocols</strong> that already have a set of defined and implemented standards for how to transfer data and securely manage it.

- Browsers utilize <strong>headers sent over HTTP (securely HTTP connections) </strong>to enforce and confirm such communication standars and policies.

- Using these HTTP headers to increase security for client-side code <strong>is a quick and efficient method to mitigate security vulnerabilities </strong> and implement a defense in depth strategy.

- <strong>A defense in depth</strong> is a security concept in which <strong>multiple layers of security controls</strong> are placed in order to create a better security posture.

---

#### Security headers caveats:

- Using security headers can be a great strategy to help prevent security vulnerabilities. However, <strong>a common mistake is to rely solely on security headers to mitigate issues</strong>
- Effectively responding to the request with a security header depends on the browser to support, implement and adhere to certain specifications to enforce the header.
- You may consult the <strong>Strict Transport Security browser compatibility matrix</strong> to verify the browsers used for your web application are supported.
- <strong>Security headers should be used as a defense in depth security mechanism </strong>that helps add a security control, but they should not be the only defense against vulnerabilities like Cross-Site Scripting

---

```js
- HTTP security headers are a generic tool that can be employed by any technology at the HTTP medium.
- Which includes load balancers, API gateways, reverse proxies, and web application frameworks
```

### Helmet - a Node.js Package for HTTP Security Headers

- If you’re building Node.js web applications with the help of Express, then Helmet is the go-to npm module to use.
- Helmet is a open-source project <strong>consisting of a collection of Express middleware functions</strong> that in turn configure HTTP headers by setting the HTTP response object accordingly.

We are setting the X-Frame options using Helmet built-in <strong>frameguard</strong> method

```js
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(
  helmet.frameguard({
    action: 'sameorigin',
  })
);
```

---

### HTTP Strict Transport Security

- Also known as HSTS, is a protocol standard <strong>which enforces secure connections to the server via HTTP over SSL/TLS.</strong>
- In simple words, **Forces the use of HTTPS** by instructing the browser to only connect to the server over a secure, encrypted connection.
- HSTS is configured and transmitted from the server to any HTTP web client using the <strong>HTTP header Strict-Transport-Security</strong>.
  <br>
- **Implementation**:

  - **Configured via an HTTP header** to inform the browser that the **website should only be accessed over HTTPS**.
    <br>

- This specifies a time interval during which the browser should only communicate over an HTTP secured connection (HTTPS)

```js
When a Strict-Transport-Security header is sent over an insecure HTTP connection, the web browser ignores it because the connection is insecure
```

- After the header has been set it consults a preload service, like Google's to determine whether the website has opted in for HSTS.

---

### The risk

- The risk that may arise when communicating over a secure HTTPS connection is that the <strong>malicious user can perform a Man-In-The-Middle(MITM) attack. </strong>
- This type of attack <strong>downgrades future requests to the webserver </strong> to use an HTTP connection.
- Once the connection is established, the attacker can able to see and read all the data that flows through.
- <strong>A website that uses HTTPS can still create insecure HTTP requests</strong>, however End users would not suspect anything to be inappropriate, but they still exposed to MITM attacks

- We can see that the server returns an HTML file for a login page to the browser. This includes some resources that are accessible over HTTP (submit.png)
- If an attacker is able to perform MITM attack and "sit on the wire" <strong>they will be able to read the un-encrypted traffic that flows through including HTTP requests that include sensitivie data</strong>.
- An even worse scenario would involve the <strong>attacker watching where actual data is being sent and accessing HTTP resources set for POST or PUT endpoints.</strong>

![image](https://user-images.githubusercontent.com/42731246/217484434-218d9a08-79d7-46e1-ad7b-f791fbbfc09e.png)

---

### Solution:

- When a web server want to protect their web clients through a secure HTTPS connection, <strong>they need to send the Strict-Transport-Security header with a given value </strong>(which represents the duration of time in seconds that the web client should send requests with a secure HTTPS connection).

- After the duration has expired, the client no longer sends requests

```js
// For example, to instruct the browser to upgrade all requests sent to the server to HTTPS for the next hour.

Strict-Transport-Security: max-age=3600
```

---

### Helmet Implementation:

- We instruct the Express app to use the hsts middleware and respond to all the requests with <strong>Strict-Transport-Security</strong> header set

- Below is the HSTS middleware to indicate to a web client that it should only send HTTPS requests to our server for the next month.

- If for any reason the browser receives multiple HSTS header directives, it will only respect and enforce the policy based on the first one sent.

- It is common for web servers to have sub-domains to fetch assets from or to make REST API Calls. We would also of course like to protect them and enforce the HTTP requests.

```js
const helmet = require('helmet');

const reqDuration = 2629746000; // 1 month into milliseconds

app.use(
  helmet.hsts({
    maxAge: reqDuration,
  })
);
```

```js
To includeSubDomains we need to add this parameter in the hsts options object
```

```js
- If it is necessary to instruct the browser to disable the Strict-Transport Security, a server can respond with this header's max-age set to 0.
- This will result in the browser expiring the policy immediately and enable access over an HTTP connection.
```

---

#### Practical example of using HTTP Strict Transport Security (HSTS)

- Using HSTS as a browser security control to allow only HTTPS-enabled resources to be fetched from the primary domain for a website.

```js
const http = require('http');
const https = require('https');
var fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
const appRoutes = require('./routes/app.routes.js');

const HTTP_PORT_NUMBER = 80;

const httpApp = express();
httpApp.engine('handlebars', expressHandlebars());
httpApp.set('view engine', 'handlebars');

httpApp.use(
  helmet.hsts({
    maxAge: 86400,
  })
);

var options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

httpApp.use(morgan('dev'));
httpApp.use('/', appRoutes);
httpApp.use(express.static('public'));

const httpServer = http.createServer(httpApp);
httpServer.listen(HTTP_PORT_NUMBER, function () {
  console.log(`Server started on port ${httpServer.address().port}`);
});
https.createServer(options, httpApp).listen(443);
```

### HSTS in a deployed HTTPS application

- The main request to the page https://localhost:443 replies back with a Strict-Transport Security header.
- The request to load this image url http://localhost/harley-davidson-zGzXsJUBQfs-unsplash.jpg gets an internal browser redirect to its HTTPS version because the HSTS version does just that - <strong>it upgrades all requests to their HTTPS counterpart to load them securely.</strong>
- The favicon from http://http.rip/favicon.ico <strong>is blocked from being loaded.</strong>

---

#### HST with expiration time

- By setting the expiration time to zero (maxAge: 0), following are the things going to happen
- It means that Strict-Transport-Security header is set but by setting to zero, it disables it
- The image which have the http url will be loaded from HTTP directly, without any redirect happening to HTTPS
- The favicon is <strong>fetched and displayed for the website</strong>

---

#### X Frame options

- The X Frame options HTTP header was introduced <strong>to mitigate an attack called Clickjacking</strong>
- Clickjacking allows an attacker <strong>to disguise page elements such as buttons and text inputs</strong> by hiding their view behind real pages which render on the screen using iframe HTML element or similar objects.

```js
- The X-Frame options header was never standardized as part of an official specification but many popular browsers today still support it.
- It's successor is the Content-Security-Policy (CSP) header. Generally focus should be on this for newer web apps.
```

#### The risk of Clickjacking

- This is also known as UI redressing, involve misleading the user to perform a seemingly harmless operation.
- In reality, the user is clicking buttons that secretly belong to other elements or typing text into an input field that is under the attacker's control.

Some Common examples of Clickjacking attack are:

- If a bank or email account website doesn't employ X-Frame-Options HTTP header, <strong>then a malicious attacker can render them in an iframe</strong> and place the attacker's own input fields on the exact location of the bank or email website's input field. (When you enter the creds, the attacker records your creds info).
- An insecure web application for video or voice chat can be exploited by Clickjacking <strong>to let the user mistakenly assume they are just clicking around on the screen or playing a game, while in reality, the series of clicks is actually turning on your webcam.</strong>

---

#### The solution

- To mitigate the problem, a web server can respond to browser's request with an X-Frame-Options HTTP header which is to set to the one of the following possible values:

- <strong>DENY</strong>: Specifies that the website can not be rendered in an iframe, frame or object HTML elements.
- <strong>SAMEORIGIN</strong>: Specifies that the website can only be rendered if it is embedded on an iframe, frame, or object HTML element from the <strong>same domain the request originated from.</strong>
- <strong>ALLOW-FROM URI</strong>: Specifies that the <strong>website can be framed and rendered from the provided URI</strong> (You cannot specifity multiple URI values because of limitation is just one)

```js
X-Frame-Options: ALLOW-FROM http://www.mydomain.com
```

```js
X-Frame-Options: DENY
```

#### Helmet Implementation

- Instructing Express to use xframe middleware provided by helmet.
- To set the X-Frame-Options completely deny all forms of embedding.

```js
const helmet = require('helmet');

app.use(
  helmet.frameguard({
    action: 'deny',
  })
);
```

- To allow frames to occur only from the same origin by providing the following options object

```js
action: 'sameorigin';
```

- To allow frames occur from a specified host

```js
action: 'allow-from',
domain: 'https://mydomain.com'
```

---

### Content Security Policy

- Most powerful security feature that browser has implemented in the recent years in mitigating Cross-Site Scripting vulnerabilities.
- With CSP it is possible to prevent various types of attacks, **_such as Cross-Site Scripting (XSS) and data injection attacks_**, by allowing web developers to declare which sources of content are considered trustworthy.
- The implementation of the CSP <strong>renders the use of X-Frame options header obsolete.</strong>
- It is used to <u>**_mitigate the risks associated with the execution of malicious scripts_**</u> on a web page.
- **By defining a policy**, developers can instruct the <u>**_browser to only load resources (like scripts, styles, images, etc.) from specified origins_**.</u>

**Implementation:**

- Developers <u>**_include a Content-Security-Policy header in the HTTP response from the server_**</u>, specifying the allowed sources for various types of content.

#### Some of the issues that can be prevented by setting a CSP policy are:

- Inline JS code specified with script tags and any DOM events which trigger JS execution such as onclick()
- Inline CSS code specified via style tags

### Advantages of using CSP

- With CSP, we can allow many configurations for trusted content. As such, the initial setup can grow up to set of complex directives.

- one of the CSP directive is <strong>connect-src</strong>. It is used to control (which remote servers the browser is allowed to connect to via XMLHttpRequest(XHR) or a tag elements)

- Other script interfaces that are covered by this directive are

```js
Fetch, EventSource, WebSocket, Navigator.sendBeacon();
```

- Acceptable values that we can set for this directive:
- <strong>none</strong>: not allowing remote calls such as XHR at all.
- <strong>self</strong>: Only allow remote calls to our own domain (an exact domain/hostname whereas sub domains aren't allowed)

##### Following is an example of a content security policy being set. It allows the browser to make XHR requests to the website's own domain and to Google API's domain.

```js
Content-Security-Policy: connect-src 'self' https://apis.google.com;
```

- another directive to the control the allowlist for javascript sources is called <strong>script-src.</strong>
- This directive helps to mitigate Cross-Site-Scripting(XSS) attacks by informing the browser <strong>which sources of content to trust when evaluating and executing Javascript source code</strong>
- The script-src control supports the <strong>none</strong> and <strong>self</strong> keywords as values and includes the following options

- <strong>'unsafe-inline'</strong> allow any inline Javascript source code such as script and DOM events triggering onClick() or javascript URIs. It also affects CSS for inline tags

- <strong>'unsafe-eval'</strong> allow execution of code using eval()

- Follwing is the policy for allowing javascript to be executed only from our own domain and from Google (while allowing inline javascript code as well)

```js
<meta
  http-equiv='Content-Security-Policy'
  content="default-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; script-src 'self' https://maps.googleapis.com 'unsafe-inline' 'unsafe-eval';"
/>
```

```js
Note that unsafe-inline directive refers to a website's own javascript sources.
```

<strong>default-src</strong>: where a directive doesn't have a value, it defaults to an open, non-restricting configuration.

- It is safer to set a default for all the unconfigured options, which is where the default-src comes in.

<strong>script-src</strong> a directive to set which script sources we allow to load or execute JS from.

- If it's set to a value of 'self' <strong>then it only allows sources from our own-domain. Also it will not allow inline js tags such as script </strong>
- To enable those, add <strong>unsafe-inline</strong> too.

- It should also be noted that when implementing CSP, <strong>the CSP configuration needs to meet the implementation</strong> of your web application architecture.

- If you deny inline script blocks then your R&D team should be aware of this and comes well prepared. Otherwise it might break features and functionality across code that depends on inline javascript code blocks.

## <img src="https://miro.medium.com/v2/format:webp/0*BKXMd9FkApZwM7JQ.jpg">

#### Helmet Implementation

- We define an allowlist in which javascript code and CSS resources are only allowed to load from the current origin, which is the exact hostname or domain (no sub-domains will be allowed)

```js
const helmet = require('helmet');

app.use(
  helmet.contentSecurityPolicy({
    directives: { scriptSrc: ["'self'"], styleSrc: ["'self'"] },
  })
);
```

<strong>Note:</strong> If no default policy is specified, <strong>then all other types of content policies are open and allowed,</strong> and some content policies which simply don't have a default must be specified to be overridden.

---

##### Let's construct the following content policy for our web application

- By default, allow resources to load only from our own domain origin or from our Amazon CDN.

```js
The defaultSrc refers to all script type sources, such as CSS, iframes, fonts etc;
```

- Javascript resources are <strong>restricted to our own domain and Google's hosted libraries domain </strong> so that we can load JS from Google.

- Because our web applicatiion doesn't need any kind of iframes embedding, we will disable such objects <strong>refers to objectSrc and childSrc</strong>

- Forms should <strong>only be submitted to our own domain origin</strong>

```js
cosnt helmet = require('helmet')

app.use(helmet.contentSecurityPolicy({
  directives:{
    defaultSrc: ["'self'", "https://cdn.amazon.com"],
    scriptSrc: ["'self'", "https://ajax.googleapis.com"],
    childSrc: ["'none'"],
    objectSrc: ["'none'"],
    formAction: ["'none'"],
  }
}))

```

#### Gradual CSP Implementation:

- Your Content Security Policy will grow and change as your web application grows too.

- With the many varies directives, it could be challenging to introduce a policy all at once.

- So instead of touch-n-go enforcement, strive for an incremental approach.

The CSP header has a built-in directive that helps in understanding how your web application makes use of the content policy. This directive is used to track and report any actions performed by the browser that violate the content security policy.

```js
// Do not change anything from below

Content-Security-Policy: default-src 'self'; report-uri https://mydomain.com/report
```

Once the above is added, the browser will send a POST request to the URI provided with a JSON format in the body for anything that violates the CSP.

```js
// With helmet CSP middleware

const helmet = require('helmet');

app.use(
  helmet.csp({
    directives: {
      defaultSrc: ['self'],
      reportUri: 'https://mydomain.com/report',
    },
  })
);
```

- Another important configuration for Helmet when we are still evaluating a CSP <strong>to instruct the browser to only report on content policy violation and not block them.</strong>

```js
// just add reportOnly: true

const helmet = requrie('helmet');

app.use(
  helmet.csp({
    directives: {
      defaultSrc: ['self'],
      reportUri: 'https://mydomain.com/report',
    },
    reportOnly: true,
  })
);
```

### X XSS Protection

- **_Enables_** a browser’s **_built-in Cross-Site Scripting (XSS) protection_**, which helps mitigate XSS attacks.
- Browser specific Cross-Site Scripting protection.
- Used by IE8 and IE9 and allows the XSS filter capabaility that is built into the browser to be toggled on or off.
- Not in active use anymore
- This Security header is simply a server response and it is still effective to employ.

- Turning XSS filtering on for any IE8 and IE9 browsers rendering your web application <strong>requires the following HTTP header</strong>

```js
// Configured via an HTTP header to enable or disable the browser’s XSS protection.
X-XSS-Protection: 1; mode-block
```

##### With helmet, this protection can be turned on using the following snippet.

```js
const helmet = require('helmet');
app.use(helmet.xssFilter());
```

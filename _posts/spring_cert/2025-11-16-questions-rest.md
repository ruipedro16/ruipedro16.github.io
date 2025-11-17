---
layout: post
title: Questions - REST
date: '2025-11-16 23:55:41 +0000'
---

### REST

REST (Representational State Transfer) is an architectural style for distributed systems, especially web services.
It defines a set of constraints that, when applied, give the system specific characteristics such as scalability, interoperability, and simplicity.

- **REST is Scalable**:
- **REST is Interoperable**:
- **REST itself is not a secure architectural style**. It is simply a set of design principles.
REST APIs can be secured, but security is not an inherent property of REST. Security
must be implemented separately, using techniques such as:
  - HTTPS for encrypted transport
  - Authentication
  - Authorization controls
  - Input validation and sanitization
- **REST does not guarantee reliability**.
Reliability must be ensured at the application level or through additional infrastructure.
Because REST relies on HTTP, which can fail,
timeout, or lose messages, it provides no built-in mechanisms for:
  - Guaranteed message delivery
  - Automatic retries
  - Transaction management

#### Which of these are considered safe REST operations?

- **POST**: Incorrect, **POST** is not considered a safe operation as it can create a new
resource or change the state of the system.
- **PUT**: Incorrect, **PUT** is not considered a safe operation as it can update an
existing resource.
- **GET**: Correct, **GET** is considered a safe operation because it does not modify the
state of the resource; it is used to retrieve data.
- **DELETE**: Incorrect, **DELETE** is not considered a safe operation as it removes a
resource from the system.

#### Which of the following HTTP methods are idempotent?

Idempotency is a property of an operation where performing it multiple times has the same effect as performing it once. In the context of HTTP methods, idempotent methods ensure that repeated requests do not result in unintended side effects.

- **POST** is not idempotent because multiple identical requests can result in different outcomes, such as creating multiple resources.
- **DELETE** is idempotent because multiple identical requests will have the same effect: the resource will be deleted (or remain deleted if it no longer exists).
- **PATCH** is not idempotent. The outcome may depend on the current state of the resource, making it non-idempotent.
- **PUT** is idempotent because multiple identical requests will result in the same state of the resource on the server.
- **GET** is idempotent because multiple identical requests will not change the state of the server.

#### Response Codes

- 2xx HTTP response codes indicate successful responses. These codes are used when the server successfully processes a client's request.
- 3xx HTTP response codes indicate redirection. These codes are used when the client must take additional actions to complete the request, such as following a new URL.
- 4xx HTTP response codes indicate client-side errors. These errors occur when the client sends a request that the server cannot process due to issues such as invalid syntax, unauthorized access, or a resource not being found.

- 203: Indicates that the request was successful but the returned meta-information
is from a private overlaid web service.
- 303: Tells the client to look at another URL.
- 403: Represents a forbidden request, indicating that the server understood the
request but refuses to authorize it.
- 503: Indicates that the server is not ready to handle the request, typically due
 to maintenance or overloading.

### RestTemplate

- The RestTemplate class is designed to simplify communication with RESTful web services. It provides methods such as getForObject(), postForEntity(), exchange(), and delete() to handle HTTP requests and responses conveniently.

```java
RestTemplate restTemplate = new RestTemplate();
String response = restTemplate.getForObject(
    "https://api.example.com/data", String.class
);
```

- **RestTemplate supports automatic object mapping using HttpMessageConverters**: RestTemplate automatically serializes Java objects to JSON (or other formats) and deserializes HTTP responses into Java objects using MessageConverters.

- RestTemplate follows a **synchronous** and **blocking** execution model, meaning each HTTP request blocks the calling thread until the response is received. If non-blocking behavior is needed, WebClient (introduced in Spring 5) should be used instead.

- RestTemplate allow sending HTTP requests with custom headers using the exchange() method.

```java
HttpHeaders headers = new HttpHeaders();
headers.set("Authorization", "Bearer token");
HttpEntity<String> entity = new HttpEntity<>(headers);
 
ResponseEntity<String> response = restTemplate.exchange(
    "https://api.example.com/protected-resource",
    HttpMethod.GET,
    entity,
    String.class
);
```

### @ResponseStatus

- @ResponseStatus only sets the HTTP status code for the response
- When a RedirectView is used, it overrides the HTTP status code set by @ResponseStatus. This is because redirects inherently define their own status codes (e.g., 302 Found).
- @ResponseStatus is often used on custom exception classes to map them to specific HTTP status codes. When such an exception is thrown, Spring automatically sets the response status code based on the annotation.
- It can be applied to:
  - **Controller Methods**: To define the HTTP status code for the response when the method is invoked.
  - **Custom Exception Classes**: To map exceptions to specific HTTP status codes.

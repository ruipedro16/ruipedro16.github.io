---
layout: post
title: Spring Web MVC
date: '2025-10-20 09:00:40 +0100'
visible: false
---

## Table of Contents

- [Spreing Boot Autoconfiguration for Web Applications](#spreing-boot-autoconfiguration-for-web-applications)
- [Embedded Servlet Container](#embedded-servlet-container)
- [Starter Dependency](#starter-dependency)
- [Request Processing Lifecycle](#request-processing-lifecycle)
- [Controller Implementation](#controller-implementation)
  - [Arguments injected by Spring](#arguments-injected-by-spring)
  - [Extracting Request Parameters & @RequestParam](#extracting-request-parameters--requestparam)
  - [URI Templates & @PathVariable](#uri-templates--pathvariable)
  - [Method & Parameter Reflexion](#method--parameter-reflexion)
  - [Method Signature Examples](#method-signature-examples)
- [Message Converters](#message-converters)
  - [ResponseEntity](#responseentity)
- [Packaging: JAR & WAR configurations](#packaging-jar--war-configurations)

---

<br/>

- **Web Servlet**: [Spring Web MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- **Web Reactive**: [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html)

### Spreing Boot Autoconfiguration for Web Applications

- Sets up a `DispatcherServlet`
- Sets up internal configuration to support controllers
- Sets up default resource locations (images, CSS, JavaScript)
- Sets up default Message Converters

### Embedded Servlet Container

Spring Boot supports embedded servlet container.

### Starter Dependency

- Ensures Spring Web and Spring MVC are on the classpath.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

- `jackson`
- Tomcat is the default web container. We can, for example, exclude Tomcat and
use Jetty instead. Spring Boot will automatically detect Jetty and use it.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <!-- Excludes Tomcat  -->
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Adds Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

### Request Processing Lifecycle

- As developers, we only need to implement controllers.
- Every request will go through the **Dispatcher Servlet**, which will then delegate to the controllers. The controllers will eventually return a domain object, which will then be delegated to the **Message Converter**. The Message Converter will convert this object other formats (e.g. JSON, XML).
- Common message-converters are setup automatically if found on the classpath:
  - Jackson for JSON, XML
  - JAXB for XML
  - GSON for JSON

![](/assets/img/request-lifecycle.png)

### Controller Implementation

- Controllers are annotated with `@Controller` (or `@RestController`).
- `@Controller` is a `@Component`, so it will be found during component-scanning.
- `@GetMapping` tells Spring what method to use to proccess HTTP GET requests.
  - `@PostMapping`
  - `@DeleteMapping`
  - `@PutMapping`
- `@ResponseBody` defines a REST Response, preventing Spring from rendering a view.
If we use `@RestConmtroller`, we can ommit the `@ResponseBody` annotation on the
return type of each method.

```java
@Controller
public class AccountController {

    @GetMapping("/accounts")
    public @ResponseBody List<Account> list() { 
        // ... 
    }
}
```

```java
@RestController
public class AccountController {

    @GetMapping("/accounts")
    public List<Account> list() { 
        // ... 
    }
}
```

#### Arguments injected by Spring

- The `Principal user` argument is injected by Spring
- Arguments that can be injected include `HttpServletRequest`, `HttpSession`, `Principal`, `Locale`

```java
@RestController
public class AccountController {

    @GetMapping("/accounts")
    public List<Account> list(Principal user) { 
        // ... 
    }
}
```

#### Extracting Request Parameters & @RequestParam

- We can `@RequestParam` to extract request parameters from the request URL (this
performs type conversion).
- Example of calling URL: `http://localhost:8080/acount?userid=1234`

```java
@RestController
public class AccountController {

    @GetMapping("/account")
    public List<Account> list(@RequestParam("userid") int userId) { 
        // ... 
    }
}
```

#### URI Templates & @PathVariable

- Values can be extracted from the request URL based on URI Templates. We use
`{...}` for placeholders and `@PathVariable`
- Example of calling URL: `http://localhost:8080/accounts/98765`

```java
@RestController
public class AccountController {

    @GetMapping("/accounts/{accountId}")
    public Account find(@PathVariable("accountId") long id) { 
        // ... 
    }
}
```

#### Method & Parameter Reflexion

- See [Documentation](https://docs.oracle.com/javase/tutorial/reflect/member/methodparameterreflection.html)
- We can ommit the value of the annotations if it matches the method parameter name:
- Example of calling URL: `http://localhost:8080/acounts/1234?overdrawn=true`

```java
@RestController
public class AccountController {

    @GetMapping("/accounts/{userId}")
    public List<Account> find(@PathVariable long userId,
                              @RequestParam boolean overdrawn) { 
        // ... 
    }

}
```

#### Method Signature Examples

- `@RequestHeader`: <!-- TODO: FIXME: -->
- We can add `required=false` to `@RequestParam`. In this case, if the value is
not specified, it will be `null` (otherwise, Spring would have thrown an
exception --- request parameters are mandatory by default). Because we need to be
able to use `null` as value, we cannot use `int`; instead, we need to use the
`Integer` wrapper.

```java
// http://localhost:8080/accounts
@GetMapping("/accounts")
public List<Account> getAccounts() {
    // ...
}

// http://localhost/orders/1234/items/2
@GetMapping("/orders/{id}/items/{itemId}")
public OrderItem item( @PathVariable("id") long orderId,
                       @PathVariable int itemId,
                       Locale locale, // injected by Spring
                       @RequestHeader("user-agent") String agent
) {
    // ...  
}

@GetMapping("/suppliers")
public List<Supplier> getSuppliers(
        @RequestParam(required=false) Integer location, // null if not 
                                                        // specified
        Principal user,
        HttpSession session
) {
    // ...
}
```

### Message Converters

- **Problem**: <!-- TODO: FIXME: Minuto 17:48 de output-merged.mp4 deste capitulo -->

- **Solution**: <!-- TODO: FIXME: Minuto 17:48 de output-merged.mp4 deste capitulo -->
  - Autoconfigured by spring Boot (except protocol buffers)
  - Decouples the processing logic from the conversion logic
  - MediaType <!-- Minuto 19: Como e que o formato e definido -->

#### ResponseEntity

We can use `ResponseEntity` to manually set headers and control response content.

- `ok()` sets the HTTP Status 200 OK.

```java
ResponseEntity<String> response =
        ResponseEntity.ok()
        .contentType(MediaType.TEXT_PLAIN)
        .body("Hello Spring");
```

We can combine `ResponseEntity` with domain objects and return it from our
controller methods:

```java
@GetMapping("/store/orders/{id}")
public ResponseEntity<Order> getOrder (@PathVariable long id) {
    Order order = orderService.find(id);

    return ResponseEntity
            .ok()
            .lastModified(order.lastUpdated())
            .body(order);
}
```

### Packaging: JAR & WAR configurations

<!-- Nao entendi mt bem isto, rever -->

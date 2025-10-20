---
layout: post
title: Spring Web MVC
date: '2025-10-20 09:00:40 +0100'
visible: false
---

## Table of Contents

- [Embedded Servlet Container](#embedded-servlet-container)
- [Starter Dependency](#starter-dependency)
- [Request Processing Lifecycle](#request-processing-lifecycle)
- [Controller Implementation](#controller-implementation)

---

<br/>

- **Web Servlet**: [Spring Web MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- **Web Reactive**: [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html)

### Embedded Servlet Container

Spring Boot supports embedded servlet container.

### Starter Dependency

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

- `jackson`
- Tomcat

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
- `@ResponseBody` defines a REST Respose

```java
@Controller
public class AccountController {

    @GetMapping("/accounts")
    public @ResponseBody List<Account> list() { 
        // ... 
    }
}
```

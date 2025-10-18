---
layout: post
title: Spring Boot
date: '2025-10-18 19:40:52 +0100'
visible: false
---

- Spring Boot taken as "opinionated" view of the Spring platform and 3rd-party
libraries.
- Handles most low-level, *predictable*  set-up.

### Dependency Management

- **Fine-grained dependency management**: Define the dependencies explicitly
yourself -- find the correct version from the starter.

#### Starter Dependencies

- Here, we don't need to specify the version -- it is defined by the parent.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```

### Auto-Configuration & @EnableAutoConfiguration

- `@SpringBootConfiguration` extends `@Configuration`.

### Integration Testing

### Logging

- Add the following in `application.properties`:

```
logging.level.root=WARN
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=ERROR
```
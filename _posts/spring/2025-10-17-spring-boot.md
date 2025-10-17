---
layout: post
title: Spring Boot
date: '2025-10-17 23:16:45 +0100'
visible: false
---

- Spring Boot taken as "opinionated" view of the Spring platform and 3rd-party
libraries.
- Hnadles most low-level, *predictable*  set-up.

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

### Auto-Configuration

### Integration Testing

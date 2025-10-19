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

#### Spring Boot Parent POM

- Defines versions of key dependencies
- Sets up the Java version
- Defines properties for dependencies, e.g. `${spring-framework.version}`

```xml
<parent>
</parent>
```

#### Starter Dependencies

- Starters simplify dependency management.

- Starters have the preffix `spring-boot-starter-`. For example:
  - `spring-boot-starter-jdbc`
  - `spring-boot-starter-data-jpa`
  - `spring-boot-starter-web`

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
- `@ComponentScan` can take as argument the base package for configuration scanning,
e.g.`@ComponentScan("example.config")`

```java
@SpringBootConfiguration
@ComponentScan
@EnableAutoConfiguration
public class Application {
    public static void main(String[] args) { 
        SpringApplication.run(Application.class, args);
    }
}
```

Instead, we could write:

```java
@SpringBootApplication(scanBasePacakges="example.config")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

<!-- TODO: FIXME: Footnote a explicar o que e o classpath -->

### Packaging

- **Fat JAR**: The fat JAR contains all the dependencies, including Tomcat for the
web application. We can create a fat JAR with Maven by running `mvn package`, or with Gradle by running `gradle assemble`. This creates to JAR files
  - `my-app.jar`: this is the executable fat JAR. It contains *all* the dependecies.
  - `my-app.jar.original`: Does not include the dependencies.

#### Maven Plugin

- Adds the `spring.boot:run` goal to run the application without packaging it first.

### Integration Testing

- We use the `@SpringBootTest` annotation instead of `@SpringJUnitConfig`.
This annotation can take as argument the entry point to the application.

```java
@SpringBootApplication(scanBasePackages="transfers")
public class Application {
    // Bean methods
}

// ----------------------------------------------------------------

@SpringBootTest(classes=Application.class)
public class TransferServiceTests {
    @Autowired
    private TransferService transferService;

    @Test
    public void successfulTransfer() {
        TransferConfirmation conf = transferService.transfer(...);

        // ...
    }
}
```

### Logging

- Add the following in `application.properties`:

```

logging.level.root=WARN
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=ERROR

```

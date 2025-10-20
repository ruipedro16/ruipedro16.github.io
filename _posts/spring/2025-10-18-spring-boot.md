---
layout: post
title: Spring Boot
date: '2025-10-18 19:40:52 +0100'
visible: false
---

## Table of Contents

- [Dependency Management](#dependency-management)
  - [Spring Boot Parent POM](#spring-boot-parent-pom)
  - [Starter Dependencies](#starter-dependencies)
- [Auto-Configuration & @EnableAutoConfiguration](#auto-configuration--enableautoconfiguration)
- [Packaging](#packaging)
  - [Maven Plugin](#maven-plugin)
- [Integration Testing](#integration-testing)
- [Application Properties](#application-properties)
  - [Profile-specific configurations](#profile-specific-configurations)
  - [Precedence](#precedence)
- [@ConfigurationProperties](#configurationproperties)
- [More on Autoconfiguration](#more-on-autoconfiguration)

---

<br/>

- Spring Boot taken as "opinionated" view of the Spring platform and 3rd-party
libraries.
- Handles most low-level, *predictable*  set-up.
- **Dependency management** and **autoconfiguration**

### Dependency Management

- **Fine-grained dependency management**: Define the dependencies explicitly
yourself -- find the correct version from the starter.  

#### Spring Boot Parent POM

- Defines versions of key dependencies
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

We can ommit the `classes` parameter in `@SpringBootTest`. In that case:

- `@SpringBootTest` searches for `@SpringBootConfiguration` class, and creates
the application context for the test provided the configuration is in a package
above the test.

- Only one `@SpringBootConfiguration` is allowed in the hierarchy. (We usually
only have one class annotated with `@SpringBootConfiguration`, which is the
entrypoint to the application. )

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

### Application Properties

- Properties can be defined to supplement autoconfiguration or
override autoconfiguration.

```
# Set the log level for all modules 
logging.level.root=WARN

logging.level.org.springframework.web=DEBUG

logging.level.org.hibernate=ERROR

spring.sql.init.schema-locations:classpath:rewards/schema.sql

spring.sql.init.data-locations:classpath:rewards/data.sql
```

Instead, we can use the YAML format (see  [this](https://mageddo.com/tools/yaml-converter)
to convert between properties and YAML format). In this case, the indentation
must be 2 spaces:

```yaml
logging:
  level:
    org:
      hibernate: ERROR
      springframework:
        web: DEBUG
    root: WARN

spring:
  sql:
    init:
      schema-locations: classpath:rewards/schema.sql
      data-locations: classpath:rewards/data.sql
```

#### Profile-specific configurations

```yaml
```

#### Precedence

Spring Boot selects properties in the following order (simplified):

- Devtools settings
- `@TestPropertySource` and `@SpringBootTest` properties
- Command line arguments
- `SPRING_APPLICATION_JSON` (inline JSON properties).
- `ServletContext` / `ServletConfig` parameters.
- JNDI attributes from `java:comp/env`
- Java System properties
- OS environment variables
- Profile-specific application properties
- Application properties / YAML
- `@PropertySource` files
- `SpringApplication.setDefaultProperties`

### @ConfigurationProperties

When you read multiple properties with the same prefix, using `@Value` repeatedly
can become verbose and repetitive. In this case, we are always repeating
the `rewards.client` preffix.

```java
@Configuration
public class RewardsClientConfiguration {
    @Value("${rewards.client.host}") 
    String host;

    @Value("${rewards.client.port}") 
    int port;

    @Value("${rewards.client.logdir}") 
    String logdir;
    
    @Value("${rewards.client.timeout}") 
    int timeout;

    // ...
}
```

This can be simplified using the `@ConfigurationProperties` annotation, which
binds all properties with a common prefix to a single class.

```java
@ConfigurationProperties(prefix="rewards.client")
public class ConnectionSettings {
    private String host;
    private int port;
    private String logdir;
    private int timeout;

    // ...
}
```

Note that this class (in this case `ConnectionSettings`) must be a Spring-managed
bean that can be injected in other configuration classes. To do so, we wither use:

- `@EnableConfigurationProperties` on the application class:

```java
@SpringBootApplication
@EnableConfigurationProperties(ConnectionSettings.class)
public class Application {
    // ...
}
```

- `@ConfigurationPropertiesScan` on the application class:

```java
@SpringBootApplication
@ConfigurationPropertiesScan
public class Application {
    // ...
}
```

- `@Component` on the properties class itself:

```java
@Component
@ConfigurationProperties(prefix="rewards.client")
public class ConnectionSettings {
    // ...
}
```

<!-- TODO: Talk about relaxed binding -->

### More on Autoconfiguration

Spring-provided auto-configuration classes:

- `@Configuration` classes with conditions
- We can create our own custom auto-configuration classes

- Conditions include
  - Do classpath cointents include specific classes?
  - Are some properties set?
  - Are some beans already configured (or not configured)?

```java
// Create JdbcTemplate bean only when DataSource bean already exists
@Bean
@ConditionalOnBean(DataSource.class)
public JdbcTemplate jdbcTemplate(DataSource dataSource) {
    return new JdbcTemplate(dataSource);
}
```

Other include:
<!-- TODO: Explain what each annotation means -->
- `@Profile`
- `@ConditionalOnMissingBean`
- `@ConditionalOnClass`
- `@ConditionalOnMissingClass`
- `@ConditionalOnProperty`

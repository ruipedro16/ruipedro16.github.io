---
layout: post
title: Questions
date: '2025-11-04 02:48:32 +0000'
visible: false
---

### Spring Annotations

- **Stereotype annotations**:

- The @Controller annotation is a stereotype annotation like @Component.
It serves as a specialization of @Component, meaning Spring automatically detects classes annotated with @Controller during component scanning and registers them as Spring beans. This enables them to participate in dependency injection and request handling within a Spring MVC application

- `@PropertySource`: Used to add a set of name / value pairs to the Spring Environment from an external source.

```java
@Configuration
@PropertySource("classpath:custom.properties")
public class AppConfig {
 
    @Value("${custom.property}")
    private String customProperty;
 
    @Bean
    public MyBean myBean() {
        System.out.println("Custom Property: " + customProperty);
        return new MyBean();
    }
}
```


### Bean Creation

- A Spring bean can be  explicitly created using `@Bean` annotated methods within
a Spring <u>configuration class</u>.
- While `@Autowired` is used to <u>inject dependencies into methods or fields</u>,
it does not create beans. Bean creation is managed through annotations like `@Component` or `@Bean`.

### Dependency Injection

- Constructor injection is preferred over field injection to support unit testing



### Testing

- `@SpringBootTest` is typically used for integration testing as it loads the full
`ApplicationContext` and allows testing the application in a fully initialized
environment.
- @SpringBootTest without any configuration classes expects there is only one class annotated with @SpringBootConfiguration in the application. If no specific configuration classes are provided, @SpringBootTest will look for a single class annotated with @SpringBootConfiguration (or its meta-annotation, @SpringBootApplication). If multiple configuration classes are found, an exception will be thrown unless explicitly specified.

### Security

- Spring Security processes URL patterns in the order they are defined. The most specific rules should be defined first, followed by the least specific rules, as the first matching rule is applied.

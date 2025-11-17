---
layout: post
title: Questions - Spring Autoconfiguration
date: '2025-11-17 00:28:27 +0000'
---

```java
@Configuration
@ConditionalOnClass(HelloService.class)
public class HelloAutoConfig {
 
    @ConditionalOnMissingBean(HelloService.class)
    @Bean
    HelloService helloService() {
        return new TypicalHelloService();
    }
}
```

- The @ConditionalOnMissingBean annotation ensures that the helloService() method defines a HelloService bean only if no other bean of the same type exists in the ApplicationContext. It does not replace existing beans; instead, it allows the creation of a bean only when one is not already present.
- The @ConditionalOnClass(HelloService.class) annotation specifies that the HelloAutoConfig class is applied only when the HelloService class is present on the classpath. This condition prevents the auto-configuration from being applied when the necessary class dependencies are absent.

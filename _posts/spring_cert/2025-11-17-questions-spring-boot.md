---
layout: post
title: Questions - Spring Boot
date: '2025-11-17 00:20:39 +0000'
---

### Property Files

- Spring Boot will automatically load application.properties or application.yaml from the classpath root, src/main/resources, or the config/ directory. These are the primary configuration files for a Spring Boot application
- While Spring Boot supports a config/ directory for configuration files, it does not look for config.properties or config.yml specifically. Instead, it looks for application.properties or application.yml in the config/ directory.
- Use Spring profiles to manage environment-specific configurations (e.g., application-dev.properties, application-prod.yml).

#### Default Locations for Configuration Files in Spring Boot

- By default, Spring boot looks for configuration files named application.properties or application.yml in the following locations (in order of precedence):
  - /config directory in the current directory:
  - Current directory
  - config directory in the classpath:
  - Classpath root:

- If you need to use a custom file name, you can specify it using the spring.config.name property.

```shell
java -Dspring.config.name=myconfig -jar myapp.jar
```

- You can also specify a custom location for configuration files using the spring.config.location property.

```shell
java -Dspring.config.location=classpath:/custom/ -jar myapp.jar
```

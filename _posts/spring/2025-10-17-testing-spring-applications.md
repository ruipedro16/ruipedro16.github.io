---
layout: post
title: Testing Spring Applications
date: '2025-10-17 17:19:10 +0100'
visible: false
---

## Table of Contents

- [Profile Activation](#profile-activation)

---

<br/>

- JUnit 5 ignores all JUnit 4 annotations.
- JUnit 5 also introduces the new annotations:
  - `@DisplayName`:
  - `@Nested`:
  - `@ParameterizedTest`:

| JUnit 4        | JUnit 5       |
|----------------|---------------|
| `@Before`      | `@BeforeEach` |
| `@BeforeClass` | `@BeforeAll`  |
| `@After`       | `@AfterEach`  |
| `@AfterClass`  | `@AfterAll`   |
| `@Ignore`      | `@Disabled`   |

- The `@SpringJUnitConfig` annotation combines the `@ExtendWith(SpringExtension.class)`
annotation from JUnit 5, and `@ContextConfiguration` from Spring. It takes as
argument a configuration class to bootstrap the application context. If no argument
is provided, Spring will look for an embedded configuration class inside the test
class.

```java
@SpringJUnitConfig(TestInfrastructureConfig.class)
public class NetworkTests {
    // ...
}
```

```java
@SpringJUnitConfig
public class NetworkTests {
    // ...

    @Configuration
    @Import({
        TestInfrastructureLocalConfig.class,
        TestInfrastructureJndiConfig.class
        OtherConfig.class
    })
    static class TestInfrastructureConfig {
        // Spring Beans defined here
    } 
}
```

- The `@SpringJUnitConfig` annotation removes the need for `setUp()` and
`tearDown()` that are used to create and close the application context, respectively.
This means that both of these implementationsc are equivalent.

```java
public class NetworkTests {
    private ConfigurableApplicationContext context;

    @BeforeEach 
    public void setUp() {
        context = SpringApplication.run(TestInfrastructureConfig.class);
    }

    @AfterEach
    public void tearDown() throws Exception {
        if (context != null) {
            context.close();
        }
    }

    // ...
}
```

```java
@SpringJUnitConfig(TestInfrastructureConfig.class)
public class NetworkTests {
    // We don't need the reference to the context anymore
    // But the Spring Beans now need to be annotated with @Autowired
}
```

### Profile Activation with @ActiveProfiles

- Only beans matching an active profile and b eans with no profile are loaded.

```java
@SpringJUnitConfig(DevConfig.class)
@ActiveProfiles("jdbc")
public class TransferServiceTests {
    // ...
}
```

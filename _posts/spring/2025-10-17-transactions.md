---
layout: post
title: Transaction Management
date: '2025-10-17 23:16:45 +0100'
visible: false
---

## Table of Contents

- [What are transactions](#what-are-transactions)
- [Spring Transaction Management](#spring-transaction-management)
  - [@Transactional Configuration](#transactional-configuration)

---

<br/>

### What are transactions

A transaction is a sequence of one or more  operations (e.g. reading, writing,
updating, or deleting data) that are treated as a single, indivisible action.
**It enables *concurrent* access to a *shared* resource**.

- If all operations within the unit are successful, the transaction is committed, and all changes are permanently saved to the database.
- If any operation fails due to an error (a runtime exception, constraint violation, etc.), the transaction is rolled back, and the database is restored to the exact state it was in before the transaction started.
- **ACID principles**:
  - **Atomic**: transaction is treated as a single, atomic, indivisible action.
  It either fully succeeds (commits) or fully fails (rolls back). This prevents
  **partial failures**. If an error or crash occurs mid-transaction, Atomicity
  ensures the system's state remains unchanged.
  - **Consistent**: A transaction must bring the database from one valid state
  to another valid state. Database integrity constraints are never violated.
  - **Isolated**: <!-- TODO: FIXME: -->
  - **Durable**: Once a transaction has been committed, its changes are
  permanent.

### Spring Transaction Management

- Spring separates transaction *demarcation* (expressed via AOP) from
transaction *implementation*.
- The `PlatformTransactionManager` abstraction hides implementation details.
Multiple implementations available:
  - `DataSourceTransactionManager`
  - `JmsTransactionManager`
  - `JpaTransactionManager`
  - `JtaTransactionManager`
  - `WebLogicJtaTransactionManager`
  - `WebSphereUowTransactionManager`

#### @Transactional Configuration

- We need to add `@EnableTransactionManagement` to a configuration class.
- We have to to declare a `PlatformTransactionManager` bean and declare the
transactional methods -- either using annotations (recommend), or following a
programmatic approach.
  - The bean ID `transacionManager` is the recommended name.

- We use `@Transactional` to define transaction boundaries.
  - **NOTE** This annotation comes from
  `org.springframework.transaction.annotation`, not from
  `javax.transaction.Transactional`.

```java
public class RewardNetworkImpl implements RewardNetwork {
    @Transactional
    public RewardConfirmation rewardAccountFor(Dining d) {
        // atomic unit-of-work
    }
}

//

@Configuration
@EnableTransactionManagement
public class TxnConfig {  
    // The DataSource bean must be defined somehwere else
    @Bean
    public PlatformTransactionManager transactionManager(
            DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

- We can also annotate the class with `@Transactional`, which applies the
`@Transactional` annotation to all methods declared by the interface.
Alternatively, since Spring Framework 5.0, `@Transactional` can be declared on
the interface instead.
  - We can still override attributes at the method level.

```java
@Transactional(timeout=60) // default settings
public class RewardNetworkImpl implements RewardNetwork {
    
    public RewardConfirmation rewardAccountFor(Dining d) {
        // atomic unit-of-work
    }
    
    @Transactional(timeout=45) // override attributes at method level
    public RewardConfirmation updateConfirmation(RewardConfirmantion rc) {
        // atomic unit-of-work
    }
}
```

<!-- TODO: FIXME: Esta frase ta pessima -->
- The target service is wrapped in a service and uses the `around` advice,
 meaning we do things before and after delegating to the target.

![](/assets/img/txn.png)

- The proxy implements the following behaviour:
  - Transaction started before entering the method
  - Commit at the end of the method
  - Rollback if the methods throw a `RuntimeException`. This is the default
    behaviour, but it can be overriden.
    - Checked exception do not cause a rollback.

### Transaction Propagation

- What happens when a method annotated with `@Transactional` calls another
transactional method?
- Transaction propagation in Spring is a mechanism that dictates how transactional
methods interact with a current transaction (if one exists) or how they should
start a new one. It's defined by the `Propagation` parameter in the
`@Transactional` annotation.

<!-- Fiquei no minuto 14:29 -->

### Overriding Rollback Rules

```java
public class RewardNetworkImpl implements RewardNetwork {
    @Transactional(rollbackFor=MyCheckedException.class,
                   noRollbackFor={JmxException.class, MailException.class})
    public RewardConfirmation rewardAccountFor(Dining d) throws Exception {
        // ...
    }
}
```

<!-- O Lab comeca no 20 -->

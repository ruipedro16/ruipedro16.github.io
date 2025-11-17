---
layout: post
title: Questions - Transactions
date: '2025-11-15 03:32:29 +0000'
---

### Local & Global Transactions

- Global transaction can span through multiple databases.
- Local transactions are confined to a single transactional resource, typically a single database connection.

### Transaction Propagation

In Spring, the `@Transactional` annotation supports different propagation behaviors,
which determine how transactions are managed when a method is called within the
context of an existing:

- `Propagation.REQUIRES_NEW`:
  - **Always Starts a New Transaction**: A new transaction is always started, regardless
  of whether an active transaction exists.
  - **Suspends Existing Transactions**: If an active transaction exists, it is suspended
  before the new transaction starts. The existing transaction is resumed after
  the new transaction completes.
  - **Independent Commit/Rollback**: The new transaction is independent of the existing
  transaction. Its commit or rollback does not affect the outer transaction.
  - **No Exception for Missing Transactions**: If no active transaction exists,
  `Propagation.REQUIRES_NEW` simply starts a new transaction.

| Propagation Option | Transaction Presence | New Transaction Created? | Execution Behavior |
| :--- | :--- | :--- | :--- |
| **REQUIRED** | Supports current transaction. | Yes, if none exists. | Runs transactionally. |
| **SUPPORTS** | Supports current transaction. | No. | Runs non-transactionally if none exists. |
| **MANDATORY** | **Requires** current transaction. | No. | Throws exception if none exists. |
| **REQUIRES\_NEW**| Suspends current transaction (if exists). | **Always** creates a new, independent one. | Runs transactionally (in new transaction). |
| **NOT\_SUPPORTED**| Suspends current transaction (if exists). | No. | Runs **non-transactionally**. |
| **NEVER** | Requires **no** current transaction. | No. | Throws exception if a transaction exists. |
| **NESTED** | Supports current transaction. | Yes, as a savepoint/nested transaction. | Behaves like **REQUIRED** if no transaction exists. |

### Transaction Isolation

Transaction isolation levels define the degree to which the operations in one
transaction are isolated from those in other transactions. The isolation level
determines the visibility of intermediate changes made by one transaction to
other concurrent transactions.

- **Phantom reads**
- **Non-repeatable reads**
- **Dirty reads** occur when a transaction reads data that has been modified but
not yet committed by another transaction.

Spring has the following *Isolation Levels* (from lowest to highest isolation level):

- **Read uncommitted**: Allows dirty reads, meaning a transaction can read
uncommitted changes made by another transaction. Example issue: Transaction A reads
data modified by Transaction B, but Transaction B rolls back, leaving Transaction A
with invalid data.
  - **Issues**: Allows dirty reads, non-repeatable reads, and phantom reads.

- **Read committed**: Prevents dirty reads by ensuring that only committed changes
are visible to other transactions. Default isolation level in many databases,
including PostgreSQL and SQL Server.
  - **Issues**: Allows non-repeatable reads and phantom reads.

- **Repeatable Reads**: Prevents dirty reads and non-repeatable reads by ensuring
that data read once in a transaction cannot be modified by other transactions
until the transaction completes.
  - **Issues**: Allows phantom reads.

- **Serializable**: Provides the highest level of isolation by ensuring complete
isolation between transactions. Prevents dirty reads, non-repeatable reads, and
phantom reads, but at the cost of reduced concurrency.

| Isolation Level | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
| :--- | :--- | :--- | :--- |
| **READ_UNCOMMITTED** | Allowed | Allowed | Allowed |
| **READ_COMMITTED** | Not Allowed | Allowed | Allowed |
| **REPEATABLE_READ** | Not Allowed | Not Allowed | Allowed |
| **SERIALIZABLE** | Not Allowed | Not Allowed | Not Allowed |

#### Which two annotations can be applied to a class to enable Spring's annotation-driven transaction management?

In Spring, annotation-driven transaction management allows developers to manage
transactions declaratively using the `@Transactional` annotation. To enable this
capability, the following annotations are used:

- `@Configuration`:
  - Marks the class as a source of bean definitions.
  - It is required when using `@EnableTransactionManagement` to configure
  transaction management.
- `@EnableTransactionManagement`
  - When `@EnableTransactionManagement` is used, Spring scans for `@Transactional`
  annotations and applies transactional behavior to the annotated methods or classes.

#### Which of the following annotations should be added/changed on top of your configuration class in order to enable the usage of @Transactional?

- @EnableTransactionManagement
- None of the above if you use Spring Auto-Configuration, then transactions are enabled by default
  - If you use Spring Auto-Configuration, transactions are enabled by default, so there is no need to add or change any annotations to enable the usage of @Transactional. This option is correct for scenarios where transactions are automatically enabled.

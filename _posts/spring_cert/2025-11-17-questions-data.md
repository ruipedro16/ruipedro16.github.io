---
layout: post
title: Questions - Spring JDBC
date: '2025-11-17 00:08:15 +0000'
---

- Spring Data implementations exist for many data storage types, such as MongoDB, Neo4j, and Redis. Spring Data is not limited to relational databases. There are implementations for:
  - Spring Data JPA (for relational databases with JPA and Hibernate)
  - Spring Data MongoDB (for NoSQL databases)
  - Spring Data Neo4j (for graph databases)
  - Spring Data Redis (for in-memory key-value stores)

<br/>

- Spring Data can greatly reduce the amount of "boilerplate" code typically needed for data access:
  - Spring Data provides a repository abstraction that eliminates the need for writing repetitive CRUD operations.
  - It allows automatic generation of query methods based on method names.
  - The CrudRepository and JpaRepository interfaces reduce boilerplate code for data access.

### JdbcTemplate

- JdbcTemplate does not generate SQL statements; instead, the JdbcTemplate provides methods for query execution.
JdbcTemplate offers various methods to execute SQL queries, such as queryForObject(), query(), and update(), facilitating interaction with the database. JdbcTemplate can perform various database operations, including INSERT, UPDATE, and DELETE statements, allowing for comprehensive data manipulation.
- **The JdbcTemplate provides the ability to work with result sets**: JdbcTemplate facilitates iteration over ResultSet instances and extraction of returned parameter values, simplifying result set handling.
- JdbcTemplate catches SQLException instances and translates them into unchecked exceptions within the org.springframework.dao hierarchy, relieving developers from mandatory exception handling.
-

---
layout: post
title: JdbcTemplate
date: '2025-10-17 17:40:46 +0100'
visible: false
---

- Construcor: `JdbcTemplate(DataSource dataSource)`.
- See [docs](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)

| Method Signature | Description |
|------------------|-------------|
|`void setQueryTimeout(int queryTimeout)` | Set the query timeout (seconds) for statements that this `JdbcTemplate` executes. Default is -1, indicating to use the JDBC driver's default.|
|`int getQueryTimeout()` | Return the query timeout (seconds) for statements that this JdbcTemplate executes. |
| `Map<String,Object> queryForMap(String sql)` | |
| `T queryForObject(String sql, RowMapper<T> rowMapper)` | |

### Functional Interfaces

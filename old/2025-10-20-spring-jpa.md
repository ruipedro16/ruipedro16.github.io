---
layout: post
title: Spring JPA
date: '2025-10-20 09:16:32 +0100'
visible: false
---

#### Question 01 - What is the difference between checked and unchecked exceptions? Why does Spring prefer unchecked exceptions? What is the data access exception hierarchy?

#### Question 02 - How do you configure a DataSource in Spring? Which bean is very useful for development/test databases?

- Have the `DataSource` bean

- `EmbdeddedDataBaseBuilder`: Useful for testing

#### Question 03 - What is the Template design pattern and what is the JDBC template?

- Encapsulate algorithm with its steps in such a way that
- **NOTE:** See Strategy Design Pattern

<!-- TODO: FIXME: Nao entendi o ultimo paragrafo dos slides -->

<!-- TODO: Adicionar o construtor de JdbcTemplate que recebe uma dataSource -->

#### Question 04 - What is a callback? What are the three JdbcTemplate callback interfaces that can be used with queries? What is each used for?

- It used to be implemented (in C++) as a pointer to a function

- **Jdbc Template Callbacks that can be used with queries:**
  - The difference between `RowMapper` and `RowCallbackHandler` is the method signature -- `RowMapper<T>` returns `T`, while `RowCallbackHandler` returns `void`. In addition, `RowMapper` is stateless, while `RowCallbackHandler` is stateful.

  - The difference between `ResultSetExtractor` and `RowMapper` and `RowCallbackHandler` is that `ResultSetExtractor` is for processing the entire `ResultSet` data, while `RowMapper` and `RowCallbackHandler` are used on a per-row basis:
    - We should not call `ResultSet.next()` on `RowMapper` and  `RowCallbackHandler`
    - We can call `ResultSet.next()` on `ResultSetExtractor` to move between rows.

#### Question 05 - Can you execute a plain SQL statement with the JDBC template?

Yes, JDBC Template allows execution of plain SQL statements with following methods:

<!-- TODO: Adicionar a assinatura destes metodos -->
<!-- TODO: FIXME: Meter aqui a tabela -->
- `query`
- `queryForList`
- `queryForObject`
- `queryForMap`
- `queryForRowSet`
- `execute`
- `update`
- `batchUpdate`

#### Question 06 - When does the JDBC template acquire (and release) a connection, for every method called or once per template? Why?

#### Question 07 - How does the JdbcTemplate support generic queries? How does it return objects and lists/maps ofobjects?

#### Question 08 - What is a transaction? What is the difference between a local and a global transaction?

#### Question 09 - Is a transaction a cross cutting concern? How is it implemented by Spring?

#### Question 10 - How are you going to define a transaction in Spring? What does @Transactional do? What is the PlatformTransactionManager?

#### Question 11 - Is the JDBC template able to participate in an existing transaction?

#### Question 12 - What is a transaction isolation level? How many do we have and how are they ordered?

#### Question 13 - What is @EnableTransactionManagement for?

#### Question 14 - What does transaction propagation mean?

#### Question 15 - What happens if one @Transactional annotated method is calling another @Transactional annotated method on the same object instance?

#### Question 16 - Where can the @Transactional annotation be used? What is a typical usage if you put it at class level?

#### Question 17 - What does declarative transaction management mean?

#### Question 18 - What is the default rollback policy? How can you override it?

#### Question 19 - What is the default rollback policy in a JUnit test, when you use the @RunWith(SpringJUnit4ClassRunner.class) in JUnit 4 or @ExtendWith(SpringExtension.class) in JUnit 5, and annotate your @Test annotated method with @Transactional?

#### Question 20 - Why is the term "unit of work" so important and why does JDBC AutoCommit violate this pattern?

#### Question 21 - What do you need to do in Spring if you would like to work with JPA?

#### Question 22 - Are you able to participate in a given transaction in Spring while working with JPA?

#### Question 23 - Which PlatformTransactionManager(s) can you use with JPA?

#### Question 24 - What do you have to configure to use JPA with Spring? How does Spring Boot make this easier?

#### Question 25 - What is a Repository interface?

#### Question 26 - How do you define a Repository interface? Why is it an interface not a class?

#### Question 27 - What is the naming convention for finder methods in a Repository interface?

#### Question 28 - How are Spring Data repositories implemented by Spring at runtime?

#### Question 29 - What is @Query used for?

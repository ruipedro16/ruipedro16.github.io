---
layout: post
title: Spring JPA
date: '2025-10-20 09:16:32 +0100'
visible: false
---

## Table of Contents

- [Starter Dependency](#starter-dependency)
- [@EntityScan annotation to specify entity locations](#entityscan-annotation-to-specify-entity-locations)
- [Repositories](#repositories)
  - [Annotating Domain Classes](#annotating-domain-classes)
  - [Defining our own repository interface](#defining-our-own-repository-interface)
- [Scanning for Repositories](#scanning-for-repositories)

---

<br/>

### Starter Dependency

The starter dependency for Spring JPA is the following:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
</dependencies>
```

This uses Hibernate as the implementation for JPA.

- **Autoconfiguration**: If JPA is on classpath, Spring Boot will automatically:
  - Auto-configures a `DataSource`
  - Auto-configures an `EntityManagerFactoryBean`
  - Auto-configures a `JpaTransactionManager`

### @EntityScan annotation to specify entity locations

By default, Spring Boot looks for entities in same package as class annotated
with `@EnableAutoConfiguration` and all its sub-packages. This can be overrriden
using `@EntityScan`.

```java
@SpringBootApplication
@EntityScan("rewards.internal")
public class Application {
    // ...
}
```

### Repositories

<!-- TODO: repositories sao proxys. -->

- Repositories reduce boiler plate code for data access.

- **Step 1**: Annotate domain class by definining keys & enable persistence
- **Step 2**: Define the repository as an *interface*. Spring Data will implement
it at *runtime*.
  - Scans for interfaces extending Spring Data Common `Repository<T, ID>`.
  - CRUD methods auto-generated if using `CrudRepository<T, ID>`.
  - Paging, custom queries and sorting supported using `PagingAndSortingRepository<T, ID>`.
  - `JpaRepository<T, ID>` extends both `CrudRepository<T, ID>` and
  `PagingAndSortingRepository<T, ID>`.

#### Annotating Domain Classes

- `@Entity` marks a class as a persisting class.
- By default, objects are mapped to a database table with the same name. This
can be overriden by providing a `name` argument to the `@Table` annotation.
- Other data stores (e.g. MongoDB, Neo4J) provide similar annotations
(e.g. `@Document` in MongoDB, and `@NodeEntity`, `@GraphId` in Neo4J).

<!-- TODO: FIXME: Explain @AttributeOverride and add an example -->

<!-- TODO: FIXME: Same for @Transient -->

```java
@Entity
@Table(...)
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date orderDate;
    private String email;

    // ...
}
```

#### Defining our own repository interface

- In addition to the CRUD methods, we can also add finders to be implemented by
Spring JPA, though they must obey the following naming convention:
  - `find(First)By<DataMemberOfClass><Op>`
  - `<Op>` can be `GreaterThan`, `NotEquals`, `Between`, `Like`, etc.
- Custom queries use the query-language of the underlying product (JPQL in
this case).

```java
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    public Customer findFirstByEmail(String someEmail); // No <Op> for Equals
    public List<Customer> findByOrderDateLessThan(Date someDate);
    public List<Customer> findByOrderDateBetween(Date d1, Date d2);

    @Query("SELECT c FROM Customer c WHERE c.email NOT LIKE '%@%'")
    public List<Customer> findInvalidEmails();
}
```

```java
public interface CustomerRepository extends Repository<Customer, Long> {

    <S extends Customer> save(S entity); // Definition as per CrudRepository
    Optional<Customer> findById(Long i); // Definition as per CrudRepository

    // Case insensitive search
    Customer findFirstByEmailIgnoreCase(String email); 

    @Query("select u from Customer u where u.emailAddress = ?1")
    Customer findByEmail(String email); // ?1 replaced by method param
}
```

### Scanning for Repositories

Spring Boot automatically  scans for repository interfaces, starting in the package
of the `@SpringBootApplication` class, including all sub-packages. Alternatively,
we can control the scanner manually by specifying the base packages to scan with
the `@EnableJpaRepositories` annotiation.

```java
@Configuration
@EnableJpaRepositories(basePackages="com.acme.repository")
public class CustomerConfig { 
    // ... 
}
```

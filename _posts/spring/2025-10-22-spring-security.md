---
layout: post
title: Spring Security
date: '2025-10-22 21:04:38 +0100'
visible: false
---

## Table of Contents

- [Authentication & Authorization](#authentication--authorization)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
- [Spring Security](#spring-security)
  - [High-Level Architecture](#high-level-architecture)
  - [Configuration](#configuration)
  - [Spring Security Filter Chain](#spring-security-filter-chain)
- [Spring Security Configuration](#spring-security-configuration)
- [Authorization](#authorization)
  - [Authorizing URLs](#authorizing-urls)
  - [Bypassing Security](#bypassing-security)
- [Authentication](#authentication)
  - [TODO: FIXME: Video 3](#todo-fixme-video-3)
  - [Method Security](#method-security)
---

<br/>

### Authentication & Authorization

- **Principal**: User, device or system that performs an acation.
- **Authentication**: Establishing that a principal's credentials are valid.
- **Authorization**: Deciding if a principal is allowed to access a resource.
- **Authority**: Permition or credential enabling access (e.g. a role).

- In order to know the princpal, we need to go through the *authentication* process.
During this process, we determine if the principal is who he claims to be.
- During *authorization*, we either grant or deny access to a particular secure
resource. We do this using *resources*, which are permissions that are given to
users. This is often done using *roles* -- **Role-based authorization**.

#### Authentication

Authentication mechanisms include:

- **Basic authentication**: username & password in `base64` in one of the HTTP headers
- **Digest**: credentials sent in a HTTP header (same as before), but this time they are hashed
- **Form**: Username & password in a form (in a HTTP request params)
- **X.509**: Certificates
- **OAuth 2.0/OIDC**:
  - OIDC stands for OpenID Connect and is specified in [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)
    and [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750)

Storage options for credential and authority data include:

- In memory (for development only)
- Database LDAP

#### Authorization

- **Authorization depends on authentication**: Before deciding if a user is
permitted to access a resource, user identity must be established
- Authorization determines if you have the required *Authority*
- The decision process is often based on roles (a *role* is simply a commonly
used type of *authority*):
  - `ADMIN`
  - `MEMBER`
  - `GUEST`

### Spring Security

- Portable
- **Separation of Concerns**:
  - Business logic is *decoupled* from security concern.
  - Authentication and Authorization are *decoupled*. Changes to the authentication
  have no impact on the authorization
- Flexible & Extensible:
  - Authentication: Basic, Form, X.509, OAuth, SSO, ...
  - Storage: LDAP, RDBMS, Properties files, ...

#### High-Level Architecture

![](/assets/img/spring-security-arch.png)

#### Configuration

- Setup the Filter chain
- Configure authorization rules
- Setup Web Authentication

#### Spring Security Filter Chain

- Requires a `DelegatingFilterProxy`, which is confuigured by Spring Boot.

Here is the content of the image converted into a markdown table that you can copy and paste:

| Filter Name | Main Purpose |
|---|---|
| `SecurityContextPersistenceFilter` | Establishes `SecurityContext` and maintains between HTTP requests |
| `LogoutFilter` | Clears `SecurityContextHolder` when logout requested |
| `UsernamePasswordAuthenticationFilter` | Puts **Authentication** into the `SecurityContext` on login request. |
| `ExceptionTranslationFilter` | Converts Spring Security exceptions into HTTP response or redirect |
| `AuthorizationFilter` | Authorizes web requests based on config attributes and authorities |

### Spring Security Configuration

- `UserDetailsManager`:
  - `InMemoryUserDetailsManager`

```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) 
                                              throws Exception {
        // ...
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        // ...
    }
}
```

### Authorization

#### Authorizing URLs

- `*` acts as a wildcard within *a single* path segment.

| Pattern | Matches | Does NOT Match | Explanation |
| :--- | :--- | :--- | :--- |
| `/api/*` | `/api/users` | `/api/v1/users` | Matches characters in the segment after `/api/`, but stops at the next path separator (`/`). |
| `/files/*.txt` | `/files/report.txt` | `/files/2025/report.txt` | Matches any file name with a `.txt` extension directly under `/files/`. |

- `**` acts as a recursive wildcard, matching zero or more entire path segments.
It matches any characters, including the path separator `/`.

| Pattern | Matches | Explanation |
| :--- | :--- | :--- |
| `/admin/**` | `/admin/` | Matches the `/admin/` path itself and everything nested under it. |
| | `/admin/users/all` | Matches paths of any depth under `/admin/`. |
| `/api/**/data` | `/api/v1/data` | Matches any number of nested directories between `/api/` and `/data`. |

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests((authz) -> authz
        // Match all URLs starting with /admin
        // User must have ADMIN role
        .requestMatchers("/admin/**").hasRole("ADMIN")
        // ...
    );

    return http.build();
}
```

- Spring Security processes the requests against these rules sequentially, and it applies the first match it finds.
  - **Put specific matches first**: This ensures that a request is checked against
  the narrowest, most restrictive security requirement before falling through to
  broader, more permissive rules (like `permitAll()`) or the final catch-all
  (`anyRequest().authenticated()`).

```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) 
                                            throws Exception {
        http.authorizeHttpRequests((authz) -> authz
            // Public access for signup (no authentication needed)
            .requestMatchers("/signup", "/about").permitAll()

            // Restricts HTTP PUT requests to paths /accounts/edit*,
            // requiring the ADMIN role.
            .requestMatchers(HttpMethod.PUT, "/accounts/edit*")
              .hasRole("ADMIN")

            // Grants access to all paths under /accounts/ and its 
            // subdirectories to users with either USER or ADMIN roles.  
            .requestMatchers("/accounts/**").hasAnyRole("USER", "ADMIN")

            // All other requests not matched by the rules above
            // must be authenticated
            .anyRequest().authenticated()
        );

        return http.build();
    }

    // ...
}
```

#### Bypassing Security

- Some URLs do not need to be secured (e.g. static resources).
- `permitAll()` allows open-access but the request is still processed by the
Spring Security filter chain.
- The URLs specified in `requestMatchers` pass straight through, without being
checked by the Spring Security filter chain.

```java
@Bean
public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring().requestMatchers("/ignore1", "/ignore2");
}
```

### Authentication

#### TODO: FIXME: Video 3

#### Method Security

- See documentation ([Expression-Based Access Control](https://docs.spring.io/spring-security/site/docs/4.2.x/reference/html/el-access.html))
- Implemented at the service level.
- Uses a Spring AOP Proxy.

![](/assets/img/proxy.png)

- `@EnableMethodSecurity`: Enables Spring's method-level security features.
- `@PreAuthorize`: decides whether a method can actually be invoked or not.

```java
@EnableMethodSecurity
public class ItemManager {
    // Members may only find their own order items
    @PreAuthorize("hasRole('MEMBER') && " +
                  "#order.owner.name == principal.username")
    public Item findItem(Order order, long itemNumber) {
        // ...
    }
}
```

- `@PostAuthorize`: used to perform an access-control check after the method has
been invoked. To access the return value from a method, we can use the built-in
name `returnObject` in the expression.

<!-- TODO: FIXME: Exemplo -->

| Annotation | Type |
| :--- | :--- |
| **`@EnableMethodSecurity`** | Class-Level |
| **`@PreAuthorize`** | Method-Level |
| **`@PostAuthorize`** | Method-Level |

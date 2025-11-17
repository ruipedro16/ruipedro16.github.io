---
layout: post
title: Questions - Spring Security
date: '2025-11-17 00:25:30 +0000'
---

- The default hashing algorithm in Spring Security is BCrypt
- When a custom UserDetailsService is defined in the application context, Spring Boot does not create a default user. The presence of a custom UserDetailsService bean overrides the default user configuration. ​
- **User details can be stored in custom storage and retrieve them by implementing UserDetailsService interface**: Implementing the UserDetailsService interface allows developers to retrieve user information from custom storage mechanisms, such as databases or external services. This customization is essential for integrating Spring Security with existing user data sources.
- User details in Spring Security include not only the username and password but also authorities
- Spring Security supports storing user details in various locations, including in-memory storage, relational databases (via JDBC), and LDAP directories. This flexibility allows integration with different authentication data sources.

#### In which ways are Security filters used in Spring Security?

Spring Security uses a chain of filters to secure web applications. These filters intercept HTTP requests and perform various security-related tasks, such as authentication, authorization, and session management. Each filter in the chain has a specific responsibility and works together to enforce security policies.

- **Authentication**: Filters like `UsernamePasswordAuthenticationFilter`
and `BasicAuthenticationFilter` handle authentication by extracting
credentials from the request and validating them using an
`AuthenticationManager`.
- **Authorization**: Filters like `FilterSecurityInterceptor` enforce access control by checking whether the authenticated user has the required
permissions or roles to access a resource.
- **Logout**: Filters like `LogoutFilter` handle logout functionality by
invalidating sessions, clearing authentication data, and redirecting
users to a logout success URL.
- **Session Management**: Filters like `SessionManagementFilter` ensure that
session-related security policies are enforced, such as preventing
*session fixation attacks*.
- **CSRF Protection**: Filters like `CsrfFilter` protect against Cross-Site
Request Forgery (CSRF) attacks by validating CSRF tokens in
state-changing requests.
- **Request Validation**: Filters like `SecurityContextPersistenceFilter`
ensure that security context information (e.g., authentication details)
is preserved across requests.

#### Which class associates a request URL pattern with a list of filters in Spring Security?

Spring Security uses a filter-based architecture to intercept HTTP requests. The main filter registered with the servlet container is DelegatingFilterProxy, which points to a Spring bean — typically a FilterChainProxy.

- Key components:
  - DelegatingFilterProxy: Registered in web.xml or auto-configured by Spring Boot. Delegates to a Spring-managed bean (usually FilterChainProxy).
  - FilterChainProxy: Maintains a list of SecurityFilterChain objects. It matches the request path and forwards the request to the appropriate chain.
  - SecurityFilterChain: Defines a list of filters to be applied for a specific request matcher (e.g., path pattern, HTTP method).

- Example Flow:
  - Request enters the Servlet container.
  - DelegatingFilterProxy delegates to FilterChainProxy.
  - FilterChainProxy checks each SecurityFilterChain to see if it matches the request path.
  - If matched, it applies the list of filters (e.g., UsernamePasswordAuthenticationFilter, AuthorizationFilter, etc.).

- FilterChainProxy is the core class in Spring Security responsible for mapping URL patterns to SecurityFilterChain instances. It delegates incoming requests to the appropriate filter chain based on the request path. Each SecurityFilterChain may define its own matchers (e.g., /api/**, /admin/**) and set of filters to apply.
- DelegatingFilterProxy is a Servlet Filter that delegates to a Spring-managed bean (usually the Spring Security filter chain). It acts as a bridge between the Servlet container and the Spring context, but it does not manage URL pattern to filter chain mappings.
- SecurityFilterChain is a Spring Security interface that defines which filters to apply to a particular request, but it does not itself manage the mapping between URL patterns and filter chains

#### Security Annotations Supporting SpEL

- `@PreAuthorize`: Executes before method execution
- `@PostAuthorize`: Executes after method execution
- `@PreFilter`: Filters input collection before method execution
- `@PostFilter`: Filters return collection after method execution

**Best Practices for Using SpEL in Security Annotations**:

- Prefer @PreAuthorize over @Secured: More flexible and supports SpEL.
- Use @PreFilter and @PostFilter for collection filtering: Avoid filtering inside methods manually.
- Be cautious with @PostAuthorize: Can lead to unnecessary method executions if access is denied.
- Use hasRole(), hasAuthority(), and isAuthenticated() functions in expressions.

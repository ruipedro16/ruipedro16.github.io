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

---

<br/>

### Authentication & Authorization

- **Principal**: User, device or system that performs an acation.
- **Authentication**: Establishing that a principal's credentials are valid.
- **Authorization**: Deciding if a principal is allowed to access a resource.
- **Authority**: Permition or credential enabling access (e.g. a role).

- In order to know the princpal, we need to go through the *authentication* process.
During this process, we determine if the principal is who he claims to be.
- During *authroization*, we either grant or deny access to a particular secure
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

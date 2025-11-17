---
layout: post
title: Spring Security
date: '2025-10-22 21:04:38 +0100'
visible: false
---

#### Question 01 - What are authentication and authorization? Which must come first?

- **Authentication**
  - **MFA**:
- **Authorization**
  - **RBAC**:

- Authentication must come first.

- Spring:
  - **Web Security Level**:
  - **Method Security Level**:

#### Question 02 - Is security a cross cutting concern? How is it implemented internally?

- Yes.

- `SecurityContextHolder`
- `SecurityContext`
- `Authentication`
- `GrantedAuthority`

- `AuthenticationManager`
- `ProviderManager`: An implementation of `AuthenticationManager`.

#### Question 03 - What is the delegating filter proxy?

#### Question 04 - What is the security filter chain?

#### Question 05 - What is a security context?

#### Question 06 - What does the ** pattern in an antMatcher or mvcMatcher do?

#### Question 07 - Why is the usage of mvcMatcher recommended over antMatcher?

#### Question 08 - Does Spring Security support password hashing? What is salting?

#### Question 09 - Why do you need method security? What type of object is typically  ecured at the method level (think of its purpose not its Java type)?

#### Question 10 - What @PreAuthorized and @RolesAllowed annotations do? What is the difference between them?

#### Question 11 - How are @PreAuthorized and @RolesAllowed annotations implemented?

#### Question 12 - In which security annotation are you allowed to use SpEL?

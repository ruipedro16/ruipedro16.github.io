---
layout: post
title: Questions - Spring AOP
date: '2025-11-17 00:47:19 +0000'
---

#### What are limitations of using the default JDK dynamic proxies in Spring AOP?

Spring AOP uses proxies to apply aspect-oriented programming. A proxy is an object that wraps the target bean and intercepts method calls. Spring supports two types of proxies:

- JDK Dynamic Proxies: Used when the target object implements at least one interface. Key Limitations of JDK Dynamic Proxies are:
  - Works only on interface methods: Cannot proxy a class without an interface.
  - Intercepts only public methods: Private/protected methods are not intercepted.
  - Self-invocation bypasses AOP: Calls inside the same class are not intercepted.
  - Cannot intercept constructors: Constructor calls require AspectJ, not Spring AOP.
- CGLIB Proxies: Used when the target object does not implement an interface.

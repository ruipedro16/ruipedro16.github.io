---
layout: post
title: RESTful Applications with Spring Boot
date: '2025-10-21 01:34:21 +0100'
visible: false
---

## Table of Contents

- [Introduction](#introduction)
- [Rest Principals](#rest-principals)
- [Spring support for REST](#spring-support-for-rest)
  - [HTTP GET](#http-get)
  - [HTTP PUT](#http-put)

---

<br/>

### Introduction

- REST (Representational State Transfer) is an *architectural style* that
describes best practices to expose web services over HTTP.
- **MOtivation**: We have more than web browsers as clients:
  - mobile applications,
  - SPAs
  - Microservices
    ==> Expose an API so that we can communicate with each other

### Rest Principals

- Everything is a **resource**, that should be uniquiely *identifiable*.
  - Each resource has an URI (Uniform Resource Identifier)
- Expose *resources* through URLs:
  - We use nouns (not verbs) inside URIs

- Resources support a lmiited set of operations (GET, PUT, POST, DELETE), and
each operation has a well-defined semantics.
  - **GET**: retrieve a resouce
  - **POST**: create a resource
  - **PUT**: update a resouce
  - **DELETE**: delete a resource

- HTTP methods + Resource URIs = Uniform Interface

- Clients can request a particular representation, and resouces can support
multiple representations (e.g. JSON, XML)
  - Content negotiation (e.g. in the ACCEPT HEADER)

- Represenbtations can link to other resources. This allows for extensions and
discovery
- **HATEOASP** Hypermedia as the engine of Applicaition State: RESTful resposes
contain the links we need

- **Stateless architecture**: The state is maintained on the client side.
  - no `HttpSession` usage
  - GETs can be cached on URL
  - Recommends clients to keep track of the state
  - Part of what makes it scalable
  - **Looser coupling between client and server**

- HTTP headers and status codes communicate result to clients (well-defined in the
HTTP Specification).

<!-- TODO: FIXME: Table summarizing status codes -->

- Support for redirect, caching, different representations, resource identification
(through URIs)

#### HTTP Statis code support

- Success: 200 OK
- Redirect: 30x
- Client Error (Invalid URL): 404 Not Found
- Server Error: 500 (UNhandled Exceptions)

RESTful applications use many additional codes:

- Created sucessfully: 201
- Client Error: 400
- HTTP method not supported: 405
- Cannot generate response body in requested format: 406
- Request body not supported: 415

### Spring support for REST

- **Message Converters**: <!-- TODO: Definicoa -->
  - HTTP GET returns a Java Object and the essage converter generates data in the
    HTTP response body (typically in JSON or XML)
  - For HTTP POST and PUT, Spring converts the incoming request body to a Java Object
  - Auto-configured by Spring Boot
  - No need to convert objects manually -- Spring MVC resolves the desired
    cointent type (usually based on the `Accept`) request header.

- `@GetMapping` is an abbreviation for `@RequestMapping(method=RequestMethod.GET)`.
It is a *composed*`annotation:
  - `@GetMapping("/store/orders")` is equivalent to
    `@RequestMapping(path="/store/orders", method=RequestMethod.GET)`
- `@RequestMethod` enumerators:
  - `GET`, `POST`, `PUT`, `PATCH` , `DELETE`, `HEAD` , `OPTIONS`, `TRACE`
  - For `HEAD`, `OPTIONS`, `TRACE`, we *must* use the `@RequestMethod` annotation

#### HTTP GET

- Use message converters for response data by annotating return data with
`@ResponseBody`. If we forget the `@ResponseBody` annotation, Spring MVC
defaults to finding a View (and fails).
- The converter handles rendering the response.
- Status code 200

```java
@Controller
public class OrderController {

    @GetMapping("/store/orders/{id}")
    public @ResponseBody Order getOrder(@PathVariable long id) { 
        return orderService.findById(id);
    }
}
```

- To avoid adding the `@ResponseBody` on each `GET` method, we can use the
`@RestController` annotation instead of `@Controller`. The previous example is
equivalent to:

```java
@RestController
public class OrderController {

    @GetMapping("/store/orders/{id}")
    public Order getOrder(@PathVariable long id) {
        return orderService.findById(id);
    }
}
```

- Instead, we can use `ResponseEntity` to generate a `Response`:

```java
@GetMapping("/store/orders/{id}")
public ResponseEntity<Order> getOrder(@PathVariable long id) {
    Order order = orderService.find(id);

    return ResponseEntity
        .ok() // HTTP Status 200 OK
        .lastModified(order.lastUpdated()) // Set extra or custom header(s)
        .body(order); // Response body content
}
```

#### HTTP PUT

- Return empty response, status code 204
- We can use the `@ResponseStatus` annotation to return a status code other than 200.
  - `void` methods annotatted with `@ResponseStatus` return a response with empty
    body (no-content)

```java
@PutMapping("/store/orders/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT) // 204
public void updateOrder(...) {
    // ...
}
```

- We use `@RequestBody` to extract data from incoming request data. The correct
message converter is chosen automatically based on the `Content-Type` request
header:

```java
@PutMapping("/store/orders/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT) // 204
// Order object could be mapped from JSON, XML, etc
public void updateOrder(@RequestBody Order updatedOrder,
                        @PathVariable long id) {
    orderManager.updateOrder(id, updatedOrder);
}
```

#### HTTP POST

- Return "created", status 201
- Generate Location header (with the full URI of the resource) for the newly created resource
  - We create the URI with `ServletUriComponentBuilder`:

```java
// Must be in a Controller method
// Example: POST http://server/store/orders/12345/items

URI location = ServletUriComponentsBuilder
    .fromCurrentRequestUri()
    .path("/{itemId}") // Note: leading /
    .buildAndExpand("item A") // Note: space
    .toUri();

return ResponseEntity.created(location).build();

// http://server/store/orders/12345/items/item%20A
// Space converted to %20
```

```java
@PostMapping("/store/orders/{id}/items")
public ResponseEntity<Void> createItem
    (@PathVariable long id, @RequestBody Item newItem) {

    // Add the new item to the order
    // Assume this call also set an item-id
    orderService.findById(id).addItem(newItem);

    // Build the location URI of the newly added item
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequestUri()
        .path("/{itemId}")
        .buildAndExpand(newItem.getId())
        .toUri();

    // Explicitly create a 201 Created response with Location header set
    return ResponseEntity.created(location).build();
}
```

#### HTTP DELETE

- Return empty response, status 204

```java
@DeleteMapping("/store/orders/{orderId}/items/{itemId}")
@ResponseStatus(HttpStatus.NO_CONTENT) // 204
public void deleteItem(@PathVariable long orderId,
                       @PathVariable String itemId) {
    orderService.findOrderById(orderId).deleteItem(itemId);
}
```

#### RESTful Clients: RestTemplate

- Supports all HTTP Methods

## RestTemplate Method Mapping

| HTTP Method | RestTemplate Method |
| :--- | :--- |
| **DELETE** | `delete(String url, Object... uriVariables)` |
| **GET** | `getForObject(String url, Class<T> responseType, Object... uriVariables)` |
| **HEAD** | `headForHeaders(String url, Object... uriVariables)` |
| **OPTIONS** | `optionsForAllow(String url, Object... uriVariables)` |
| **POST** | `postForLocation(String url, Object request, Object... uriVariables)` |
| | `postForObject(String url, Object request, Class<T> responseType, Object... uriVariables)` |
| **PUT** | `put(String url, Object request, Object... uriVariables)` |
| **PATCH** | `patchForObject(String url, Object request, Class<T> responseType, Object... uriVariables)` |

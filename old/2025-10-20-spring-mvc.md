---
layout: post
title: Spring MVC & Web Layer
date: '2025-10-20 09:00:40 +0100'
visible: false
---

#### Question 01 - MVC is an abbreviation for a design pattern. What does it stand for and what is the idea behind it?

- MVC stands for Model-View-Controller
- It's a design pattern which divides the application into three main
interconnected component types:
  - **Model**: Data access, Definition of data structures, Business Logic &
  CRUD Logic
  - **View**: Data representation to the user --- multiple representations of the
  same data are possible
  - **Controller**: Accepts requests from the user and issues commands to the Model.
  Modified the Model & decides on which View to use.

![MVC Pattern](/assets/img/mvc.png)

Spring MVC provides components that we can use to implement the MVC pattern in
our applications:

- **Model**: Spring Data JPA, Spring Data JDBC, Spring Data MongoDB,
Custom Repository implementation.
- **View**: Thymeleaf.
- **Controller**: `@Controller` and `@RestController` classes.

**Pros of the MVC pattern:**

- Separation of concerns.
- Increased code cohesion and reusability.
- Reduces coupling between data, logic and information representation.
- Increases extendability.

#### Question 02 - What is the DispatcherServlet and what is it used for?

`DispatcherServlet` is an internal Spring MVC component that implements the
`HttpServlet`

#### Question 03 - What is a web application context? What extra scopes does it offer?

#### Question 04 - What is the @Controller annotation used for?

- `@Controller` indicates that the annotated class is a Controller and should be
considered a candidate for request handling when the `DispatcherServlet` searches
for components to which the work can be delegated.
- `@Controller`  is a specialization of `@Component`, which allows Spring to
autodetect controllers during the classpath scanning.
- In Spring, Controllers do not have to implement any interface or extend any
base class. Instead, Spring uses the *annotation-based* programming model.
Controllers have flexible method signatures with mapping expressed via annotations
like `@RequestMapping`, `@GetMapping`, `@PostMapping`, etc.

#### Question 05 - How is an incoming request mapped to a controller and mapped to a method?

- Incoming requests are mapped to a controller and method by `DispatcherServlet`.
`DispatcherServlet` uses the `HandlerMapping` and `HandlerAdapter` components
for this purpose. <!-- TODO: FIXME: Explain this -->

- The `HandlerMapping` components are used during Spring initialization to scan the
classpath for `@Controller` or `@RestController` classes with one of the request
mappig annotations that are part of the *annotation-based* programming model:
  - `@RequestMapping`
  - `@GetMapping`
  - `@PostMapping`
  - `@PutMapping`
  - `@PatchMapping`
  - `@DeleteMapping`

- `HandlerAdapter` components are responsible for the execution of the
method identified as the handler candidate for the request.
<!-- TODO: FIXME:  -->

#### Question 06 - What is the difference between @RequestMapping and @GetMapping?

- `@RequestMapping` can be used to map any HTTP method. It allows us to specify
HTTP method or HTTP methods through method field. If no HTTP methods are specified,
all HTTP methods will be mapped.
- `@GetMapping` can only be used to map HTTP GET requests. It is lex flexible,
but easier to use.
- The `@GetMapping` annotation is a composed annotation that is equivalent to
`@RequestMapping(method = RequestMethod.GET)`.
- Both annotations allows you to specify multiple criteria for request mapping,
like `uri path`, `required headers`, `consumable media types`,
`producible media types`.
- **NOTE:** Usage of those simpler, specialized versions is recommended for simple HTTP method mappings.

#### Question 07 - What is @RequestParam used for?

- `@RequestParam` is used to bind *web request parameters* to controller method
parameter.

```java
// /index?name=John&city=NYC&country=US
@GetMapping("/index")
public String index(@RequestParam("name") String name,
                    @RequestParam("city") String city, 
                    @RequestParam("country") String country) {
    // ...
}
```

- It is possible to use `@RequestParam` annotation to map:
  - query parameters
  - form data
  - parts in multipart requests

- `@RequestParam` allows us to specify the following parameters:
  - `name`: name of the request parameter to bind.
  - `required`:
    - By default, parameter is required and an exception is thrown if it is
    absent.
    - If `required = false` and the parameter is missing, a `null` value will be
    provided, or the value pointed out by the `defaultValue` property.
  - `defaultValue`: used to specify a default value in the case of a missing
  optional parameter.  
- `@RequestParam` supports `Optional`, so the follwoing are equivalent

```java
@RequestParam(value = "city", required = false) String city
@RequestParam(value = "city") Optional<String> city
```

- `@RequestParam` supports mapping all request parameters to a `Map`

```java
@GetMapping("/index")
public String index(@RequestParam Map<String, String> parameters) {
    // ...
}
```

- `@RequestParam` supports mapping all values to a `List`

```java
// /index?cities=1,2,3
@GetMapping("/index") 
public String index(@RequestParam("cities") List<String> cities) {
    // ...
}
```

#### Question 08 - What are the differences between @RequestParam and @PathVariable?

- The main difference is the purpose of each annotation.
- `@PathVariable` is reponsible for *mapping parts of the URI, marked with the
  usage of URI templates variables, to controller method parameters*. URI templates
  are identifiers surrounded with curly braces.

```java
// /countries/US/cities/DEN
@GetMapping("/countires/{country}/cities/{city}") 
public String countryAndCityByCode(@PathVariable("country") String country, 
                                   @PathVariable(value = "city") String city) {
    // ...
}
```

- `@RequestParam` is used to *bind web request parameters to controller method
  parameters*.

```java
// /index?name=John&city=NYC&country=US
@GetMapping("/index")
public String index(@RequestParam("name") String name,
                    @RequestParam("city") String city, 
                    @RequestParam("country") String country) {
    // ...
}
```

- `@RequestParam` allows us to specify `defaultValue` property, while
`@PathVariable` does not.
- **Similarities**: Both allow us to
  - Specify the name of variable to bind
  - Mark variables as required or optional
  - Use `Optional` for optional values
  - Map all parameters to a `Map`
  - Map a list of values for parameters to `Collection`

#### Question 09 - What are some of the parameter types for a controller method?

#### Question 10 - What other annotations might you use on a controller method parameter?

#### Question 11 - What are some of the valid return types of a controller method?

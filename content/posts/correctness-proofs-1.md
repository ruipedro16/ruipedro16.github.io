---
title: 'Correctness Proofs of Jasmin Programs: Part 1 - Overview'
date: 2024-10-23T22:15:15+02:00
draft: false
toc: true
math: true
ShowToc: true
TocOpen: false
ShowCodeCopyButtons: true
showbreadcrumbs: true
summary: "This is the first post in a series on how to prove that Jasmin are correct with respect to 
a high-level specification written in EasyCrypt."
tags: ['Jasmin', 'EasyCrypt']
---

This is the first post in a series on how to prove that Jasmin programs are correct with respect to 
a high-level specification written in EasyCrypt. The examples used in this posts are taken from the 
correctness proof of the XMSS signature scheme, which is available 
[here](https://github.com/ruipedro16/xmss-jasmin).
There's also a [security proof of XMSS](https://github.com/MM45/FV-XMSS-EC)  written in EasyCrypt, 
but we won't go over it. 

This will be split into five parts: 

- **Part 1 (this blog post)**: provides an overview on how to prove correctness of Jasmin programs 
with respect to an EasyCrypt specification.

- **[Part 2: WOTS+](/posts/correctness-proofs-2)**: provides a step-by-step proof of correctness of 
a Jasmin implementation of  WOTS+, a one-time signature scheme.

- **[Part 3: Treehash](/posts/correctness-proofs-3)**: discusses the correctness proof of the Treehash 
algorithm used in XMSS.

- **[Part 4: Distributions](/posts/correctness-proofs-4)**: explores reasoning about probabilistic 
distributions.

- **[Part 5: Proving Constant-Time](/posts/correctness-proofs-5)**: covers how to prove that Jasmin 
programs are constant-time.

### Proof Overview 

<!-- In this series, we will explore the process of proving the correctness of Jasmin programs with respect to a high-level  -->
<!-- specification written in EasyCrypt. This involves several steps, starting from the high-level specification and moving  -->
<!-- towards a formal proof of correctness. The goal is to ensure that the Jasmin implementation behaves as intended and  -->
<!-- adheres to the specified properties. -->

![proof diagram](/posts/images/proof_diagram.png#center)

We start with a high-level EasyCrypt specification and Jasmin implementation we wish to prove 
equivalent to the specification. We then extract our Jasmin program to an equivalent EasyCrypt model, 
which we prove equivalent to the specification using Probabilistic Relational Hoare Logic (pRHL).

Probabilistic Relational Hoare Logic (pRHL) allows us to relate the execution of two probabilistic 
programs \\(c_1\\) and \\(c_2\\):

$$\models c_1 \sim c_2 \  \colon \  P \implies Q, $$ where \\(P\\) and \\(Q\\) are relations over memories.

In correctness proofs, it will usually be the case that \\(c_1\\) is an implementation and \\(c_2\\) 
is a high-level specification, or that \\(c_1\\) is an optimized implementation while \\(c_2\\) is a 
reference implementation.

In addition, we can also reason about different executions of the same program.
For example, proving noninterference requires proving that two executions of the same program 
whose initial values for the secret variables may differ results in two final states where the values 
of the public variables are equal.

<!-- - **Extraction to EasyCrypt**: Two modes of extraction: *normal* (used to prove functional correctness) and *CT* (for
proving that programs are constant-time). -->


<!-- Correctness proofs are not necessarily from a spec to an implementation. /* melhorar esta frase */  -->
<!-- 
Alternatively, we can prove that an optimized implementation is equivalent to a reference implementation, 
which has already been proved to be equivalent to the specification. As a result, by the transitivity of equivalence,
this means that the optimized implementation is also equivalent to the specification.
 -->

### Limitations

The main limitation of this process is the large trusted code base. 
Fisrt, the extraction to EasyCrypt is not verified, and EasyCrypt itself is also 
not verified. 
Additionally, our proof makes extensive use of SMT solvers.
Finally, the specifications are manually written based on the RFC. 
<!-- using machine-readable standards could address this issues. -->

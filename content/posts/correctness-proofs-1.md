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

This will be split into four parts:

- **Part 1 (this blog post)**: provides an overview on how to prove correctness of Jasmin programs with respect
to an EasyCrypt specification.

- **[Part 2: WOTS+](/posts/correctness-proofs-2)**: provides a step-by-step proof of WOTS+, a one-time
signature scheme.

### Overview 

![proof diagram](/posts/images/proof_diagram.png#center)

Probabilistic Relational Hoare Logic (pRHL) allows us to relate the execution of two probabilistic 
programs \\(c_1\\) and \\(c_2\\):

$$\models c_1 \sim c_2 \  \colon \  P \implies Q, $$ where \\(P\\) and \\(Q\\) are relations over memories.

In correctness proofs, it will usually be the case that \\(c_1\\) is an implementation and \\(c_2\\) is a high-level specification, or that \\(c_1\\) is an optimized implementation while \\(c_2\\) is a reference implementation.

In addition, we can also reason about different executions of the same program.
For example, proving noninterference requires proving that two executions of the same program 
whose initial values for the secret variables may differ results in two final states
where the values of the public variables are equal.

<!-- - **Extraction to EasyCrypt**: Two modes of extraction: *normal* (used to prove functional correctness) and *CT* (for
proving that programs are constant-time). -->

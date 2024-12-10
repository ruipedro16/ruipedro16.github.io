---
title: 'Correctness Proofs of Jasmin Programs: Part 2 - WOTS+'
date: 2024-10-28T16:39:31+01:00
draft: true
toc: true
ShowToc: true
TocOpen: false
ShowCodeCopyButtons: true
showbreadcrumbs: true
summary: ""
tags: ['Jasmin', 'EasyCrypt']
---

This specification is based on [RFC 8391 - XMSS: eXtended Merkle Signature Scheme](https://datatracker.ietf.org/doc/html/rfc8391)

We will also mention two features of EasyCrypt that are not documented in the reference manual -- *subtypes* and *records*.

## Subtypes 

Subtypes are specialized versions of existing types that impose additional constraints, allowing for 
more precise type definitions and by enforcing strict rules on the values that variables of these types
can hold. 

For example, consider the subtype `nbytes`, which is a more specific version of a byte list. While a general byte list can 
have any number of elements, `nbytes` restricts this by requiring that all byte lists of this type must contain exactly `n` 
elements. This constraint ensures that any variable of type `nbytes` adheres to this fixed length.
<!-- Pq isto e bom ==> erros na spec + invariantes mais simples  -->
<!-- thereby preventing errors related to unexpected list sizes and promoting more robust and reliable code. -->

We can convert between the subtype and the underlying type via the `val` and `insubd` operators, respectively.
This is illustrated in the following diagram:

![subtypes diagram](/posts/images/nbytes_diagram.png#center)

```ec
require import AllCore List.
require Subtype.

const n : { int | 0 <= n } as ge0_n.

clone export Subtype as NBytes with 
   type T = W8.t list,
   op P = fun l => size l = n
   rename "sT" as "nbytes".
```

Here, it is worth making the distinction between `nbytes` and `NBytes`: `nbytes` is the type, and `NBytes` is the theory.

<!-- ## Records

```
type xmss_sk = { idx : W32.t ;
                 sk_seed : nbytes ;
                 sk_prf : nbytes ;
                 pub_seed : nbytes;
                 root : nbytes }.
```

XMSS-XMSS^MT Equivalence Proof

 -->

## WOTS+

WOTS+ (Winternitz One-Time Signature) is a one-time signature scheme.
WOTS+ uses a chaining function to generate multiple hash values from a single secret key, which are then used to create the signature. 
WOTs+ is used in the context of hash-based cryptographic schemes like XMSS and Sphincs+.

<!-- Diagrama da chaining function -->

### Chaining Function
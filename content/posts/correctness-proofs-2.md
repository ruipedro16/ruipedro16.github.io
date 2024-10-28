---
title: 'Correctness Proofs of Jasmin Programs: Part 2 - Specification'
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

## Subtypes 

![subtypes diagram](/posts/images/nbytes_diagram.png#center)

In this case, `nbytes` is a subtype of byte lists.
All element of the type `nbytes` are byte lists with exactly `n` elements.

`nbytes` is the type, and `NBytes` is the theory.

## Records

```
type xmss_sk = { idx : W32.t ;
                 sk_seed : nbytes ;
                 sk_prf : nbytes ;
                 pub_seed : nbytes;
                 root : nbytes }.
```

## XMSS-XMSS^MT Equivalence Proof


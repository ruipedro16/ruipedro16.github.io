---
title: 'Correctness Proofs of Jasmin Programs: Part 4 - Distributions'
date: 2024-12-26T17:56:52+01:00
draft: true
toc: true
math: true 
ShowToc: true
TocOpen: false
ShowCodeCopyButtons: true
showbreadcrumbs: true
summary: ""
tags: ['Jasmin', 'EasyCrypt']
---

The main difference is that, while on the specification, we sample three 
\\(n\\)-byte string, on the implementation, we sample a \\(3n\\)-byte string at once.

This will require us to prove additional properties about distributions that are not
on the EasyCrypt's `DList` theory.



```
abstract theory DListProgramX.

type t.
op d : t distr.

clone import DList.Program 
with type t <- t,
     op d <- d.

module SampleX = {
  proc samplecat(n1 n2 : int) : t list = {
   var x1, x2;

   x1 <$ dlist d n1;
   x2 <$ dlist d n2;

   return x1 ++ x2;
  }
}.
```

```
equiv sample_samplecat : 
    Sample.sample ~ SampleX.samplecat :
    0 <= n1{2} /\ 0 <= n2{2} /\ n{1} = n1{2} + n2{2}
    ==>
    ={res}.
```

Essentially, this lemma tells us that sample \\(n_1\\) bytes, followed by sampling
\\(n_2\\) bytes is the same as sampling \\(n_1 + n_2\\) bytes. In fact, this works for any 
type `t` and distribution `d`, though we are only interested in byte strings.

### Proof itself

For the parameter set we are working with, the value of `XMSS_N` is 32.

```
lemma random_bytes_equiv :
    n = XMSS_N =>
    equiv [
      Syscall.randombytes_96 ~ XMSS_MT_PRF.sample_randomness :
      true 
      ==>
      to_list res{1} = val res{2}.`1 ++ val res{2}.`2 ++ val res{2}.`3
    ].   
```

The first thing
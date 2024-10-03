---
title: 'EasyCrypt'
date: 2024-09-03T10:45:29+02:00
draft: false
toc: true
ShowToc: true
TocOpen: false
ShowCodeCopyButtons: true
showbreadcrumbs: true
math: true
summary: " "
tags: ['EasyCrypt']
---

<!-- TODO: Meter uma introducao aqui 
  Documentacao de cenas que nao encontrei documentadas em mais lado nenhum
-->

### Using Hints to Simplify Expressions

<!-- TODO: Meter uma introducao aqui -->

```ec
lemma foo: floor (log2 16%r) = 4.
```

At first, this lemma seems straightforward to prove because we know that 16 can be expressed as \\( 2^4 \\).
However, the challenge lies in rewriting the expression in a form that can be easily handled by 
subsequent lemmas. In this case, we want to rewrite the expression using `logK`:

```
lemma logK: forall (b x : real), 0%r < b => b <> 1%r => log b (b ^ x) = x.
```

To do so, we need to rewrite `16%r` as `2%r ^ 4%r`. We can do this via 
`have ->: 16%r = 2%r ^ 4%r`. However, you'll notice that neither `simplify` nor `smt` 
can solve this goal. To address this issue, we can define a lemma that simplifies 
such expressions  and use it as a hint in our proof.

The first step is to define a lemma that captures the simplification of expressions 
we want to simplfiy:

```ec
lemma simplify_pow (a b : int) : 
    0 < a /\ 0 < b => 
      a%r ^ b%r = (a ^ b)%r.
proof.
move => [#] ??.
rewrite -RField.fromintXn 1:/# #smt:(@RealExp).
qed.
```

Once we have defined and proved this lemma, we can used it as a hint.

```
hint simplify simplify_pow. 
```

With the `simplify_pow` lemma as a hint, we can now complete our proof:
In this case, the `simplify` tactic applies the `simplify_pow` hint to rewrite 
`16%r` as `2%r ^ 4%r`, allowing us to proceed with the rest of the proof.

```
lemma foo: floor (log2 16%r) = 4.
have ->: 16%r = 2%r ^ 4%r by simplify. (* This uses the hint we defined previously *)
rewrite /log2 logK 1,2:/# from_int_floor //.
qed.
```

<!--

Code to run:

pragma Goals : printall.

require import AllCore RealExp.

lemma simplify_pow (a b : int) : 
    0 < a /\ 0 < b => 
      a%r ^ b%r = (a ^ b)%r.
proof.
move => [#] ??.
rewrite -RField.fromintXn 1:/# #smt:(@RealExp).
qed.

hint simplify simplify_pow. 

lemma foo: floor (log2 16%r) = 4.
have ->: 16%r = 2%r ^ 4%r by simplify. (* Isto funciona no XMSS mas isolado nao?? *)
rewrite /log2 logK 1,2:/# from_int_floor //.
qed.

NOTE: in Xmss this works but in hint.ec it doesnt. the proof for have is simplify (using the hint)
       which yields 16%r = (2 ^ 4)%r. At this point using congr, we get 16 = 2 ^ 4. 
       I dont know why but smt cant solve this in hint.ec, but in xmss it can
-->

<!-- ![](https://mermaid.live/view#pako:eNo1T7sOgzAM_JXIUytBZ8TQqWO7tEOlKoshAaLmgYJThBD_XlOKF9_Zd7ZuhjooDSU0Nox1h5HE9S694PLVRHo4SNiAhKPIc_FBy-0sxsKagXj7LE4kVsyCzbitVrHxQ6oUo_x_TXrIwOno0Ch-Oq8GCdRppyWUDBXGtwTpF9ZhovCYfA0lxaQziCG13U5Sr5D0xWAb0e3DHv0rBKYN2oG5VoZCvG0Jf0GXL1SETtI) -->
### Subtypes

In EasyCrypt, subtypes are a way to define types that satisfy specific properties.
This eliminates the need to manually check for length constraints throughout the proofs, improving both the readability and maintainability of proofs.

![your picture](/posts/images/d2.png#center)

In EasyCrypt, this is defined as 

```
require Subtype.

clone export Subtype as NBytes with 
   type T = W8.t list,
   op P = fun l => size l = n
   rename "sT" as "nbytes".
```

In other words, the type elements of type `nbytes` are elements of the type `W8.t list` that satisfy `P` i.e. whose size is `n`.
Here, `nbytes` refers to the type and `NBytes` to the name of the theory. 
The difference between the two is illustrated by the following lemma:

```
lemma size_nbytes_cat (a b : nbytes) :
    size (val a ++  val b) = 2 * n by smt(@List @NBytes).
```

Some useful lemmas include :

```
lemma val_insubd:
    forall (x : T), val (insubd x) = if P x then x else val witness.

lemma insubdK: forall (x : T), P x => val (insubd x) = x.

lemma valP: forall (x : nbytes), P (val x).
```

In the case of `NBytes`, we have that 

```
type T = W8.t list.
  
op P (l : W8.t list) : bool = size l = n.
```


### Notation

`#pre` can become quite long.

`#{~/P}pre` is the same as writing all of `#pre` but without the predicate `P`.

For example, if `#pre` is `a{1} = b{2} /\ ={c}`, then 
`#{~/a{1} = b{2}}pre` corresponds to `={c}`.

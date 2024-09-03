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

---
title: 'Correctness Proofs of Jasmin Programs: Part 3 - Treehash'
date: 2024-12-10T02:06:33+01:00
draft: true
toc: true
math: true
ShowToc: true
TocOpen: false
ShowCodeCopyButtons: true
showbreadcrumbs: true
summary: "Cenas sobre o treehash"
tags: ['Jasmin', 'EasyCrypt']
---

So far the loops we have seen were loops of the form `for i=? to ?`, where it is easy to write an 
invariant for the bounds of the loop counter: `? <= i <= ?`. However, this is not the case for the 
inner loop of treehash. This post details how we can address such cases.

## Treehash 

The Treehash algorithm is a fundamental component of XMSS. It is used to construct the binary hash 
tree, which is then used for generating they keypair, and for generating the authentication path for 
signatures. The algorithm works by iteratively hashing pairs of nodes until a single root node is obtained. 

Essentially, the algorithm words by iterating through the each WOTS keypair (i.e. each leaf of the 
tree) and compressing it to a single node (an \\(n\\)-byte value) using the LTree algorithm.
After computing the node, we push it onto the stack and, every time the top two nodes of the stack 
are at the same height, we combine them to compute their parent using `RANDHASH`. In this case, we 
pop these two nodes off the stack and push the new computed node onto the stack. Eventually, in the 
end, the root of the tree is the top node of the stack.

## Correctness Proof

While the implementation is a literal translation of the RFC, the proof is not as straight-forwards 
as it may seem. This is due to the fact that we do not the number of iterations of the inner loop. 
As a result, it is not easy to prove the upper bound of the `offset` variable.
While to us it is trivial to see that `offset` does not overflow a `u64` value 
(because the tree has \\(2^{??}\\) elements, which fit in a  `u64`), it is not easy to write an invariant 
that expresses the upper bound. 


So how will we prove that the, when using the `nth_put` and `get_setE` lemmas, the accesses are in-bounds 
if we do not have an upper bound for the `offset`?  It turns out that, in fact, we do not need to 
prove that these accesses are in-bounds. Instead, we simply need to prove that, even if the accesses 
are out-of-bounds, the expressions evaluate to the same value. But how does this make any sense? While in C, 
reading past the end of an array is undefined behaviour, EasyCrypt has clear semantics regarding this: 
reading past the end of an array yields `witness`, while reading past the end of a list yields the default 
value passed to `nth` -- `witness` in our case. For this, the lemmas `get_out` and `nth_out` will be useful.

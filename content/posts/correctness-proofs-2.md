---
title: 'Correctness Proofs of Jasmin Programs: Part 2 - WOTS+'
date: 2024-10-28T16:39:31+01:00
draft: false
toc: true
ShowToc: true
TocOpen: false
ShowCodeCopyButtons: true
showbreadcrumbs: true
summary: ""
tags: ['Jasmin', 'EasyCrypt']
---


In this post, we will look at the correctness proof of WOTS+, a one-time signature scheme used within 
the eXtended Merkle Signature Scheme (XMSS). 

## Background on WOTS+

WOTS+ improvemes upon the original WOTS scheme by introducing a pseudorandom function (PRF) and a 
chaining function to generate the signature. You can read more about it 
[here](https://research.dorahacks.io/2022/10/26/hash-based-post-quantum-signatures-1/).

## Proof of Auxiliary Results 

```ec
module ThashF = {
  proc thash_f (t : nbytes, seed : seed, address : adrs) : (nbytes * adrs) = {
    var key : nbytes;
    var bitmask : nbytes;
    var addr_bytes : nbytes;
    
    addr_bytes <- addr_to_bytes address;
    key <@ Hash.prf(addr_bytes, seed);
    address <- set_key_and_mask address 1;
    addr_bytes <- addr_to_bytes address;
    bitmask <@ Hash.prf(addr_bytes, seed);
    t <@ Hash._F(key, nbytexor t bitmask);
    return (t, address);
  }
}.
```

```
lemma thash_f_equiv (_out_ _seed_ : W8.t Array32.t) (a : W32.t Array8.t) :
    n = XMSS_N /\
    prf_padding_val = XMSS_HASH_PADDING_PRF /\
    padding_len = XMSS_PADDING_LEN /\ 
    F_padding_val = XMSS_HASH_PADDING_F =>
    equiv [
      M(Syscall).__thash_f ~ ThashF.thash_f :
      arg{1}.`1 = _out_ /\
      arg{1}.`2 = _seed_ /\
      arg{1}.`3 = a /\
      
      arg{2}.`1 = NBytes.insubd (to_list _out_) /\
      arg{2}.`2 = NBytes.insubd (to_list _seed_) /\
      arg{2}.`3 = a
      ==>
      to_list res{1}.`1 = val res{2}.`1 /\
      res{1}.`2 = res{2}.`2 /\
      res{1}.`2.[7] = W32.one /\
      sub res{1}.`2 0 7 = sub a 0 7
    ].
proof. 
(* proof omitted for brevity *)
qed.
```

## Chaining Function Proof

Because the Jasmin implementation is a rough translation of the RFC on which the specification is based,
this proof is relatively straight forward. 

The only differences between the specification and the implementation are the following:
- The implementation uses arrays of words
- The specification uses lists of integers
- The implementation uses words while the specificiation uses integers
- On the implementation `i` goes from `start` to `start + steps`, while on the specification it 
goes from `0` to `steps`. 
The changes on the address are not reflected on other functions in the implementation[^1].

[^1]: This is a limitation of Jasmin. In Jasmin, when a function that takes as an argument an array 
updates it, it must return it. One alternative would be to create a local copy of the address taken 
as argument and make changes to it instead; but it would result in a slower implementation.


The proof strategy will be to use a sequence of `seq` tactics to keep track of the state of variables.
<!-- TODO: Rephrase this -->

```ec
lemma gen_chain_correct (_buf_ : W8.t Array32.t, _start_ _steps_ : W32.t)
                        (_pub_seed_ : W8.t Array32.t) (a1 a2 : W32.t Array8.t) : 
    n = XMSS_N /\
    w = XMSS_WOTS_W /\ 
    len = XMSS_WOTS_LEN /\
    prf_padding_val = XMSS_HASH_PADDING_PRF /\ 
    padding_len = XMSS_PADDING_LEN /\ 
    F_padding_val = XMSS_HASH_PADDING_F =>

    equiv [
      M(Syscall).__gen_chain_inplace ~ Chain.chain : 
    
      arg{1} = (_buf_, _start_, _steps_, _pub_seed_, a1) /\
      arg{2} = (NBytes.insubd (to_list _buf_), to_uint _start_, to_uint _steps_, 
                NBytes.insubd (to_list _pub_seed_), a2) /\
      
      0 <= to_uint _start_ <= XMSS_WOTS_W - 1/\
      0 <= to_uint _steps_ <= XMSS_WOTS_W - 1 /\
      0 <= to_uint (_start_ + _steps_) <= w - 1 /\

      sub a1 0 6 = sub a2 0 6
      
      ==> 
      
      val res{2} = to_list res{1}.`1 /\
      sub res{1}.`2 0 6 = sub a1 0 6 
    ].
proof.
rewrite /XMSS_N /XMSS_WOTS_W => [#] n_val w_val *.
proc => //=.
swap {1} 1 2.
seq 2 1 : ( 
  0 <= to_uint start{1} <= w - 1/\
  0 <= to_uint steps{1} <= w - 1 /\
  0 <= to_uint (start{1} + steps{1}) <= w - 1 /\
  val t{2} = to_list out{1} /\
  i{2} = to_uint start{1} /\
  s{2} = to_uint steps{1} /\
  val _seed{2} = to_list pub_seed{1} /\
  val t{2} = to_list out{1} /\  
  t{1} = start{1} + steps{1} /\
  sub addr{1} 0 6 = sub address{2} 0 6 /\ 
  sub addr{1} 0 6 = sub a1 0 6 /\
  start{1} = _start_ /\
  steps{1} = _steps_ 
); first by auto => /> *; do split => [/# | /# | | |]; by rewrite insubdK /P // size_to_list n_val.
  
while (
  sub addr{1} 0 6 = sub address{2} 0 6 /\ 
  sub addr{1} 0 6 = sub a1 0 6 /\

  0 <= to_uint start{1} <= w - 1/\
  0 <= to_uint steps{1} <= w - 1 /\ 
  0 <= to_uint (start{1} + steps{1}) <= w - 1 /\

  val t{2} = to_list out{1} /\
  val _seed{2} = to_list pub_seed{1} /\
  
  0 <= chain_count{2} <= s{2} /\
  s{2} = to_uint steps{1} /\ 
  i{2} = to_uint start{1} /\
  to_uint i{1} = i{2} + chain_count{2} /\
  t{1} = start{1} + steps{1} 
); last by auto => /> ; smt(@W32 pow2_32).

seq 2 2 : (#pre /\ address{2} = addr{1}).
    + inline {1}; auto => /> &1 &2 H0 H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 H11 H12 H13 *.
      rewrite /set_key_and_mask /set_hash_addr.
      do split.
         * apply (eq_from_nth witness); first by rewrite !size_sub.
           rewrite size_sub // => j?.
           rewrite !nth_sub // !get_setE // !ifF 1..4:/#.
           smt(sub_k).
         * apply (eq_from_nth witness); first by rewrite !size_sub.
           rewrite size_sub // => j?.
           rewrite !nth_sub // !get_setE // !ifF 1,2:/#.
           smt(sub_k).
         * rewrite tP => j?.
           rewrite !get_setE //.
           case (j = 7) => //?.
           case (j = 6) => //?; first by rewrite -H12 to_uintK.
           smt(sub_k).

outline {2} [1-6] { (t, address) <@ ThashF.thash_f (t, _seed, address); }.

inline {1}  M(Syscall).__thash_f_  M(Syscall)._thash_f.

sp; wp.

conseq />.

exists * out1{1}, pub_seed1{1}, addr1{1}.
elim * => P0 P1 P2.
call (thash_f_equiv P0 P1 P2) => [/# |]. 
skip => /> &1 &2 H0 H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 H11 H12 H13.
do split; 1,2: by smt(@NBytes).
move => H14 H15 resultL resultR H16 H17 H18 H19.
do split; 1,3..5: by smt().
- smt(sub_N).
- smt(@W32 pow2_32).
- rewrite ultE to_uintD_small 1:/# /= H11 => ?; smt(@W32 pow2_32).
- rewrite ultE to_uintD_small 1:/# /= H11 => ?; smt(@W32 pow2_32).
qed.
```

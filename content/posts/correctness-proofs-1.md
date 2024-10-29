---
title: 'Correctness Proofs of Jasmin Programs: Part 1 - Overview'
date: 2024-10-23T22:15:15+02:00
draft: false
toc: true
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

### Overview 

![proof diagram](/posts/images/proof_diagram.png#center)

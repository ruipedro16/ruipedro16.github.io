# -*- Makefile -*-

# NOTE: if d2 is not installed, install it by running 
#                $ curl -fsSL https://d2lang.com/install.sh | sh -s --
#       This command is from https://github.com/terrastruct/d2#install

OUTDIR := ../images/

IN  := $(wildcard *.d2)
OUT := $(patsubst %.d2,$(OUTDIR)%.png,$(IN))

all: $(OUT)
default: all

THEME    ?= 200 # Dark Mauve
D2_FLAGS ?= -t $(THEME) ${D2ADDFLAGS} # note: add -s for --sketch

$(OUTDIR)%.png: %.d2 | $(OUTDIR)
	d2 $(D2_FLAGS) $< $@

$(OUTDIR):
	mkdir -p $@

.PHONY: fmt
fmt:
	d2 fmt $(IN)

.PHONY: clean
clean:
	-$(RM) -r $(OUT)

# -*- Makefile -*-

SRC_EXT := mmd
SVG_EXT := svg
PNG_EXT := png

# TODO: FIXME: https://github.com/fskpf/svg2roughjs use to generate "rough" diagrams
# TODO: FIXME: For now copy and paste the code for the diagrams to https://mermaid.live/
#              with the following configuration:
#                 - theme: dark
#                 - rough
#              and then export the svg

all: $(patsubst %.${SRC_EXT}, %.${SVG_EXT}, $(wildcard *.${SRC_EXT})) \
     $(patsubst %.${SRC_EXT}, %.${PNG_EXT}, $(wildcard *.${SRC_EXT}))

%.${SVG_EXT}: %.${SRC_EXT}
	mmdc -i $< -o $@ -c config.json -b transparent

%.${PNG_EXT}: %.${SRC_EXT}
	mmdc -i $< -o $@ -c config.json -b transparent

.PHONY: clean
clean:
	-$(RM) -r *.${SVG_EXT} *.${PNG_EXT}

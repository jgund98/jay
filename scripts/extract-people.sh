#!/usr/bin/env bash
#
# Regenerates the portraits of Jay and Jason in public/img.
#
# Source: the two promotional flyers Jay sent in Aug 2026. The flyer graphics
# around them are AI-generated; the men are photographs, and those photographs
# are the only pictures of Jay and Jason that exist for this site.
#
# The problem: both men are boxed in by flyer furniture. Crop tight enough to
# miss the headline and you get a passport photo. So instead of cropping
# around the text, each flyer's top-right headline block is DEFOCUSED first —
# a heavy blur composited back through a soft-edged mask, which reads as
# depth of field rather than a patch. A hard-edged rectangle of blur is
# instantly visible; the feather is what sells it. Then the crop can open up
# and the men can be framed properly, head and shoulders, shirt logo showing.
#
# Both outputs are square on purpose. The card renders them at aspect-square,
# so nothing is cropped a second time.
#
# What still bounds each crop:
#   Jay    x >= 222 (the icon column), y <= 563 (the pink phone banner)
#   Jason  x >= 215 (same), y >= 224 ("MOBILE MECHANIC"), y <= 563, x <= 620
#          (the "WE SERVICE YOU AT HOME" circle)
#
# If they ever send straight phone photos, use those instead and delete this.
#
set -euo pipefail
OUT=../public/img

# Soft-edged mask over each flyer's headline block. Args: x1 x2 y1 y2 feather.
mask() { echo "255*clip(min(min((X-$1)/$5,($2-X)/$5),min((Y-$3)/$5,($4-Y)/$5)),0,1)"; }

defocus() { # in.jpg out.jpg WxH maskexpr
  ffmpeg -y -v error -i "$1" -f lavfi -i "color=black:s=$3" -filter_complex \
    "[0:v]format=gbrp,split[b1][b2];[b2]boxblur=24:3,eq=brightness=-0.05[blur];\
     [1:v]format=gbrp,geq=r='$4':g='$4':b='$4'[m];\
     [b1][blur][m]maskedmerge,format=yuv420p" -frames:v 1 -q:v 2 "$2"
}

# Jay. The mask must reach x=408: any further right and the magenta edge of
# the "FAST. CONVENIENT. RELIABLE." bar survives the blur at partial opacity.
defocus jay-src.jpg jay-clean.jpg 756x759 "$(mask 408 820 40 365 58)"
ffmpeg -y -v error -i jay-clean.jpg \
  -vf "crop=340:340:224:224,scale=1000:1000:flags=lanczos" -q:v 3 "$OUT/jay-portrait.jpg"

# Jason. Mask starts at x=415 — his hair edge is at 415, so anything further
# left softens his head. The crop starts at y=224 to clear "MOBILE MECHANIC",
# which costs a few pixels off the top of his hair and is the cheaper trade.
defocus jason-src.jpg jason-clean.jpg 752x768 "$(mask 415 820 30 330 50)"
ffmpeg -y -v error -i jason-clean.jpg \
  -vf "crop=340:340:215:224,scale=1000:1000:flags=lanczos" -q:v 3 "$OUT/jason-portrait.jpg"

rm -f jay-clean.jpg jason-clean.jpg
echo "wrote jay-portrait.jpg and jason-portrait.jpg"

#!/usr/bin/env bash
# Regenerates the portraits of Jay and Jason in public/img.
#
# Source: the two promotional flyers Jay sent in Aug 2026. The flyer graphics
# around them are AI-generated; the men are photographs, and those photographs
# are the only pictures of Jay and Jason that exist for this site. These crops
# take the person and their immediate background and leave every piece of
# flyer furniture — the headline, the logo, the phone number, the "FAST.
# CONVENIENT. RELIABLE." bar — outside the frame.
#
# The tight right edge on Jay (208px) is not arbitrary: at 215px the crop
# catches the magenta edge of that bar.
#
# Usage: put jay-src.jpg (756x759) and jason-src.jpg (752x768) next to this
# script and run it. If they ever send straight phone photos, use those
# instead and delete this.
set -euo pipefail
OUT=../public/img

# Jay — tall crop, head through shirt logo.
ffmpeg -y -v error -i jay-src.jpg \
  -vf "crop=208:338:238:222,scale=900:1462:flags=lanczos" -q:v 3 "$OUT/jay.jpg"

# Jason — head and shoulders, his name on the shirt.
ffmpeg -y -v error -i jason-src.jpg \
  -vf "crop=248:310:240:250,scale=900:1125:flags=lanczos" -q:v 3 "$OUT/jason.jpg"

# Hero two-up: brand gradient, both panels scaled to the same height so their
# heads come out roughly the same size. The 1200x1040 canvas is not arbitrary:
# it matches the hero panel's ratio, so object-cover barely crops either man.
ffmpeg -y -v error -i jay-src.jpg \
  -vf "crop=208:338:238:222,scale=1012:1644:flags=lanczos" jay-tall.png
ffmpeg -y -v error -i jason-src.jpg \
  -vf "crop=248:310:240:250,scale=900:1125:flags=lanczos" jason-p.png
ffmpeg -y -v error -f lavfi \
  -i "gradients=s=1200x1040:c0=0x241146:c1=0x0A0A12:x0=180:y0=0:x1=1100:y1=1040:d=1" \
  -frames:v 1 grad.png
ffmpeg -y -v error -i grad.png -i jay-tall.png -i jason-p.png -filter_complex \
  "[1:v]scale=-1:830[a];[2:v]scale=-1:830[b];\
   [0:v][a]overlay=6:105[t];[t][b]overlay=W-w-6:105,format=yuv420p" \
  -q:v 3 "$OUT/hero-team.jpg"
rm -f jay-tall.png jason-p.png grad.png
echo "wrote jay.jpg, jason.jpg, hero-team.jpg"

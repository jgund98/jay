# Rebuilds the transparent logo assets from Jay's original poster.
#
# The source (_source/gmb/gmb-10.jpg, 2400x2400) is his logo sitting on a
# carbon-fibre background with wrenches and gears in the corners. This lifts
# the artwork off it.
#
# The one setting that matters is TOLERANCE. At 0.15 the key eats the deep
# purple in "GAME CHANGER" and hollows out "AUTOMOTIVE"; at 0.05 only the
# near-black background (luma ~0.06) falls away and the colour survives.
#
#   pwsh scripts/extract-logo.ps1

$src = Join-Path $PSScriptRoot "..\_source\gmb\gmb-10.jpg"
$pub = Join-Path $PSScriptRoot "..\public\img"
$KEY = "format=rgba,lumakey=threshold=0.14:tolerance=0.05:softness=0.06"

if (-not (Test-Path $src)) { Write-Error "Missing $src"; exit 1 }

# mark only
& ffmpeg -y -loglevel error -i $src -vf "crop=1960:1340:170:250,$KEY,scale=880:-1" "$pub\logo-mark.png"
# two-line wordmark
& ffmpeg -y -loglevel error -i $src -vf "crop=2180:372:120:1656,$KEY,scale=1000:-1" "$pub\logo-word.png"
# full stacked lockup
& ffmpeg -y -loglevel error -i $src -vf "crop=2180:1780:120:250,$KEY,scale=1000:-1" "$pub\logo-lockup.png"
# square icon for the favicon
& ffmpeg -y -loglevel error -i $src -vf "crop=1400:1400:450:220,$KEY,scale=512:512" "$pub\logo-icon.png"

Get-ChildItem $pub -Filter "logo-*" | Select-Object Name, @{n = 'KB'; e = { [int]($_.Length / 1kb) } }

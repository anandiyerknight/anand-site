#!/usr/bin/env bash
# Compress curated reels + generate posters + optimize before/after pairs.
# Idempotent: skips files that already exist at destination.
set -euo pipefail

SRC="/Users/anandiyer/Downloads/ANAND IYER PORTFOLIO "
DST="/Users/anandiyer/CODE/anand-site/public"
mkdir -p "$DST/reels" "$DST/posters" "$DST/content" "$DST/before-after" "$DST/music"

compress_video() {
  local in="$1" out="$2" crf="${3:-30}" scale="${4:-1280:-2}" audio_flag="${5:--an}"
  if [[ -f "$out" ]]; then echo "skip $out"; return; fi
  echo ">> $out"
  ffmpeg -y -loglevel error -i "$in" -vcodec libx264 -crf "$crf" -preset fast \
    -vf "scale=$scale" -movflags +faststart $audio_flag "$out"
}

poster() {
  local in="$1" out="$2"
  if [[ -f "$out" ]]; then echo "skip $out"; return; fi
  echo ">> poster $out"
  ffmpeg -y -loglevel error -ss 0.5 -i "$in" -vframes 1 -q:v 4 -vf "scale=1280:-2" "$out"
}

# Hero reel — slightly larger, keeps audio for lightbox use later
compress_video "$SRC/PORTFOLIO/FLIPPIT 2026 REEL.mp4" "$DST/reels/hero-flippit-2026.mp4" 28 "1600:-2" "-c:a aac -b:a 96k"
poster "$SRC/PORTFOLIO/FLIPPIT 2026 REEL.mp4" "$DST/posters/hero-flippit-2026.jpg"

# Gallery reels — muted hover loops
declare -a REELS=(
  "PORTFOLIO/Flippit Show reel NOV 2025.mp4|reel-flippit-nov.mp4"
  "VIDEOS/Kvasrki - Handbags AI realism.mp4|reel-kvarski.mp4"
  "VIDEOS/MOVIE MAX - PIXAR STYLE.mp4|reel-moviemax.mp4"
  "VIDEOS/Gulabi - AI Travel and Tourism.mp4|reel-gulabi.mp4"
  "VIDEOS/PERFUME_AI.mp4|reel-perfume.mp4"
  "VIDEOS/Bingo Tedhe Medhe - Spicy.mp4|reel-bingo.mp4"
  "VIDEOS/FOOD Bakewills.mp4|reel-bakewills.mp4"
  "VIDEOS/House of Kiki luxury Handbags .mp4|reel-kiki.mp4"
  "VIDEOS/Vested Global - Retro Comic .mp4|reel-vested.mp4"
)

for entry in "${REELS[@]}"; do
  IFS='|' read -r in_rel out_name <<< "$entry"
  compress_video "$SRC/$in_rel" "$DST/reels/$out_name" 30 "1280:-2" "-an"
  poster "$SRC/$in_rel" "$DST/posters/${out_name%.mp4}.jpg"
done

# Stack section accent loops — short, very compressed, silent
declare -a STACK=(
  "CONTENTs/luxury indoor bag.mp4|stack-content.mp4"
  "VIDEOS/Pixar Style - Animation.mp4|stack-saas.mp4"
  "CONTENTs/MOTHER_DIARY_02.mp4|stack-funnels.mp4"
)
for entry in "${STACK[@]}"; do
  IFS='|' read -r in_rel out_name <<< "$entry"
  compress_video "$SRC/$in_rel" "$DST/content/$out_name" 32 "960:-2" "-an"
done

# Music videos — small previews for sonic section
declare -a MUSIC=(
  "MUSIC VIDEOS/Pooparikka Neeyum Pogaadhae .mp4|music-pooparikka.mp4"
  "MUSIC VIDEOS/Storyboard_MOHABBAT HO NA JAYE_FINAL.mp4|music-mohabbat.mp4"
  "MUSIC VIDEOS/Tum Agar Saath Dene Ka.mp4|music-tum-agar.mp4"
)
for entry in "${MUSIC[@]}"; do
  IFS='|' read -r in_rel out_name <<< "$entry"
  compress_video "$SRC/$in_rel" "$DST/music/$out_name" 32 "960:-2" "-an"
  poster "$SRC/$in_rel" "$DST/posters/${out_name%.mp4}.jpg"
done

# Before/after — pick paired images by name. Use clothing + earrings + handbag pairs.
copy_image() {
  local in="$1" out="$2"
  if [[ -f "$out" ]]; then echo "skip $out"; return; fi
  if [[ ! -f "$in" ]]; then echo "MISSING $in"; return; fi
  echo ">> img $out"
  sips -Z 1600 -s format jpeg -s formatOptions 82 "$in" --out "$out" >/dev/null
}

# Curate pairs from AUGUST folder (filenames hint pairing)
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/DSL-895-2.jpg" "$DST/before-after/01-before.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/DSL-883-1_AFTER.jpg" "$DST/before-after/01-after.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/DUSALA_RE_2_3_AFTER.jpg" "$DST/before-after/02-after.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/DUSALA_RE_3_AFTER.jpg" "$DST/before-after/02-before.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/UESP10_GREY_SQUARE_1080x_AFTER.jpg" "$DST/before-after/03-after.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/SquareGreyISC-CER00335.jpg" "$DST/before-after/03-before.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/woven_hobobag_08.jpg" "$DST/before-after/04-before.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/woven_hobobag_09.jpg" "$DST/before-after/04-after.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/top-handle-handbag-variation.jpg" "$DST/before-after/05-before.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/top-handle-handbag-variation02.jpg" "$DST/before-after/05-after.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/gold-crystal-bag02.jpg" "$DST/before-after/06-before.jpg"
copy_image "$SRC/BEFORE - AFTER COMPILATIONS/AUGUST/gold-crystal-rosevariation02.jpg" "$DST/before-after/06-after.jpg"

echo "DONE"

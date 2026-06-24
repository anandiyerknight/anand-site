# Immersive 3D site — generation prompts

Companion to the R3F build plan. Two prompt sets:
1. **Google Veo 3** video prompts (for the cinematic scene backgrounds + social cuts).
2. **One Google Stitch** prompt (to lock the visual design language as 2D frames).

Brand frame for everything below: dark monochrome (near-black background, off-white text), ONE accent = electric cyan (#00E5FF) used only for glow/energy. Typeface feel: Geist (clean modern grotesque). Mood: deep, premium, weightless, high-end product film. No clutter, no bright multi-colour, no stock-3D cliche.

---

## A. Google Veo 3 video prompts

Notes: Veo 3 does best with one rich paragraph that names subject, setting, action, camera, lighting, mood, and audio. Target ~8 seconds per shot. Render 16:9 for site backgrounds; a 9:16 variant of each works for WhatsApp/Reels. Keep text on screen minimal (Veo mangles long text); add real copy in the edit.

### Prompt 1 — The Context Engine: one piece of content becomes thirty (the hero idea)

In an infinite matte-black void, a single luminous content card floats in soft focus, its edges rimmed with a faint electric-cyan glow. The camera slowly dollies in as the card drifts toward a central object: a slowly rotating wireframe core made of thin glowing cyan filaments, the "context engine." The instant the card touches the core, it dissolves into a stream of light and the engine pulses; from that pulse, roughly thirty distinct content pieces bloom outward in 3D space in a graceful fan, each a thin glass panel catching cyan light: carousels, posters, short-form video frames, email cards, captions. They rotate and settle into orbiting rings around the core. Cinematic depth of field, volumetric haze, premium product-film lighting, monochrome with cyan as the only colour. Camera: smooth slow push-in, then a gentle orbit. Audio: a low warm hum that builds, a single satisfying bloom whoosh on the multiplication, soft glassy digital chimes as the pieces fan out, no music vocals. Style: photoreal CGI, Apple-keynote restraint, ultra clean.

### Prompt 2 — AI outreach compounds and lands in WhatsApp

A dark cinematic space seen from a slow drifting camera. A single point of cyan light ignites, then splits into many travelling light-streaks that race along thin glowing rails toward several abstract channel nodes arranged in depth (simple luminous glyph plates for LinkedIn, email, Instagram, Messenger). Each node it hits multiplies the streaks, so the flow visibly compounds and thickens, more and more light converging. All the streams then curve and funnel together, accelerating toward a single object in the foreground: a sleek phone-like slab in the dark. As the streams arrive, a chat bubble materialises on its screen and lights up with a notification glow, the one moment of soft WhatsApp green at the very climax against the otherwise cyan-and-monochrome palette, signalling the message that actually gets opened. Cinematic, volumetric, shallow depth of field. Camera: slow lateral drift, then a settle on the phone. Audio: rising layered hum as the flow compounds, a rush of soft whooshes converging, a single clean notification chime on the green bubble. Style: photoreal CGI, premium, minimal.

### Prompt 3 — Opening establishing shot: the compounding loop (the machine)

A vast dark volume. Four luminous nodes hang in space, evenly placed, each a small glowing cyan wireframe orb, connected by elegant arcing light-trails that form one continuous closed loop (data, content, outreach, conversion, then back to data). The camera orbits the loop slowly. Light pulses travel along the arcs, and with each full pass the loop glows a little brighter and the pulses move a little faster, communicating compounding momentum. Fine particle dust drifts through the volume catching cyan light. Cinematic haze, deep blacks, single-accent cyan glow, no other colour. Camera: slow cinematic orbit with a subtle parallax rise. Audio: deep sub hum, a soft rising synth pad, faint ticking pulses synced to the light travelling the loop. Style: photoreal, weightless, high-end title-sequence energy.

### Optional Prompt 4 — Closing / CTA beat

Continuation of the loop scene: the camera eases to a stop facing the brightest node as the orbiting content pieces and channel streams from the earlier shots quietly settle into the loop and keep cycling in the background, softly out of focus. The centre of frame holds clean negative space for a single line of copy and a button to be added in the edit. Slow, calm, confident. Audio: the hum resolves to a steady warm tone, one final soft chime. Monochrome with cyan glow, premium product-film finish.

---

## B. Google Stitch prompt (single prompt)

Paste this whole block into Google Stitch. It produces 2D design frames (the visual language and section layouts), not real 3D; the R3F build animates them.

> Design a high-end, immersive, scroll-driven landing page for an AI automation and growth-systems studio. Audience: founders and marketers who are not technical, so the page must make an esoteric idea feel simple while still looking deeply advanced. Visual language: dark mode, near-black background, off-white text, a clean modern grotesque typeface (Geist or similar), generous negative space, fine 1px hairline rules, subtle glassmorphism panels with heavy blur, and exactly one accent colour, electric cyan (#00E5FF), used only as a glow and energy highlight, never as flat fills. The mood is a premium product film: deep, weightless, cinematic, with glowing wireframe shapes, particle fields, and soft volumetric light, like a frame paused from a high-end 3D scene. It must not look like a generic SaaS template or a flat dashboard UI.
>
> Lay out these full-bleed sections, each meant to read as one immersive scene with large type over a dark glowing visual:
> 1. Hero: a single line headline about turning one input into an entire growth machine, a short subline, one cyan-glow primary button. Background motif: a glowing cyan wireframe core with faint orbiting particles.
> 2. The Context Engine: show one content card on the left transforming into about thirty smaller content tiles fanning out on the right (carousels, posts, reels, emails) around a glowing core. Caption explains one piece of content becomes thirty.
> 3. Outreach that compounds: abstract channel nodes connected by glowing cyan light-trails that converge and funnel into a single phone with a lit chat bubble, signalling the message lands where people actually open it. Short caption.
> 4. The compounding loop: four connected nodes (data, content, outreach, conversion) arranged in a closed loop with flowing arcs, communicating a system that feeds itself and gets sharper each cycle.
> 5. Closing call to action: clean centred copy and one cyan button on a quiet dark field.
>
> Typography: oversized confident display headlines, tight tracking, small uppercase mono labels for section tags. Buttons: pill or sharp rectangle with a soft cyan outer glow on hover. Keep it minimal, expensive, and calm. Deliver desktop frames first, then matching mobile frames where sections stack vertically and the visuals simplify.

---

## How these connect to the build
- Veo 3 outputs become the looping background films behind the R3F scenes (or fallbacks on low-power devices).
- The Stitch frames lock the look (spacing, type scale, panel treatment, cyan glow), which the R3F implementation then brings into real WebGL motion per the plan file.

**Storybloom — Complete Frontend Aesthetic & Design Mindset (single-prompt spec)**

Build a playful-but-parent-trustworthy landing page for **Storybloom**, a personalized hardcover-storybook business for kids 5–11. The art direction is **"soft neubrutalism meets picture-book warmth"**: thick hand-drawn borders and tactile drop-shadows give everything a paper-sticker quality, while a cream canvas, rounded organic shapes, and warm mascot-colors keep it inviting to parents (the buyers) without feeling childish or Disneyfied. Avoid every AI-slop tell — no purple/violet gradients on white, no Inter, no centered-equal-spacing layouts, no glassmorphism, no generic uniform card grids.

**Emotional tone.** Warm, hopeful, tactile, a little mischievous. The page should feel like stepping into a beautifully illustrated modern children's book — handmade, re-readable, physical. The undercurrent is an anti-screen-time manifesto, so tactility (physical shadows, off-axis rotations, sticker badges, script accents) is doing rhetorical work, not just decoration.

**Color system (all committed via CSS variables and Tailwind inline HEX).**

- Canvas: #FDFBF7 (bone/cream — never pure white).
- Alt canvas / warm band: #FFF5E6.
- Hard ink (borders, text, footer): #0F172A — used as the universal 2px border and shadow color, which is what ties the neubrutalist system together.
- Primary: Macaroni-cheese orange #FF9F1C with hover #F48C06.
- Secondary: Teal #2EC4B6.
- Accents: Coral #FF595E (script highlights, hearts), Sunshine #FFCA3A (highlighter marks, stars, "Storybloom" script in footer), Sky #8ECAE6, Lavender #CDB4DB.
- Text: Slate-900 primary, Slate-600 body, Slate-400 muted.
- One deliberate dark band (#0F172A section for Sample Stories) grounds the page and creates visual rhythm; there it's dark-bg + warm card + #FFCA3A offset shadow — never dark text on dark.

**Typography (three fonts, randomized away from the default "Space Grotesk" slop).**

- Display: **Fredoka** (500–600) — rounded, friendly, readable for parents; used for all H1–H3 with -0.01em tracking.
- Body: **Quicksand** (500–600) — soft humanist sans, pairs warmly with Fredoka, remains legible at 18–20px.
- Accent script: **Caveat Brush** — brush hand-lettering for "story time", "once upon a kid…", "waitlist", and the oversized footer wordmark. Used sparingly to punch emotional moments.
- Hierarchy: H1 text-5xl → md:text-7xl, H2 text-4xl → md:text-6xl, H3 text-2xl → sm:text-3xl, body text-lg → text-xl, eyebrow text-sm font-bold uppercase tracking-widest text-orange-500.

**Layout & spacing.**

- Max container max-w-7xl, padding px-6 md:px-10 lg:px-24.
- Section spacing deliberately oversized: py-20 md:py-28.
- Bento-style asymmetric grids: hero is 7/5 split, Why-It-Matters reverses to 5/7, Testimonials stagger the middle card with md:translate-y-6 so the row breaks the default "equal grid" AI pattern.
- Organic image masks: hero image uses rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl (diagonal mismatched radii); the Why-It-Matters image flips the diagonal. This is the single most important anti-slop move.
- Cards: rounded-[2rem], pill buttons rounded-full, inputs rounded-2xl — radius variance across scale, not monotonous.

**The signature system — tactile shadows.** Three reusable utilities drive the whole identity:

- .tactile-shadow → 4px 4px 0 0 #0F172A, on hover translate(-2px,-2px) + 6px 6px, on :active translate(2px,2px) + 2px 2px. This is the "press it like a button" feel applied to every CTA, switch, and chip.
- .tactile-shadow-lg → 8px 8px 0 0 #0F172A for hero cards, form container, testimonial cards, book covers (where offset shadow is #FFCA3A on dark band).
- .tactile-shadow-sm → 3px 3px for badges, avatars, small chips. Every border is a uniform 2px solid #0F172A — this deliberate thickness is what creates the hand-drawn paper-sticker cohesion.

**Decorative hand-drawn layer.** Small inline SVG wavy underline utility (.wavy), sticker-badges rotated off-axis (rotate-[-6deg], rotate-[4deg], rotate-[6deg]) pinned to hero image ("once upon a kid…" yellow tag, "Re-read x47 times" white heart-chip, "no screens needed" teal tag), and a yellow highlighter swipe behind the words "whatever they consume" in the Why section. These sticker elements are what make the page feel *designed* rather than *generated*.

**Motion (Framer Motion, spring physics, never linear).**

- Global spring config stiffness: 180–280, damping: 18–28.
- Hero: staggered entrance (badge → H1 → subtitle → CTAs, 50ms apart), hero image enters with slight rotate -2° for paper-tilt feel.
- Scroll reveal on How-It-Works, Sample Stories, Testimonials via whileInView with margin: -80px so reveals trigger naturally.
- AnimatePresence on the personalize-toggle: child-details section slides open with height: auto spring — the single most tactile micro-interaction on the page.
- CSS transitions on .tactile-shadow intentionally use cubic-bezier (0.34, 1.56, 0.64, 1) to give buttons a slight bouncy press.

**Components — how shadcn is bent to the aesthetic.** Raw shadcn components would look generic, so every one is overridden with the neubrutalist 2px-border + tactile shadow system:

- Switch → 2px ink border, data-[state=checked]:bg-[#FF9F1C].
- Select trigger → 2px border, rounded-2xl, amber focus ring ring-[#FF9F1C]/30.
- SelectContent → 2px border, rounded-2xl dropdown.
- Accordion → each item is a standalone 2px-bordered rounded-2xl card with tactile-shadow-sm, no default shadcn chevron gray.
- Sonner Toaster → richColors position="top-center" for celebratory signup toasts.
- Inputs are plain <input> elements styled to match because shadcn's default Input is too thin — they use px-5 py-4 text-lg font-medium, amber focus ring, 2px ink border.

**Section-by-section logic.**

1. **Sticky header** — blurred #FDFBF7/85 backdrop so it never becomes dark-on-dark; logo is book icon in orange pill + "Storybloom" in Fredoka; primary CTA repeats in the header so there's always a waitlist button one click away.
2. **Hero** — asymmetric 7/5 split, left side leads with a status badge ("NOW TAKING FOUNDING FAMILIES"), an H1 that breaks into two display weights (Fredoka for "Turn screen time into", Caveat Brush coral for "story time"), a two-button CTA stack (primary "Join the waitlist" + secondary "Personalize a sample" that scrolls AND auto-opens the personalize toggle), and live social proof (2+ families on the waitlist) that reads from GET /api/waitlist/count. Right side is the organic-masked photo with floating sticker badges.
3. **How it works** — 3-card bento on #FFF5E6 warm band. Each card has its own pastel icon-tile (#FFE8C2, #C9F0EA, #FFD6D8) so the row has color rhythm, "step 1/2/3" labels in Caveat Brush orange, and the action-oriented copy "Tell us about your child → We craft the magic → A keepsake arrives."
4. **Why it matters** — emotional section reversing the hero split (image left, copy right). The H2 has a #FFCA3A highlighter swipe behind "whatever they consume" — the most editorial moment on the page. Two small stat-cards in pastel variants reinforce the anti-screen message.
5. **Sample stories** — the dark #0F172A band provides contrast and lets the warm book covers pop with a yellow #FFCA3A offset shadow instead of ink. Two mocked books with tag pills ("Courage", "Kindness") demonstrate the product range.
6. **Testimonials** — three cards with staggered middle-card offset, 5-star row in sunshine yellow, Quote icon in orange, real parent avatars (not clip art).
7. **Waitlist form (the conversion engine)** — centered on warm #FFF5E6 band, oversized card with tactile-shadow-lg. Progressive disclosure: email is always visible; a dedicated highlighted toggle row ("Personalize my sample story") with a Sparkles icon opens a spring-animated drawer exposing child name, age Select (5–11), and interests input. Submit button label changes copy ("Join the waitlist" → "Send me my sample") based on toggle state. Success state replaces the form entirely with a 🎉 celebration card and "Add another child" reset link.
8. **FAQ** — tight 3-col-max accordion, questions written as parents would ask them ("Is this physical or digital?"), ends with a CTA repeat so the section always loops back to conversion.
9. **Footer** — dark #0F172A, massive Caveat Brush "Storybloom" wordmark in sunshine yellow as the visual payoff, contact email, orange-on-dark repeat CTA, privacy/terms/contact row.

**Accessibility & testability.** Every interactive/CTA/input carries a kebab-case data-testid (hero-join-waitlist-button, waitlist-personalize-toggle, child-age-7, faq-trigger-3, etc.). All images have real alt text. Focus states use a 4px amber ring — visible and on-brand. Color contrast: body 600-slate on cream passes AA; the only dark section keeps text white with adequate padding.

**What's explicitly avoided — AI-slop checklist:**

- ❌ No purple/violet gradients anywhere.
- ❌ No Inter / Roboto / system-ui as primary fonts.
- ❌ No uniform 3-column card grids — every multi-card row has staggered offsets, alternating pastels, or asymmetric spans.
- ❌ No pure white background.
- ❌ No transition: all (uses specific properties + cubic-bezier to keep transform crisp).
- ❌ No generic soft drop-shadows — every shadow is the offset-ink tactile variant.
- ❌ No emoji icons for UI — uses lucide-react (BookOpen, Sparkles, Heart, Wand2, Truck, Star, PencilLine, Smartphone, Quote, Loader2, ArrowRight). Emoji is reserved for the single 🎉 celebration moment on form success.
- ❌ No centered-hero-with-equal-spacing layout — every hero is asymmetric 7/5.
"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Loader2,
  PencilLine,
  Quote,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Wand2,
} from "lucide-react";
import { StorySelect } from "@/components/ui/select";
import { StorySwitch } from "@/components/ui/switch";
import { StoryAccordion } from "@/components/ui/accordion";

const spring = { type: "spring", stiffness: 230, damping: 24 } as const;

const faqs = [
  {
    value: "faq-1",
    question: "Is this physical or digital?",
    answer:
      "Every Storybloom order is a printed hardcover keepsake. No app required, no screen needed.",
    testId: "faq-trigger-1",
  },
  {
    value: "faq-2",
    question: "How personalized can it be?",
    answer:
      "We personalize with your child's name, age, and interests so the story feels like it was written for them.",
    testId: "faq-trigger-2",
  },
  {
    value: "faq-3",
    question: "What age is this for?",
    answer:
      "Storybloom is crafted for kids ages 5 to 11 with vocabulary and themes tuned to each age.",
    testId: "faq-trigger-3",
  },
];

const ageOptions = Array.from({ length: 7 }, (_, idx) => {
  const age = `${idx + 5}`;
  return { value: age, label: age, testId: `child-age-${age}` };
});

export function LandingPage() {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const [waitlistCount, setWaitlistCount] = useState<number>(2);

  const [email, setEmail] = useState("");
  const [personalize, setPersonalize] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [interests, setInterests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const res = await fetch("/api/waitlist/count", { cache: "no-store" });
        const data = (await res.json()) as { count?: number };
        if (typeof data.count === "number") {
          setWaitlistCount(data.count);
        }
      } catch {
        setWaitlistCount(2);
      }
    };

    void loadCount();
  }, []);

  const joinLabel = useMemo(
    () => (personalize ? "Send me my sample" : "Join the waitlist"),
    [personalize],
  );

  const scrollToWaitlist = (openPersonalize = false) => {
    if (openPersonalize) {
      setPersonalize(true);
    }
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please add a valid email address.");
      return;
    }

    if (personalize && (!childName || !childAge)) {
      setError("Please add your child's name and age for personalization.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          personalized: personalize,
          childName,
          childAge,
          interests,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please retry.");
      }

      setWaitlistCount((value) => value + 1);
      setSuccess(true);
      setEmail("");
      setChildName("");
      setChildAge("");
      setInterests("");
      setPersonalize(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-[rgba(253,251,247,0.85)] backdrop-blur-md">
        <div className="container-shell flex h-20 items-center justify-between">
          <a href="#top" className="flex items-center gap-3" data-testid="header-logo-link">
            <span className="tactile-shadow-sm overflow-hidden rounded-full border-2 border-ink bg-white">
              <Image src="/images/icon.png" alt="Storybloom icon" width={44} height={44} className="h-11 w-11 object-cover" />
            </span>
            <span className="text-2xl font-semibold">Storybloom</span>
          </a>
          <button
            type="button"
            data-testid="header-join-waitlist-button"
            className="tactile-shadow focus-ring rounded-full bg-primary px-6 py-3 text-base font-bold text-ink"
            onClick={() => scrollToWaitlist()}
          >
            Join the waitlist
          </button>
        </div>
      </header>

      <section id="top" className="section-space">
        <div className="container-shell grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
              <p className="tactile-shadow-sm inline-block rotate-[-4deg] rounded-full bg-sunshine px-4 py-2 text-sm font-bold uppercase tracking-widest text-orange-700">
                Now taking founding families
              </p>
            </motion.div>

            <motion.h1
              className="mt-6 text-5xl leading-tight md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.05 }}
            >
              Turn screen time into
              <br />
              <span className="script text-coral">story time</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-lg font-semibold text-slate-700 md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
            >
              Personalized hardcover adventures made for kids 5-11, so bedtime feels magical, tactile, and
              re-readable.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.15 }}
            >
              <button
                type="button"
                data-testid="hero-join-waitlist-button"
                className="tactile-shadow focus-ring rounded-full bg-primary px-7 py-3.5 text-lg font-bold"
                onClick={() => scrollToWaitlist()}
              >
                Join the waitlist
              </button>
              <button
                type="button"
                data-testid="hero-personalize-sample-button"
                className="tactile-shadow focus-ring rounded-full bg-canvas px-7 py-3.5 text-lg font-bold"
                onClick={() => scrollToWaitlist(true)}
              >
                Personalize a sample
              </button>
            </motion.div>

            <motion.p
              className="mt-6 text-lg font-semibold text-slate-600"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
            >
              <span className="script mr-2 text-3xl text-coral">{waitlistCount}+</span>
              families already on the waitlist.
            </motion.p>
          </div>

          <motion.div
            className="relative md:col-span-5"
            initial={{ opacity: 0, x: 22, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            <div className="tactile-shadow-lg overflow-hidden rounded-bl-2xl rounded-br-[5rem] rounded-tl-[5rem] rounded-tr-2xl bg-[#FFECCB] p-3">
              <Image
                src="/images/hero.png"
                alt="Storybloom hero artwork with a child, storybook, and colorful imagination elements"
                width={1280}
                height={1280}
                className="h-[420px] w-full rounded-bl-2xl rounded-br-[4.5rem] rounded-tl-[4.5rem] rounded-tr-2xl object-cover"
                priority
              />
            </div>

            <div className="tactile-shadow-sm absolute -left-3 top-4 rotate-[-6deg] rounded-full bg-sunshine px-4 py-2 text-sm font-bold text-orange-700">
              once upon a kid...
            </div>
            <div className="tactile-shadow-sm absolute -right-4 top-20 rotate-[6deg] rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800">
              <Heart className="mr-1 inline h-4 w-4 text-coral" /> Re-read x47 times
            </div>
            <div className="tactile-shadow-sm absolute bottom-6 right-6 rotate-[4deg] rounded-full bg-secondary px-4 py-2 text-sm font-bold text-ink">
              no screens needed
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-space bg-canvas-alt">
        <div className="container-shell">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">How it works</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Three steps to bedtime magic</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: PencilLine,
                title: "Tell us about your child",
                body: "Name, age, and what they are obsessed with this month.",
                bg: "bg-[#FFE8C2]",
                step: "step 1",
              },
              {
                icon: Wand2,
                title: "We craft the magic",
                body: "Writers and illustrators turn your details into a keepsake story.",
                bg: "bg-[#C9F0EA]",
                step: "step 2",
              },
              {
                icon: Truck,
                title: "A keepsake arrives",
                body: "Your personalized hardcover lands at your door, ready for nightly re-reads.",
                bg: "bg-[#FFD6D8]",
                step: "step 3",
              },
            ].map((item, idx) => (
              <motion.article
                key={item.title}
                className="tactile-shadow-lg rounded-[2rem] bg-canvas p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...spring, delay: idx * 0.06 }}
              >
                <div className={`mb-5 inline-flex rounded-2xl border-2 border-ink p-3 ${item.bg}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="script text-3xl text-orange-600">{item.step}</p>
                <h3 className="mt-2 text-2xl sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-lg font-semibold text-slate-700">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="tactile-shadow-lg overflow-hidden rounded-bl-[5rem] rounded-br-2xl rounded-tl-2xl rounded-tr-[5rem] bg-[#D6EEF9] p-3">
              <Image
                src="/images/family-reading.png"
                alt="Parent and child reading a physical storybook together on a couch"
                width={600}
                height={700}
                className="h-[420px] w-full rounded-bl-[4.5rem] rounded-br-2xl rounded-tl-2xl rounded-tr-[4.5rem] object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Why it matters</p>
            <h2 className="mt-3 text-4xl leading-tight md:text-6xl">
              Kids become
              <span className="highlight-swipe mx-2">whatever they consume</span>
              most
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-semibold text-slate-700 md:text-xl">
              Storybloom is built for families who want wonder without another app. It is a physical bedtime
              ritual that sparks imagination and connection.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="tactile-shadow-sm rounded-3xl bg-[#FFF0C9] p-5">
                <p className="script text-4xl text-orange-600">-42%</p>
                <p className="mt-2 text-base font-semibold text-slate-700">less bedtime negotiation around devices</p>
              </div>
              <div className="tactile-shadow-sm rounded-3xl bg-[#DDF7F3] p-5">
                <p className="script text-4xl text-teal-600">+Daily</p>
                <p className="mt-2 text-base font-semibold text-slate-700">reading ritual that feels playful, not forced</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-ink text-white">
        <div className="container-shell">
          <p className="text-sm font-bold uppercase tracking-widest text-[#FFCA3A]">Sample stories</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Peek inside the adventure shelf</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Mishika and the Moon Rocket",
                tag: "Courage",
                img: "/images/mishika-cover.png",
              },
              {
                title: "The Kindness Garden Mystery",
                tag: "Kindness",
                img: "/images/garden-cover.png",
              },
            ].map((book, idx) => (
              <motion.article
                key={book.title}
                className="rounded-[2rem] border-2 border-ink bg-canvas-alt p-6 text-slate-900 sun-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...spring, delay: idx * 0.1 }}
              >
                <div className="mb-5 overflow-hidden rounded-3xl border-2 border-ink bg-white">
                  <Image
                    src={book.img}
                    alt={`${book.title} sample Storybloom hardcover cover art`}
                    width={640}
                    height={450}
                    className="h-56 w-full object-cover"
                  />
                </div>
                <span className="tactile-shadow-sm inline-flex rotate-[-4deg] rounded-full bg-sunshine px-4 py-2 text-sm font-bold text-orange-700">
                  {book.tag}
                </span>
                <h3 className="mt-4 text-3xl">{book.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Loved by parents</p>
          <h2 className="mt-3 text-4xl md:text-6xl">What families are saying</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "My son asks for his Storybloom before cartoons now. I never thought I would hear that.",
                name: "Priya, mom of 7-year-old",
                avatar: "/images/avatar-1.png",
              },
              {
                quote:
                  "It feels handmade, like someone truly knows our kid. We have read it every night this week.",
                name: "Arjun, dad of 6-year-old",
                avatar: "/images/avatar-2.png",
                extraClass: "md:translate-y-6",
              },
              {
                quote:
                  "The best part is that it is physical. No charging, no notifications, just cuddles and story time.",
                name: "Nisha, mom of 9-year-old",
                avatar: "/images/avatar-3.png",
              },
            ].map((item, idx) => (
              <motion.article
                key={item.name}
                className={`tactile-shadow-lg rounded-[2rem] bg-canvas p-6 ${item.extraClass ?? ""}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...spring, delay: idx * 0.08 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star key={`${item.name}-${starIdx}`} className="h-5 w-5 fill-[#FFCA3A] text-[#FFCA3A]" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-lg font-semibold text-slate-700">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={`${item.name} portrait avatar`}
                    width={44}
                    height={44}
                    className="tactile-shadow-sm h-11 w-11 rounded-full object-cover"
                  />
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={waitlistRef} className="section-space bg-canvas-alt">
        <div className="container-shell flex justify-center">
          <div className="tactile-shadow-lg w-full max-w-3xl rounded-[2rem] bg-canvas p-7 md:p-10" data-testid="waitlist-form-card">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Waitlist</p>
            <h2 className="mt-3 text-4xl md:text-6xl">Bring a story home</h2>

            {!success ? (
              <form className="mt-8 space-y-5" onSubmit={onSubmit} data-testid="waitlist-form">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-600">Email</span>
                  <input
                    data-testid="waitlist-email-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="parent@email.com"
                    className="focus-ring h-[58px] w-full rounded-2xl border-2 border-ink bg-white px-5 text-lg font-medium text-slate-900"
                    required
                  />
                </label>

                <div className="tactile-shadow-sm rounded-2xl bg-[#FFF0C9] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor="personalize-toggle" className="flex items-center gap-3 text-lg font-bold text-slate-900">
                      <Sparkles className="h-5 w-5 text-orange-600" />
                      Personalize my sample story
                    </label>
                    <StorySwitch
                      id="personalize-toggle"
                      checked={personalize}
                      onCheckedChange={setPersonalize}
                      testId="waitlist-personalize-toggle"
                    />
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {personalize ? (
                    <motion.div
                      key="child-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={spring}
                      className="space-y-5 overflow-hidden"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-600">Child name</span>
                        <input
                          data-testid="waitlist-child-name-input"
                          type="text"
                          value={childName}
                          onChange={(event) => setChildName(event.target.value)}
                          placeholder="Mishika"
                          className="focus-ring h-[58px] w-full rounded-2xl border-2 border-ink bg-white px-5 text-lg font-medium text-slate-900"
                          required={personalize}
                        />
                      </label>

                      <div>
                        <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-600">Child age</span>
                        <StorySelect
                          value={childAge}
                          onValueChange={setChildAge}
                          placeholder="Select age"
                          options={ageOptions}
                          triggerTestId="waitlist-child-age-select"
                        />
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-600">Interests</span>
                        <input
                          data-testid="waitlist-interests-input"
                          type="text"
                          value={interests}
                          onChange={(event) => setInterests(event.target.value)}
                          placeholder="Space, dinosaurs, football..."
                          className="focus-ring h-[58px] w-full rounded-2xl border-2 border-ink bg-white px-5 text-lg font-medium text-slate-900"
                        />
                      </label>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {error ? <p className="text-base font-semibold text-red-600">{error}</p> : null}

                <button
                  data-testid="waitlist-submit-button"
                  type="submit"
                  className="tactile-shadow focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-lg font-bold"
                  disabled={submitting}
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  {joinLabel}
                  {!submitting ? <ArrowRight className="h-5 w-5" /> : null}
                </button>
              </form>
            ) : (
              <div className="tactile-shadow mt-8 rounded-3xl bg-[#FFF0C9] p-8 text-center" data-testid="waitlist-success-state">
                <p className="script text-5xl text-coral">Success</p>
                <p className="mt-2 text-xl font-semibold">🎉 You are on the waitlist. We cannot wait to meet your reader.</p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  data-testid="waitlist-add-another-child-button"
                  className="focus-ring mt-5 text-base font-bold text-slate-700 underline decoration-2 underline-offset-4"
                >
                  Add another child
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">FAQ</p>
            <h2 className="mt-3 text-4xl md:text-6xl">Questions parents ask first</h2>
            <div className="mt-10">
              <StoryAccordion items={faqs} />
            </div>
            <button
              type="button"
              data-testid="faq-join-waitlist-button"
              onClick={() => scrollToWaitlist()}
              className="tactile-shadow focus-ring mt-8 rounded-full bg-primary px-7 py-3.5 text-lg font-bold"
            >
              Join the waitlist
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#14213d] bg-ink py-16 text-white">
        <div className="container-shell">
          <p className="script text-7xl text-sunshine">Storybloom</p>
          <p className="mt-4 max-w-lg text-lg font-semibold text-slate-200">
            Turning bedtime into a re-readable ritual, one personalized hardcover at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="mailto:hello@storybloom.in"
              className="focus-ring rounded-full border-2 border-white px-5 py-2.5 text-sm font-bold"
            >
              hello@storybloom.in
            </a>
            <button
              type="button"
              onClick={() => scrollToWaitlist()}
              data-testid="footer-join-waitlist-button"
              className="tactile-shadow rounded-full bg-primary px-6 py-3 text-base font-bold text-ink"
            >
              Join waitlist
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-slate-300">
            <a href="#" className="focus-ring rounded px-1 py-0.5">
              Privacy
            </a>
            <a href="#" className="focus-ring rounded px-1 py-0.5">
              Terms
            </a>
            <a href="mailto:hello@storybloom.in" className="focus-ring rounded px-1 py-0.5">
              Contact
            </a>
            <span className="inline-flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> anti-screen-time club
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

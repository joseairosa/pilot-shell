import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Expand, ExternalLink, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { FILMS } from "@/lib/films";
import "@/styles/editorial.css";

type Shot = { id: string; title: string; alt: string; caption: string };
const SHOTS: Record<string, Shot> = {
  discuss: { id: "discuss", title: "Discuss the goal", alt: "A developer answers a focused question about a webhook retry policy in the QualityLayer App", caption: "Settle the choices that affect the result." },
  research: { id: "research", title: "Research the code", alt: "The App shows research on identity provisioning and the existing services it needs to reuse", caption: "Trace the existing behavior before deciding what to build." },
  outline: { id: "outline", title: "Outline the work", alt: "A queue migration broken into slices with dependencies and the scenarios that prove them", caption: "Turn the agreed plan into work that can be built and checked." },
  implement: { id: "implement", title: "Build the change", alt: "Agents build the usage billing change in slices, with recorded progress and checks", caption: "Follow the slices and the checks as agents build." },
  review: { id: "review", title: "Review the finished change", alt: "The billing change reviewed against the original request, with its proof beside the walkthrough", caption: "Read the finished change and the evidence behind it." },
  "pull-request": { id: "pull-request", title: "The pull request", alt: "The App keeps a pull request's checks, review and remaining work attached to the task", caption: "Keep the task open until the pull request is merged." },
  plan: { id: "plan", title: "The complete Plan", alt: "An example Plan in the QualityLayer App, with approval in its shared header and Files beside the document", caption: "Read the complete Plan before approving." },
  verify: { id: "verify", title: "Verification and evidence", alt: "The QualityLayer App showing verification lanes, recorded checks and their evidence for an example task", caption: "The checks and their evidence stay with the change." },
  design: { id: "design", title: "Full-size design", alt: "A settings mockup open in the QualityLayer design viewer, with commenting, zoom and viewport controls", caption: "Open a design full size and comment where it needs work." },
  team: { id: "team", title: "Team feedback", alt: "An example Team workspace with questions about shared plans, replies and the team's tasks", caption: "Teammates answer where the plan needs their input." },
  home: { id: "home", title: "Home and costs", alt: "QualityLayer Home showing tasks that need attention, running work, agent cost estimates and shipped tasks", caption: "See the work that needs you, and what your agents cost." },
  setup: { id: "setup", title: "Workflow settings", alt: "QualityLayer Workflow settings for planning, building, independent review and the models each uses", caption: "Choose the agents and models for each part of the work." },
};

const CHAPTERS = [
  {
    title: "Agree the plan before the work begins",
    lead: "Your request becomes a plan you can read, question and approve. The build has a clear target.",
    shot: SHOTS.plan,
    steps: [
      ["Discuss", "Make the goal clear", "Independent questions arrive in batches in Your turn. Answer in any order; each answer reaches your agent immediately."],
      ["Research", "Read the existing code", "Agents trace the current behavior and constraints before choosing an implementation. Findings stay with the task."],
      ["Plan", "You approve before code", "Read the complete Plan with its diagrams, designs and decisions. Comment or ask for a change, then approve."],
      ["Outline", "Make the plan buildable", "Your agent maps slices, dependencies and the scenarios that prove the agreed outcomes. This step needs no separate approval."],
    ],
  },
  {
    title: "Build it, then prove it matches the plan",
    lead: "Your agents carry the work forward. You return for the finished change and anything only you can settle.",
    shot: SHOTS.verify,
    steps: [
      ["Implement", "Build, test and record", "Slices run side by side where their changes do not overlap. QualityLayer records the test runs with the work."],
      ["Verify", "Independent agents check the result", "Agents run your project's checks and verify the agreed outcomes against the program. Findings feed the fixes."],
      ["Review", "You read the change and its proof", "Inspect the result and the walkthrough, then approve from the App. Ask for changes where another pass is needed."],
      ["Pull request", "Keep the work open until merged", "The pull request follows the same explanation. Threads and failed checks return to the task, which stays open until merge."],
    ],
  },
];
const FEATURES = [
  { id: "designs", title: "See the page before it is built", text: "Open the design full size and point at what should change. Your comment reaches the agent with the task.", shot: SHOTS.design },
  { id: "team", title: "Bring your team into the plan", text: "Teammates help shape the plan and review the finished change, each from their own App.", shot: SHOTS.team },
  { id: "cost", title: "Keep the work and cost in view", text: "Home shows what needs you, what is running and what shipped. Cost estimates sit with the work they belong to.", shot: SHOTS.home },
  { id: "setup", title: "Use the setup that suits your work", text: "Choose which agent plans, builds and checks. Work in the App on macOS, Windows or Linux, or use the browser on a server.", shot: SHOTS.setup },
];

function Screenshot({ shot, theme, onOpen }: { shot: Shot; theme: "light" | "dark"; onOpen: (shot: Shot, button: HTMLButtonElement) => void }) {
  return (
    <figure className="ed-shot">
      <button type="button" className="ed-image-open" aria-label={`Enlarge ${shot.title}`} onClick={(event) => onOpen(shot, event.currentTarget)}>
        <img src={`/product/${shot.id}-${theme}.webp`} alt={shot.alt} width="2880" height="1920" loading="lazy" decoding="async" /><span className="ed-enlarge"><Expand size={14} aria-hidden="true" />Enlarge</span>
      </button>
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

function ImageDialog({ shot, theme, onClose, opener }: { shot: Shot; theme: "light" | "dark"; onClose: () => void; opener: HTMLButtonElement | null }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="ed-image-dialog" showCloseButton={false} onCloseAutoFocus={(event) => { event.preventDefault(); opener?.focus(); }}>
        <div className="ed-dialog-header">
          <DialogTitle>{shot.title}</DialogTitle>
          <DialogClose asChild><Button type="button" variant="outline" size="xl" aria-label="Close preview"><X size={18} aria-hidden="true" />Close</Button></DialogClose>
        </div>
        <img src={`/product/${shot.id}-${theme}.webp`} alt={shot.alt} width="2880" height="1920" />
        <DialogDescription>Example task in the QualityLayer App.</DialogDescription>
        <Button asChild variant="outline" size="xl"><a href={`/product/${shot.id}-${theme}.webp`} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true" />Open full-size image</a></Button>
      </DialogContent>
    </Dialog>
  );
}

export default function Editorial() {
  const { theme } = useTheme();
  const [shot, setShot] = useState<Shot | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const open = (selected: Shot, button: HTMLButtonElement) => { opener.current = button; setShot(selected); };
  return (
    <>
      <section id="tour" className="ed-section mx-wrap" aria-labelledby="ed-workflow-h">
        <div className="ed-head"><h2 id="ed-workflow-h">From your request to a pull request</h2><p>Seven steps keep the goal, decisions and proof together. The App previews show example projects.</p></div>
        {CHAPTERS.map((chapter) => (
          <div key={chapter.title} className="ed-phase">
            <h3>{chapter.title}</h3><p className="ed-phase-lead">{chapter.lead}</p>
            <div className="ed-features ed-workflow-grid">
              {chapter.steps.map(([name, short, detail]) => {
                const id = name.toLowerCase().replaceAll(" ", "-");
                return <article key={name} id={id}>
                  <h4>{name}</h4><p>{short}</p>
                  <Screenshot shot={SHOTS[id]} theme={theme} onOpen={open} />
                  <Accordion type="single" collapsible className="ed-step-info"><AccordionItem value={id}><AccordionTrigger>More about {name}</AccordionTrigger><AccordionContent><p>{detail}</p></AccordionContent></AccordionItem></Accordion>
                </article>;
              })}
            </div>
          </div>
        ))}
        <div className="ed-outcome" id="films"><p>Every decision, document and recorded check stays attached to the change.</p><div><a href="/docs/">Read the workflow docs</a><a href={FILMS.overview.src} target="_blank" rel="noopener noreferrer">Watch the walkthrough</a></div></div>
      </section>
      <section className="ed-section mx-wrap" aria-labelledby="ed-context-h">
        <div className="ed-head"><h2 id="ed-context-h">Designs, your team and your setup</h2><p>The App keeps the decisions close to the work. The previews below show example tasks.</p></div>
        <div className="ed-features">
          {FEATURES.map((feature) => <article key={feature.id} id={feature.id}><h3>{feature.title}</h3><p>{feature.text}</p><Screenshot shot={feature.shot} theme={theme} onOpen={open} />{feature.id === "team" ? <Link to="/pricing">See the Team plan</Link> : null}</article>)}
        </div>
      </section>
      {shot ? <ImageDialog shot={shot} theme={theme} opener={opener.current} onClose={() => setShot(null)} /> : null}
    </>
  );
}

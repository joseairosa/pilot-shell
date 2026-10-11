import { useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { billingRequest } from "@/lib/billing";
import { QUALITYLAYER_PRODUCTS } from "@/lib/polar-products";
import "@/styles/billing.css";

type Props = { plan: "solo" | "team"; billing: "monthly" | "yearly"; href: string; children: ReactNode };
export default function CheckoutLink({ plan, billing, href, children, ...props }: Props) {
  const { theme } = useTheme();
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<{ url: string; id: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [frameError, setFrameError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  useLayoutEffect(() => {
    if (!session) return;
    const origin = new URL(session.url).origin;
    const timer = window.setTimeout(() => setFrameError(true), 15_000);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow || !event.data || typeof event.data !== "object" || event.data.type !== "POLAR_CHECKOUT") return;
      switch (event.data.event) {
        case "loaded": window.clearTimeout(timer); setLoaded(true); break;
        case "confirmed": window.clearTimeout(timer); setConfirmed(true); break;
        case "close": setSession(null); break;
        case "success": window.location.assign(`/checkout/success?checkout_id=${encodeURIComponent(session.id)}`); break;
      }
    };
    window.addEventListener("message", onMessage);
    return () => { window.clearTimeout(timer); window.removeEventListener("message", onMessage); };
  }, [session]);
  async function open(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    if (opening) return;
    setOpening(true); setError("");
    try {
      const created = await billingRequest<{ url: string; id: string }>("create-checkout", { productId: QUALITYLAYER_PRODUCTS[plan][billing] });
      const url = new URL(created.url);
      const localFixture = import.meta.env.DEV && url.origin === window.location.origin;
      if (!localFixture && !["https://buy.polar.sh", "https://polar.sh", "https://sandbox.polar.sh", "https://sandbox-buy.polar.sh"].includes(url.origin)) throw new Error("Invalid checkout URL");
      url.searchParams.set("embed", "true"); url.searchParams.set("embed_origin", window.location.origin); url.searchParams.set("theme", theme);
      setLoaded(false); setFrameError(false); setConfirmed(false); setSession({ ...created, url: url.href });
    } catch {
      setError("Checkout could not open. Try again or open it on Polar.");
    } finally { setOpening(false); }
  }
  return <><a {...props} href={href} onClick={(event) => void open(event)} aria-disabled={opening} aria-busy={opening}>{opening ? "Opening checkout…" : children}</a>{error && <span className="pr-checkout-error" role="alert">{error} <a href={href} target="_blank" rel="noopener noreferrer">Open checkout on Polar</a></span>}
    <Dialog.Root open={!!session} onOpenChange={(open) => { if (!open && !confirmed) setSession(null); }}><Dialog.Portal><Dialog.Overlay className="bl-overlay" /><Dialog.Content className="co-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus(); }} onEscapeKeyDown={(event) => { if (confirmed) event.preventDefault(); }} onPointerDownOutside={(event) => { if (confirmed) event.preventDefault(); }}>
      <header className="co-header"><div><span className="co-brand"><span className="w7-mark" aria-hidden="true" />qualitylayer</span><Dialog.Title>QualityLayer {plan === "team" ? "Team" : "Solo"} · {billing === "yearly" ? "Yearly" : "Monthly"}</Dialog.Title></div><Button variant="ghost" disabled={confirmed} onClick={() => setSession(null)}>Close checkout</Button></header>
      <Dialog.Description className="w7-sr">Complete your purchase in Polar's secure checkout.</Dialog.Description>
      {frameError ? <div className="co-recovery" role="alert"><p>Checkout did not load. You can retry or continue on Polar.</p><div className="bl-actions"><Button onClick={() => { setSession(null); opener.current?.click(); }}>Retry checkout</Button><a href={href} target="_blank" rel="noopener noreferrer">Open checkout on Polar</a></div></div> : <div className="co-frame">{!loaded && <p className="co-loading" role="status">Loading secure checkout…</p>}{session && <iframe ref={frame} src={session.url} title="Secure Polar checkout" allow="payment 'src' https://polar.sh https://buy.polar.sh https://sandbox.polar.sh; publickey-credentials-get 'src' https://polar.sh https://buy.polar.sh https://sandbox.polar.sh" />}</div>}
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </>;
}

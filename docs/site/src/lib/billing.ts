export type BillingOption = { productId: string; name: string; amount: number; currency: string; interval: string };
export type Subscription = {
  id: string; productId: string; name: string; amount: number; currency: string; interval: string;
  status: string; periodEnd: string; canceled: boolean; pauseScheduled: boolean; seats: number | null;
  legacy: boolean; options: BillingOption[]; pending: { name: string; at: string; seats: number | null } | null;
};
export type BillingAccount = {
  email: string; subscriptions: Subscription[];
  paymentMethods: { id: string; label: string; isDefault: boolean }[];
  invoices: { id: string; number: string; date: string; amount: number; currency: string }[];
  licences: { id: string; key: string; label: string; status: string }[];
  seats: { subscriptionId: string; total: number; seats: { id: string; email: string; status: string }[] }[];
};
export type BillingQuote = { id: string; subscriptionId: string; amount: number; currency: string; interval: string; effectiveAt: string; dueNow: number; seats: number | null; name: string };

export async function billingRequest<T>(action?: string, values: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch("/api/billing", {
    method: action ? "POST" : "GET", credentials: "same-origin", cache: "no-store",
    ...(action ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, ...values }) } : {}),
  });
  const result = await response.json();
  if (!response.ok) throw new BillingError(response.status, result.error ?? "Billing is unavailable. Please try again.");
  return result as T;
}
export class BillingError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export const money = (amount: number, currency: string): string => new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount / 100);
export const billingDate = (date: string): string => new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(date));

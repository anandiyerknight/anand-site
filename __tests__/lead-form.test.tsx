// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { LeadForm } from "@/components/ui/lead-form";

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LeadForm (audit)", () => {
  it("renders the full audit field set including phone", () => {
    render(<LeadForm type="audit" />);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/phone/i)).toBeTruthy();
    expect(screen.getByLabelText(/the brief/i)).toBeTruthy();
  });

  it("blocks submit on a wrong-length phone number and never calls the API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<LeadForm type="audit" />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "T" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "t@t.co" } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Co" } });
    fireEvent.change(screen.getByLabelText(/ig \/ website/i), { target: { value: "@t" } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/the brief/i), { target: { value: "brief" } });
    fireEvent.submit(screen.getByLabelText(/phone/i).closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/must be 10 digits/i)).toBeTruthy();
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("posts to /api/audit with the country code and shows the success state", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    render(<LeadForm type="audit" />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "T" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "t@t.co" } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Co" } });
    fireEvent.change(screen.getByLabelText(/ig \/ website/i), { target: { value: "@t" } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: "9999999999" } });
    fireEvent.change(screen.getByLabelText(/the brief/i), { target: { value: "brief" } });
    fireEvent.submit(screen.getByLabelText(/phone/i).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/brief received/i)).toBeTruthy();
    });
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("/api/audit");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.phone).toBe("+91 9999999999");
  });
});

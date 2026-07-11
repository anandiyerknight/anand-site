// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { PageHeader } from "@/components/ui/page-header";

afterEach(cleanup);

describe("Section", () => {
  it("renders children inside the container with the top rule by default", () => {
    const { container } = render(
      <Section id="s1">
        <p>content</p>
      </Section>
    );
    const section = container.querySelector("section#s1")!;
    expect(section.className).toContain("border-t");
    expect(screen.getByText("content")).toBeTruthy();
  });

  it("drops the rule and narrows the container on request", () => {
    const { container } = render(
      <Section bordered={false} width="narrow">
        <p>x</p>
      </Section>
    );
    const section = container.querySelector("section")!;
    expect(section.className).not.toContain("border-t");
    expect(section.querySelector(".max-w-5xl")).toBeTruthy();
  });
});

describe("SectionHead", () => {
  it("renders tag, index and title", () => {
    render(<SectionHead index="01" tag="Services" title="The systems." />);
    expect(screen.getByText("01")).toBeTruthy();
    expect(screen.getByText("Services")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2 }).textContent).toContain("The systems.");
  });

  it("split layout renders the description column", () => {
    render(<SectionHead layout="split" title="T" description="right column copy" />);
    expect(screen.getByText("right column copy")).toBeTruthy();
  });
});

describe("PageHeader", () => {
  it("renders tag, h1 and description", () => {
    render(<PageHeader tag="Selected Work" title="The brands." description="desc" />);
    expect(screen.getByText("Selected Work")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("The brands.");
    expect(screen.getByText("desc")).toBeTruthy();
  });
});

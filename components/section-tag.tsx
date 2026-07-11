export function SectionTag({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="section-tag">
      <span className="text-[var(--color-accent)]">[ {index} ]</span>
      <span>{label}</span>
    </div>
  );
}

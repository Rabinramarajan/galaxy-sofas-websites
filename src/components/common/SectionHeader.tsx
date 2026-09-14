type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`mb-8 max-w-xl sm:mb-12 ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">{title}</h2>
      {description ? (
        <p className="mt-3 text-[0.975rem] leading-relaxed text-foreground">{description}</p>
      ) : null}
    </div>
  );
}

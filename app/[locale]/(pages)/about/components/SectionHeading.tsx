type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  level?: 1 | 2;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = 2,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-start";
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}

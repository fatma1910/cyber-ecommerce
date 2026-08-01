import ContactHero from "./components/ContactHero";
import ContactInfoGrid from "./components/ContactInfoGrid";
import ContactForm from "./components/ContactForm";
import ContactMapPlaceholder from "./components/ContactMapPlaceholder";
import ContactQuickHelp from "./components/ContactQuickHelp";
import ContactFaq from "./components/ContactFaq";

export default function ContactPage() {
  return (
    <main className="bg-background">
      <ContactHero />
      <ContactInfoGrid />
      <section className="bg-muted/30">
        <div className="padding-x grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:py-20">
          <ContactForm />
          <aside className="space-y-6">
            <ContactMapPlaceholder />
            <ContactQuickHelp />
          </aside>
        </div>
      </section>
      <ContactFaq />
    </main>
  );
}

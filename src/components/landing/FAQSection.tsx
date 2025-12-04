import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Ali potrebujem Telegram za uporabo Skavta?",
    answer: "Telegram je trenutno primarna platforma za obvestila, saj omogoča takojšnja sporočila brez stroškov. V prihodnosti načrtujemo tudi e-poštna obvestila in mobilno aplikacijo.",
  },
  {
    question: "Ali Skavt sodeluje z nepremičninskimi agencijami?",
    answer: "Ne, Skavt je popolnoma neodvisen in ne sodeluje z agencijami. Preprosto zbira javno dostopne oglase z različnih portalov in jih filtrira po vaših kriterijih – brez pristranskosti.",
  },
  {
    question: "Katere portale Skavt spremlja?",
    answer: "Skavt trenutno spremlja več glavnih slovenskih nepremičninskih portalov. Seznam portalov neprestano širimo, da zagotovimo čim boljšo pokritost trga.",
  },
  {
    question: "Kako pogosto se osvežujejo oglasi?",
    answer: "Skavt preverja nove oglase večkrat na dan – običajno vsakih nekaj ur. Cilj je, da vas obvestimo čim hitreje po objavi novega oglasa, da ste med prvimi.",
  },
  {
    question: "Ali lahko ustvarim več iskalnih profilov?",
    answer: "Ta funkcija je v razvoju. Kmalu boste lahko ustvarili več profilov z različnimi kriteriji – npr. enega za stanovanje v Ljubljani in drugega za hišo na Gorenjskem.",
  },
  {
    question: "Kaj se zgodi, če zamudim obvestilo?",
    answer: "Brez skrbi – vsi zadetki ostanejo shranjeni in si jih lahko ogledate kadarkoli. Obvestila so le dodaten kanal za takojšnje informacije, ne edini način dostopa.",
  },
  {
    question: "Koliko stane uporaba Skavta?",
    answer: "Skavt je trenutno v beta fazi in popolnoma brezplačen za vse uporabnike. Po zaključku beta faze bomo uvedli razumne cenovne pakete z ohranitvijo brezplačne osnovne različice.",
  },
  {
    question: "Kako zaščitite moje podatke?",
    answer: "Vaši podatki so varno shranjeni in jih ne delimo s tretjimi osebami. Zbiramo le minimalne podatke, potrebne za delovanje storitve – vaše iskalne kriterije in kontaktne podatke.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-28 bg-gradient-hero">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" x2="12.01" y1="17" y2="17"/>
              </svg>
              Imate vprašanje?
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Pogosta vprašanja
            </h2>
            <p className="text-lg text-muted-foreground">
              Odgovori na najpogostejša vprašanja o Skavtu
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-border rounded-2xl px-6 bg-background data-[state=open]:border-accent/40 data-[state=open]:shadow-lg transition-all duration-200"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

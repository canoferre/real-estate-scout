import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Ali potrebujem Telegram za uporabo Skavta?",
    answer: "Ne nujno. Skavt podpira tudi e-poštna obvestila. Telegram je le ena od možnosti – izberete lahko tisto, ki vam bolj ustreza.",
  },
  {
    question: "Ali Skavt sodeluje z nepremičninskimi agencijami?",
    answer: "Ne, Skavt je neodvisen in ne sodeluje z agencijami. Preprosto zbira javno dostopne oglase z različnih portalov in jih filtrira po vaših kriterijih.",
  },
  {
    question: "Ali lahko ustvarim več iskalnih profilov?",
    answer: "Da, v prihodnosti boste lahko ustvarili več profilov z različnimi kriteriji – npr. enega za stanovanje v Ljubljani in drugega za hišo na Gorenjskem.",
  },
  {
    question: "Kako pogosto se osvežujejo oglasi?",
    answer: "Skavt preverja nove oglase večkrat na dan. Cilj je, da vas obvestimo v roku nekaj ur od objave novega oglasa.",
  },
  {
    question: "Kaj se zgodi, če zamudim obvestilo?",
    answer: "Brez skrbi – vse zadetke si lahko ogledate tudi v pregledu na spletu ali v aplikaciji. Obvestila so le dodaten kanal, ne edini.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                className="border border-border rounded-xl px-6 bg-background data-[state=open]:border-accent/30 data-[state=open]:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
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

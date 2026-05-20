import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: "What's included in the one-time setup?",
    a: "Setup covers the initial build of your interactive property map, including floor plan digitization, unit configuration, and embed code for your website. Our team coordinates directly with your web team or property management software provider to get you live.",
  },
  {
    q: 'Can I manage multiple properties under one account?',
    a: 'Yes. Each property is priced and billed separately based on its unit count. Your account dashboard lets you manage maps across your entire portfolio from a single login.',
  },
  {
    q: 'What property management systems do you connect to?',
    a: "SightMap integrates natively with Yardi, RealPage, and Entrata — the three largest PMS platforms in multifamily. Additional integrations are available; contact us if your PMS isn't listed.",
  },
]

export function FaqAccordion() {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h3 className="text-lg font-semibold text-brand-black mb-6 text-center">
        Common questions
      </h3>
      <Accordion multiple={false} className="w-full">
        {FAQS.map((faq, i) => (
          <AccordionItem key={i} value={i}>
            <AccordionTrigger className="text-left text-sm font-medium text-brand-black">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-text-body leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

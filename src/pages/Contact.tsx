import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Header */}
      <section className="container py-12 lg:py-16 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold">{t("contact.title")}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">{t("contact.subtitle")}</p>
      </section>

      {/* Form + FAQ */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="border rounded-2xl p-6 sm:p-8 bg-card">
            <h2 className="text-xl font-bold mb-1">{t("contact.sendMessage")}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t("contact.sendMessageDesc")}</p>
            <div className="space-y-4">
              <div>
                <Label>{t("contact.name")}</Label>
                <Input placeholder={t("contact.namePlaceholder")} className="mt-1" />
              </div>
              <div>
                <Label>{t("contact.emailLabel")}</Label>
                <Input type="email" placeholder={t("contact.emailPlaceholder")} className="mt-1" />
              </div>
              <div>
                <Label>{t("contact.subject")}</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder={t("contact.subjectPlaceholder")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="listing">Listing Question</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("contact.message")}</Label>
                <Textarea placeholder={t("contact.messagePlaceholder")} className="mt-1 min-h-[120px]" />
              </div>
              <Button className="w-full rounded-full">{t("contact.send")}</Button>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-bold mb-6">{t("contact.faq")}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {[t("contact.faq1"), t("contact.faq2"), t("contact.faq3")].map((q, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    This information will be available soon. Please contact us directly for more details.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Location + Social */}
      <section className="border-t py-16">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-2">{t("contact.location")}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t("contact.locationDesc")}</p>
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{t("contact.officeAddress")}</p>
                <p className="text-sm text-muted-foreground">{t("contact.fullAddress")}</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border h-52 bg-secondary flex items-center justify-center text-muted-foreground text-sm">
              <MapPin className="h-8 w-8 mr-2" /> Map Placeholder
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">{t("contact.connect")}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t("contact.connectDesc")}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((s) => (
                <button key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-card hover:bg-secondary transition-colors text-sm font-medium">
                  <s.icon className="h-5 w-5 text-primary" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

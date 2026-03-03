import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Building, MessageSquare, ChevronLeft, ChevronRight, Bed, Bath, Users } from "lucide-react";
import { useRef, useState } from "react";

const featuredListings = [
  { id: 1, title: "Spacious Studio Near Campus", price: "$1,200", unit: "month", type: "STUDIO", beds: 1, baths: 1, max: 2, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=260&fit=crop" },
  { id: 2, title: "Cozy 3-Bed Shared House", price: "$850", unit: "person", type: "SHARED", beds: 3, baths: 2, max: 3, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=260&fit=crop" },
  { id: 3, title: "Modern Dorm Room", price: "$700", unit: "month", type: "STUDIO", beds: 1, baths: 0.5, max: 1, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=260&fit=crop" },
  { id: 4, title: "Luxury Apartment Downtown", price: "$1,500", unit: "month", type: "STUDIO", beds: 2, baths: 1, max: 2, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=260&fit=crop" },
  { id: 5, title: "Budget-Friendly Shared Room", price: "$450", unit: "person", type: "SHARED", beds: 2, baths: 1, max: 4, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=260&fit=crop" },
  { id: 6, title: "Penthouse Student Suite", price: "$2,000", unit: "month", type: "STUDIO", beds: 2, baths: 2, max: 2, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=260&fit=crop" },
];

const neighborhoods = [
  { name: "Campus Central", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop" },
  { name: "Riverside Greens", image: "https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=300&h=300&fit=crop" },
  { name: "Artisan District", image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=300&h=300&fit=crop" },
  { name: "Tech Hub Lofts", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop" },
];

const testimonials = [
  { quote: "DormLink made finding my off-campus apartment so easy and stress-free. The filters were incredibly helpful, and I found a perfect place within days!", name: "Sarah K.", role: "University Student" },
  { quote: "As a landlord, DormLink connects me with quality student tenants quickly. The platform is intuitive, and managing my properties has never been simpler.", name: "Mark T.", role: "Property Owner" },
  { quote: "Moving to a new city for university was daunting, but DormLink helped me secure a great place right next to campus. Excellent support and listings!", name: "Jessica L.", role: "Exchange Student" },
];

const Index = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {t("hero.title1")}<br />
              <span className="text-primary">{t("hero.title2")}</span><br />
              {t("hero.title3")}
            </h1>
            <p className="mt-6 text-muted-foreground text-lg max-w-md leading-relaxed">
              {t("hero.description")}
            </p>
            <Button size="lg" className="mt-8 rounded-full px-8 gap-2">
              {t("hero.cta")} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=420&fit=crop"
              alt="Student housing"
              className="rounded-2xl object-cover w-full shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">{t("featured.title")}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9" disabled={!canScrollLeft} onClick={() => scroll("left")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9" disabled={!canScrollRight} onClick={() => scroll("right")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div ref={scrollRef} onScroll={handleScroll} className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {featuredListings.map((listing) => (
              <div key={listing.id} className="min-w-[300px] snap-start rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md text-primary-foreground ${listing.type === "SHARED" ? "bg-green-500" : "bg-primary"}`}>
                    {listing.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{listing.title}</h3>
                  <p className="text-primary font-bold mt-1">{listing.price}<span className="text-muted-foreground font-normal text-xs">/{t(`featured.${listing.unit}`)}</span></p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{listing.beds} {t("featured.bed")}</span>
                    <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{listing.baths} {t("featured.bath")}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{listing.max} {t("featured.max")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">{t("howItWorks.title")}</h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: Search, title: t("howItWorks.search"), desc: t("howItWorks.searchDesc") },
            { icon: Building, title: t("howItWorks.view"), desc: t("howItWorks.viewDesc") },
            { icon: MessageSquare, title: t("howItWorks.secure"), desc: t("howItWorks.secureDesc") },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="h-14 w-14 rounded-xl bg-secondary group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-secondary/30">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t("neighborhoods.title")}</h2>
          <div className="w-10 h-1 bg-primary rounded mx-auto mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neighborhoods.map((n) => (
              <div key={n.name} className="relative rounded-xl overflow-hidden aspect-square cursor-pointer group">
                <img src={n.image} alt={n.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-semibold text-sm">{n.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">{t("testimonials.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border rounded-xl p-6 text-left bg-card">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, MapPin, Bed, Wifi, Wind, Refrigerator, Bookmark, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { egyptGovernorates } from "@/data/egyptLocations";

interface Property {
  id: number;
  title: string;
  location: string;
  district: string;
  governorate: string;
  price: number;
  beds: number;
  type: "apartment" | "room" | "bed";
  area?: number;
  amenities: string[];
  verified: boolean;
  rating: number;
  image: string;
}

const mockProperties: Property[] = [
  {
    id: 1, title: "Cozy Studio near University", location: "Downtown, Cairo", district: "Downtown", governorate: "Cairo",
    price: 3500, beds: 1, type: "apartment", area: 45, amenities: ["wifi", "ac"], verified: true, rating: 4.5,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
  },
  {
    id: 2, title: "Shared Student Flat", location: "Nasr City, Cairo", district: "Nasr City", governorate: "Cairo",
    price: 2800, beds: 3, type: "room", amenities: ["wifi"], verified: false, rating: 4.2,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
  },
  {
    id: 3, title: "Modern Single Room", location: "New Cairo", district: "New Cairo", governorate: "Cairo",
    price: 4200, beds: 1, type: "room", amenities: ["ac", "appliances"], verified: true, rating: 4.8,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
  },
  {
    id: 4, title: "Budget Bed in Shared Room", location: "Dokki, Giza", district: "Dokki", governorate: "Giza",
    price: 1500, beds: 1, type: "bed", amenities: ["wifi"], verified: false, rating: 3.9,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
  },
  {
    id: 5, title: "Luxury Student Apartment", location: "Smouha, Alexandria", district: "Smouha", governorate: "Alexandria",
    price: 5500, beds: 2, type: "apartment", area: 80, amenities: ["wifi", "ac", "appliances"], verified: true, rating: 4.9,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
  },
  {
    id: 6, title: "Affordable Room near Campus", location: "Mansoura, Dakahlia", district: "Mansoura", governorate: "Dakahlia",
    price: 2000, beds: 1, type: "room", amenities: ["wifi", "appliances"], verified: true, rating: 4.3,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  },
];

const featuredProperty = {
  title: "New Cairo Smart Suites",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
};

const Listings = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [bedType, setBedType] = useState("any");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  const availableDistricts = useMemo(() => {
    if (!selectedGovernorate) return [];
    const gov = egyptGovernorates.find((g) => g.name === selectedGovernorate);
    return gov?.districts || [];
  }, [selectedGovernorate]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((p) => {
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (selectedGovernorate && p.governorate !== selectedGovernorate) return false;
      if (selectedDistrict && p.district !== selectedDistrict) return false;
      if (bedType !== "any" && p.type !== bedType) return false;
      if (amenities.length > 0 && !amenities.every((a) => p.amenities.includes(a))) return false;
      return true;
    });
  }, [minPrice, maxPrice, selectedGovernorate, selectedDistrict, bedType, amenities]);

  const handleSearch = () => {
    setSearched(true);
  };

  const displayProperties = searched ? filteredProperties : mockProperties;
  const locationLabel = selectedGovernorate
    ? `${selectedDistrict ? selectedDistrict + ", " : ""}${selectedGovernorate}, Egypt`
    : "Egypt";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="container py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">
          {isAr ? "اعثر على " : "Find Your "}
          <span className="text-primary">{isAr ? "منزلك المثالي" : "Perfect Home"}</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          {isAr
            ? "سكن طلابي بسيط. آمن، معقول، وقريب من الحرم الجامعي."
            : "Student housing made simple. Secure, affordable, and close to campus."}
        </p>

        {/* Search + Featured */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Quick Search Panel */}
          <div className="border rounded-xl p-6 bg-card shadow-sm space-y-5">
            <div>
              <h2 className="text-lg font-semibold">{isAr ? "بحث سريع" : "Quick Search"}</h2>
              <p className="text-sm text-muted-foreground">
                {isAr ? "فلتر السكن حسب تفضيلاتك" : "Filter accommodations by your preferences"}
              </p>
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">{isAr ? "أقل سعر (ج.م)" : "Min Price (EGP)"}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">{isAr ? "أعلى سعر (ج.م)" : "Max Price (EGP)"}</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{isAr ? "الموقع" : "Location"}</Label>
              <Select
                value={selectedGovernorate}
                onValueChange={(val) => {
                  setSelectedGovernorate(val);
                  setSelectedDistrict("");
                }}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={isAr ? "اختر المحافظة..." : "Select Governorate..."} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {egyptGovernorates.map((gov) => (
                    <SelectItem key={gov.name} value={gov.name}>
                      {isAr ? gov.nameAr : gov.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {availableDistricts.length > 0 && (
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder={isAr ? "اختر المركز/المنطقة..." : "Select District..."} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {availableDistricts.map((d) => (
                      <SelectItem key={d.name} value={d.name}>
                        {isAr ? d.nameAr : d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Beds/Rooms */}
            <div>
              <Label className="text-sm font-medium">{isAr ? "نوع السكن" : "Beds/Rooms"}</Label>
              <Select value={bedType} onValueChange={setBedType}>
                <SelectTrigger className="mt-1">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{isAr ? "الكل" : "Any"}</SelectItem>
                  <SelectItem value="apartment">{isAr ? "شقة كاملة" : "Full Apartment"}</SelectItem>
                  <SelectItem value="room">{isAr ? "غرفة" : "Room"}</SelectItem>
                  <SelectItem value="bed">{isAr ? "سرير" : "Bed"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={amenities.includes("wifi")}
                  onCheckedChange={() => toggleAmenity("wifi")}
                />
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-sm">Wi-Fi</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={amenities.includes("ac")}
                  onCheckedChange={() => toggleAmenity("ac")}
                />
                <Wind className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">AC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={amenities.includes("appliances")}
                  onCheckedChange={() => toggleAmenity("appliances")}
                />
                <Refrigerator className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{isAr ? "أجهزة" : "Appliances"}</span>
              </label>
            </div>

            {/* Search Button */}
            <Button className="w-full rounded-full gap-2" size="lg" onClick={handleSearch}>
              <Search className="h-4 w-4" />
              {isAr ? "ابحث عن العقارات" : "Search Properties"}
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden min-h-[350px] hidden md:block">
            <img
              src={featuredProperty.image}
              alt="Featured listing"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Featured Listing</p>
                <p className="font-semibold text-sm">{featuredProperty.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-primary font-semibold text-sm">{featuredProperty.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{isAr ? "العقارات المتاحة" : "Available Properties"}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isAr
                ? `تم العثور على ${displayProperties.length} نتيجة في ${locationLabel}`
                : `Found ${displayProperties.length} results in ${locationLabel}`}
            </p>
          </div>
          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
            {isAr ? "عرض الكل" : "View all listings"} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {displayProperties.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Bed className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">{isAr ? "لا توجد نتائج" : "No properties found"}</p>
            <p className="text-sm">{isAr ? "جرب تغيير الفلاتر" : "Try adjusting your filters"}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property) => (
              <div key={property.id} className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative h-48">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  {property.verified && (
                    <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm gap-1 text-xs">
                      <CheckCircle className="h-3 w-3 text-primary" /> Verified
                    </Badge>
                  )}
                  <Badge className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-xs font-semibold">
                    {property.price.toLocaleString()} EGP/mo
                  </Badge>
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-tight">{property.title}</h3>
                    <button className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {property.location}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {property.type === "apartment" && (
                      <>
                        <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.beds} Bed</span>
                        {property.area && <span className="flex items-center gap-1">📐 {property.area} m²</span>}
                      </>
                    )}
                    {property.type === "room" && (
                      <>
                        <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.beds} Beds</span>
                        {property.amenities.includes("ac") && <span className="flex items-center gap-1"><Wind className="h-3.5 w-3.5" /> AC</span>}
                        <span>{property.area ? `${property.area} m²` : "Shared"}</span>
                      </>
                    )}
                    {property.type === "bed" && (
                      <>
                        <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> Bed</span>
                        <span>Shared Room</span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1 rounded-full text-xs">
                      {isAr ? "التفاصيل" : "Details"}
                    </Button>
                    <Button size="sm" className="flex-1 rounded-full text-xs">
                      {isAr ? "احجز الآن" : "Book Now"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs gap-1"
                      onClick={() => navigate(`/review/dorm?property=${property.id}&name=${encodeURIComponent(property.title)}`)}
                    >
                      <Star className="h-3 w-3" />
                      {isAr ? "قيّم" : "Rate"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Listings;

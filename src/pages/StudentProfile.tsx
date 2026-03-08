import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MessageSquare, CalendarDays, MapPin, Heart, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const savedListings = [
  { id: 1, title: "Cozy Studio Retreat", price: "$1,200/month", location: "Downtown, Cityville", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=260&fit=crop" },
  { id: 2, title: "Spacious Urban Loft", price: "$1,800/month", location: "Arts District, Cityville", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=260&fit=crop" },
  { id: 3, title: "Shared Student Room", price: "$750/month", location: "Near Campus, Cityville", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=260&fit=crop" },
  { id: 4, title: "Charming Townhouse", price: "$2,500/month", location: "Suburbia, Cityville", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=260&fit=crop" },
  { id: 5, title: "Modern Apartment", price: "$1,500/month", location: "City Center, Cityville", image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=260&fit=crop" },
  { id: 6, title: "Apartment with Balcony", price: "$1,650/month", location: "Riverside, Cityville", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=260&fit=crop" },
];

const bookings = [
  { title: "Bright 2-Bedroom Apartment", landlord: "Sarah Chen", dates: "2024-09-01 to 2025-08-31", price: "$1,600/month", status: "CONFIRMED" as const },
  { title: "Cozy Studio near Park", landlord: "David Lee", dates: "2024-10-15 to 2025-04-14", price: "$1,100/month", status: "PENDING" as const },
  { title: "Shared House, University District", landlord: "Property Management Inc.", dates: "2024-02-01 to 2024-07-31", price: "$850/month", status: "CANCELLED" as const },
  { title: "Luxury Condo, City View", landlord: "Sophia Miller", dates: "2023-09-01 to 2024-08-31", price: "$2,200/month", status: "CONFIRMED" as const },
];

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const StudentProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="relative mx-auto w-24 h-24 mb-3">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">AW</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
            </div>
            <h2 className="text-lg font-bold">Alice Wonderland</h2>
            <p className="text-sm text-muted-foreground">University of Technology</p>
            <div className="flex justify-center gap-0.5 my-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
            <Badge variant="outline" className="border-primary text-primary gap-1">
              <CheckCircle className="h-3 w-3" /> Verified Student
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic Contact Info</p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" /> alice.w@example.com
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" /> +1 (555) 123-4567
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</p>
            <Button variant="outline" className="w-full gap-2">
              <MessageSquare className="h-4 w-4" /> Message Landlord
            </Button>
            <Button className="w-full gap-2">
              <CalendarDays className="h-4 w-4" /> Book a Viewing
            </Button>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          {/* Overview & Bio */}
          <div>
            <h2 className="text-xl font-bold mb-4">Overview & Bio</h2>
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>As a driven computer science student, I'm constantly seeking environments that foster both personal growth and academic excellence. I appreciate quiet spaces for focus but also enjoy vibrant community settings where I can connect with peers and engage in collaborative projects.</p>
              <p>I am particularly interested in properties that are well-connected to campus facilities and public transport, making daily commutes efficient. A clean, organized living space is paramount, and I am keen on finding roommates who are considerate and share similar values regarding shared living responsibilities.</p>
              <p>In my free time, I love exploring local cafes, hiking, and participating in university hackathons. I'm excited to find a place that feels like home while I pursue my studies.</p>
            </div>
          </div>

          {/* Saved Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Saved Listings</h2>
              <Button variant="link" className="text-primary p-0">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedListings.map((listing) => (
                <div key={listing.id} className="rounded-xl border bg-card overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-36">
                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                      <Heart className="h-4 w-4 text-primary fill-primary" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-sm font-semibold">{listing.title}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-primary font-bold text-sm">{listing.price}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {listing.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Bookings */}
          <div>
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            <div className="rounded-xl border bg-card divide-y">
              {bookings.map((booking, i) => (
                <div key={i} className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{booking.title}</p>
                    <p className="text-xs text-muted-foreground">Landlord: {booking.landlord}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {booking.dates}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                    <p className="text-primary font-bold text-sm mt-1">{booking.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

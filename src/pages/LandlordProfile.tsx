import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Star, CheckCircle, Plus, Bed, Bath, MoreHorizontal, Wifi, Car, Sofa, UtensilsCrossed, Monitor, PawPrint, Mountain, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const properties = [
  { id: 1, title: "Cozy Studio in Downtown", price: "$1,200", status: "Active", beds: 1, baths: 1, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=260&fit=crop" },
  { id: 2, title: "Spacious House Near Campus", price: "$2,500", status: "Vacant", beds: 4, baths: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=260&fit=crop" },
  { id: 3, title: "Modern Townhouse with Garden", price: "$1,800", status: "Pending", beds: 2, baths: 2, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=260&fit=crop" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500",
  Vacant: "bg-yellow-500",
  Pending: "bg-red-500",
};

const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "furnished", label: "Furnished", icon: Sofa },
  { id: "kitchen", label: "Full Kitchen", icon: UtensilsCrossed },
  { id: "smarttv", label: "Smart TV", icon: Monitor },
  { id: "pet", label: "Pet-Friendly", icon: PawPrint },
  { id: "view", label: "Scenic View", icon: Mountain },
];

const LandlordProfile = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container py-8 space-y-8">
      {/* Top section */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-blue-500 border-2 border-card flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold">John Doe</h2>
              <div className="flex gap-0.5 my-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <Badge variant="outline" className="border-primary text-primary text-xs">
                Verified Landlord
              </Badge>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> john.doe@example.com
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" /> +1 (555) 123-4567
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" /> 123 Property Lane, Cityville, CA 90210
            </div>
          </div>
        </div>

        {/* Add New Listing */}
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-xl border-2 border-dashed bg-card p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer min-h-[200px]"
        >
          <div className="h-12 w-12 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-bold">Add New Listing</p>
            <p className="text-sm text-muted-foreground mt-1">
              Expand your portfolio. List a new property today<br />and reach thousands of students.
            </p>
          </div>
        </button>
      </div>

      {/* Listed Properties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Listed Properties</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div key={prop.id} className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-44">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[prop.status]}`}>
                  {prop.status}
                </span>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-semibold">{prop.title}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p>
                    <span className="text-primary font-bold text-lg">{prop.price}</span>
                    <span className="text-muted-foreground text-sm"> /month</span>
                  </p>
                  <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {prop.beds} Bed</span>
                  <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {prop.baths} Bath</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Property Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Property Listing</DialogTitle>
            <DialogDescription>Fill out the details below to list your property on DormLink.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label className="font-semibold">Property Title</Label>
              <Input placeholder="e.g., Spacious 2-Bedroom Apartment" />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Address</Label>
              <Input placeholder="e.g., 123 University Ave, Apt 4B" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold">Monthly Rent ($)</Label>
                <Input placeholder="e.g., 1500" type="number" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Property Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="shared">Shared Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold">Bedrooms</Label>
                <Input placeholder="e.g., 2" type="number" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Bathrooms</Label>
                <Input placeholder="e.g., 1.5" type="number" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Description</Label>
              <Textarea placeholder="Describe your property..." className="min-h-[100px]" />
            </div>
            <div className="space-y-3">
              <Label className="font-semibold">Amenities</Label>
              <div className="grid grid-cols-3 gap-3">
                {amenitiesList.map((a) => (
                  <div key={a.id} className="flex items-center gap-2">
                    <Checkbox id={a.id} />
                    <a.icon className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor={a.id} className="text-sm cursor-pointer">{a.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Property Images</Label>
              <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors text-muted-foreground">
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-sm">Click to upload images</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>List Property</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordProfile;

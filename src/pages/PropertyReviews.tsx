import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, ThumbsUp, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

interface Review {
  id: number;
  author: string;
  anonymous: boolean;
  rating: number;
  comment: string;
  tags: string[];
  date: string;
  helpful: number;
}

const mockReviewsByProperty: Record<string, Review[]> = {
  "1": [
    { id: 1, author: "Ahmed M.", anonymous: false, rating: 5, comment: "Great studio, very clean and close to campus. The Wi-Fi was fast and the AC worked perfectly.", tags: ["Cleanliness", "Wi-Fi"], date: "2025-12-15", helpful: 8 },
    { id: 2, author: "", anonymous: true, rating: 4, comment: "Good location but the building entrance could use better security.", tags: ["Security"], date: "2025-11-20", helpful: 3 },
    { id: 3, author: "Sara K.", anonymous: false, rating: 5, comment: "Best student housing I've had. Highly recommend!", tags: [], date: "2025-10-05", helpful: 12 },
  ],
  "2": [
    { id: 4, author: "Omar H.", anonymous: false, rating: 4, comment: "Decent shared flat. Roommates were friendly. Wi-Fi could be faster.", tags: ["Wi-Fi"], date: "2025-11-10", helpful: 5 },
    { id: 5, author: "", anonymous: true, rating: 3, comment: "It's okay for the price but noise was an issue at night.", tags: ["Noise"], date: "2025-09-28", helpful: 7 },
  ],
  "3": [
    { id: 6, author: "Nour A.", anonymous: false, rating: 5, comment: "Modern and well-maintained. AC and appliances all in great condition.", tags: ["Amenities"], date: "2026-01-12", helpful: 15 },
    { id: 7, author: "Youssef T.", anonymous: false, rating: 5, comment: "Perfect room, couldn't ask for more!", tags: ["Cleanliness", "Amenities"], date: "2025-12-01", helpful: 9 },
    { id: 8, author: "", anonymous: true, rating: 4, comment: "A bit pricey but worth it for the quality.", tags: [], date: "2025-11-15", helpful: 4 },
  ],
  "4": [
    { id: 9, author: "Khaled S.", anonymous: false, rating: 4, comment: "Budget-friendly and gets the job done. Good Wi-Fi.", tags: ["Wi-Fi"], date: "2025-10-20", helpful: 6 },
  ],
  "5": [
    { id: 10, author: "Layla M.", anonymous: false, rating: 5, comment: "Luxury living at its finest. Everything was top-notch.", tags: ["Cleanliness", "Amenities", "Security"], date: "2026-02-01", helpful: 20 },
    { id: 11, author: "Hassan R.", anonymous: false, rating: 5, comment: "Amazing apartment with all amenities. Worth every pound.", tags: ["Amenities", "Wi-Fi"], date: "2026-01-20", helpful: 14 },
    { id: 12, author: "", anonymous: true, rating: 4, comment: "Great place, just wish it was closer to the metro.", tags: ["Location"], date: "2025-12-10", helpful: 8 },
  ],
  "6": [
    { id: 13, author: "Mariam F.", anonymous: false, rating: 4, comment: "Very affordable and close to campus. The appliances were a nice bonus.", tags: ["Amenities", "Location"], date: "2025-11-05", helpful: 11 },
    { id: 14, author: "", anonymous: true, rating: 5, comment: "Best value for money near Mansoura University!", tags: [], date: "2025-10-15", helpful: 9 },
  ],
};

const PropertyReviews = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const propertyId = searchParams.get("property") || "1";
  const propertyName = searchParams.get("name") || "Property";
  const reviews = mockReviewsByProperty[propertyId] || [];

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{propertyName}</h1>
            <p className="text-sm text-muted-foreground">
              {isAr ? `${reviews.length} تقييم` : `${reviews.length} reviews`}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="border rounded-xl p-6 bg-card flex flex-col sm:flex-row gap-6">
          <div className="text-center sm:min-w-[140px]">
            <p className="text-5xl font-bold text-primary">{avgRating}</p>
            <div className="flex justify-center gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= Math.round(Number(avgRating)) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr ? `من ${reviews.length} تقييم` : `from ${reviews.length} reviews`}
            </p>
          </div>
          <div className="flex-1 space-y-2">
            {ratingCounts.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-right text-muted-foreground">{star}★</span>
                <Progress value={pct} className="flex-1 h-2" />
                <span className="w-6 text-muted-foreground text-xs">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review CTA */}
        <Button
          className="w-full rounded-full gap-2"
          onClick={() => navigate(`/review/dorm?property=${propertyId}&name=${encodeURIComponent(propertyName)}`)}
        >
          <Star className="h-4 w-4" />
          {isAr ? "اكتب تقييمك" : "Write a Review"}
        </Button>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-xl p-5 bg-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                    {review.anonymous ? (
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {review.anonymous ? (isAr ? "مجهول" : "Anonymous") : review.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i <= review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed">{review.comment}</p>

              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ThumbsUp className="h-3.5 w-3.5" />
                {isAr ? `مفيد (${review.helpful})` : `Helpful (${review.helpful})`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyReviews;

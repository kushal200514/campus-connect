// src/pages/ItemDetails.js
import React, { useState, useEffect } from "react";
import { LostItem } from "@/entities/LostItem";
import { Claim } from "@/entities/Claim";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, User, Phone } from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ClaimForm from "../components/claims/ClaimForm";

export default function ItemDetails() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Get item ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");

  useEffect(() => {
    if (itemId) {
      loadItem();
    }
  }, [itemId]);

  const loadItem = async () => {
    setLoading(true);
    try {
      const items = await LostItem.filter({ id: itemId });
      if (items.length > 0) {
        setItem(items[0]);
      }
    } catch (error) {
      console.error("Failed to load item:", error);
    }
    setLoading(false);
  };

  const handleClaimSubmitted = () => {
    setClaimSubmitted(true);
    setShowClaimForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-32 mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[4/3] bg-slate-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Item not found
            </h2>
            <p className="text-slate-600 mb-6">
              The item you're looking for doesn't exist.
            </p>
            <Link to={createPageUrl("Home")}>
              <Button className="rounded-xl">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryColors = {
    electronics: "bg-blue-100 text-blue-800",
    clothing: "bg-purple-100 text-purple-800",
    accessories: "bg-pink-100 text-pink-800",
    books: "bg-green-100 text-green-800",
    keys: "bg-yellow-100 text-yellow-800",
    cards: "bg-red-100 text-red-800",
    wallet: "bg-amber-100 text-amber-800",
    bags: "bg-indigo-100 text-indigo-800",
    waterbottle: "bg-cyan-100 text-cyan-800",
    other: "bg-gray-100 text-gray-800",
  };

  const statusColors = {
    available: "bg-green-100 text-green-800 border-green-200",
    claimed: "bg-orange-100 text-orange-800 border-orange-200",
    returned: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Item Details
          </h1>
        </div>

        {claimSubmitted && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-green-800">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Claim Submitted Successfully!</h3>
                  <p className="text-sm">
                    The item finder will review your claim and contact you if
                    approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Item Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="aspect-[4/3] bg-slate-100">
                <img
                  src={item.photo_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge
                    className={`${statusColors[item.status]} border font-semibold px-3 py-1`}
                  >
                    {item.status}
                  </Badge>
                  <Badge className={`${categoryColors[item.category]} px-3 py-1`}>
                    {item.category}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {item.title}
                </h1>

                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-900">
                        Location Found
                      </p>
                      <p className="text-slate-600">{item.location_found}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-slate-900">Date Found</p>
                      <p className="text-slate-600">
                        {format(new Date(item.date_found), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>

                {item.finder_contact && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-slate-900">
                          Finder Contact
                        </p>
                        <p className="text-slate-600">{item.finder_contact}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {item.status === "available" &&
              !showClaimForm &&
              !claimSubmitted && (
                <Card className="border-slate-200/60 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl text-slate-900">
                      Is this your item?
                    </CardTitle>
                    <p className="text-slate-600 text-sm">
                      Submit a claim with proof of ownership
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      onClick={() => setShowClaimForm(true)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Claim This Item
                    </Button>
                  </CardContent>
                </Card>
              )}

            {item.status === "claimed" && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">
                    Item Claimed
                  </h3>
                  <p className="text-orange-600 text-sm">
                    This item has been claimed and is being processed for return.
                  </p>
                </CardContent>
              </Card>
            )}

            {item.status === "returned" && (
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Successfully Returned
                  </h3>
                  <p className="text-gray-600 text-sm">
                    This item has been returned to its owner.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card className="border-slate-200/60 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-900">
                  Tips for Claiming
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-slate-600 space-y-2">
                <p>• Provide detailed proof of ownership</p>
                <p>• Include receipts or purchase details</p>
                <p>• Describe unique features or contents</p>
                <p>• Be honest and accurate in your claim</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Claim Form */}
        {showClaimForm && !claimSubmitted && (
          <div className="mt-8">
            <ClaimForm item={item} onClaimSubmitted={handleClaimSubmitted} />
          </div>
        )}
      </div>
    </div>
  );
}

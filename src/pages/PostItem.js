// src/pages/PostItem.js
import React, { useState } from "react";
import { LostItem } from "@/entities/LostItem";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PhotoUpload from "@/components/upload/PhotoUpload";

export default function PostItem() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo_url: "",
    location_found: "",
    date_found: new Date().toISOString().split("T")[0],
    category: "other",
    finder_contact: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.photo_url ||
      !formData.location_found
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await LostItem.create(formData);

      const currentUser = await User.me();
      const newPoints = (currentUser.points || 0) + 10;
      await User.updateMyUserData({ points: newPoints });
      setPointsAwarded(10);

      setSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Home"));
      }, 3000);
    } catch (error) {
      console.error("Failed to post item:", error);
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-slate-200/60 shadow-xl">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Item Posted Successfully!
            </h2>
            <p className="text-slate-600 mb-6">
              Thank you for your help. You've been awarded{" "}
              <span className="font-bold text-amber-600">
                {pointsAwarded} points!
              </span>
            </p>
            <p className="text-sm text-slate-500">Redirecting to home page...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Post Found Item
          </h1>
          <p className="text-slate-600 text-lg">
            Help reunite lost items with their owners by posting them here.
          </p>
        </div>

        <Card className="border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl text-slate-900">
              <Plus className="w-6 h-6 text-blue-600" />
              Item Details
            </CardTitle>
            <p className="text-slate-600">
              Please provide clear details to help the owner identify their item
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold text-slate-700">
                  Item Name *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., iPhone 12, Blue Backpack, Silver Keys"
                  required
                  className="rounded-xl border-slate-200 py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold text-slate-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the item in detail - color, brand, size, any distinctive features..."
                  required
                  className="rounded-xl border-slate-200 min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-slate-700">Photo *</Label>
                <p className="text-sm text-slate-500 mb-3">
                  Take a clear photo of the item from multiple angles if possible
                </p>
                <PhotoUpload
                  onPhotoUploaded={(url) => handleInputChange("photo_url", url)}
                  currentPhoto={formData.photo_url}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-semibold text-slate-700">
                    Location Found *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location_found}
                    onChange={(e) => handleInputChange("location_found", e.target.value)}
                    placeholder="e.g., Library 2nd floor, Main cafeteria"
                    required
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-semibold text-slate-700">
                    Date Found
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date_found}
                    onChange={(e) => handleInputChange("date_found", e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold text-slate-700">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="keys">Keys</SelectItem>
                      <SelectItem value="cards">Cards</SelectItem>
                      <SelectItem value="wallet">Wallet</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                      <SelectItem value="waterbottle">Water Bottle</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="font-semibold text-slate-700">
                    Your Contact Info
                  </Label>
                  <Input
                    id="contact"
                    value={formData.finder_contact}
                    onChange={(e) => handleInputChange("finder_contact", e.target.value)}
                    placeholder="Email or phone (optional)"
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.title ||
                  !formData.description ||
                  !formData.photo_url ||
                  !formData.location_found
                }
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                {isSubmitting ? (
                  "Posting Item..."
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Post Found Item
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

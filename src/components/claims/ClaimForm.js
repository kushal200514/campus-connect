// src/components/claims/ClaimForm.js
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { Claim } from "@/entities/Claim";
import PhotoUpload from "@/components/upload/PhotoUpload";



export default function ClaimForm({ item, onClaimSubmitted }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    claimer_name: "",
    claimer_contact: "",
    proof_description: "",
    proof_photo_url: "",
    additional_details: "",
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
      !formData.claimer_name ||
      !formData.claimer_contact ||
      !formData.proof_description
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await Claim.create({
        item_id: item.id,
        ...formData,
      });
      onClaimSubmitted();
    } catch (error) {
      console.error("Failed to submit claim:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="border-slate-200/60 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
          <Send className="w-5 h-5 text-blue-600" />
          Claim This Item
        </CardTitle>
        <p className="text-slate-600 text-sm">
          Please provide proof of ownership and your contact information
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-slate-700">
                Your Name *
              </Label>
              <Input
                id="name"
                value={formData.claimer_name}
                onChange={(e) =>
                  handleInputChange("claimer_name", e.target.value)
                }
                placeholder="Enter your full name"
                required
                className="rounded-xl border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="font-semibold text-slate-700">
                Contact Info *
              </Label>
              <Input
                id="contact"
                value={formData.claimer_contact}
                onChange={(e) =>
                  handleInputChange("claimer_contact", e.target.value)
                }
                placeholder="Email or phone number"
                required
                className="rounded-xl border-slate-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof" className="font-semibold text-slate-700">
              Proof of Ownership *
            </Label>
            <Textarea
              id="proof"
              value={formData.proof_description}
              onChange={(e) =>
                handleInputChange("proof_description", e.target.value)
              }
              placeholder="Describe how you can prove this item belongs to you (e.g., receipt details, unique features, when/where you lost it)"
              required
              className="rounded-xl border-slate-200 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Upload Proof Photo (Optional)
            </Label>
            <p className="text-sm text-slate-500 mb-3">
              Upload a receipt, photo of similar item, or any other proof of
              ownership
            </p>
            <PhotoUpload
              onPhotoUploaded={(url) =>
                handleInputChange("proof_photo_url", url)
              }
              currentPhoto={formData.proof_photo_url}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional" className="font-semibold text-slate-700">
              Additional Details
            </Label>
            <Textarea
              id="additional"
              value={formData.additional_details}
              onChange={(e) =>
                handleInputChange("additional_details", e.target.value)
              }
              placeholder="Any additional information that might help verify ownership"
              className="rounded-xl border-slate-200"
            />
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.claimer_name ||
              !formData.claimer_contact ||
              !formData.proof_description
            }
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Claim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Claim
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

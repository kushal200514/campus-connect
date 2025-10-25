// src/pages/MyClaims.js
import React, { useState, useEffect } from "react";
import { Claim } from "@/entities/Claim";
import { LostItem } from "@/entities/LostItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [itemsMap, setItemsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      loadMyClaims(user.email);
    } catch (error) {
      console.error("Failed to load user:", error);
      setLoading(false);
    }
  };

  const loadMyClaims = async (userEmail) => {
    setLoading(true);
    try {
      // Get claims created by current user
      const userClaims = await Claim.filter(
        { created_by: userEmail },
        "-created_date"
      );
      setClaims(userClaims);

      // Load associated items
      if (userClaims.length > 0) {
        const itemIds = [...new Set(userClaims.map((claim) => claim.item_id))];
        const items = await LostItem.list();
        const itemsMapping = {};
        items.forEach((item) => {
          itemsMapping[item.id] = item;
        });
        setItemsMap(itemsMapping);
      }
    } catch (error) {
      console.error("Failed to load claims:", error);
    }
    setLoading(false);
  };

  const refreshClaims = () => {
    if (currentUser) {
      loadMyClaims(currentUser.email);
    }
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-orange-500" />,
    approved: <CheckCircle className="w-4 h-4 text-green-500" />,
    rejected: <XCircle className="w-4 h-4 text-red-500" />,
  };

  const statusColors = {
    pending: "bg-orange-100 text-orange-800 border-orange-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              My Claims
            </h1>
            <p className="text-slate-600 text-lg">
              Track the status of your submitted claims
            </p>
          </div>
          <Button
            onClick={refreshClaims}
            variant="outline"
            className="flex items-center gap-2 rounded-xl"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-slate-200 rounded-xl"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : claims.length > 0 ? (
          <div className="space-y-6">
            {claims.map((claim) => {
              const item = itemsMap[claim.item_id];

              return (
                <Card
                  key={claim.id}
                  className="border-slate-200/60 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden">
                          {item?.photo_url && (
                            <img
                              src={item.photo_url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Claim Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2">
                              {item?.title || "Unknown Item"}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              {statusIcons[claim.status]}
                              <Badge
                                className={`${statusColors[claim.status]} border font-semibold`}
                              >
                                {claim.status}
                              </Badge>
                            </div>
                            <p className="text-slate-600 mb-2">
                              <strong>Your proof:</strong>{" "}
                              {claim.proof_description}
                            </p>
                            {claim.additional_details && (
                              <p className="text-slate-600 text-sm">
                                <strong>Additional details:</strong>{" "}
                                {claim.additional_details}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-slate-500 mb-2">
                              Submitted{" "}
                              {format(new Date(claim.created_date), "MMM d, yyyy")}
                            </p>
                            {item && (
                              <Link
                                to={createPageUrl(`ItemDetails?id=${item.id}`)}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Item
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Proof Photo */}
                        {claim.proof_photo_url && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-slate-700 mb-2">
                              Proof Photo:
                            </p>
                            <div className="w-32 h-24 bg-slate-100 rounded-lg overflow-hidden">
                              <img
                                src={claim.proof_photo_url}
                                alt="Proof"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Status Messages */}
                        {claim.status === "pending" && (
                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <p className="text-orange-800 text-sm">
                              <strong>Status:</strong> Your claim is being
                              reviewed by the item finder. They will contact you
                              if your claim is approved.
                            </p>
                          </div>
                        )}

                        {claim.status === "approved" && (
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="text-green-800 text-sm">
                              <strong>Great news!</strong> Your claim has been
                              approved. The finder should contact you soon to
                              arrange pickup.
                            </p>
                          </div>
                        )}

                        {claim.status === "rejected" && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-800 text-sm">
                              <strong>Sorry,</strong> your claim was not
                              approved. The provided proof may not have been
                              sufficient to verify ownership.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Claims Yet
                </h3>
                <p className="text-slate-600 mb-6">
                  You haven't submitted any claims yet. Browse available items to
                  find what you're looking for.
                </p>
                <Link to={createPageUrl("Home")}>
                  <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Browse Items
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

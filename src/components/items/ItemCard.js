// src/components/items/ItemCard.js
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

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

export default function ItemCard({ item }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-slate-200/60 overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
          <img
            src={item.photo_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={`${statusColors[item.status]} border font-semibold`}
          >
            {item.status}
          </Badge>
          <Badge className={categoryColors[item.category]}>
            {item.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 mt-1">
          {item.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{item.location_found}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">
              Found {format(new Date(item.date_found), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <Link
          to={createPageUrl(`ItemDetails?id=${item.id}`)}
          className="block"
        >
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={item.status === "returned"}
          >
            <Eye className="w-4 h-4 mr-2" />
            {item.status === "returned" ? "Already Returned" : "View Details"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

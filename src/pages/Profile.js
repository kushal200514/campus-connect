import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { LostItem } from "@/entities/LostItem";
import { Claim } from "@/entities/Claim";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Shield, 
  Award, 
  LogOut, 
  Package, 
  ClipboardList,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    itemsPosted: 0,
    claimsSubmitted: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      // Load user statistics
      const [items, claims] = await Promise.all([
        LostItem.filter({ created_by: currentUser.email }),
        Claim.filter({ created_by: currentUser.email })
      ]);

      setStats({
        itemsPosted: items.length,
        claimsSubmitted: claims.length
      });
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-48"></div>
            <Card className="border-slate-200/60">
              <CardContent className="p-8 space-y-4">
                <div className="h-20 bg-slate-200 rounded-xl"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Not logged in</h2>
            <p className="text-slate-600">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            My Profile
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your account and view your activity
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Info Card */}
          <Card className="border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-900 mb-1">
                    {user.full_name || "User"}
                  </CardTitle>
                  <Badge className={`${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  } font-semibold`}>
                    {user.role === 'admin' ? 'Administrator' : 'Student'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">Email Address</p>
                    <p className="text-slate-900 font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">Account Role</p>
                    <p className="text-slate-900 font-medium capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
                  <Award className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">Reward Points</p>
                    <p className="text-2xl font-bold text-amber-600">{user.points || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">Member Since</p>
                    <p className="text-slate-900 font-medium">
                      {format(new Date(user.created_date), "MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Stats Card */}
          <Card className="border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
                <ClipboardList className="w-6 h-6 text-blue-600" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                  <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-slate-900 mb-2">
                    {stats.itemsPosted}
                  </p>
                  <p className="text-slate-600 font-medium">Items Posted</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Help others find their belongings
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <ClipboardList className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-slate-900 mb-2">
                    {stats.claimsSubmitted}
                  </p>
                  <p className="text-slate-600 font-medium">Claims Submitted</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Track your claim requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Card */}
          <Card className="border-red-200/60 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">Log Out</h3>
                    <p className="text-sm text-slate-600">
                      Sign out of your account
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-slate-200/60 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-slate-600 space-y-2">
              <p>• Earn 10 points for every item you post</p>
              <p>• Help reunite lost items with their owners</p>
              <p>• Submit claims with detailed proof for faster processing</p>
              <p>• Check your claims regularly for updates</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
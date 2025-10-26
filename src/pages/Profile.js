import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Award, LogOut, Calendar } from "lucide-react";
import { format } from "date-fns";

const DEMO_POINTS = 42;
const DEMO_DATE = "2024-01-10T12:00:00Z";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      setLoading(true);
      let result = await base44.auth.me();
      if (!result) {
        // If user is missing, fill with demo data
        result = {
          full_name: "Campus Student",
          email: "student@campus.edu",
          role: "student",
          points: DEMO_POINTS,
          created_date: DEMO_DATE
        };
      } else {
        // Fill in missing fields with demo defaults
        if (!result.points) result.points = DEMO_POINTS;
        if (!result.created_date) result.created_date = DEMO_DATE;
        if (!result.role) result.role = "student";
      }
      setUser(result);
      setLoading(false);
    }
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>Loading...</div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <Card>
          <CardContent className="p-8 text-center">
            <h2>Not logged in</h2>
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>My Profile</h1>
      <Card style={{ maxWidth: 480, margin: "0 auto" }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 56, height: 56,
              background: 'linear-gradient(90deg,#2563eb, #4f46e5)',
              borderRadius: 16, display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <User color="#fff" size={32}/>
            </div>
            <div>
              <CardTitle style={{ fontSize: 22, marginBottom: 6 }}>
                {user.full_name}
              </CardTitle>
              <Badge>{user.role}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p style={{ margin: "16px 0 10px", fontSize: 16 }}><Mail size={18}/> {user.email}</p>
          <p style={{ margin: "10px 0" }}><Award size={18}/> <span style={{ fontWeight: 700, color: "#eab308" }}>{user.points}</span> Points</p>
          <p style={{ margin: "10px 0 24px" }}><Calendar size={18}/> Member since {format(new Date(user.created_date), "MMM yyyy")}</p>
          <Button onClick={handleLogout} style={{ width: "100%", marginTop: 12 }}>
            <LogOut size={20}/> &nbsp; Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

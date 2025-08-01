'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCopy,
  IndianRupee,
  Gift,
  Lock,
  Unlock,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

interface InternData {
  name: string;
  referralCode: string;
  donations: number;
}

const rewards = [
  { name: "Company T-Shirt", unlocked: true },
  { name: "Free Team Lunch", unlocked: true },
  { name: "₹4000 Amazon Gift Card", unlocked: false },
  { name: "Letter of Recommendation", unlocked: false },
];

export default function DashboardPage() {
  const [internData, setInternData] = useState<InternData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const userId = "MN6NpsVzEMHtS4vh05Ea";
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setInternData(userDoc.data() as InternData);
        } else {
          throw new Error("User document not found. Please create it in Firestore.");
        }
      } catch (error) {
        console.error("Failed to fetch user data from Firestore", error);
        setError("We couldn't load your data. Please check your Firestore setup or try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const copyToClipboard = () => {
    if (internData?.referralCode) {
      navigator.clipboard.writeText(internData.referralCode);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
      <div>
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Code</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
               <Skeleton className="h-8 w-32" />
            </div>
             <Skeleton className="h-4 w-48 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <CardTitle>Rewards & Unlockables</CardTitle>
          </div>
          <CardDescription>
            Milestones you've achieved and what's next.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    )
  }

  if (error || !internData) {
    return (
       <Alert variant="destructive" className="bg-card/80 backdrop-blur-sm">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
         {error || "An unexpected error occurred. Please try refreshing the page."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Welcome back, {internData.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's a summary of your progress. Keep up the great work!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{internData.donations.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Raised for the cause
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Code</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg font-mono py-1">
                {internData.referralCode}
              </Badge>
              <Button variant="ghost" size="icon" aria-label="Copy referral code" onClick={copyToClipboard}>
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Share this code to track your referrals.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <CardTitle>Rewards & Unlockables</CardTitle>
          </div>
          <CardDescription>
            Milestones you've achieved and what's next.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {rewards.map((reward, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-item-enter"
                )}
                 style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4">
                  {reward.unlocked ? (
                    <Unlock className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span
                    className={`font-medium ${
                      reward.unlocked ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {reward.name}
                  </span>
                </div>
                {reward.unlocked ? (
                  <Badge variant="default" className="bg-green-500/20 text-green-700 hover:bg-green-500/30 border-green-500/30">Unlocked</Badge>
                ) : (
                  <Badge variant="outline">Locked</Badge>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

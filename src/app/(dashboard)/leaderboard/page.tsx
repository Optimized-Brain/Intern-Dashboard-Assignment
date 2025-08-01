
'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Users, IndianRupee, BarChart } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  donations: number;
}

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Trophy className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Trophy className="h-5 w-5 text-orange-400" />;
    default:
      return <span className="font-mono text-sm w-5 text-center">{rank}</span>;
  }
};

const TopRankerCard = ({ intern, rank }: { intern: LeaderboardEntry; rank: number }) => {
  const rankStyles = [
    {
      // 1st place
      icon: <Trophy className="h-8 w-8 text-yellow-400" />,
      cardClass: "border-yellow-400/50 bg-yellow-400/10",
      title: "1st Place",
    },
    {
      // 2nd place
      icon: <Trophy className="h-8 w-8 text-slate-400" />,
      cardClass: "border-slate-400/50 bg-slate-400/10",
      title: "2nd Place",
    },
    {
      // 3rd place
      icon: <Trophy className="h-8 w-8 text-orange-500" />,
      cardClass: "border-orange-500/50 bg-orange-500/10",
      title: "3rd Place",
    },
  ];

  const style = rankStyles[rank - 1];
  const isYou = intern.id === "MN6NpsVzEMHtS4vh05Ea";

  return (
    <Card className={cn("text-center transform hover:scale-105 transition-transform duration-300 rounded-2xl", style.cardClass)}>
      <CardHeader className="items-center">
        {style.icon}
        <CardTitle className="text-xl">{style.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="font-bold text-2xl text-foreground">{intern.name}</div>
        <div className="text-3xl font-bold font-mono text-green-600 dark:text-green-500">
          ₹{intern.donations.toLocaleString()}
        </div>
        <p className="text-sm text-muted-foreground">Total Raised</p>
         {isYou && <Badge variant="secondary">You</Badge>}
      </CardContent>
    </Card>
  );
};

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("donations", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        rank: index + 1,
      })) as LeaderboardEntry[];

      const currentUser = data.find(user => user.id === "MN6NpsVzEMHtS4vh05Ea");
      setCurrentUserRank(currentUser || null);

      setLeaderboardData(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalInterns = leaderboardData.length;
  const totalDonations = leaderboardData.reduce((sum, intern) => sum + intern.donations, 0);
  const averageDonation = totalInterns > 0 ? totalDonations / totalInterns : 0;

  const topThree = leaderboardData.slice(0, 3);
  const theRest = leaderboardData.slice(3, 20);
  const orderedTopThree = topThree.length === 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;


  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="text-center">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-24"/>
            <Skeleton className="h-24"/>
            <Skeleton className="h-24"/>
        </div>

        {/* Current Position Skeleton */}
        <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-24" />
            </CardContent>
        </Card>

        {/* Top 3 Skeletons */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader className="items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-24 mt-2" />
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-2">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Skeleton */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
       <div className="text-center">
        <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-primary"/>
            Leaderboard
        </h1>
        <p className="text-muted-foreground mt-2">
          See who's making the biggest impact in our community.
        </p>
      </div>

      {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Interns</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInterns}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalDonations.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Raised</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{averageDonation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </CardContent>
          </Card>
        </div>

       {/* Current User's Position */}
      {currentUserRank && (
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-primary" />
              <p className="text-lg font-medium">Your current position</p>
            </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-primary">#{currentUserRank.rank}</div>
                 <div className="text-sm text-muted-foreground">with ₹{currentUserRank.donations.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Cards */}
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Award className="h-7 w-7 text-primary"/>
            Top Performers
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {orderedTopThree.map(intern => (
            <TopRankerCard key={intern.id} intern={intern} rank={intern.rank} />
          ))}
        </div>
      </div>


      {/* Rest of the Leaderboard Table */}
      {theRest.length > 0 && (
         <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <CardTitle>Full Ranking</CardTitle>
            </div>
            <CardDescription>
              The top 20 performers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Intern Name</TableHead>
                  <TableHead className="text-right">Donations Raised</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {theRest.map((intern) => (
                  <TableRow key={intern.id} className={intern.id === "MN6NpsVzEMHtS4vh05Ea" ? "bg-accent/50" : ""}>
                    <TableCell>
                      <div className="flex items-center justify-start h-full">
                      {getRankBadge(intern.rank)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      {intern.name}
                      {intern.id === "MN6NpsVzEMHtS4vh05Ea" && <Badge variant="secondary">You</Badge>}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ₹{intern.donations.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

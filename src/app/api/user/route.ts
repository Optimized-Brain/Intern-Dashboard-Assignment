import { doc, getDoc } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId') || "MN6NpsVzEMHtS4vh05Ea";

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return NextResponse.json(userDoc.data());
    } else {
      // If the user document doesn't exist, return a fallback.
     return NextResponse.json({error: "User not found",
        message: `A user with ID '${userId}' does not exist in Firestore.`,
        fallbackData: {
            name: "Default User",
            referralCode: "DEFAULT2025",
            donations: 0,}},
            { status: 404 });
        }
  } catch (error) {
    return NextResponse.json({error: "User not found",
        message: `A user with ID '${userId}' does not exist in Firestore.`,
        fallbackData: {
            name: "Default User",
            referralCode: "DEFAULT2025",
            donations: 0,}},
            { status: 500});
        }
  }

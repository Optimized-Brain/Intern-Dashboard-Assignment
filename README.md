# OurInterns - Intern Management Dashboard

This is a Next.js application built with Tailwind CSS, ShadCN UI and Firebase that provides a dashboard for managing intern progress, tracking donations, and viewing a leaderboard.

## Features
- **Authentication**: Simple login and signup forms.
- **Dashboard**: View key metrics like total donations and a personal referral code.
- **Rewards System**: Track unlocked rewards and see what's next.
- **Live Leaderboard**: See real-time rankings of all interns based on donations.
- **Responsive Design**: A mobile-friendly interface that works on all devices.
- **Light & Dark Mode**: Switch between themes for your viewing preference.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Setup Instructions

### 1. Firebase Setup

Before you can run the application, you need to connect it to a Firebase project.

1.  Create a project on the [Firebase Console](https://console.firebase.google.com/).
2.  In your project, create a **Web App**.
3.  Copy the Firebase configuration object provided.
4.  Enable **Firestore** as your database.


### Database Layout

It 'users' will be the database collection name and will be having 3 fields - name(string), referralCode(string), donations(number)

<p align="center">
<a href="https://ibb.co/gMv1MbfQ"><img src="https://i.ibb.co/d0b90sVX/Screenshot-2025-08-01-153606.png" alt="Screenshot-2025-08-01-153606" height="1200"></a>
</p>


### 2. Environment Variables

This project uses a `.env.local` file to securely store your Firebase credentials.
1.  Create a new file named `.env.local` in the root of your project.
2.  Copy the contents of your Firebase config object into this file, matching the keys below.

```
# Firebase Public Configuration

NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id
"NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket.appspot.com"
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
```



### 3. Install Dependencies

Navigate to the project directory in your terminal and install the required npm packages.

```
npm install
```


# Firebase Public Configuration



```bash
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id
"NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket.appspot.com"
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
```


### 3. Install Dependencies

Navigate to the project directory in your terminal and install the required npm packages.

```bash
npm install
```


### 4. Run the Development Server

Once the dependencies are installed, you can start the local development server. The application will be available at `http://localhost:3000`.


```
npm run dev
```

<h3>Dashboard</h3>
<p align="center">
<a href="https://ibb.co/Z1XxKSnV"><img src="https://i.ibb.co/fGFHt9h2/screencapture-localhost-3000-dashboard-2025-08-01-21-24-49.png" alt="screencapture-localhost-3000-dashboard-2025-08-01-21-24-49" height="8000"></a>
</p>


<h3>Leaderboard</h3>
<p align="center">
<a href="https://ibb.co/XZvd5Q6T"><img src="https://i.ibb.co/27fLM9RB/screencapture-localhost-3000-leaderboard-2025-08-01-21-26-27.png" alt="screencapture-localhost-3000-leaderboard-2025-08-01-21-26-27" height="8000"></a>
</p>



## API Reference

The application includes a backend API route to fetch user data.

### Get User by ID
Fetches a user's profile information, including their name, referral code, and total donations.
- **URL**: `/api/user`
- **Method**: `GET`
- **Query Parameters**:  - `userId` (optional, string): The document ID of the user in your Firestore `users` collection. If not provided, it defaults to   `MN6NpsVzEMHtS4vh05Ea` for demonstration.


#### Example Request (using Postman):```http://localhost:3000/api/user?userId=YOUR_USER_ID_HERE```

<p align="center">
<a href="https://ibb.co/3mNYn7pb"><img src="https://i.ibb.co/xqj8ND1b/Screenshot-2025-08-01-213725.png" alt="Screenshot-2025-08-01-213725" height="1200"></a>
</p>

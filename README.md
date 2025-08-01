# OurInterns - Intern Management Dashboard

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
### 4. Run the Development Server

Once the dependencies are installed, you can start the local development server.
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



The application will be available at `http://localhost:3000`.


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

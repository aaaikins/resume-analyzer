# Clerk Authentication Setup

## 1. Create Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application: `resume-analyzer`

## 2. Configure Authentication

1. In Clerk Dashboard → **User & Authentication**
2. Enable sign-in methods:
   - Email address
   - Google (optional)
3. Set **Session settings** → Session lifetime: 7 days

## 3. Get API Keys

1. Go to **API Keys** in Clerk Dashboard
2. Copy the **Publishable key**
3. Add to your `.env` file:

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
```

## 4. Configure Domains

1. Go to **Domains** in Clerk Dashboard
2. Add development domain: `http://localhost:3000`
3. Add production domain when deploying

## 5. Install Dependencies

```bash
npm install @clerk/clerk-react
```

## 6. Test Authentication

1. Run `npm start`
2. Click "Sign In" button
3. Create test account or sign in with Google
4. Verify user menu appears after sign-in

## Features Included

- ✅ Email/password authentication
- ✅ Google OAuth (optional)
- ✅ User profile management
- ✅ Session management
- ✅ Sign out functionality
- ✅ Protected routes

## Customization

Clerk components can be customized in the Dashboard under **Customization** → **Appearance**.
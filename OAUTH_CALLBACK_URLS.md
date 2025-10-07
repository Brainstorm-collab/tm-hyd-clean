# OAuth Callback URLs Configuration

## Google OAuth Configuration

### Callback URLs to add in Google Console:
```
http://localhost:3000/auth/google/callback
https://yourdomain.com/auth/google/callback
```

### Google Console Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Add the callback URLs above to "Authorized redirect URIs"

### Environment Variables:
```env
REACT_APP_GOOGLE_CLIENT_ID=419183498411-aco9polgjn5va01kbg3legvvmq6ibq1h.apps.googleusercontent.com
REACT_APP_BASE_URL=http://localhost:3000
```

---

## Facebook OAuth Configuration

### Callback URLs to add in Facebook App:
```
http://localhost:3000/auth/facebook/callback
https://yourdomain.com/auth/facebook/callback
```

### Facebook App Setup:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Go to "Facebook Login" > "Settings"
4. Add the callback URLs above to "Valid OAuth Redirect URIs"

### Environment Variables:
```env
REACT_APP_FACEBOOK_APP_ID=839782072858430
REACT_APP_BASE_URL=http://localhost:3000
```

---

## Production URLs

For production deployment, replace `localhost:3000` with your actual domain:

### Example Production URLs:
```
https://yourapp.herokuapp.com/auth/google/callback
https://yourapp.herokuapp.com/auth/facebook/callback
```

### Environment Variables for Production:
```env
REACT_APP_GOOGLE_CLIENT_ID=your-production-google-client-id
REACT_APP_FACEBOOK_APP_ID=your-production-facebook-app-id
REACT_APP_BASE_URL=https://yourapp.herokuapp.com
```

---

## Code Implementation

The callback URLs are automatically generated in the `SocialLogin` component:

```typescript
// Callback URLs for OAuth providers
const baseUrl = process.env.REACT_APP_BASE_URL || window.location.origin;
const googleCallbackUrl = `${baseUrl}/auth/google/callback`;
const facebookCallbackUrl = `${baseUrl}/auth/facebook/callback`;
```

The URLs are logged to console for debugging purposes when OAuth flows are triggered.

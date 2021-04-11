This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Configuration

To visualize data in the Firebase console, you can create a new Firebase project and follow the following steps:

- Enable Firestore
- Enable Authentication
- Enable Email/Password Sign-in method
- Create a new Web app
- Copy provided configuration to `src/services/firebase.js`
- In the Firebase console, open **Settings >** [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)
- Click **Generate New Private Key**, then confirm by clicking **Generate Key.**
- Save the JSON file in `src`
- Copy `.env.local.example` to `.env.local`

```
cp src/.env.local.example src/.env.local
```

- Provide the environment variables values needed, example:

```
APP_HOST=http://localhost:3000
FIREBASE_SERVICE_ACCOUNT_FILENAME=serviceAccountSecret.json
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

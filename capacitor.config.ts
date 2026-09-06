import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mediweb.app',
  appName: 'MediWeb',
  webDir: 'public',
  server: {
    // For local development, change this to your local IP address: "http://192.168.x.x:3000"
    // For production, this points to your deployed Vercel/live URL
    url: "https://mediweb.com",
    cleartext: true
  }
};

export default config;

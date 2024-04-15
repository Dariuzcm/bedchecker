import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bedchecker',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    allowNavigation: [
      'http://localhost:3333',
    ]
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;

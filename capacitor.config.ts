import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bedchecker.app',
  appName: 'bedchecker',
  webDir: 'dist',
  bundledWebRuntime: true,
  server: {
    androidScheme: 'http',
    allowNavigation: [
      'http://localhost:3333',
      'https://d1d9tq69-3333.usw3.devtunnels.ms/'
    ]
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    BarcodeScanner: {
      camera: true,
      flashlight: true
    }
  }
};

export default config;

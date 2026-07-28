# EazyShopMobile

EazyShopMobile is an Expo/React Native student project for comparing mock grocery prices, creating a shopping list, and viewing an efficient route between selected stores. The data shown in the app is mock data; it does not represent live retailer prices or chains.

## Link To Backend Repository

https://github.com/ethan-santiago-james/EazyShopMobileBackend

This is required so that you can run the backend service that this frontend repo uses for its functionality

## Requirements

- [Node.js](https://nodejs.org/) **20.19 or later** (Expo SDK 56 requirement)
- npm (included with Node.js)
- One of the following to run the app:
  - **Android:** an Android device with Expo Go, or Android Studio with an emulator
  - **iOS:** an iPhone/iPad with Expo Go, or a macOS computer with Xcode Simulator
  - **Web:** a modern desktop browser

Use a device/emulator and computer on the same local network when opening the app from Expo Go. The map view also needs internet access: it loads map tiles and driving/walking routes from public OpenStreetMap, Leaflet, and OSRM services.

## Clone and install

```bash
git clone <repository-url>
cd EazyShopMobile
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`. If you intentionally change dependencies, use `npm install` instead and commit the updated lockfile.

## Run in development

Start the Expo development server:

```bash
npx expo start
```

The Expo terminal/dev tools will display a QR code and shortcuts. Then choose a target:

```bash
# Launch an available Android emulator, or open Expo Go on Android
npm run android

# Launch the iOS Simulator (macOS only), or open Expo Go on iOS
npm run ios

# Open the web version in a browser
npm run web
```

Alternatively, after `npm start`, scan the QR code in Expo Go on a physical device. If the device cannot reach the development server on the LAN, use the connection options shown by Expo (for example, Tunnel).

The browser target is useful for the non-map screens. The route map uses `react-native-webview`, which is a native mobile component in this project, so use Android or iOS to exercise the map feature.

## Local native builds

The repository intentionally does not commit generated `android/` or `ios/` projects. To generate and build a local Android development build, install Android Studio, create/start an emulator, then run:

```bash
npx expo run:android
```

For a local iOS build, use macOS with Xcode installed:

```bash
npx expo run:ios
```

These commands may generate native project directories locally; they are ignored by Git. This repository currently has no EAS configuration or signing credentials, so producing Play Store/App Store release artifacts requires adding the appropriate EAS/build and credential configuration first.

## Project configuration

- Expo SDK: `~56.0.17`
- React Native: `0.85.3`
- App configuration: `app.json`
- Entry point: `index.ts`, which registers `App.tsx`
- TypeScript configuration: `tsconfig.json`

The app is portrait-only, supports tablets on iOS, and uses the legacy React Native architecture (`newArchEnabled: false`).

## License

See [LICENSE](LICENSE).

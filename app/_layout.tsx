import { useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "@expo-google-fonts/inter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "@/context/app-provider";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const IndexLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "cairo-200": require("../assets/fonts/static/Cairo-ExtraLight.ttf"),
    "cairo-300": require("../assets/fonts/static/Cairo-Light.ttf"),
    "cairo-400": require("../assets/fonts/static/Cairo-Regular.ttf"),
    "cairo-500": require("../assets/fonts/static/Cairo-Medium.ttf"),
    "cairo-600": require("../assets/fonts/static/Cairo-SemiBold.ttf"),
    "cairo-700": require("../assets/fonts/static/Cairo-Bold.ttf"),
    "cairo-800": require("../assets/fonts/static/Cairo-ExtraBold.ttf"),
    "cairo-900": require("../assets/fonts/static/Cairo-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded and isLoading is false or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <AppProvider>
      <StatusBar backgroundColor="#fff" />

      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </AppProvider>
  );
};

export default IndexLayout;

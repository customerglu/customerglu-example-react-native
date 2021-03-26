import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { requestToken, requestUserData } from "./api";
import { GluWebView } from "./components/glu-web-view";

const writeKey = "WRITE_KEY";
const userId = "USER_ID";

export default function App() {
  const [gluDefaultUrl, setGluDefaultUrl] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  /* Fetch URLs for a user & set "gluDefaultUrl" state */
  async function init() {
    setIsLoading(true);
    try {
      const token = await requestToken(writeKey, userId);
      const userData = await requestUserData(token);
      setGluDefaultUrl(userData.defaultUrl);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      console.log(e);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading Webview...</Text>
      </View>
    );
  } else if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error...</Text>
      </View>
    );
  }

  return <GluWebView url={gluDefaultUrl} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});
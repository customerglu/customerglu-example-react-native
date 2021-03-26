import React from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";

export function GluWebView({ url }: { url: string }) {

  /* Callback for the WebView */
  function onWebViewEvent(event: WebViewMessageEvent) {
    const data: IWebViewEvent = JSON.parse(event.nativeEvent.data);
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        onMessage={onWebViewEvent} /* Pass the callback (line: 34) defined as props */
        renderLoading={() => (
          <Text style={styles.text}>Loading Webview...</Text>
        )}
        renderError={() => (
          <Text style={styles.text}>Error Loading Webview...</Text>
        )}
        startInLoadingState
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

type IWebViewEvent = IOpenDeepLinkEvent | ICloseEvent | IShareEvent;

interface IOpenDeepLinkEvent {
  eventName: "OPEN_DEEPLINK";
  data: {
    deepLink: string;
    name: string;
  };
}

interface ICloseEvent {
  eventName: "CLOSE";
}

interface IShareEvent {
  eventName: "SHARE";
  data: {
    channelName: "WHATSAPP" | "SMS" | "EMAIL" | "OTHERS";
    text: string;
    image: string;
  };
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

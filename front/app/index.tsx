import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { IEvent, IEvents } from "@/models/models";
import EventsPage from "@/pages/navbarPages/eventsPage";
import { StatusBar } from "expo-status-bar";

export default function Page() {
  
  return (
    <View>
      <StatusBar theme="auto" />
      <EventsPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

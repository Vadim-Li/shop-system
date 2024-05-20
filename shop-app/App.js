import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Nav from "./src/components/Nav.js";

import { Provider } from "react-redux";
import store from "./src/redux/store.js"; // 导入您的 Redux 存储
import { persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Nav />
      </PersistGate>
    </Provider>
  );
}


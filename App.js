import 'react-native-gesture-handler';
import React from "react";
import Main from "./src/Navigator";
import reducers from "./src/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const App = () => {
  const store = createStore(reducers);
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

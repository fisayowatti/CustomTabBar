import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabActions } from "@react-navigation/native";
import posed from "react-native-pose";

const TabBar = (props) => {
  const {
    state,
    navigation,
    descriptors,
    activeTintColor,
    inactiveTintColor,
    showLabelOnlyOnActive,
    // accessibilityLabel
  } = props;

  console.log("Props", props, props.state.index);

  const { width } = Dimensions.get("window");
  const tabWidth = width / 4;
  const SpotLight = posed.View({
    route0: { x: 0 },
    route1: { x: tabWidth },
    route2: { x: tabWidth * 2 },
    route3: { x: tabWidth * 3 },
  });
  const Scaler = posed.View({
    active: { scale: 1.25 },
    inactive: { scale: 1 },
  });

  return (
    <React.Fragment>
      <View style={styles.tabBarStyle}>
        <View style={StyleSheet.absoluteFillObject}>
          <SpotLight
            style={{ ...styles.spotLight, width: tabWidth }}
            pose={`route${state.index}`}
          >
            <View style={styles.spotLightInner} />
          </SpotLight>
        </View>
        {state.routes.map((route) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                data: {
                  isAlreadyFocused: route.key === state.routes[state.index].key,
                },
              });

              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }
            }}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Scaler
              pose={
                route.key === state.routes[state.index].key
                  ? "active"
                  : "inactive"
              }
            >
              <View>
                {descriptors[route.key].options.tabBarIcon({
                  focused: route.key === state.routes[state.index].key,
                  color:
                    route.key === state.routes[state.index].key
                      ? activeTintColor
                      : inactiveTintColor,
                })}
              </View>
            </Scaler>
            {showLabelOnlyOnActive ? (
              route.key === state.routes[state.index].key ? (
                <Text>
                  {descriptors[route.key].options.title || route.name}
                </Text>
              ) : null
            ) : (
              <Text>{descriptors[route.key].options.title || route.name}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.contentStyle}>
        {descriptors[state.routes[state.index].key].render()}
      </View> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: "row",
    height: 52,
    elevation: 2,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  contentStyle: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  spotLight: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  spotLightInner: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "rgba(128,128,255,0.2)",
  },
});

export default TabBar;

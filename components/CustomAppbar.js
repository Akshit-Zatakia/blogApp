import React from "react";
import { Appbar } from "react-native-paper";

const CustomAppbar = ({ title }) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomAppbar;

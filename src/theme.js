import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "#f7fafc", 
        color: "gray.800",
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
});

export default theme;

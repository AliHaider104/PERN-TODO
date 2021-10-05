import { createGlobalStyle } from "styled-components";

const lightTheme = {
  body: "#fff",
  fontColor: "#000",
};

const darkTheme = {
  body: "#000",
  fontColor: "#fff",
};

export const GlobalStyle = createGlobalStyle`

    body{
        background-color:${(props) => props.theme.body};
    }

`;

export const LightTheme = lightTheme;
export const DarkTheme = darkTheme;

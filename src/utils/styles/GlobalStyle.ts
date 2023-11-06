import { createGlobalStyle } from "styled-components";
import devices from "../devices";
import Theme from "./Theme";

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
        margin: 0;
    }


    body {
        font-family: -apple-system, BlinkMacSystemFont, open_sanslight, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        background-color: white;
        box-sizing: border-box;
        
        padding: ${Theme.spacing.m};

        @media ${devices.laptop} {
            padding: ${Theme.spacing.m};
        }
    }
`;

export default GlobalStyle;

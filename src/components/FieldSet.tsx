import { styled } from "styled-components";
import Theme from "../utils/styles/Theme";

export const Legend = styled.legend`
	color: ${Theme.colors.white.normal};
	display: none;
`;

const FieldSet = styled.fieldset`
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
`;

export default FieldSet;

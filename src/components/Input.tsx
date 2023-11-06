import styled, { css } from "styled-components";
import Theme from "../utils/styles/Theme";

interface IInput {
	align?: "left" | "center";
}

const Input = styled.input<IInput>`
	border: none;
	border-radius: ${Theme.borderRadiuses.s};
	font-family: -apple-system, BlinkMacSystemFont, open_sanslight,
		"Helvetica Neue", Helvetica, Arial, sans-serif !important;
	height: ${Theme.heights.m};
	box-sizing: border-box;
	padding: 0 ${Theme.spacing.xs};
	font-size: ${Theme.fontSizes.s};
	min-width: 230px;
	background: ${Theme.colors.gray.normal};
	color: ${Theme.colors.white.normal};

	${({ align }) => css`
		text-align: ${align ?? "left"};
	`}

	&:active,
	&:focus {
	}
`;

export default Input;

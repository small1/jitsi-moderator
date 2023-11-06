import { css, styled } from "styled-components";
import Theme from "../utils/styles/Theme";

interface ICard {
	gutter?: "m" | "l";
	height?: "fit-content" | "full-height";
}

const Card = styled.div<ICard>`
	border-radius: ${Theme.borderRadiuses.l};
	background-color: ${Theme.colors.black.normal};
	box-sizing: border-box;
	overflow: hidden;

	${({ gutter, height }) =>
		css`
			padding: ${gutter && Theme.spacing[gutter]};
			height: ${height ? height : "100%"};
		`}
`;

export default Card;

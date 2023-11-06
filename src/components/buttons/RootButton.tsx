import styled, { css } from "styled-components";
import { ButtonSizes } from "../../utils/styles/ButtonStyles";
import Theme from "../../utils/styles/Theme";

interface IRootButton {
	size?: ButtonSizes;
}

const RootButton = styled.button<IRootButton>`
	border: none;
	border-radius: ${Theme.borderRadiuses.s};
	width: max-content;

	${({ size }) =>
		css`
			height: ${Theme.heights[size ?? "m"]};
		`};

	padding: 0 ${Theme.spacing.m};

	&:disabled {
		user-select: none;
	}

	&:hover:not([disabled]),
	&:active:not([disabled]) {
		cursor: pointer;
	}

	&:disabled {
		cursor: not-allowed;
	}
`;

export default RootButton;

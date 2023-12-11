import styled, { css } from "styled-components";
import RootButton from "./RootButton";
import ButtonStyles, { ButtonType } from "../../utils/styles/ButtonStyles";

interface IButton {
	$buttonType: ButtonType;
	$inflate?: boolean;
}

const StyledButton = styled(RootButton)<IButton>`
	${({ $inflate }) =>
		$inflate &&
		css`
			width: 100%;
		`};

	${({ $buttonType }) => {
		return css`
			background-color: ${ButtonStyles[$buttonType].background};
			color: ${ButtonStyles[$buttonType].text};

			&:hover:not(:disabled) {
				background-color: ${ButtonStyles[$buttonType].hover};
			}

			&:active:not(:disabled) {
				background-color: ${ButtonStyles[$buttonType].active};
			}

			&:disabled {
				background-color: ${ButtonStyles[$buttonType].disabled};
				color: ${ButtonStyles[$buttonType].disabledText};
			}
		`;
	}};
`;

export default StyledButton;

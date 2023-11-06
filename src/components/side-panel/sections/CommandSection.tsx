import { css, styled } from "styled-components";

interface ICommandSection {
	disabled?: boolean;
}

const CommandSection = styled.section<ICommandSection>`
	${({ disabled }) =>
		disabled &&
		css`
			opacity: 40%;
			pointer-events: none;
			user-select: none;
		`}
`;

export default CommandSection;

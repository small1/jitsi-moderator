// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { css, styled } from "styled-components";

interface ICommandSection {
	$disabled?: boolean;
}

const CommandSection = styled.section<ICommandSection>`
	${({ $disabled }) =>
		$disabled &&
		css`
			opacity: 40%;
			pointer-events: none;
			user-select: none;
		`}
`;

export default CommandSection;

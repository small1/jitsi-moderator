// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import styled from "styled-components";
import RootButton from "./RootButton";
import Theme from "../../utils/styles/Theme";
import ButtonStyles from "../../utils/styles/ButtonStyles";

export const DropdownIconButton = styled(RootButton)`
	background: none;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${Theme.spacing.s};
	box-sizing: border-box;
	border-radius: 0;

	&:hover {
		background-color: ${ButtonStyles.secondary.hover};
	}

	&:active {
		background-color: ${ButtonStyles.secondary.active};
	}

	&:disabled {
		background-color: ${ButtonStyles.secondary.disabled};
	}
`;

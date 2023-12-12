// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import styled from "styled-components";
import Theme from "../../utils/styles/Theme";

const DialogHeader = styled.header`
	display: flex;
	gap: ${Theme.spacing.xs};
	flex-direction: column;
	text-align: center;
`;

export default DialogHeader;

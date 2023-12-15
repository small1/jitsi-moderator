// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import styled from "styled-components";
import Theme from "../../utils/styles/Theme";

const DialogContent = styled.section`
	display: flex;
	flex-direction: column;
	gap: ${Theme.spacing.m};
`;

export default DialogContent;

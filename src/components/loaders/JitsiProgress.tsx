// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import styled, { keyframes } from "styled-components";
import Theme from "../../utils/styles/Theme";

const LineAnimation = keyframes`
    0%   {background-position:-150% 0,-150% 0}
    66%  {background-position: 250% 0,-150% 0}
    100% {background-position: 250% 0, 250% 0}
`;

const JitsiProgress = styled.div`
	height: 4px;
	width: 130px;
	--c: no-repeat linear-gradient(${Theme.colors.blue.normal} 0 0);
	background: var(--c), var(--c), ${Theme.colors.white.normal};
	background-size: 60% 100%;
	animation: ${LineAnimation} 3s infinite;
`;

export default JitsiProgress;

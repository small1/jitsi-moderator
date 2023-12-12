// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { css, styled } from "styled-components";
import Theme, { ColorType } from "../utils/styles/Theme";

interface IRootTypography {
	$color?: ColorType;
	$weight?: number;
}

const RootTypography = styled.span<IRootTypography>`
	margin: 0;
	padding: 0;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	${({ $color }) =>
		$color &&
		css`
			color: ${Theme.colors[$color].normal};
		`}

	${({ $weight }) =>
		$weight &&
		css`
			font-weight: ${$weight};
		`}
`;

const H1 = styled(RootTypography).attrs({
	as: "h1",
})``;

const H2 = styled(RootTypography).attrs({
	as: "h2",
})`
	font-weight: 500;
`;

const H3 = styled(RootTypography).attrs({
	as: "h3",
})`
	font-size: ${Theme.fontSizes.m};
`;

const Ingress = styled(RootTypography).attrs({
	as: "span",
})`
	font-size: ${Theme.fontSizes.xs};
`;

const Label = styled(RootTypography).attrs({
	as: "span",
})`
	font-size: ${Theme.fontSizes.s};
`;

const Paragraph = styled(RootTypography).attrs({
	as: "p",
})`
	font-size: ${Theme.fontSizes.xs};
`;

export { H1, H2, H3, Ingress, Label, Paragraph };

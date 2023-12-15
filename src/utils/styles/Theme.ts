// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable sort-keys */
interface Color {
	normal: string;
	dark?: string;
	light?: string;
	lighter?: string;
	lightest?: string;
}

interface ITheme {
	fontSizes: {
		xs: string;
		s: string;
		m: string;
		l: string;
		xl: string;
	};
	borderRadiuses: {
		xs: string;
		s: string;
		m: string;
		l: string;
	};
	colors: {
		white: Color;
		black: Color;
		gray: Color;
		blue: Color;
		purple: Color;
		red: Color;
	};
	spacing: {
		xxs: string;
		xs: string;
		s: string;
		m: string;
		l: string;
	};
	heights: {
		s: string;
		m: string;
		l: string;
		breakoutRoomsList: string;
	};
	widths: {
		dialog: string;
	};
}

const Theme: ITheme = {
	fontSizes: {
		xs: "0.75em",
		s: "0.85em",
		m: "1em",
		l: "1.5em",
		xl: "2em",
	},
	borderRadiuses: {
		xs: "2px",
		s: "4px",
		m: "6px",
		l: "8px",
	},
	colors: {
		white: {
			normal: "#FFFFFF",
		},
		black: {
			normal: "#000000",
			light: "#141414",
		},
		gray: {
			normal: "#373737",
			dark: "#3D3D3D",
			light: "#B8B8B8",
			lighter: "#D3D3D3",
			lightest: "#E0E0E0",
		},
		blue: {
			normal: "#246fe5",
			dark: "#0045b3",
			light: "#4686ed",
		},
		purple: {
			normal: "#73348C",
		},
		red: {
			normal: "#CB2233",
			light: "#E04757",
			dark: "#A21b29",
		},
	},
	spacing: {
		xxs: "0.25em",
		xs: "0.5em",
		s: "0.75em",
		m: "1em",
		l: "2em",
	},
	heights: {
		s: "24px",
		m: "32px",
		l: "40px",
		breakoutRoomsList: "256px",
	},
	widths: {
		dialog: "512px",
	},
};

export type ColorType = keyof ITheme["colors"];

export default Theme;

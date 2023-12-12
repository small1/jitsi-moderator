// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import Theme from "./Theme";

export type ButtonSizes = "s" | "m" | "l";

export type ButtonType = keyof IButtonStyles;

interface IButtonColors {
	background: string;
	text: string;
	hover: string;
	active: string;
	disabled: string;
	disabledText: string;
}

interface IButtonStyles {
	primary: IButtonColors;
	secondary: IButtonColors;
	tertiary: IButtonColors;
}

const ButtonStyles: IButtonStyles = {
	primary: {
		background: Theme.colors.blue.normal,
		text: Theme.colors.white.normal,
		hover: Theme.colors.blue.light!,
		active: Theme.colors.blue.dark!,
		disabled: Theme.colors.gray.lighter!,
		disabledText: Theme.colors.gray.dark!,
	},
	secondary: {
		background: Theme.colors.gray.lighter!,
		text: Theme.colors.black.normal,
		hover: Theme.colors.white.normal,
		active: Theme.colors.gray.light!,
		disabled: Theme.colors.gray.lighter!,
		disabledText: Theme.colors.black.normal,
	},
	tertiary: {
		background: Theme.colors.red.normal,
		text: Theme.colors.white.normal,
		hover: Theme.colors.red.light!,
		active: Theme.colors.red.dark!,
		disabled: Theme.colors.gray.lighter!,
		disabledText: Theme.colors.gray.dark!,
	},
};

export default ButtonStyles;

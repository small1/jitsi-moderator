// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

declare module "*.svg" {
	const content: React.FC<React.SVGProps<SVGElement>>;
	export default content;
}

// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { styled } from "styled-components";
import { JitsiCommands } from "../../../../utils/enums/JitsiCommands";
import SectionDivider from "../../../divider/SectionDivider";
import ButtonGrid from "../../../buttons/ButtonGrid";
import Input from "../../../Input";
import { useContext, useState } from "react";
import FieldSet, { Legend } from "../../../FieldSet";
import { TitledCommandSection } from "../TitledCommandSection";
import { useTranslation } from "react-i18next";
import {
	executeCommand,
	sendEveryoneBackToMainRoom,
} from "../../../../utils/api/JitsiApi";
import JitsiContext from "../../../../context/jitsiContext";
import Theme from "../../../../utils/styles/Theme";
import Button from "../../../buttons/Button";
import BreakoutRoomsList from "./BreakoutRoomsList";

interface IBreakoutRoomsSection {
	disabled: boolean;
}

const BreakoutRoomsSection = ({ disabled }: IBreakoutRoomsSection) => {
	const { t } = useTranslation();
	const jitsiContext = useContext(JitsiContext);

	const [breakoutRoomName, setBreakoutRoomName] = useState<string>("");

	return (
		<TitledCommandSection
			disabled={disabled}
			title={t("breakout-room-section.title")}
			ingress={t("breakout-room-section.ingress")}
		>
			<BreakoutRoomsSectionContent>
				<ButtonGrid>
					<Button
						$buttonType="secondary"
						disabled={disabled}
						onClick={() => {
							executeCommand(
								JitsiCommands.AUTO_ASSIGN_TO_BREAKOUT_ROOMS,
								jitsiContext?.api
							);
						}}
					>
						{t("auto-assign")}
					</Button>
					<Button
						$buttonType="secondary"
						disabled={disabled}
						onClick={() => {
							sendEveryoneBackToMainRoom(jitsiContext?.api);
						}}
					>
						{t("call-back-to-main-room")}
					</Button>
				</ButtonGrid>
				<SectionDivider />
				<BreakoutRoomFieldSet>
					<Legend>{t("breakout-room-name")}</Legend>
					<Input
						disabled={disabled}
						aria-label={t("breakout-room-name")}
						placeholder={t("breakout-room-name")}
						value={breakoutRoomName}
						onChange={({ currentTarget }) =>
							setBreakoutRoomName(currentTarget.value)
						}
					></Input>
					<Button
						$buttonType="secondary"
						disabled={disabled}
						onClick={() => {
							executeCommand(
								JitsiCommands.ADD_BREAKOUT_ROOM,
								jitsiContext?.api,
								breakoutRoomName
							);
							setBreakoutRoomName("");
						}}
					>
						{t("add")}
					</Button>
				</BreakoutRoomFieldSet>
				{jitsiContext?.breakoutRooms && (
					<BreakoutRoomsList
						breakoutRooms={jitsiContext.breakoutRooms}
					/>
				)}
			</BreakoutRoomsSectionContent>
		</TitledCommandSection>
	);
};

const BreakoutRoomsSectionContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${Theme.spacing.m};
`;

const BreakoutRoomFieldSet = styled(FieldSet)`
	display: flex;
	align-items: center;
	gap: ${Theme.spacing.xs};

	${Input} {
		flex: 1;
	}
`;

export default BreakoutRoomsSection;

// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { styled } from "styled-components";
import FieldSet, { Legend } from "../../FieldSet";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoSizingChatBox from "../../ChatBox";
import JitsiContext from "../../../context/jitsiContext";
import BreakoutRoomsDropdown from "../../breakout-rooms-dropdown/BreakoutRoomsDropdown";
import {
	sendMessageToCurrentRoom,
	sendMessageToRooms,
} from "../../../utils/api/JitsiApi";
import { shouldSendMessageToCurrentRoom } from "../../../utils/helpers/chatHelper";
import ChatInfoCard from "../../info-cards/ChatInfoCard";
import BreakoutRoom from "../../../utils/interfaces/BreakoutRoom";
import Theme from "../../../utils/styles/Theme";
import CommandSection from "./CommandSection";

interface IChatSection {
	disabled: boolean;
}

const ChatSection = ({ disabled }: IChatSection) => {
	const { t } = useTranslation();
	const [message, setMessage] = useState<string>("");
	const [willSendToCurrentRoom, setWillSendToCurrentRoom] =
		useState<boolean>(true);
	const [selectedBreakoutRooms, setSelectedBreakoutRooms] = useState<
		Array<BreakoutRoom>
	>([]);
	const jitsiContext = useContext(JitsiContext);

	useEffect(() => {
		if (jitsiContext) {
			setSelectedBreakoutRooms(
				jitsiContext.currentBreakoutRoom
					? [jitsiContext.currentBreakoutRoom]
					: []
			);
		}
	}, [jitsiContext]);

	useEffect(() => {
		if (jitsiContext && jitsiContext.currentBreakoutRoom) {
			setWillSendToCurrentRoom(
				shouldSendMessageToCurrentRoom(
					jitsiContext.breakoutRooms,
					selectedBreakoutRooms,
					jitsiContext.currentBreakoutRoom
				)
			);
		}
	}, [jitsiContext, selectedBreakoutRooms]);

	const handleBreakoutRoomsChange = (breakoutRooms: Array<BreakoutRoom>) => {
		setSelectedBreakoutRooms(breakoutRooms);
	};

	const handleOnSend = async () => {
		if (!jitsiContext) return;

		if (willSendToCurrentRoom) {
			await sendMessageToCurrentRoom(message, jitsiContext.api);
		} else {
			jitsiContext.setIsSendingMessage(true);
			await sendMessageToRooms(
				message,
				jitsiContext?.userId ?? "",
				selectedBreakoutRooms,
				jitsiContext.api
			);
			jitsiContext.setIsSendingMessage(false);
		}
		setMessage("");
	};

	return (
		<StyledChatSection $disabled={disabled}>
			{!willSendToCurrentRoom && (
				<ChatInfoCard selectedBreakoutRooms={selectedBreakoutRooms} />
			)}
			<ChatFieldSet>
				<Legend>{t("your-message")}</Legend>
				<AutoSizingChatBox
					disabled={disabled || jitsiContext.isSendingMessage}
					ariaLabel={t("your-message")}
					value={message}
					placeholder={t("your-message")}
					onChange={setMessage}
				/>
				{jitsiContext && (
					<BreakoutRoomsDropdown
						disabled={disabled || jitsiContext.isSendingMessage}
						onSelectedBreakoutRoomsChange={
							handleBreakoutRoomsChange
						}
						breakoutRooms={jitsiContext?.breakoutRooms ?? []}
						onSend={handleOnSend}
						selectedBreakoutRooms={selectedBreakoutRooms}
					/>
				)}
			</ChatFieldSet>
		</StyledChatSection>
	);
};

const StyledChatSection = styled(CommandSection)`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: end;
	gap: ${Theme.spacing.xs};
`;

const ChatFieldSet = styled(FieldSet)`
	display: flex;
	align-items: flex-end;
	gap: ${Theme.spacing.xs};
`;

export default ChatSection;

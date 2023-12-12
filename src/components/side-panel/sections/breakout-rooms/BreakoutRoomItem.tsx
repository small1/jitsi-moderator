// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import styled, { css } from "styled-components";
import User from "../../../../icons/14/user-14.svg?react";
import { Label } from "../../../Typography";
import Button from "../../../buttons/Button";
import Theme from "../../../../utils/styles/Theme";
import BreakoutRoom from "../../../../utils/interfaces/BreakoutRoom";
import { useTranslation } from "react-i18next";
import { isParticipantInRoom } from "../../../../utils/helpers/roomHelper";
import { useContext } from "react";
import JitsiContext from "../../../../context/jitsiContext";
import {
	joinBreakoutRoom,
	removeBreakoutRoom,
} from "../../../../utils/api/JitsiApi";

interface IBreakoutRoomItem {
	breakoutRoom: BreakoutRoom;
}

const BreakoutRoomItem = ({ breakoutRoom }: IBreakoutRoomItem) => {
	const jitsiContext = useContext(JitsiContext);
	const { t } = useTranslation();

	const getRoomString = () => {
		const numberOfParticipants = Object.values(
			breakoutRoom.participants
		).length;
		let roomName = "";

		if (breakoutRoom.isMainRoom) {
			roomName = t("main-room");
		} else {
			roomName = breakoutRoom.name;
		}

		return `${roomName} (${numberOfParticipants})`;
	};

	const handleJoinClick = async () => {
		await joinBreakoutRoom(
			jitsiContext?.api!,
			breakoutRoom.jid,
			breakoutRoom.id,
			jitsiContext?.userId!
		);
	};

	const handleRemoveClick = async () => {
		await removeBreakoutRoom(jitsiContext?.api!, breakoutRoom.jid);
	};

	const renderDefaultItem = () => {
		return (
			<>
				<LabelContainer>
					<Label $color="white">{getRoomString()}</Label>
				</LabelContainer>
				<ButtonContainer>
					{!breakoutRoom.isMainRoom && (
						<Button
							$buttonType="tertiary"
							$size="m"
							onClick={handleRemoveClick}
						>
							{t("remove")}
						</Button>
					)}
					<Button
						$buttonType="primary"
						$size="m"
						onClick={handleJoinClick}
					>
						{t("join")}
					</Button>
				</ButtonContainer>
			</>
		);
	};

	return (
		<DefaultBreakoutRoomItemArticle
			$isJoinable={
				jitsiContext?.currentBreakoutRoom?.jid !== breakoutRoom.jid
			}
		>
			<IconContainer>
				{isParticipantInRoom(
					breakoutRoom.participants,
					jitsiContext?.userId!
				) && <User fill="white" />}
			</IconContainer>
			{renderDefaultItem()}
		</DefaultBreakoutRoomItemArticle>
	);
};

interface IBreakoutRoomsItemArticle {
	$isJoinable: boolean;
}

const BreakoutRoomItemArticle = styled.article<IBreakoutRoomsItemArticle>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: ${Theme.heights.l};
	shape-rendering: geometricPrecision;
	gap: ${Theme.spacing.xs};
	padding: 0 ${Theme.spacing.xs};
`;

const DefaultBreakoutRoomItemArticle = styled(BreakoutRoomItemArticle)`
	&:hover {
		cursor: pointer;
	}

	${Button} {
		display: none;
	}

	${({ $isJoinable }) =>
		$isJoinable &&
		css`
			&:hover {
				${Button} {
					display: block;
				}
			}
		`}
`;

const IconContainer = styled.section`
	display: flex;
	justify-content: center;
	width: 16px;
`;

const LabelContainer = styled.section`
	flex: 1;
	display: flex;
	align-items: center;
	align-content: center;
`;

const ButtonContainer = styled.section`
	display: flex;
	gap: ${Theme.spacing.xxs};
`;

export default BreakoutRoomItem;

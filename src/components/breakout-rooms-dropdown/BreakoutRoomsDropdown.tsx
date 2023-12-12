// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { styled } from "styled-components";
import { DropdownIconButton } from "../buttons/DropdownIconButton";
import { useContext, useEffect, useState } from "react";
import BreakoutRoom from "../../utils/interfaces/BreakoutRoom";
import ChevronDown from "../../icons/16/chevron-down-16.svg?react";
import ChevronUp from "../../icons/16/chevron-up-16.svg?react";
import Send from "../../icons/16/send-16.svg?react";
import BreakoutRoomsDropdownMenu from "./BreakoutRoomsDropdownMenu";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";
import { breakoutRoomsArrayContainsRoom } from "../../utils/helpers/roomHelper";
import JitsiContext from "../../context/jitsiContext";
import Theme from "../../utils/styles/Theme";
import ButtonStyles from "../../utils/styles/ButtonStyles";

interface IBreakoutRoomsDropdown {
	disabled: boolean;
	selectedBreakoutRooms: Array<BreakoutRoom>;
	breakoutRooms: Array<BreakoutRoom>;
	onSelectedBreakoutRoomsChange: (breakoutRooms: Array<BreakoutRoom>) => void;
	onSend: () => void;
}

const BreakoutRoomsDropdown = ({
	disabled,
	selectedBreakoutRooms,
	breakoutRooms,
	onSelectedBreakoutRoomsChange,
	onSend,
}: IBreakoutRoomsDropdown) => {
	const jitsiContext = useContext(JitsiContext);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	useEffect(() => {
		if (breakoutRooms.length === 0) {
			setMenuOpen(false);
		}
	}, [breakoutRooms]);

	const outsideClickRef = useOutsideClick({
		onOutsideClick: () => {
			setMenuOpen(false);
		},
	});

	const toggleBreakoutRoom = (breakoutRoom: BreakoutRoom) => {
		if (
			!breakoutRoomsArrayContainsRoom(selectedBreakoutRooms, breakoutRoom)
		) {
			onSelectedBreakoutRoomsChange([
				...selectedBreakoutRooms,
				breakoutRoom,
			]);
		} else {
			const newArray = selectedBreakoutRooms.filter(
				(r) => r.jid !== breakoutRoom.jid
			);

			if (newArray.length > 0) {
				onSelectedBreakoutRoomsChange(newArray);
			}
		}
	};
	return (
		<DropdownContainer {...(menuOpen && { ref: outsideClickRef })}>
			<BreakoutRoomsDropdownMenu
				isOpen={!menuOpen}
				breakoutRooms={breakoutRooms}
				selectedBreakoutRooms={selectedBreakoutRooms}
				onBreakoutRoomClick={(breakoutRoom) =>
					toggleBreakoutRoom(breakoutRoom)
				}
				onAllBreakoutRoomsClick={() => {
					if (selectedBreakoutRooms.length === breakoutRooms.length) {
						onSelectedBreakoutRoomsChange([
							jitsiContext?.currentBreakoutRoom!,
						]);
					} else {
						onSelectedBreakoutRoomsChange(breakoutRooms);
					}
				}}
			/>
			<DropdownButtonContainer>
				<DropdownIconButton
					disabled={disabled}
					onClick={() => onSend()}
				>
					<Send />
				</DropdownIconButton>
				{breakoutRooms.length > 1 && (
					<>
						<DropdownButtonDivider />
						<DropdownIconButton
							disabled={disabled}
							onClick={() => setMenuOpen(!menuOpen)}
						>
							{!menuOpen ? <ChevronDown /> : <ChevronUp />}
						</DropdownIconButton>
					</>
				)}
			</DropdownButtonContainer>
		</DropdownContainer>
	);
};

const DropdownContainer = styled.div`
	position: relative;
`;

const DropdownButtonContainer = styled.div`
	background-color: ${ButtonStyles.secondary.background};
	border-radius: ${Theme.borderRadiuses.s};
	height: ${Theme.heights.m};
	display: flex;
	box-sizing: border-box;
	overflow: hidden;
`;

const DropdownButtonDivider = styled.hr`
	border: none;
	border: 0.5px ${Theme.colors.gray.light} solid;
	border-radius: 1px;
`;

export default BreakoutRoomsDropdown;

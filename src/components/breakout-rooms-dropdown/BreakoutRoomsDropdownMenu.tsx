import styled, { css } from "styled-components";
import BreakoutRoom from "../../utils/interfaces/BreakoutRoom";
import { useState, useRef, useEffect } from "react";
import DropdownListItemButton from "../buttons/DropdownListItemButton";
import { useTranslation } from "react-i18next";
import { breakoutRoomsArrayContainsRoom } from "../../utils/helpers/roomHelper";
import Theme from "../../utils/styles/Theme";
import ButtonStyles from "../../utils/styles/ButtonStyles";

interface IBreakoutRoomsDropdownMenu {
	isOpen: boolean;
	breakoutRooms: Array<BreakoutRoom>;
	selectedBreakoutRooms: Array<BreakoutRoom>;
	onBreakoutRoomClick: (breakoutRoom: BreakoutRoom) => void;
	onAllBreakoutRoomsClick: () => void;
}

const BreakoutRoomsDropdownMenu = ({
	isOpen,
	breakoutRooms,
	selectedBreakoutRooms,
	onBreakoutRoomClick,
	onAllBreakoutRoomsClick,
}: IBreakoutRoomsDropdownMenu) => {
	const [menuHeight, setMenuHeight] = useState<number>(0);
	const menuRef = useRef<HTMLUListElement | null>(null);
	const { t } = useTranslation();

	useEffect(() => {
		if (menuRef.current) {
			setMenuHeight(menuRef.current.clientHeight);
		}
	}, [breakoutRooms]);

	const renderAllBreakoutRoomItem = () => {
		return (
			<BreakoutRoomsMenuItem key="all">
				<DropdownListItemButton
					isSelected={
						selectedBreakoutRooms.length === breakoutRooms.length
					}
					name={t("all-rooms")}
					onClick={() => {
						onAllBreakoutRoomsClick();
					}}
				/>
			</BreakoutRoomsMenuItem>
		);
	};

	const renderBreakoutRoom = (breakoutRoom: BreakoutRoom) => {
		return (
			<BreakoutRoomsMenuItem key={breakoutRoom.jid}>
				<DropdownListItemButton
					isSelected={breakoutRoomsArrayContainsRoom(
						selectedBreakoutRooms,
						breakoutRoom
					)}
					name={
						breakoutRoom.isMainRoom
							? t("main-room")
							: breakoutRoom.name
					}
					onClick={() => {
						onBreakoutRoomClick(breakoutRoom);
					}}
				/>
			</BreakoutRoomsMenuItem>
		);
	};

	return (
		<BreakoutRoomsMenu ref={menuRef} $isOpen={isOpen} $top={menuHeight}>
			{renderAllBreakoutRoomItem()}
			{breakoutRooms.map(renderBreakoutRoom)}
		</BreakoutRoomsMenu>
	);
};

interface IBreakoutRoomsMenu {
	$isOpen: boolean;
	$top: number;
}

const BreakoutRoomsMenu = styled.ul<IBreakoutRoomsMenu>`
	border-radius: ${Theme.borderRadiuses.s};
	position: absolute;
	background-color: ${ButtonStyles.secondary.background};
	width: 200px;
	margin: 0;
	padding: ${Theme.spacing.xxs};
	${({ $top }) =>
		css`
			top: calc(0px - (${$top}px + ${Theme.spacing.xs}));
			right: 0;
		`};

	${({ $isOpen }) =>
		$isOpen &&
		css`
			visibility: hidden;
		`}
`;

const BreakoutRoomsMenuItem = styled.li`
	list-style: none;
	display: flex;
`;

export default BreakoutRoomsDropdownMenu;

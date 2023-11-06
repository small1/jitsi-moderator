import styled from "styled-components";
import BreakoutRoom from "../../../../utils/interfaces/BreakoutRoom";
import BreakoutRoomsItem from "./BreakoutRoomItem";
import Theme from "../../../../utils/styles/Theme";

interface IBreakoutRoomsList {
	breakoutRooms: Array<BreakoutRoom>;
}

const BreakoutRoomsList = ({ breakoutRooms }: IBreakoutRoomsList) => {
	const renderBreakoutRooms = () => {
		return breakoutRooms.map((room) => (
			<BreakoutRoomsItem key={room.id} breakoutRoom={room} />
		));
	};

	return (
		<BreakoutRoomsListSection>
			{renderBreakoutRooms()}
		</BreakoutRoomsListSection>
	);
};

const BreakoutRoomsListSection = styled.section`
	height: ${Theme.heights.breakoutRoomsList};
	overflow-y: scroll;
	border-radius: ${Theme.borderRadiuses.m};
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export default BreakoutRoomsList;

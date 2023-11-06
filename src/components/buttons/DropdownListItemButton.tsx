import { styled } from "styled-components";
import Check from "../../icons/14/check-14.svg?react";
import Theme from "../../utils/styles/Theme";
import ButtonStyles from "../../utils/styles/ButtonStyles";

interface IDropdownListItemButton {
	name: string;
	isSelected: boolean;
	onClick: () => void;
}

const DropdownListItemButton = ({
	name,
	isSelected,
	onClick,
}: IDropdownListItemButton) => {
	return (
		<>
			<Button onClick={onClick}>
				<CheckContainer>
					{isSelected ? <Check /> : <></>}
				</CheckContainer>
				<NameContainer>{name}</NameContainer>
			</Button>
		</>
	);
};

const Button = styled.button`
	display: flex;
	gap: ${Theme.spacing.xxs};
	background: none;
	border: none;
	text-align: left;
	flex: 1;
	padding: ${Theme.spacing.xs};
	border-radius: ${Theme.borderRadiuses.xs};
	box-sizing: border-box;
	align-items: center;
	align-content: center;

	&:hover {
		cursor: pointer;
		background-color: ${ButtonStyles.secondary.hover};
	}
`;

const NameContainer = styled.div`
	flex: 1;
`;

const CheckContainer = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	width: 14px;
	height: 14px;
`;

export default DropdownListItemButton;

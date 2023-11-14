import { styled } from "styled-components";
import Theme from "../utils/styles/Theme";

interface IAutoSizingChatBox {
	value: string;
	placeholder: string;
	ariaLabel: string;
	disabled: boolean;
	onChange: (value: string) => void;
}

const AutoSizingChatBox = ({
	value,
	placeholder,
	ariaLabel,
	disabled,
	onChange,
}: IAutoSizingChatBox) => {
	const resize = (
		newValue: string,
		target: EventTarget & HTMLTextAreaElement
	) => {
		if (newValue === "") {
			target.style.height = "auto";
		} else {
			target.style.height = `${target.scrollHeight}px`;
		}
	};

	return (
		<ChatBox
			disabled={disabled}
			rows={1}
			aria-label={ariaLabel}
			value={value}
			onChange={({ currentTarget }) => {
				onChange(currentTarget.value);
				resize(currentTarget.value, currentTarget);
			}}
			placeholder={placeholder}
		/>
	);
};

const ChatBox = styled.textarea`
	font-family: -apple-system, BlinkMacSystemFont, open_sanslight,
		"Helvetica Neue", Helvetica, Arial, sans-serif !important;
	padding: ${Theme.spacing.xs};
	resize: none;
	border: none;
	border-radius: ${Theme.borderRadiuses.s};
	box-sizing: border-box;
	font-size: ${Theme.fontSizes.s};
	background: ${Theme.colors.gray.normal};
	color: ${Theme.colors.white.normal};
	overflow: hidden;
	height: auto;
	min-height: ${Theme.heights.m};
	max-height: 100px;
	flex: 1;

	&:disabled {
		user-select: none;
		opacity: 0.6;
	}
`;

export default AutoSizingChatBox;

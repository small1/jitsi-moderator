import { useEffect, useRef } from "react";

interface IOutsideClick {
	onOutsideClick: () => void;
}

export const useOutsideClick = ({ onOutsideClick }: IOutsideClick) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onOutsideClick]);

	return ref;
};

import React from "react";

export type ButtonProps = {
    size?: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    iconClassName?: string
}
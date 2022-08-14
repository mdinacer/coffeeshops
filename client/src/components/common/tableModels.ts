import React from "react";

export interface IResponsiveTable {

    headers: Array<string>,
    children: React.ReactNode;
}
export interface ITableRow {
    cells: ITableCell[],
    onClick?: () => void
}
export interface ITableCell {
    title: string;
    value: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
}
import { useLayoutEffect, useRef } from "react";
import style from "./Table.module.scss";

export const Table = {
    Head: ({ children, ...rest }) => {
        return (
            <div className={style.head} {...rest}>
                {children}
            </div>
        );
    },

    Body: ({ children, ...rest }) => {
        return (
            <div className={style.body} {...rest}>
                {children}
            </div>
        );
    },

    Row: ({ children, height, borderTop, borderBottom, fontSize,color, ...rest }) => {
        const row = useRef();

        useLayoutEffect(() => {
            row.current.style.fontSize = fontSize;
            row.current.style.color = color;
            if (borderTop) row.current.style.borderTop = "solid 1px #dddddd";
            if (borderBottom) row.current.style.borderBottom = "solid 1px #dddddd";
        }, [borderTop, borderBottom]);

        return (
            <div ref={row} className={style.row} style={height && { height: height }} {...rest}>
                {children}
            </div>
        );
    },

    Col: ({ children, position, ...rest }) => {
        const colRef = useRef();

        useLayoutEffect(() => {

            if (position == undefined) {
                colRef.current.style.justifyContent = "center";
                colRef.current.style.alignItems = "center";
            } else if (position == "top-left") {
                colRef.current.style.justifyContent = "flex-start";
                colRef.current.style.alignItems = "flex-start";
            } else if (position == "top-center") {
                colRef.current.style.justifyContent = "flex-start";
                colRef.current.style.alignItems = "center";
            } else if (position == "top-right") {
                colRef.current.style.justifyContent = "flex-start";
                colRef.current.style.alignItems = "flex-end";
            } else if (position == "center-left") {
                colRef.current.style.justifyContent = "center";
                colRef.current.style.alignItems = "flex-start";
            } else if (position == "center-center") {
                colRef.current.style.justifyContent = "center";
                colRef.current.style.alignItems = "center";
            } else if (position == "center-right") {
                colRef.current.style.justifyContent = "center";
                colRef.current.style.alignItems = "flex-end";
            } else if (position == "bottom-left") {
                colRef.current.style.justifyContent = "flex-end";
                colRef.current.style.alignItems = "flex-start";
            } else if (position == "bottom-bottom") {
                colRef.current.style.justifyContent = "flex-end";
                colRef.current.style.alignItems = "center";
            } else if (position == "bottom-right") {
                colRef.current.style.justifyContent = "flex-end";
                colRef.current.style.alignItems = "flex-end";
            } else {
                throw new Error("position props 가 올바르지 않습니다");
            }
        }, [position]);

        return (
            <div ref={colRef} className={`${style.col}`} {...rest}>
                {children}
            </div>
        );
    },

    Container: ({ ratio, width, padding, children, ...rest }) => {
        const containerRef = useRef();

        useLayoutEffect(() => {
            containerRef.current.style.width = width;
            containerRef.current.style.padding = padding;
            const cols = document.querySelectorAll(`.${style.col}`);
            const rows = document.querySelectorAll(`.${style.row}`);

            if (ratio !== undefined) {
                if (cols.length / rows.length != ratio.length) {
                    throw new Error("Table Container 의 ratio props 의 배열 길이는 행 당 열의 개수와 일치해야합니다!");
                }
                let index = 0;
                for (let i = 0; i < cols.length; i++) {
                    if (index >= cols.length / rows.length) index = 0;
                    cols[i].style.flexGrow = `${ratio[index++]}`;
                }
            } else {
                for (let i = 0; i < cols.length; i++) {
                    cols[i].style.flexGrow = "1";
                }
            }
        }, [width, padding, ratio]);

        return (
            <div ref={containerRef} className={style.container} {...rest}>
                {children}
            </div>
        );
    },
};
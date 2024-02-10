import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import SomePict from "../assets/vinni-pukh-v-png.png";
import SomePict2 from "@/assets/jpeg_.jpeg";
import SomePict3 from "@/assets/1586558.svg";
export var App = function () {
    var _a = useState(0), counter = _a[0], setCounter = _a[1];
    var handleClick = function () {
        setCounter(function (prev) { return prev + 1; });
    };
    return (_jsxs("div", { children: [_jsxs("h2", { children: [counter, " \u043B\u043E"] }), _jsx("button", { className: styles.button, onClick: handleClick, children: _jsx("span", { children: "+++" }) }), _jsx("img", { src: SomePict, alt: "some pict", className: styles.pict }), _jsx("img", { src: SomePict2, alt: "some pict", className: styles.pict }), _jsx("div", { children: _jsx(SomePict3, { width: 50, height: 50, fill: "green" }) }), _jsx(Outlet, {})] }));
};

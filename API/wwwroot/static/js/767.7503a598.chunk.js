"use strict";
(self.webpackChunkclient = self.webpackChunkclient || []).push([[767], {
    3156: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return i
            }
        });
        var a = n(2791), r = n(6474), l = n(741);

        function i() {
            var e = (0, r.CG)(l.g0.selectAll), t = (0, r.CG)((function (e) {
                return e.shop
            })).shop, n = (0, r.CG)((function (e) {
                return e.products
            })), i = n.productsLoaded, s = n.categoriesLoaded, o = n.categories, c = n.metaData, u = (0, r.TL)();
            return (0, a.useEffect)((function () {
                t && !i && u((0, l.$$)())
            }), [u, i, t]), (0, a.useEffect)((function () {
                s || u((0, l.uw)())
            }), [u, s]), {products: e, productsLoaded: i, categoriesLoaded: s, categories: o, metaData: c}
        }
    }, 2999: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return f
            }
        });
        var a = n(885), r = n(6285), l = n(4673), i = n(2791), s = n(6048), o = n.n(s), c = n(184);

        function u(e) {
            var t = e.metaData, n = e.onPageChange, s = t.currentPage, u = t.totalCount, d = t.totalPages,
                f = t.pageSize, x = (0, i.useState)(s), m = (0, a.Z)(x, 2), h = m[0], p = m[1];

            function v(e) {
                p(e), n(e)
            }

            return (0, c.jsx)("div", {
                className: "h-auto w-full border-b-4 border-b-stone-400 px-5 pt-1",
                children: t && (0, c.jsxs)("div", {
                    className: "flex flex-col items-center justify-between gap-y-2 lg:flex-row lg:gap-y-0",
                    children: [(0, c.jsxs)("p", {
                        className: "font-Primary text-lg font-thin lg:text-xl",
                        children: ["Affichage de ", (s - 1) * f + 1, " ", " \xe0 ", s * f > u ? u : s * f, " ", "sur ", u, " articles"]
                    }), t && (0, c.jsx)(o(), {
                        forcePage: h,
                        className: "flex w-auto flex-row items-center gap-x-3 py-2 ",
                        pageClassName: "font-thin",
                        activeClassName: "font-normal bg-stone-500 rounded-md text-stone-100",
                        pageLinkClassName: "p-2 font-Primary  text-inherit text-xl",
                        breakLabel: "...",
                        nextLabel: (0, c.jsx)(r.Z, {className: "h-6 w-6"}),
                        onPageChange: function (e) {
                            v(e.selected)
                        },
                        pageRangeDisplayed: 3,
                        pageCount: d,
                        previousLabel: (0, c.jsx)(l.Z, {className: "h-6 w-6"})
                    })]
                })
            })
        }

        var d = n(5068);

        function f(e) {
            var t = e.title, n = e.list, a = e.header, r = e.stats, l = e.actionButton, i = e.filters, s = e.metaData,
                o = e.className, f = e.onPageChange;
            return (0, c.jsxs)(d.Z, {
                className: " ".concat(o, " ax-h-full flex flex-col items-stretch  gap-y-4 md:gap-y-5 "),
                children: [(t || l) && (0, c.jsxs)("div", {
                    className: "mb-5 flex w-full flex-col items-center justify-start gap-y-5 md:flex-row md:items-center md:justify-between ",
                    children: [t && (0, c.jsx)("h1", {
                        className: " font-Primary text-4xl font-thin capitalize lg:text-5xl",
                        children: t
                    }), l && (0, c.jsx)("div", {children: l})]
                }), a && (0, c.jsx)("div", {children: a}), r && (0, c.jsx)("div", {
                    className: "flex flex-initial flex-col items-center justify-center gap-4 rounded-md border-y border-stone-300  py-3 md:flex-row  ",
                    children: r.length > 0 && (0, c.jsx)("div", {
                        className: " grid w-full py-2 px-4 md:w-auto md:p-0 lg:grid-flow-col lg:gap-5",
                        children: r.map((function (e, t) {
                            return (0, c.jsx)(x, {title: e.title, value: e.value}, t)
                        }))
                    })
                }), i && (0, c.jsx)("div", {
                    className: "flex-initial",
                    children: i
                }), (0, c.jsx)("div", {
                    className: "flex-auto overflow-y-auto pr-3",
                    children: n
                }), s && (0, c.jsx)("div", {
                    className: "flex-initial",
                    children: (0, c.jsx)(u, {metaData: s, onPageChange: f})
                })]
            })
        }

        function x(e) {
            var t = e.title, n = e.value;
            return (0, c.jsxs)("div", {
                className: "flex w-full items-end justify-between gap-x-4 lg:flex-row  lg:justify-end lg:px-5",
                children: [(0, c.jsx)("p", {
                    className: " font-Secondary text-base uppercase",
                    children: t
                }), "string" === typeof n ? (0, c.jsx)("p", {
                    className: " font-Primary text-lg uppercase lg:text-4xl",
                    children: n
                }) : (0, c.jsx)("div", {className: "font-Primary text-lg uppercase lg:text-4xl", children: n})]
            })
        }
    }, 7281: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return l
            }
        });
        var a = n(7941), r = n(184);

        function l(e) {
            var t = e.label, n = e.items, l = e.selectedValue, i = e.Icon, s = e.onChange;
            var o = function (e) {
                return l === e
            };
            return (0, r.jsxs)("div", {
                className: "flex h-full flex-row items-center gap-x-3",
                children: [t && (0, r.jsx)("div", {
                    className: "flex-initial",
                    children: (0, r.jsx)("p", {
                        className: "w-max flex-initial overflow-hidden border-r  border-stone-400  pr-2 text-sm uppercase opacity-50  hover:text-yellow-900",
                        children: t
                    })
                }), (0, r.jsx)("div", {
                    className: " grid flex-auto grid-flow-col gap-2",
                    children: n.map((function (e, n) {
                        return (0, r.jsxs)("button", {
                            type: "button",
                            className: "relative inline-flex  items-center justify-center gap-x-2 rounded-md bg-stone-300 py-1  px-2  ".concat(o(e.value) ? " text-stone-700" : "  text-inherit"),
                            onClick: function () {
                                return function (e) {
                                    s(e)
                                }(e)
                            },
                            children: [o(e.value) && (0, r.jsx)(a.E.div, {
                                layoutId: "".concat(t, "Highlight"),
                                className: " absolute top-0 left-0 right-0 bottom-0 z-[1] rounded-md bg-yellow-500"
                            }), i && (0, r.jsx)(i, {className: "  z-[2] h-5 w-5 text-inherit"}), (0, r.jsx)("span", {
                                className: " relative z-[2] font-Primary text-lg font-thin capitalize",
                                children: e.title
                            })]
                        }, n)
                    }))
                })]
            })
        }
    }, 4760: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return o
            }
        });
        var a = n(885), r = n(2791);
        var l = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"}))
        })), i = n(7281), s = n(184);

        function o(e) {
            var t = e.onChange, n = (0, r.useState)(20), o = (0, a.Z)(n, 2), u = o[0], d = o[1];

            function f(e) {
                d(e), t(e)
            }

            return (0, s.jsx)(i.Z, {
                label: "Page", items: c, Icon: l, selectedValue: u, onChange: function (e) {
                    return f(e.value)
                }
            })
        }

        var c = [{title: "20", value: 20}, {title: "50", value: 50}, {title: "100", value: 100}]
    }, 2604: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return c
            }
        });
        var a = n(885), r = n(4499), l = n(7866), i = n(2791), s = n(5694), o = n(184);

        function c(e) {
            var t = e.initialValue, n = e.onSearch, c = (0, i.useState)(t || ""), u = (0, a.Z)(c, 2), d = u[0],
                f = u[1];
            return (0, i.useEffect)((function () {
                var e = setTimeout((function () {
                    n(d)
                }), 1e3);
                return function () {
                    clearTimeout(e)
                }
            }), [d]), (0, o.jsxs)("div", {
                className: " flex w-full flex-row items-center rounded-lg  border border-stone-400 bg-stone-300 px-4 xl:max-w-sm",
                children: [(0, o.jsx)("div", {children: (0, o.jsx)(r.Z, {className: "h-6 w-6"})}), (0, o.jsx)(s.Z, {
                    inputStyles: " border-none px-0",
                    className: " w-full border-none bg-transparent px-0 py-0 pl-0",
                    type: "text",
                    label: "",
                    placeholder: "Rechercher un article",
                    value: d,
                    onEnter: function (e) {
                        return n(e)
                    },
                    onChange: function (e) {
                        f(e)
                    },
                    button: d && (0, o.jsx)("button", {
                        type: "button", onClick: function () {
                            return f("")
                        }, children: (0, o.jsx)(l.Z, {className: "h-5 w-5 opacity-50"})
                    })
                })]
            })
        }
    }, 8268: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return c
            }
        });
        var a = n(885), r = n(2791);
        var l = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {d: "M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"}))
        }));
        var i = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {d: "M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"}))
        })), s = n(9179), o = n(184);

        function c(e) {
            var t = e.items, n = e.initialValue, c = e.onSort, u = (0, r.useState)(!0), d = (0, a.Z)(u, 2), f = d[0],
                x = d[1], m = (0, r.useState)("Asc"), h = (0, a.Z)(m, 2), p = h[0], v = h[1],
                g = (0, r.useState)(n || ""), w = (0, a.Z)(g, 2), b = w[0], y = w[1];
            return (0, o.jsx)(s.Z, {
                label: "Trier par",
                className: "flex-auto py-1",
                buttonStyle: " border-none px-0  ",
                items: t,
                selectedValue: b,
                onChange: function (e) {
                    var t;
                    y(e.value), t = e.value, c("".concat(t).concat("Desc" === p ? "Desc" : ""))
                },
                button: (0, o.jsx)("button", {
                    className: "h-full w-full flex items-center justify-center px-2",
                    type: "button",
                    title: "Ordre ".concat(f ? "Ascendant" : "Descendant"),
                    onClick: function () {
                        var e, t = !f;
                        x(t), v(t ? "Asc" : "Desc"), e = t ? "Asc" : "Desc", c("".concat(b).concat("Desc" === e ? "Desc" : ""))
                    },
                    children: f ? (0, o.jsx)(l, {className: "h-6 w-6"}) : (0, o.jsx)(i, {className: "h-6 w-6"})
                })
            })
        }
    }, 1359: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return s
            }
        });
        var a = n(885), r = n(2791);
        var l = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z",
                clipRule: "evenodd"
            }))
        })), i = n(184);

        function s(e) {
            var t = e.title, n = e.children, s = e.className, o = e.contentStyles, c = (0, r.useState)(!1),
                u = (0, a.Z)(c, 2), d = u[0], f = u[1];
            return (0, i.jsxs)(i.Fragment, {
                children: [(0, i.jsxs)("button", {
                    type: "button",
                    className: s + " flex w-full flex-row items-center rounded px-3 py-1 md:hidden ",
                    onClick: function () {
                        return f((function (e) {
                            return !e
                        }))
                    },
                    children: [(0, i.jsx)(l, {className: "mr-2 h-6 w-6"}), (0, i.jsx)("span", {
                        className: " font-Primary text-xl font-light uppercase",
                        children: t
                    })]
                }), (0, i.jsx)("div", {
                    className: " py-5 md:py-0 ".concat(d ? "block md:block" : " hidden md:block", "  ").concat(o),
                    children: n
                })]
            })
        }
    }, 8663: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return r
            }
        });
        var a = n(184);

        function r(e) {
            var t = e.label, n = e.element, r = e.button, l = e.className;
            return (0, a.jsxs)("div", {
                className: " relative flex flex-row items-stretch  rounded-lg border border-stone-400 bg-stone-300 pl-4 ".concat(l),
                children: [(0, a.jsxs)("label", {
                    className: "flex w-full flex-auto flex-row items-center gap-x-2 ",
                    children: [(0, a.jsx)("div", {
                        className: "flex-initial",
                        children: t && (0, a.jsx)("p", {
                            className: " w-full min-w-[4rem] border-r border-stone-400  pr-2 text-sm uppercase  hover:text-yellow-900",
                            children: t
                        })
                    }), (0, a.jsx)("div", {className: "flex-auto", children: n})]
                }), (0, a.jsx)("div", {className: "flex flex-initial items-stretch", children: !!r && r})]
            })
        }
    }, 3284: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return i
            }
        });
        var a = n(7941), r = n(184), l = "font-thin font-Primary uppercase text-lg border border-stone-400 py-1 ";

        function i(e) {
            var t = e.headers, n = e.children, i = e.fixed, o = void 0 !== i && i;
            return (0, r.jsxs)(a.E.table, {
                variants: s,
                initial: "hidden",
                animate: "show",
                exit: "close",
                className: "w-full border-collapse ".concat(o ? "table-fixed" : "table-auto"),
                children: [(0, r.jsx)("thead", {
                    className: "hidden border border-stone-700 bg-stone-400 text-center text-stone-900 drop-shadow-md md:table-header-group ",
                    children: (0, r.jsx)("tr", {
                        children: t.map((function (e, t) {
                            return (0, r.jsx)("th", {className: l, children: e}, t)
                        }))
                    })
                }), (0, r.jsx)("tbody", {className: " grid gap-y-2 md:table-row-group", children: n})]
            })
        }

        var s = {hidden: {opacity: 1}, show: {opacity: 1, transition: {staggerChildren: .2}}, close: {}}
    }, 4517: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return i
            }
        });
        var a = n(7941), r = n(184);

        function l(e) {
            var t = e.align, n = void 0 === t ? "left" : t, a = e.title, l = e.value, i = e.className;
            return (0, r.jsxs)("td", {
                align: n,
                className: "inline-flex h-full w-full items-end justify-between px-0 py-1 md:table-cell md:w-auto md:border md:border-stone-400 md:px-5  ".concat(i),
                children: [(0, r.jsx)("span", {
                    className: "block font-Primary text-base font-thin uppercase md:hidden",
                    children: a
                }), (0, r.jsx)("div", {
                    className: " whitespace-pre-line font-Secondary text-base font-light capitalize",
                    children: l
                })]
            })
        }

        function i(e) {
            var t = e.cells, n = e.onClick;
            return (0, r.jsx)(a.E.tr, {
                layout: !0,
                variants: s,
                onClick: function () {
                    n && n()
                },
                className: "grid gap-y-0 rounded-2xl border border-stone-100 bg-stone-300 py-2 px-5 text-stone-700 md:table-row ".concat(n && "cursor-pointer hover:bg-yellow-500  hover:text-stone-700 "),
                children: t.map((function (e, t) {
                    return (0, r.jsx)(l, {title: e.title, value: e.value, align: e.align}, t)
                }))
            })
        }

        var s = {hidden: {x: -30, opacity: 0}, show: {x: 0, opacity: 1}, close: {x: 30, opacity: 0}}
    }, 5694: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return o
            }
        });
        var a = n(1413), r = n(4925), l = n(8663), i = n(184),
            s = ["className", "initialValue", "inputStyles", "onChange", "onEnter", "button"];

        function o(e) {
            var t = e.className, n = (e.initialValue, e.inputStyles), o = e.onChange, c = e.onEnter, u = e.button,
                d = (0, r.Z)(e, s);
            return (0, i.jsx)(l.Z, {
                className: t,
                label: d.label,
                element: (0, i.jsx)("input", (0, a.Z)((0, a.Z)({
                    onKeyDown: function (e) {
                        c && "Enter" === e.key && c(e.target.value)
                    },
                    className: "".concat(n, " form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-stone-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none "),
                    "aria-label": d.label,
                    type: d.type
                }, d), {}, {
                    onChange: function (e) {
                        var t = e.target;
                        return o(t.value)
                    }
                })),
                button: u
            })
        }
    }, 9179: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return f
            }
        });
        var a = n(885), r = n(7845), l = n(6285), i = n(1856), s = n(7941), o = n(2791), c = n(1417), u = n(8663),
            d = n(184);

        function f(e) {
            var t, n, f = e.label, x = e.items, m = e.buttonStyle, h = e.selectedValue, p = e.disabled, v = e.button,
                g = e.onChange, w = (0, o.useRef)(null), b = (0, o.useState)(!1), y = (0, a.Z)(b, 2), j = y[0],
                N = y[1], Z = function () {
                    return x.find((function (e) {
                        return e.value === h
                    }))
                };
            return (0, c.O)(w, (function () {
                return N(!1)
            })), (0, d.jsx)("div", {
                ref: w, children: (0, d.jsx)(u.Z, {
                    button: v, label: f, element: (0, d.jsxs)("div", {
                        children: [(0, d.jsxs)("button", {
                            disabled: p,
                            className: "flex w-full flex-row items-center justify-between overflow-hidden  py-2 px-3 ".concat(m),
                            type: "button",
                            onClick: function () {
                                return N((function (e) {
                                    return !e
                                }))
                            },
                            children: [(0, d.jsx)(i.M, {
                                exitBeforeEnter: !0,
                                children: (0, d.jsx)(s.E.p, {
                                    initial: {opacity: 0, y: 30},
                                    animate: {opacity: 1, y: 0},
                                    exit: {opacity: 0, y: -30},
                                    className: "w-full flex-auto text-left font-Secondary first-letter:uppercase ",
                                    children: null === (n = Z()) || void 0 === n ? void 0 : n.title
                                }, null === (t = Z()) || void 0 === t ? void 0 : t.title)
                            }), (0, d.jsx)(r.Z, {className: "h-6 w-6 flex-initial transition-all duration-300 ".concat(j ? "rotate-180" : "rotate-0")})]
                        }), (0, d.jsx)(i.M, {
                            exitBeforeEnter: !0,
                            children: j && (0, d.jsx)(s.E.div, {
                                initial: {opacity: 0, y: -30},
                                animate: {opacity: 1, y: 0},
                                exit: {opacity: 0, y: -30},
                                layout: !0,
                                className: "absolute left-0 z-20 mt-3 w-full  min-w-[16rem] max-w-xl rounded-xl  border  border-stone-300 bg-stone-200 py-2 px-4 drop-shadow-md",
                                children: (0, d.jsx)("ul", {
                                    className: "list-none", children: x.map((function (e, t) {
                                        var n;
                                        return (0, d.jsx)("li", {
                                            className: " list-item rounded py-1 px-3 hover:bg-yellow-500 hover:text-stone-100",
                                            children: (0, d.jsxs)("button", {
                                                className: "flex w-full flex-row items-center  text-left font-Secondary capitalize",
                                                type: "button",
                                                onClick: function () {
                                                    return function (e) {
                                                        g(e), N(!1)
                                                    }(e)
                                                },
                                                children: [(0, d.jsx)("div", {
                                                    className: "mr-1 h-6 w-6",
                                                    children: (null === (n = Z()) || void 0 === n ? void 0 : n.value) === e.value && (0, d.jsx)(l.Z, {className: "h-6 w-6"})
                                                }), e.title]
                                            })
                                        }, t)
                                    }))
                                })
                            }, "menu")
                        })]
                    })
                })
            })
        }
    }, 7585: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return c
            }
        });
        var a = n(741), r = n(6474), l = n(4760), i = n(2604), s = n(8268), o = n(184);

        function c() {
            var e = (0, r.CG)((function (e) {
                return e.products
            })).productParams, t = (0, r.TL)();
            return (0, o.jsxs)("div", {
                className: " flex w-full flex-col items-end justify-start gap-5 lg:flex-row lg:justify-between",
                children: [(0, o.jsx)(i.Z, {
                    onSearch: function (n) {
                        n !== e.searchTerm && t((0, a.X3)({searchTerm: n}))
                    }, initialValue: e.searchTerm
                }), (0, o.jsxs)("div", {
                    className: "grid w-full  grid-cols-1 items-end gap-5 md:grid-cols-2 lg:max-w-2xl",
                    children: [(0, o.jsx)(s.Z, {
                        items: u, onSort: function (e) {
                            t((0, a.X3)({orderBy: e}))
                        }, initialValue: "name"
                    }), (0, o.jsx)(l.Z, {
                        onChange: function (e) {
                            t((0, a.U5)(e))
                        }
                    })]
                })]
            })
        }

        var u = [{title: "D\xe9signation", value: "name"}, {title: "Cat\xe9gorie", value: "category"}, {
            title: "Stock",
            value: "inventory"
        }, {title: "Prix", value: "price"}, {title: "Vente", value: "sold"}]
    }, 5767: function (e, t, n) {
        n.r(t), n.d(t, {
            default: function () {
                return g
            }
        });
        var a = n(4165), r = n(5861), l = n(3156), i = n(2999), s = n(741), o = n(6474), c = n(1359), u = n(1951),
            d = n(6871), f = n(7066), x = n(3284), m = n(4517), h = n(184);

        function p(e) {
            var t = e.products, n = void 0 === t ? [] : t, a = (0, d.TH)().pathname, r = (0, d.s0)();
            return (0, h.jsx)(x.Z, {
                headers: ["D\xe9signation", "Cat\xe9gorie", "Quantit\xe9", "Qt\xe9 Vendu", "Stock", "P\xe9remption"],
                children: n.map((function (e) {
                    return (0, h.jsx)(m.Z, {
                        cells: [{title: "D\xe9signation", value: e.name}, {
                            title: "Cat\xe9gorie",
                            value: e.category,
                            align: "left"
                        }, {
                            title: "Quantit\xe9",
                            value: e.useInventory ? e.quantity : "N/A",
                            align: "center"
                        }, {title: "Qt\xe9 Vendu", value: e.soldQuantity, align: "center"}, {
                            title: "Stock",
                            value: e.useInventory ? e.inventory : "N/A",
                            align: "center"
                        }, {
                            title: "P\xe9remption",
                            value: e.expiryDate ? (0, u.default)(new Date(e.expiryDate), "PP", {locale: f.SP}) : "N/A",
                            align: "center"
                        }], onClick: function () {
                            return r("/management/products/".concat(e.id), {state: {from: a}})
                        }
                    }, e.id)
                }))
            })
        }

        var v = n(7585);

        function g() {
            var e = (0, o.TL)(), t = (0, l.Z)(), n = t.products, u = t.metaData;

            function d() {
                return (d = (0, r.Z)((0, a.Z)().mark((function t(n) {
                    return (0, a.Z)().wrap((function (t) {
                        for (; ;) switch (t.prev = t.next) {
                            case 0:
                                e((0, s.oW)(n));
                            case 1:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }

            return (0, h.jsx)(i.Z, {
                title: "Inventaire",
                list: (0, h.jsx)(p, {products: n}),
                filters: (0, h.jsx)(c.Z, {title: "Filtres", children: (0, h.jsx)(v.Z, {})}),
                metaData: u,
                onPageChange: function (e) {
                    return d.apply(this, arguments)
                }
            })
        }
    }, 7845: function (e, t, n) {
        var a = n(2791);
        var r = a.forwardRef((function (e, t) {
            return a.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), a.createElement("path", {
                fillRule: "evenodd",
                d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = r
    }, 7866: function (e, t, n) {
        var a = n(2791);
        var r = a.forwardRef((function (e, t) {
            return a.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), a.createElement("path", {
                fillRule: "evenodd",
                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = r
    }
}]);
//# sourceMappingURL=767.7503a598.chunk.js.map
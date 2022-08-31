"use strict";
(self.webpackChunkclient = self.webpackChunkclient || []).push([[490], {
    2999: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return f
            }
        });
        var a = n(885), l = n(6285), r = n(4673), i = n(2791), o = n(6048), s = n.n(o), c = n(184);

        function u(e) {
            var t = e.metaData, n = e.onPageChange, o = t.currentPage, u = t.totalCount, d = t.totalPages,
                f = t.pageSize, x = (0, i.useState)(o), m = (0, a.Z)(x, 2), p = m[0], h = m[1];

            function v(e) {
                h(e), n(e)
            }

            return (0, c.jsx)("div", {
                className: "h-auto w-full border-b-4 border-b-stone-400 px-5 pt-1",
                children: t && (0, c.jsxs)("div", {
                    className: "flex flex-col items-center justify-between gap-y-2 lg:flex-row lg:gap-y-0",
                    children: [(0, c.jsxs)("p", {
                        className: "font-Primary text-lg font-thin lg:text-xl",
                        children: ["Affichage de ", (o - 1) * f + 1, " ", " \xe0 ", o * f > u ? u : o * f, " ", "sur ", u, " articles"]
                    }), t && (0, c.jsx)(s(), {
                        forcePage: p,
                        className: "flex w-auto flex-row items-center gap-x-3 py-2 ",
                        pageClassName: "font-thin",
                        activeClassName: "font-normal bg-stone-500 rounded-md text-stone-100",
                        pageLinkClassName: "p-2 font-Primary  text-inherit text-xl",
                        breakLabel: "...",
                        nextLabel: (0, c.jsx)(l.Z, {className: "h-6 w-6"}),
                        onPageChange: function (e) {
                            v(e.selected)
                        },
                        pageRangeDisplayed: 3,
                        pageCount: d,
                        previousLabel: (0, c.jsx)(r.Z, {className: "h-6 w-6"})
                    })]
                })
            })
        }

        var d = n(5068);

        function f(e) {
            var t = e.title, n = e.list, a = e.header, l = e.stats, r = e.actionButton, i = e.filters, o = e.metaData,
                s = e.className, f = e.onPageChange;
            return (0, c.jsxs)(d.Z, {
                className: " ".concat(s, " ax-h-full flex flex-col items-stretch  gap-y-4 md:gap-y-5 "),
                children: [(t || r) && (0, c.jsxs)("div", {
                    className: "mb-5 flex w-full flex-col items-center justify-start gap-y-5 md:flex-row md:items-center md:justify-between ",
                    children: [t && (0, c.jsx)("h1", {
                        className: " font-Primary text-4xl font-thin capitalize lg:text-5xl",
                        children: t
                    }), r && (0, c.jsx)("div", {children: r})]
                }), a && (0, c.jsx)("div", {children: a}), l && (0, c.jsx)("div", {
                    className: "flex flex-initial flex-col items-center justify-center gap-4 rounded-md border-y border-stone-300  py-3 md:flex-row  ",
                    children: l.length > 0 && (0, c.jsx)("div", {
                        className: " grid w-full py-2 px-4 md:w-auto md:p-0 lg:grid-flow-col lg:gap-5",
                        children: l.map((function (e, t) {
                            return (0, c.jsx)(x, {title: e.title, value: e.value}, t)
                        }))
                    })
                }), i && (0, c.jsx)("div", {
                    className: "flex-initial",
                    children: i
                }), (0, c.jsx)("div", {
                    className: "flex-auto overflow-y-auto pr-3",
                    children: n
                }), o && (0, c.jsx)("div", {
                    className: "flex-initial",
                    children: (0, c.jsx)(u, {metaData: o, onPageChange: f})
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
    }, 717: function (e, t, n) {
        function a(e) {
            return 0 === e ? 0 : e.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

        n.d(t, {
            u: function () {
                return a
            }
        })
    }, 7281: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return r
            }
        });
        var a = n(7941), l = n(184);

        function r(e) {
            var t = e.label, n = e.items, r = e.selectedValue, i = e.Icon, o = e.onChange;
            var s = function (e) {
                return r === e
            };
            return (0, l.jsxs)("div", {
                className: "flex h-full flex-row items-center gap-x-3",
                children: [t && (0, l.jsx)("div", {
                    className: "flex-initial",
                    children: (0, l.jsx)("p", {
                        className: "w-max flex-initial overflow-hidden border-r  border-stone-400  pr-2 text-sm uppercase opacity-50  hover:text-yellow-900",
                        children: t
                    })
                }), (0, l.jsx)("div", {
                    className: " grid flex-auto grid-flow-col gap-2",
                    children: n.map((function (e, n) {
                        return (0, l.jsxs)("button", {
                            type: "button",
                            className: "relative inline-flex  items-center justify-center gap-x-2 rounded-md bg-stone-300 py-1  px-2  ".concat(s(e.value) ? " text-stone-700" : "  text-inherit"),
                            onClick: function () {
                                return function (e) {
                                    o(e)
                                }(e)
                            },
                            children: [s(e.value) && (0, l.jsx)(a.E.div, {
                                layoutId: "".concat(t, "Highlight"),
                                className: " absolute top-0 left-0 right-0 bottom-0 z-[1] rounded-md bg-yellow-500"
                            }), i && (0, l.jsx)(i, {className: "  z-[2] h-5 w-5 text-inherit"}), (0, l.jsx)("span", {
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
                return s
            }
        });
        var a = n(885), l = n(2791);
        var r = l.forwardRef((function (e, t) {
            return l.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), l.createElement("path", {d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"}))
        })), i = n(7281), o = n(184);

        function s(e) {
            var t = e.onChange, n = (0, l.useState)(20), s = (0, a.Z)(n, 2), u = s[0], d = s[1];

            function f(e) {
                d(e), t(e)
            }

            return (0, o.jsx)(i.Z, {
                label: "Page", items: c, Icon: r, selectedValue: u, onChange: function (e) {
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
        var a = n(885), l = n(4499), r = n(7866), i = n(2791), o = n(5694), s = n(184);

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
            }), [d]), (0, s.jsxs)("div", {
                className: " flex w-full flex-row items-center rounded-lg  border border-stone-400 bg-stone-300 px-4 xl:max-w-sm",
                children: [(0, s.jsx)("div", {children: (0, s.jsx)(l.Z, {className: "h-6 w-6"})}), (0, s.jsx)(o.Z, {
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
                    button: d && (0, s.jsx)("button", {
                        type: "button", onClick: function () {
                            return f("")
                        }, children: (0, s.jsx)(r.Z, {className: "h-5 w-5 opacity-50"})
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
        var a = n(885), l = n(2791);
        var r = l.forwardRef((function (e, t) {
            return l.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), l.createElement("path", {d: "M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"}))
        }));
        var i = l.forwardRef((function (e, t) {
            return l.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), l.createElement("path", {d: "M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"}))
        })), o = n(9179), s = n(184);

        function c(e) {
            var t = e.items, n = e.initialValue, c = e.onSort, u = (0, l.useState)(!0), d = (0, a.Z)(u, 2), f = d[0],
                x = d[1], m = (0, l.useState)("Asc"), p = (0, a.Z)(m, 2), h = p[0], v = p[1],
                g = (0, l.useState)(n || ""), b = (0, a.Z)(g, 2), w = b[0], y = b[1];
            return (0, s.jsx)(o.Z, {
                label: "Trier par",
                className: "flex-auto py-1",
                buttonStyle: " border-none px-0  ",
                items: t,
                selectedValue: w,
                onChange: function (e) {
                    var t;
                    y(e.value), t = e.value, c("".concat(t).concat("Desc" === h ? "Desc" : ""))
                },
                button: (0, s.jsx)("button", {
                    className: "h-full w-full flex items-center justify-center px-2",
                    type: "button",
                    title: "Ordre ".concat(f ? "Ascendant" : "Descendant"),
                    onClick: function () {
                        var e, t = !f;
                        x(t), v(t ? "Asc" : "Desc"), e = t ? "Asc" : "Desc", c("".concat(w).concat("Desc" === e ? "Desc" : ""))
                    },
                    children: f ? (0, s.jsx)(r, {className: "h-6 w-6"}) : (0, s.jsx)(i, {className: "h-6 w-6"})
                })
            })
        }
    }, 1359: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return o
            }
        });
        var a = n(885), l = n(2791);
        var r = l.forwardRef((function (e, t) {
            return l.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), l.createElement("path", {
                fillRule: "evenodd",
                d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z",
                clipRule: "evenodd"
            }))
        })), i = n(184);

        function o(e) {
            var t = e.title, n = e.children, o = e.className, s = e.contentStyles, c = (0, l.useState)(!1),
                u = (0, a.Z)(c, 2), d = u[0], f = u[1];
            return (0, i.jsxs)(i.Fragment, {
                children: [(0, i.jsxs)("button", {
                    type: "button",
                    className: o + " flex w-full flex-row items-center rounded px-3 py-1 md:hidden ",
                    onClick: function () {
                        return f((function (e) {
                            return !e
                        }))
                    },
                    children: [(0, i.jsx)(r, {className: "mr-2 h-6 w-6"}), (0, i.jsx)("span", {
                        className: " font-Primary text-xl font-light uppercase",
                        children: t
                    })]
                }), (0, i.jsx)("div", {
                    className: " py-5 md:py-0 ".concat(d ? "block md:block" : " hidden md:block", "  ").concat(s),
                    children: n
                })]
            })
        }
    }, 8663: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return l
            }
        });
        var a = n(184);

        function l(e) {
            var t = e.label, n = e.element, l = e.button, r = e.className;
            return (0, a.jsxs)("div", {
                className: " relative flex flex-row items-stretch  rounded-lg border border-stone-400 bg-stone-300 pl-4 ".concat(r),
                children: [(0, a.jsxs)("label", {
                    className: "flex w-full flex-auto flex-row items-center gap-x-2 ",
                    children: [(0, a.jsx)("div", {
                        className: "flex-initial",
                        children: t && (0, a.jsx)("p", {
                            className: " w-full min-w-[4rem] border-r border-stone-400  pr-2 text-sm uppercase  hover:text-yellow-900",
                            children: t
                        })
                    }), (0, a.jsx)("div", {className: "flex-auto", children: n})]
                }), (0, a.jsx)("div", {className: "flex flex-initial items-stretch", children: !!l && l})]
            })
        }
    }, 6227: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var a = n(8155), l = n(1856), r = n(7941), i = n(2791), o = n(4164), s = n(1417), c = n(184);

        function u(e) {
            var t = e.title, n = e.active, u = e.children, x = e.containerStyle, m = e.contentStyle, p = e.onClose,
                h = (0, i.useRef)(null);
            return (0, s.O)(h, (function () {
                p && p()
            })), o.createPortal((0, c.jsx)(l.M, {
                children: n && (0, c.jsx)(r.E.div, {
                    variants: d,
                    initial: "hidden",
                    animate: "open",
                    exit: "close",
                    className: "fixed top-0 left-0 z-50 h-screen w-screen select-none items-center justify-center overscroll-none bg-stone-900 bg-opacity-80 backdrop-blur md:flex",
                    children: (0, c.jsxs)(r.E.div, {
                        ref: h,
                        layout: !0,
                        variants: f,
                        className: "".concat(x, " in-h-[20rem] flex max-h-screen w-auto max-w-screen-xl flex-col items-stretch  rounded bg-stone-200 md:min-w-[32rem]"),
                        children: [(0, c.jsxs)("div", {
                            className: " z-10 flex w-full flex-initial flex-row items-center justify-between border-b border-b-stone-400 bg-stone-600 px-6 py-2 text-stone-400 drop-shadow-md",
                            children: [(0, c.jsx)("p", {
                                className: " font-Primary text-2xl font-light uppercase",
                                children: t
                            }), p && (0, c.jsx)("button", {
                                type: "button",
                                title: "Fermer",
                                onClick: p,
                                children: (0, c.jsx)(a.Z, {className: " h-7 w-7"})
                            })]
                        }), (0, c.jsx)("div", {
                            className: "".concat(m, "  flex-auto overflow-y-auto bg-stone-200 p-5 text-stone-700"),
                            children: u
                        })]
                    })
                })
            }), document.querySelector("#modal"))
        }

        var d = {
            hidden: {opacity: 0},
            open: {opacity: 1, transition: {staggerChildren: .2, delayChildren: .4}},
            close: {opacity: 0, transition: {delay: .3}}
        }, f = {hidden: {opacity: 0, x: -100}, open: {opacity: 1, x: 0}, close: {opacity: 0, x: 100}}
    }, 3284: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return i
            }
        });
        var a = n(7941), l = n(184), r = "font-thin font-Primary uppercase text-lg border border-stone-400 py-1 ";

        function i(e) {
            var t = e.headers, n = e.children, i = e.fixed, s = void 0 !== i && i;
            return (0, l.jsxs)(a.E.table, {
                variants: o,
                initial: "hidden",
                animate: "show",
                exit: "close",
                className: "w-full border-collapse ".concat(s ? "table-fixed" : "table-auto"),
                children: [(0, l.jsx)("thead", {
                    className: "hidden border border-stone-700 bg-stone-400 text-center text-stone-900 drop-shadow-md md:table-header-group ",
                    children: (0, l.jsx)("tr", {
                        children: t.map((function (e, t) {
                            return (0, l.jsx)("th", {className: r, children: e}, t)
                        }))
                    })
                }), (0, l.jsx)("tbody", {className: " grid gap-y-2 md:table-row-group", children: n})]
            })
        }

        var o = {hidden: {opacity: 1}, show: {opacity: 1, transition: {staggerChildren: .2}}, close: {}}
    }, 4517: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return i
            }
        });
        var a = n(7941), l = n(184);

        function r(e) {
            var t = e.align, n = void 0 === t ? "left" : t, a = e.title, r = e.value, i = e.className;
            return (0, l.jsxs)("td", {
                align: n,
                className: "inline-flex h-full w-full items-end justify-between px-0 py-1 md:table-cell md:w-auto md:border md:border-stone-400 md:px-5  ".concat(i),
                children: [(0, l.jsx)("span", {
                    className: "block font-Primary text-base font-thin uppercase md:hidden",
                    children: a
                }), (0, l.jsx)("div", {
                    className: " whitespace-pre-line font-Secondary text-base font-light capitalize",
                    children: r
                })]
            })
        }

        function i(e) {
            var t = e.cells, n = e.onClick;
            return (0, l.jsx)(a.E.tr, {
                layout: !0,
                variants: o,
                onClick: function () {
                    n && n()
                },
                className: "grid gap-y-0 rounded-2xl border border-stone-100 bg-stone-300 py-2 px-5 text-stone-700 md:table-row ".concat(n && "cursor-pointer hover:bg-yellow-500  hover:text-stone-700 "),
                children: t.map((function (e, t) {
                    return (0, l.jsx)(r, {title: e.title, value: e.value, align: e.align}, t)
                }))
            })
        }

        var o = {hidden: {x: -30, opacity: 0}, show: {x: 0, opacity: 1}, close: {x: 30, opacity: 0}}
    }, 5694: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return s
            }
        });
        var a = n(1413), l = n(4925), r = n(8663), i = n(184),
            o = ["className", "initialValue", "inputStyles", "onChange", "onEnter", "button"];

        function s(e) {
            var t = e.className, n = (e.initialValue, e.inputStyles), s = e.onChange, c = e.onEnter, u = e.button,
                d = (0, l.Z)(e, o);
            return (0, i.jsx)(r.Z, {
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
                        return s(t.value)
                    }
                })),
                button: u
            })
        }
    }, 2887: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return p
            }
        });
        var a = n(4165), l = n(1413), r = n(5861), i = n(9877), o = n(2791), s = n(1134), c = n(260), u = n(2797),
            d = u.Ry({
                name: u.Z_().min(4).max(255).required(),
                phone: u.Z_().max(255).optional().nullable(),
                mobile: u.Z_().max(255).optional().nullable(),
                email: u.Z_().email().max(255).optional().nullable(),
                address1: u.Z_().max(255).optional().nullable(),
                address2: u.Z_().optional().optional().nullable()
            }), f = n(2996), x = n(8544), m = n(184);

        function p(e) {
            var t = e.type, n = e.shopAgent, u = e.onClose, p = !!n,
                h = (0, s.cI)({mode: "all", resolver: (0, i.X)(d)}), v = h.control, g = h.handleSubmit, b = h.reset,
                w = h.formState, y = w.isSubmitting, j = w.isDirty, N = w.isValid;

            function Z() {
                return (Z = (0, r.Z)((0, a.Z)().mark((function e(r) {
                    var i;
                    return (0, a.Z)().wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (i = null, e.prev = 1, !p) {
                                    e.next = 8;
                                    break
                                }
                                return e.next = 5, c.Z.Agents.update(n.id, r);
                            case 5:
                                i = e.sent, e.next = 11;
                                break;
                            case 8:
                                return e.next = 10, c.Z.Agents.create((0, l.Z)((0, l.Z)({}, r), {}, {type: t}));
                            case 10:
                                i = e.sent;
                            case 11:
                                i && i.id ? u(i) : u(), e.next = 17;
                                break;
                            case 14:
                                e.prev = 14, e.t0 = e.catch(1), console.log(e.t0);
                            case 17:
                            case"end":
                                return e.stop()
                        }
                    }), e, null, [[1, 14]])
                })))).apply(this, arguments)
            }

            return (0, o.useEffect)((function () {
                if (n && !j) {
                    var e = {
                        name: n.name,
                        email: n.email || "",
                        phone: n.phone || "",
                        mobile: n.mobile || "",
                        address1: n.address1 || "",
                        address2: n.address2 || ""
                    };
                    b(e)
                }
            }), [j, n, b]), (0, m.jsxs)("form", {
                onSubmit: g((function (e) {
                    return Z.apply(this, arguments)
                })),
                className: "flex flex-col gap-y-4 w-full",
                children: [(0, m.jsx)(x.Z, {
                    control: v,
                    placeholder: "",
                    label: "Nom",
                    name: "name"
                }), (0, m.jsxs)("div", {
                    className: "grid grid-cols-1 gap-5",
                    children: [(0, m.jsx)(x.Z, {
                        autoComplete: "email",
                        control: v,
                        placeholder: "",
                        type: "email",
                        label: "Email",
                        name: "email"
                    }), (0, m.jsx)(x.Z, {
                        autoComplete: "phone",
                        control: v,
                        placeholder: "",
                        type: "tel",
                        label: "T\xe9l\xe9phone",
                        name: "phone"
                    }), (0, m.jsx)(x.Z, {
                        autoComplete: "mobile",
                        control: v,
                        placeholder: "",
                        type: "tel",
                        label: "Mobile",
                        name: "mobile"
                    })]
                }), (0, m.jsx)(x.Z, {
                    control: v,
                    placeholder: "",
                    label: "Address",
                    name: "address1"
                }), (0, m.jsx)(x.Z, {
                    control: v,
                    placeholder: "",
                    label: "Address auxiliaire",
                    name: "address2"
                }), (0, m.jsxs)("div", {
                    className: "w-full grid grid-cols-2 gap-x-5 mt-5",
                    children: [(0, m.jsx)(f.Z, {
                        label: "Fermer", type: "button", onClick: function () {
                            return u()
                        }, genre: "secondary"
                    }), (0, m.jsx)(f.Z, {
                        label: y ? "Enregistrement en cours" : "Enregistrer",
                        type: "submit",
                        genre: "secondary",
                        disabled: !N || y || !j
                    })]
                })]
            })
        }
    }, 9179: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return f
            }
        });
        var a = n(885), l = n(7845), r = n(6285), i = n(1856), o = n(7941), s = n(2791), c = n(1417), u = n(8663),
            d = n(184);

        function f(e) {
            var t, n, f = e.label, x = e.items, m = e.buttonStyle, p = e.selectedValue, h = e.disabled, v = e.button,
                g = e.onChange, b = (0, s.useRef)(null), w = (0, s.useState)(!1), y = (0, a.Z)(w, 2), j = y[0],
                N = y[1], Z = function () {
                    return x.find((function (e) {
                        return e.value === p
                    }))
                };
            return (0, c.O)(b, (function () {
                return N(!1)
            })), (0, d.jsx)("div", {
                ref: b, children: (0, d.jsx)(u.Z, {
                    button: v, label: f, element: (0, d.jsxs)("div", {
                        children: [(0, d.jsxs)("button", {
                            disabled: h,
                            className: "flex w-full flex-row items-center justify-between overflow-hidden  py-2 px-3 ".concat(m),
                            type: "button",
                            onClick: function () {
                                return N((function (e) {
                                    return !e
                                }))
                            },
                            children: [(0, d.jsx)(i.M, {
                                exitBeforeEnter: !0,
                                children: (0, d.jsx)(o.E.p, {
                                    initial: {opacity: 0, y: 30},
                                    animate: {opacity: 1, y: 0},
                                    exit: {opacity: 0, y: -30},
                                    className: "w-full flex-auto text-left font-Secondary first-letter:uppercase ",
                                    children: null === (n = Z()) || void 0 === n ? void 0 : n.title
                                }, null === (t = Z()) || void 0 === t ? void 0 : t.title)
                            }), (0, d.jsx)(l.Z, {className: "h-6 w-6 flex-initial transition-all duration-300 ".concat(j ? "rotate-180" : "rotate-0")})]
                        }), (0, d.jsx)(i.M, {
                            exitBeforeEnter: !0,
                            children: j && (0, d.jsx)(o.E.div, {
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
                                                    children: (null === (n = Z()) || void 0 === n ? void 0 : n.value) === e.value && (0, d.jsx)(r.Z, {className: "h-6 w-6"})
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
    }, 8544: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return c
            }
        });
        var a = n(1413), l = n(4925), r = n(1134), i = n(8663), o = n(184), s = ["className", "initial", "inputStyle"];

        function c(e) {
            var t = e.className, n = e.initial, c = e.inputStyle, u = (0, l.Z)(e, s),
                d = (0, r.bc)((0, a.Z)((0, a.Z)({}, u), {}, {defaultValue: n || ""})), f = d.fieldState, x = d.field;
            return (0, o.jsxs)("div", {
                className: "w-full",
                children: [(0, o.jsx)(i.Z, {
                    className: " overflow-hidden " + t,
                    label: u.label,
                    element: (0, o.jsx)("input", (0, a.Z)((0, a.Z)({
                        className: "".concat(c, " form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-gray-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none"),
                        "aria-label": u.label,
                        type: u.type
                    }, u), x)),
                    button: u.button
                }), f.error && (f.isDirty || f.isTouched) && (0, o.jsx)("div", {
                    className: "w-full py-0",
                    children: (0, o.jsx)("p", {
                        className: "w-full text-left font-Secondary text-sm text-red-500 first-letter:uppercase ",
                        children: f.error.message
                    })
                })]
            })
        }
    }, 4490: function (e, t, n) {
        n.r(t), n.d(t, {
            default: function () {
                return k
            }
        });
        var a = n(885), l = n(2791), r = n(6871), i = n(6474), o = n(6941);
        var s = n(2999), c = n(281), u = n(741);
        var d = l.forwardRef((function (e, t) {
            return l.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), l.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            }))
        })), f = n(7281), x = n(4760), m = n(2604), p = n(8268), h = n(184);

        function v(e) {
            var t = e.agentParams, n = (0, i.TL)(), r = (0, l.useState)(t.type), s = (0, a.Z)(r, 2), c = s[0], u = s[1];
            return (0, h.jsxs)("div", {
                className: " grid xl:grid-cols-5 md:grid-cols-2 gap-5 w-full",
                children: [(0, h.jsx)(f.Z, {
                    items: g, label: "Type", Icon: d, selectedValue: c, onChange: function (e) {
                        var t;
                        console.log(e.value), u(e.value), t = e.value, n((0, o.e3)({type: t}))
                    }
                }), (0, h.jsx)("div", {
                    className: " flex-auto w-full xl:col-span-2",
                    children: (0, h.jsx)(m.Z, {
                        onSearch: function (e) {
                            n((0, o.e3)({searchTerm: e}))
                        }
                    })
                }), (0, h.jsx)(p.Z, {
                    items: b, onSort: function (e) {
                        n((0, o.e3)({orderBy: e}))
                    }, initialValue: "name"
                }), (0, h.jsx)(x.Z, {
                    onChange: function (e) {
                        n((0, o.e3)({pageSize: e}))
                    }
                })]
            })
        }

        var g = [{title: "Clients", value: "client"}, {title: "Fournisseurs", value: "provider"}],
            b = [{title: "Nom", value: "name"}, {title: "Montant Total", value: "total"}, {
                title: "Montant Pay\xe9",
                value: "paid"
            }, {title: "Dettes", value: "remain"}], w = n(717), y = n(3284), j = n(4517);

        function N(e) {
            var t = e.agents, n = e.onSelect;
            return (0, h.jsx)(y.Z, {
                headers: ["Nom", "Total", "Pay\xe9", "Dettes"], children: t.map((function (e, t) {
                    return (0, h.jsx)(j.Z, {
                        cells: [{title: "Name", value: e.name}, {
                            title: "Total",
                            value: (0, w.u)(e.total),
                            align: "right"
                        }, {title: "Pay\xe9", value: (0, w.u)(e.paid), align: "right"}, {
                            title: "Dettes",
                            value: (0, w.u)(e.debt),
                            align: "right"
                        }], onClick: function () {
                            return n(e)
                        }
                    }, t)
                }))
            })
        }

        var Z = n(2996), C = n(1359), S = n(6227), E = n(2887);

        function k() {
            var e = (0, i.TL)(), t = function () {
                    var e = (0, i.CG)((function (e) {
                        return e.agent
                    })), t = e.status, n = e.agentsParams, a = (0, i.CG)(o.xg.selectAll), r = (0, i.CG)((function (e) {
                        return e.agent
                    })), s = r.agentsLoaded, c = r.metaData, u = r.agentType, d = (0, i.TL)();
                    return (0, l.useEffect)((function () {
                        s || t.includes("pending") || d((0, o.I8)())
                    }), [s, d, t]), {agents: a, agentsLoaded: s, agentType: u, metaData: c, agentsParams: n}
                }(), n = t.agentsParams, d = t.metaData, f = t.agents, x = (0, l.useState)(!1), m = (0, a.Z)(x, 2),
                p = m[0], g = m[1], b = (0, r.s0)(), w = (0, r.TH)();
            return (0, h.jsxs)(h.Fragment, {
                children: [(0, h.jsx)(s.Z, {
                    title: "Gestion des ".concat("client" === n.type ? "clients" : "fournisseurs"),
                    list: (0, h.jsx)(N, {
                        agents: f, onSelect: function (e) {
                            b(e.id, {state: {from: w}})
                        }
                    }),
                    filters: (0, h.jsx)(C.Z, {title: "Filtres", children: (0, h.jsx)(v, {agentParams: n})}),
                    metaData: d,
                    onPageChange: function (t) {
                        e((0, u.oW)({pageNumber: t + 1}))
                    },
                    actionButton: (0, h.jsx)(Z.Z, {
                        onClick: function () {
                            return g(!0)
                        }, label: "Ajouter un ".concat("client" === n.type ? "client" : "fournisseur"), genre: "info"
                    })
                }), (0, h.jsx)(S.Z, {
                    title: "Ajouter un ".concat("client" === n.type ? "client" : "fournisseur"),
                    active: p,
                    contentStyle: "p-5",
                    children: (0, h.jsx)(E.Z, {
                        type: "client" === n.type ? c.j.client : c.j.provider,
                        onClose: function (e) {
                            return g(!1)
                        }
                    })
                })]
            })
        }
    }, 8155: function (e, t, n) {
        var a = n(2791);
        var l = a.forwardRef((function (e, t) {
            return a.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), a.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 18L18 6M6 6l12 12"
            }))
        }));
        t.Z = l
    }, 7845: function (e, t, n) {
        var a = n(2791);
        var l = a.forwardRef((function (e, t) {
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
        t.Z = l
    }, 4673: function (e, t, n) {
        var a = n(2791);
        var l = a.forwardRef((function (e, t) {
            return a.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), a.createElement("path", {
                fillRule: "evenodd",
                d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = l
    }, 6285: function (e, t, n) {
        var a = n(2791);
        var l = a.forwardRef((function (e, t) {
            return a.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), a.createElement("path", {
                fillRule: "evenodd",
                d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = l
    }, 7866: function (e, t, n) {
        var a = n(2791);
        var l = a.forwardRef((function (e, t) {
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
        t.Z = l
    }
}]);
//# sourceMappingURL=490.cc94e8c6.chunk.js.map
"use strict";
(self.webpackChunkclient = self.webpackChunkclient || []).push([[645], {
    9596: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var r = n(2982), a = n(4165), l = n(5861), s = n(885), i = n(2791), o = n(281), c = n(260);

        function u(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = (0, i.useState)([]),
                o = (0, s.Z)(n, 2), u = o[0], f = o[1], m = (0, i.useState)(!1), p = (0, s.Z)(m, 2), x = p[0], h = p[1],
                v = (0, i.useState)(!1), b = (0, s.Z)(v, 2), y = b[0], g = b[1], j = (0, i.useCallback)(function () {
                    var e = (0, l.Z)((0, a.Z)().mark((function e(t) {
                        var n, r;
                        return (0, a.Z)().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return h(!0), e.prev = 1, n = d(t), e.next = 5, c.Z.Agents.listFull(n);
                                case 5:
                                    (r = e.sent) && (f(r), g(!0)), e.next = 12;
                                    break;
                                case 9:
                                    e.prev = 9, e.t0 = e.catch(1), console.log(e.t0);
                                case 12:
                                    return e.prev = 12, h(!1), e.finish(12);
                                case 15:
                                case"end":
                                    return e.stop()
                            }
                        }), e, null, [[1, 9, 12, 15]])
                    })));
                    return function (t) {
                        return e.apply(this, arguments)
                    }
                }(), []);

            function w(e) {
                var t = [].concat((0, r.Z)(u), [e]).sort((function (e, t) {
                    return e.name < t.name ? -1 : 1
                }));
                f(t)
            }

            return (0, i.useEffect)((function () {
                t && e >= 0 && !y && j(e)
            }), [y, j, e, t]), {agents: u, agentsLoaded: y, agentsLoading: x, addAgent: w, fetchAgents: j}
        }

        function d(e) {
            var t = new URLSearchParams;
            return t.append("type", o.j[e]), t
        }
    }, 3156: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return s
            }
        });
        var r = n(2791), a = n(6474), l = n(741);

        function s() {
            var e = (0, a.CG)(l.g0.selectAll), t = (0, a.CG)((function (e) {
                return e.shop
            })).shop, n = (0, a.CG)((function (e) {
                return e.products
            })), s = n.productsLoaded, i = n.categoriesLoaded, o = n.categories, c = n.metaData, u = (0, a.TL)();
            return (0, r.useEffect)((function () {
                t && !s && u((0, l.$$)())
            }), [u, s, t]), (0, r.useEffect)((function () {
                i || u((0, l.uw)())
            }), [u, i]), {products: e, productsLoaded: s, categoriesLoaded: i, categories: o, metaData: c}
        }
    }, 717: function (e, t, n) {
        function r(e) {
            return 0 === e ? 0 : e.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

        n.d(t, {
            u: function () {
                return r
            }
        })
    }, 8663: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return a
            }
        });
        var r = n(184);

        function a(e) {
            var t = e.label, n = e.element, a = e.button, l = e.className;
            return (0, r.jsxs)("div", {
                className: " relative flex flex-row items-stretch  rounded-lg border border-stone-400 bg-stone-300 pl-4 ".concat(l),
                children: [(0, r.jsxs)("label", {
                    className: "flex w-full flex-auto flex-row items-center gap-x-2 ",
                    children: [(0, r.jsx)("div", {
                        className: "flex-initial",
                        children: t && (0, r.jsx)("p", {
                            className: " w-full min-w-[4rem] border-r border-stone-400  pr-2 text-sm uppercase  hover:text-yellow-900",
                            children: t
                        })
                    }), (0, r.jsx)("div", {className: "flex-auto", children: n})]
                }), (0, r.jsx)("div", {className: "flex flex-initial items-stretch", children: !!a && a})]
            })
        }
    }, 6227: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var r = n(8155), a = n(1856), l = n(7941), s = n(2791), i = n(4164), o = n(1417), c = n(184);

        function u(e) {
            var t = e.title, n = e.active, u = e.children, m = e.containerStyle, p = e.contentStyle, x = e.onClose,
                h = (0, s.useRef)(null);
            return (0, o.O)(h, (function () {
                x && x()
            })), i.createPortal((0, c.jsx)(a.M, {
                children: n && (0, c.jsx)(l.E.div, {
                    variants: d,
                    initial: "hidden",
                    animate: "open",
                    exit: "close",
                    className: "fixed top-0 left-0 z-50 h-screen w-screen select-none items-center justify-center overscroll-none bg-stone-900 bg-opacity-80 backdrop-blur md:flex",
                    children: (0, c.jsxs)(l.E.div, {
                        ref: h,
                        layout: !0,
                        variants: f,
                        className: "".concat(m, " in-h-[20rem] flex max-h-screen w-auto max-w-screen-xl flex-col items-stretch  rounded bg-stone-200 md:min-w-[32rem]"),
                        children: [(0, c.jsxs)("div", {
                            className: " z-10 flex w-full flex-initial flex-row items-center justify-between border-b border-b-stone-400 bg-stone-600 px-6 py-2 text-stone-400 drop-shadow-md",
                            children: [(0, c.jsx)("p", {
                                className: " font-Primary text-2xl font-light uppercase",
                                children: t
                            }), x && (0, c.jsx)("button", {
                                type: "button",
                                title: "Fermer",
                                onClick: x,
                                children: (0, c.jsx)(r.Z, {className: " h-7 w-7"})
                            })]
                        }), (0, c.jsx)("div", {
                            className: "".concat(p, "  flex-auto overflow-y-auto bg-stone-200 p-5 text-stone-700"),
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
    }, 5694: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return o
            }
        });
        var r = n(1413), a = n(4925), l = n(8663), s = n(184),
            i = ["className", "initialValue", "inputStyles", "onChange", "onEnter", "button"];

        function o(e) {
            var t = e.className, n = (e.initialValue, e.inputStyles), o = e.onChange, c = e.onEnter, u = e.button,
                d = (0, a.Z)(e, i);
            return (0, s.jsx)(l.Z, {
                className: t,
                label: d.label,
                element: (0, s.jsx)("input", (0, r.Z)((0, r.Z)({
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
    }, 2887: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return x
            }
        });
        var r = n(4165), a = n(1413), l = n(5861), s = n(9877), i = n(2791), o = n(1134), c = n(260), u = n(2797),
            d = u.Ry({
                name: u.Z_().min(4).max(255).required(),
                phone: u.Z_().max(255).optional().nullable(),
                mobile: u.Z_().max(255).optional().nullable(),
                email: u.Z_().email().max(255).optional().nullable(),
                address1: u.Z_().max(255).optional().nullable(),
                address2: u.Z_().optional().optional().nullable()
            }), f = n(2996), m = n(8544), p = n(184);

        function x(e) {
            var t = e.type, n = e.shopAgent, u = e.onClose, x = !!n,
                h = (0, o.cI)({mode: "all", resolver: (0, s.X)(d)}), v = h.control, b = h.handleSubmit, y = h.reset,
                g = h.formState, j = g.isSubmitting, w = g.isDirty, N = g.isValid;

            function Z() {
                return (Z = (0, l.Z)((0, r.Z)().mark((function e(l) {
                    var s;
                    return (0, r.Z)().wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (s = null, e.prev = 1, !x) {
                                    e.next = 8;
                                    break
                                }
                                return e.next = 5, c.Z.Agents.update(n.id, l);
                            case 5:
                                s = e.sent, e.next = 11;
                                break;
                            case 8:
                                return e.next = 10, c.Z.Agents.create((0, a.Z)((0, a.Z)({}, l), {}, {type: t}));
                            case 10:
                                s = e.sent;
                            case 11:
                                s && s.id ? u(s) : u(), e.next = 17;
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

            return (0, i.useEffect)((function () {
                if (n && !w) {
                    var e = {
                        name: n.name,
                        email: n.email || "",
                        phone: n.phone || "",
                        mobile: n.mobile || "",
                        address1: n.address1 || "",
                        address2: n.address2 || ""
                    };
                    y(e)
                }
            }), [w, n, y]), (0, p.jsxs)("form", {
                onSubmit: b((function (e) {
                    return Z.apply(this, arguments)
                })),
                className: "flex flex-col gap-y-4 w-full",
                children: [(0, p.jsx)(m.Z, {
                    control: v,
                    placeholder: "",
                    label: "Nom",
                    name: "name"
                }), (0, p.jsxs)("div", {
                    className: "grid grid-cols-1 gap-5",
                    children: [(0, p.jsx)(m.Z, {
                        autoComplete: "email",
                        control: v,
                        placeholder: "",
                        type: "email",
                        label: "Email",
                        name: "email"
                    }), (0, p.jsx)(m.Z, {
                        autoComplete: "phone",
                        control: v,
                        placeholder: "",
                        type: "tel",
                        label: "T\xe9l\xe9phone",
                        name: "phone"
                    }), (0, p.jsx)(m.Z, {
                        autoComplete: "mobile",
                        control: v,
                        placeholder: "",
                        type: "tel",
                        label: "Mobile",
                        name: "mobile"
                    })]
                }), (0, p.jsx)(m.Z, {
                    control: v,
                    placeholder: "",
                    label: "Address",
                    name: "address1"
                }), (0, p.jsx)(m.Z, {
                    control: v,
                    placeholder: "",
                    label: "Address auxiliaire",
                    name: "address2"
                }), (0, p.jsxs)("div", {
                    className: "w-full grid grid-cols-2 gap-x-5 mt-5",
                    children: [(0, p.jsx)(f.Z, {
                        label: "Fermer", type: "button", onClick: function () {
                            return u()
                        }, genre: "secondary"
                    }), (0, p.jsx)(f.Z, {
                        label: j ? "Enregistrement en cours" : "Enregistrer",
                        type: "submit",
                        genre: "secondary",
                        disabled: !N || j || !w
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
        var r = n(885), a = n(7845), l = n(6285), s = n(1856), i = n(7941), o = n(2791), c = n(1417), u = n(8663),
            d = n(184);

        function f(e) {
            var t, n, f = e.label, m = e.items, p = e.buttonStyle, x = e.selectedValue, h = e.disabled, v = e.button,
                b = e.onChange, y = (0, o.useRef)(null), g = (0, o.useState)(!1), j = (0, r.Z)(g, 2), w = j[0],
                N = j[1], Z = function () {
                    return m.find((function (e) {
                        return e.value === x
                    }))
                };
            return (0, c.O)(y, (function () {
                return N(!1)
            })), (0, d.jsx)("div", {
                ref: y, children: (0, d.jsx)(u.Z, {
                    button: v, label: f, element: (0, d.jsxs)("div", {
                        children: [(0, d.jsxs)("button", {
                            disabled: h,
                            className: "flex w-full flex-row items-center justify-between overflow-hidden  py-2 px-3 ".concat(p),
                            type: "button",
                            onClick: function () {
                                return N((function (e) {
                                    return !e
                                }))
                            },
                            children: [(0, d.jsx)(s.M, {
                                exitBeforeEnter: !0,
                                children: (0, d.jsx)(i.E.p, {
                                    initial: {opacity: 0, y: 30},
                                    animate: {opacity: 1, y: 0},
                                    exit: {opacity: 0, y: -30},
                                    className: "w-full flex-auto text-left font-Secondary first-letter:uppercase ",
                                    children: null === (n = Z()) || void 0 === n ? void 0 : n.title
                                }, null === (t = Z()) || void 0 === t ? void 0 : t.title)
                            }), (0, d.jsx)(a.Z, {className: "h-6 w-6 flex-initial transition-all duration-300 ".concat(w ? "rotate-180" : "rotate-0")})]
                        }), (0, d.jsx)(s.M, {
                            exitBeforeEnter: !0,
                            children: w && (0, d.jsx)(i.E.div, {
                                initial: {opacity: 0, y: -30},
                                animate: {opacity: 1, y: 0},
                                exit: {opacity: 0, y: -30},
                                layout: !0,
                                className: "absolute left-0 z-20 mt-3 w-full  min-w-[16rem] max-w-xl rounded-xl  border  border-stone-300 bg-stone-200 py-2 px-4 drop-shadow-md",
                                children: (0, d.jsx)("ul", {
                                    className: "list-none", children: m.map((function (e, t) {
                                        var n;
                                        return (0, d.jsx)("li", {
                                            className: " list-item rounded py-1 px-3 hover:bg-yellow-500 hover:text-stone-100",
                                            children: (0, d.jsxs)("button", {
                                                className: "flex w-full flex-row items-center  text-left font-Secondary capitalize",
                                                type: "button",
                                                onClick: function () {
                                                    return function (e) {
                                                        b(e), N(!1)
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
    }, 8544: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return c
            }
        });
        var r = n(1413), a = n(4925), l = n(1134), s = n(8663), i = n(184), o = ["className", "initial", "inputStyle"];

        function c(e) {
            var t = e.className, n = e.initial, c = e.inputStyle, u = (0, a.Z)(e, o),
                d = (0, l.bc)((0, r.Z)((0, r.Z)({}, u), {}, {defaultValue: n || ""})), f = d.fieldState, m = d.field;
            return (0, i.jsxs)("div", {
                className: "w-full",
                children: [(0, i.jsx)(s.Z, {
                    className: " overflow-hidden " + t,
                    label: u.label,
                    element: (0, i.jsx)("input", (0, r.Z)((0, r.Z)({
                        className: "".concat(c, " form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-gray-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none"),
                        "aria-label": u.label,
                        type: u.type
                    }, u), m)),
                    button: u.button
                }), f.error && (f.isDirty || f.isTouched) && (0, i.jsx)("div", {
                    className: "w-full py-0",
                    children: (0, i.jsx)("p", {
                        className: "w-full text-left font-Secondary text-sm text-red-500 first-letter:uppercase ",
                        children: f.error.message
                    })
                })]
            })
        }
    }, 1629: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return y
            }
        });
        var r = n(4165), a = n(5861), l = n(2982), s = n(885), i = n(2791);
        var o = i.forwardRef((function (e, t) {
                return i.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    ref: t
                }, e), i.createElement("path", {d: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"}))
            })), c = n(260), u = n(9596), d = n(7201), f = n(281), m = n(717), p = n(2996), x = n(5694), h = n(2887),
            v = n(9179), b = n(184);

        function y(e) {
            var t = e.elements, n = void 0 === t ? [] : t, y = e.operationTotal, g = void 0 === y ? 0 : y, j = e.table,
                w = e.type, N = void 0 === w ? d.C.sale : w, Z = e.onClose,
                C = N === d.C.sale ? f.j.client : f.j.provider, S = (0, u.Z)(C), k = S.agents, E = S.agentsLoading,
                R = S.addAgent, I = (0, i.useState)(null), L = (0, s.Z)(I, 2), M = L[0], P = L[1],
                q = (0, i.useState)(g), z = (0, s.Z)(q, 1)[0], T = (0, i.useState)(0), V = (0, s.Z)(T, 2), O = V[0],
                A = V[1], D = (0, i.useState)(!1), B = (0, s.Z)(D, 2), F = B[0], Q = B[1], U = (0, i.useState)(!1),
                G = (0, s.Z)(U, 2), H = G[0], $ = G[1], _ = function () {
                    return z > O
                }, K = function () {
                    return Math.abs(z - O)
                };

            function W() {
                return (W = (0, a.Z)((0, r.Z)().mark((function e() {
                    var t, a, l;
                    return (0, r.Z)().wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (!(n.length > 0)) {
                                    e.next = 17;
                                    break
                                }
                                return $(!0), e.prev = 2, t = n.map((function (e) {
                                    return {
                                        productId: e.productId,
                                        quantity: e.quantity,
                                        price: e.price,
                                        expiryDate: e.expiryDate
                                    }
                                })), a = {
                                    elements: t,
                                    table: j,
                                    type: N,
                                    agentId: M,
                                    paid: O > z ? z : O
                                }, e.next = 7, c.Z.Operations.create(a);
                            case 7:
                                l = e.sent, Z(l), e.next = 14;
                                break;
                            case 11:
                                e.prev = 11, e.t0 = e.catch(2), console.log(e.t0);
                            case 14:
                                return e.prev = 14, $(!1), e.finish(14);
                            case 17:
                            case"end":
                                return e.stop()
                        }
                    }), e, null, [[2, 11, 14, 17]])
                })))).apply(this, arguments)
            }

            return F ? (0, b.jsx)(h.Z, {
                type: C, onClose: function (e) {
                    e && (R(e), P(e.id)), Q(!1)
                }
            }) : (0, b.jsxs)("div", {
                className: "flex w-full flex-col items-stretch gap-y-5",
                children: [(0, b.jsxs)("div", {
                    className: "flex flex-col gap-y-3 border-b border-b-gray-200 pb-4",
                    children: [(0, b.jsxs)("div", {
                        className: " inline-flex w-full items-end justify-between",
                        children: [(0, b.jsx)("p", {
                            className: "font-Primary text-base uppercase",
                            children: "Total"
                        }), (0, b.jsxs)("p", {
                            className: " font-Primary text-2xl font-thin",
                            children: [(0, m.u)(z), " Da"]
                        })]
                    }), (0, b.jsxs)("div", {
                        className: " inline-flex w-full items-end justify-between",
                        children: [(0, b.jsx)("p", {
                            className: "font-Primary text-base uppercase",
                            children: "Pay\xe9"
                        }), (0, b.jsxs)("p", {
                            className: " font-Primary text-2xl font-thin",
                            children: [(0, m.u)(O), " Da"]
                        })]
                    }), (0, b.jsxs)("div", {
                        className: " inline-flex w-full items-end justify-between",
                        children: [(0, b.jsx)("p", {
                            className: "font-Primary text-base uppercase",
                            children: _() ? "Reste" : "Monnaie"
                        }), (0, b.jsxs)("p", {
                            className: "font-Primary text-2xl font-thin transition-all duration-300 ".concat(0 === K() ? "text-inherit" : _() ? "text-red-600 dark:text-red-400" : "text-green-600"),
                            children: [(0, m.u)(Math.ceil(K())), " Da"]
                        })]
                    })]
                }), (0, b.jsxs)("div", {
                    className: "flex w-full flex-col gap-y-3 ",
                    children: [(0, b.jsx)(x.Z, {
                        type: "number",
                        inputStyles: "text-center",
                        value: O,
                        min: 0,
                        className: "text-center",
                        label: "Montant pay\xe9",
                        onChange: function (e) {
                            return A(+e)
                        }
                    }), (0, b.jsx)(v.Z, {
                        disabled: E,
                        selectedValue: M,
                        className: "flex-auto",
                        label: C === f.j.client ? "Client" : "Fournisseur",
                        items: [{title: "Inconnu", value: null}].concat((0, l.Z)(k.map((function (e) {
                            return {title: e.name, value: e.id}
                        })))),
                        onChange: function (e) {
                            P(e ? e.value : null)
                        },
                        button: (0, b.jsx)(p.Z, {
                            type: "button",
                            genre: "outline",
                            className: " rounded-none border-none text-stone-700",
                            Icon: o,
                            onClick: function () {
                                return Q(!0)
                            },
                            title: "Ajouter un ".concat(C === f.j.client ? "client" : "fournisseur"),
                            label: ""
                        })
                    })]
                }), (0, b.jsxs)("div", {
                    className: " mt-5 grid gap-5 xl:grid-cols-2 ",
                    children: [(0, b.jsx)(p.Z, {
                        label: "Fermer", disabled: H, onClick: function () {
                            return Z()
                        }, type: "button", genre: "secondary"
                    }), (0, b.jsx)(p.Z, {
                        label: H ? "Validation" : "Valider", disabled: H, onClick: function () {
                            return function () {
                                return W.apply(this, arguments)
                            }()
                        }, type: "button"
                    })]
                })]
            })
        }
    }, 5645: function (e, t, n) {
        n.r(t), n.d(t, {
            default: function () {
                return te
            }
        });
        var r = n(885), a = n(7845), l = n(870), s = n(1856), i = n(7941), o = n(2791), c = n(3156), u = n(7066),
            d = n(5068);
        var f = o.forwardRef((function (e, t) {
            return o.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), o.createElement("path", {
                fillRule: "evenodd",
                d: "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
                clipRule: "evenodd"
            }))
        })), m = n(9169), p = n(7866), x = n(184);

        function h(e) {
            var t = e.element, n = e.onIncreaseQuantity, r = e.onDecreaseQuantity, a = e.onRemove;
            return (0, x.jsxs)(i.E.div, {
                initial: {opacity: 0, x: -50},
                animate: {opacity: 1, x: 0},
                exit: {opacity: 0, x: -50},
                layout: !0,
                className: "bg-gray-00 flex w-full   flex-row items-end rounded border-y border-y-stone-300 bg-stone-200 py-1 px-4 text-stone-900  md:items-center",
                children: [(0, x.jsxs)("div", {
                    className: "grid flex-auto items-center  gap-y-2 md:grid-cols-5",
                    children: [(0, x.jsx)("p", {
                        className: "  font-Secondary text-xl font-light capitalize md:col-span-3",
                        children: t.productName
                    }), (0, x.jsxs)("div", {
                        className: " mx-auto grid grid-cols-4 md:col-span-2",
                        children: [(0, x.jsx)("div", {
                            className: " flex w-full items-center justify-center",
                            children: (0, x.jsx)("button", {
                                type: "button", className: v, onClick: function () {
                                    return r(t.productId)
                                }, children: (0, x.jsx)(f, {className: b})
                            })
                        }), (0, x.jsx)("div", {
                            className: " col-span-2 flex w-full items-center",
                            children: (0, x.jsx)("p", {
                                className: " w-full text-center  font-Primary text-lg",
                                children: t.quantity
                            })
                        }), (0, x.jsx)("div", {
                            className: " flex w-full items-center justify-center",
                            children: (0, x.jsx)("button", {
                                type: "button", className: v, onClick: function () {
                                    return n(t.productId)
                                }, children: (0, x.jsx)(m.Z, {className: b})
                            })
                        })]
                    })]
                }), (0, x.jsx)("div", {
                    children: (0, x.jsx)("button", {
                        type: "button",
                        className: v + "ml-2 bg-stone-400 text-stone-100",
                        onClick: function () {
                            return a(t.productId)
                        },
                        children: (0, x.jsx)(p.Z, {className: b})
                    })
                })]
            })
        }

        var v = "p-1 rounded-full text-gray-100  bg-stone-400 ", b = "h-5 w-5";

        function y(e) {
            var t = e.elements, n = e.onRemove, r = e.setQuantity;

            function a(e) {
                n(e)
            }

            function l(e) {
                r(e, "increase")
            }

            function i(e) {
                r(e, "decrease")
            }

            return (0, x.jsx)("div", {
                className: " flex flex-col gap-y-2",
                children: (0, x.jsx)(s.M, {
                    children: t.map((function (e) {
                        return (0, x.jsx)(h, {
                            element: e,
                            onRemove: a,
                            onIncreaseQuantity: l,
                            onDecreaseQuantity: i
                        }, e.productId)
                    }))
                })
            })
        }

        var g = n(2982), j = n(521), w = n(741), N = n(6474), Z = n(1417);

        function C(e) {
            var t = e.category;
            return (0, x.jsx)(x.Fragment, {
                children: t.pictureUrl ? (0, x.jsxs)("div", {
                    className: "flex h-20 flex-row items-center justify-center gap-x-5 overflow-hidden ",
                    children: [(0, x.jsx)("div", {
                        className: "w-1/3 flex-initial overflow-hidden",
                        children: (0, x.jsx)("img", {
                            src: t.pictureUrl,
                            alt: t.name,
                            className: " h-20 w-full object-scale-down"
                        })
                    }), (0, x.jsx)("div", {
                        className: "flex-auto",
                        children: (0, x.jsx)("p", {
                            className: " font-Primary text-2xl font-thin capitalize",
                            children: t.name
                        })
                    })]
                }) : (0, x.jsx)("div", {
                    className: "flex h-20 items-center justify-center ",
                    children: (0, x.jsx)("p", {
                        className: " font-Primary text-2xl font-thin uppercase",
                        children: t.name
                    })
                })
            })
        }

        function S(e) {
            var t = e.categories, n = void 0 === t ? [] : t, r = e.selectedCategory, a = e.onClose,
                l = (0, o.useRef)(null), s = (0, N.TL)();

            function c(e) {
                var t = e ? e.id : void 0;
                s((0, w.X3)({categoryId: t})), a(e)
            }

            return (0, Z.O)(l, (function () {
                return a()
            })), (0, x.jsxs)(i.E.div, {
                ref: l,
                initial: {y: "-100%"},
                animate: {y: 0},
                exit: {y: "-100%"},
                transition: {stiffness: 100},
                className: " absolute top-0 left-0 right-0 bg-stone-500 px-5 py-5  md:px-10",
                children: [(0, x.jsx)("div", {
                    className: " grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2",
                    children: [k].concat((0, g.Z)(n)).map((function (e) {
                        return (0, x.jsx)("button", {
                            onClick: function () {
                                return c(e)
                            },
                            type: "button",
                            className: " w-full rounded-md text-left hover:bg-yellow-400  ".concat(r === e.id ? "bg-yellow-600 text-stone-200" : "bg-stone-300 text-stone-600"),
                            children: (0, x.jsx)(C, {category: e})
                        }, e.id)
                    }))
                }), (0, x.jsx)("div", {
                    className: "w-ful mt-5 flex items-center justify-center py-2  text-stone-300",
                    children: (0, x.jsxs)("button", {
                        type: "button",
                        className: " inline-flex items-center",
                        onClick: function () {
                            return c()
                        },
                        children: [(0, x.jsx)(j.Z, {className: "mr-2 h-6 w-6"}), (0, x.jsx)("span", {
                            className: "font-Secondary uppercase",
                            children: "Fermer"
                        })]
                    })
                })]
            })
        }

        var k = {id: "", name: "Tout les produits", pictureUrl: ""}, E = n(717);

        function R(e) {
            var t = e.product;
            return (0, x.jsxs)("div", {
                className: "relative flex h-full  min-h-[20vh] w-full flex-col items-center justify-between bg-stone-300 text-stone-700 md:justify-between xl:p-5",
                children: [(0, x.jsx)("img", {
                    src: t.pictureUrl,
                    alt: t.name,
                    className: "object-auto absolute top-0 left-0 right-0 bottom-0 h-full w-full object-scale-down "
                }), (0, x.jsx)("div", {
                    className: "absolute top-0 right-0 flex  items-center justify-center bg-stone-600 p-2",
                    children: (0, x.jsxs)("p", {
                        className: "font-Primary font-thin  text-stone-300",
                        children: [(0, x.jsx)("span", {
                            className: "text-xl",
                            children: (0, E.u)(t.price)
                        }), (0, x.jsx)("span", {className: "ml-1 text-sm", children: "Da"})]
                    })
                }), (0, x.jsxs)("div", {
                    className: "absolute bottom-0 left-0 right-0 flex flex-auto flex-col items-stretch bg-stone-700 bg-opacity-70 py-2 text-stone-200 ",
                    children: [(0, x.jsx)("p", {
                        className: " flex-auto font-Secondary text-base capitalize  lg:text-lg",
                        children: t.name
                    }), (0, x.jsx)("small", {
                        className: " flex-initial font-Secondary text-sm capitalize",
                        children: t.description || t.category
                    })]
                })]
            })
        }

        function I(e) {
            var t = e.products, n = void 0 === t ? [] : t, r = e.onSelect;
            return (0, x.jsx)("div", {
                className: "grid h-auto max-h-full w-full grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4",
                children: (0, x.jsx)(s.M, {
                    children: n.map((function (e) {
                        return (0, x.jsx)(i.E.button, {
                            type: "button",
                            initial: {opacity: 0},
                            animate: {opacity: 1},
                            exit: {opacity: 0},
                            className: "w-full border border-stone-600",
                            onClick: function () {
                                return r(e)
                            },
                            children: (0, x.jsx)(R, {product: e})
                        }, e.id)
                    }))
                })
            })
        }

        function L(e) {
            var t = e.tables, n = e.tablesLoaded, r = e.selectedTable, a = e.onSelect;
            return (0, x.jsx)(x.Fragment, {
                children: n ? (0, x.jsx)("div", {
                    className: " flex w-max max-w-none flex-row items-center  gap-3",
                    children: t.map((function (e, t) {
                        return 0 === e.id ? (0, x.jsx)("div", {
                            className: " relative  w-full",
                            children: (0, x.jsx)("button", {
                                onClick: function () {
                                    return a(0)
                                },
                                type: "button",
                                className: "flex h-10 w-full snap-center  items-center justify-center rounded-full py-0 px-3 transition-all hover:bg-red-700 hover:text-stone-100  ".concat(0 === r ? "bg-red-500 text-stone-100" : "bg-stone-300", " ").concat(e.active && " border-2 border-red-500", "  "),
                                children: (0, x.jsx)("span", {
                                    className: " font-Primary text-base font-thin uppercase",
                                    children: "Comptoir"
                                })
                            })
                        }, e.id) : (0, x.jsx)(M, {isSelected: r === e.id, table: e, onSelect: a}, t)
                    }))
                }) : (0, x.jsx)("div", {
                    className: "w-full ",
                    children: (0, x.jsx)("p", {children: "Chargement des tables"})
                })
            })
        }

        function M(e) {
            var t = e.table, n = e.isSelected, r = e.onSelect;
            return (0, x.jsx)("div", {
                className: " relative h-full w-full",
                children: (0, x.jsx)("button", {
                    onClick: function () {
                        return r(t.id)
                    },
                    type: "button",
                    className: " snap-start  ".concat(n ? "bg-red-500 text-stone-100" : "bg-stone-300", " ").concat("h-10 w-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:text-stone-100 ", " ").concat(t.active && " border-2 border-red-600", "  "),
                    children: (0, x.jsx)("span", {
                        className: " font-Primary text-lg font-thin uppercase",
                        children: t.id
                    })
                })
            })
        }

        var P, q = n(4165), z = n(5861), T = n(1413), V = n(3144), O = n(5671), A = new Uint8Array(16);

        function D() {
            if (!P && !(P = "undefined" !== typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" !== typeof msCrypto && "function" === typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return P(A)
        }

        var B = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        for (var F = function (e) {
            return "string" === typeof e && B.test(e)
        }, Q = [], U = 0; U < 256; ++U) Q.push((U + 256).toString(16).substr(1));
        var G = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = (Q[e[t + 0]] + Q[e[t + 1]] + Q[e[t + 2]] + Q[e[t + 3]] + "-" + Q[e[t + 4]] + Q[e[t + 5]] + "-" + Q[e[t + 6]] + Q[e[t + 7]] + "-" + Q[e[t + 8]] + Q[e[t + 9]] + "-" + Q[e[t + 10]] + Q[e[t + 11]] + Q[e[t + 12]] + Q[e[t + 13]] + Q[e[t + 14]] + Q[e[t + 15]]).toLowerCase();
            if (!F(n)) throw TypeError("Stringified UUID is invalid");
            return n
        };
        var H = function (e, t, n) {
            var r = (e = e || {}).random || (e.rng || D)();
            if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
                n = n || 0;
                for (var a = 0; a < 16; ++a) t[n + a] = r[a];
                return t
            }
            return G(r)
        }, $ = (0, V.Z)((function e(t) {
            (0, O.Z)(this, e), this.id = H(), this.table = 0, this.elements = [], this.total = 0, this.table = t || 0
        })), _ = n(260), K = n(4230), W = n(9932);
        var X = n(2996), J = n(1629), Y = n(6227);
        var ee = o.forwardRef((function (e, t) {
            return o.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), o.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            }))
        }));

        function te() {
            var e = (0, N.TL)(), t = (0, o.useState)(!1), n = (0, r.Z)(t, 2), f = n[0], m = n[1], p = (0, c.Z)(),
                h = p.products, v = p.categories, b = (p.productsLoaded, (0, o.useState)(!1)), j = (0, r.Z)(b, 2),
                w = j[0], Z = j[1], C = (0, o.useState)(void 0), k = (0, r.Z)(C, 2), R = k[0], M = k[1],
                P = (0, o.useState)(0), V = (0, r.Z)(P, 2), O = V[0], A = V[1], D = function () {
                    var e = (0, N.TL)(), t = (0, N.CG)((function (e) {
                            return e.shop
                        })).shop, n = (0, N.CG)((function (e) {
                            return e.order
                        })), r = n.ordersCacheLoaded, a = n.tables, l = (0, N.CG)(K.$s.selectAll),
                        s = (null === t || void 0 === t ? void 0 : t.tablesCount) || 0;

                    function i(t, n) {
                        e((0, K.T0)({tableId: t, values: n}))
                    }

                    (0, W.Z)().sendMessage;
                    var c = (0, o.useCallback)(function () {
                        var e = (0, z.Z)((0, q.Z)().mark((function e(t) {
                            var n;
                            return (0, q.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0, n = (t || l).filter((function (e) {
                                            return e.elements.length > 0 && e.table >= 0
                                        })).map((function (e) {
                                            return {
                                                table: e.table, elements: e.elements.map((function (e) {
                                                    return {
                                                        productId: e.productId,
                                                        productName: e.productName,
                                                        price: e.price,
                                                        quantity: e.quantity
                                                    }
                                                }))
                                            }
                                        })), e.next = 4, _.Z.Orders.update({orders: n});
                                    case 4:
                                        return e.abrupt("return", e.sent);
                                    case 7:
                                        e.prev = 7, e.t0 = e.catch(0), console.log(e.t0);
                                    case 10:
                                    case"end":
                                        return e.stop()
                                }
                            }), e, null, [[0, 7]])
                        })));
                        return function (t) {
                            return e.apply(this, arguments)
                        }
                    }(), [l]);

                    function u(t) {
                        l.find((function (e) {
                            return e.table === t
                        })) && (e((0, K.QS)(t)), i(t, {active: !1}))
                    }

                    return (0, o.useEffect)((function () {
                        s > 0 && !r && e((0, K.ZN)()).then((function (t) {
                            var n = t.payload;
                            e((0, K.Qv)({tablesCount: s, values: n}))
                        }))
                    }), [e, r, s]), (0, o.useEffect)((function () {
                        r && c(l)
                    }), [l, r]), {
                        tables: a, orders: l, addProduct: function (t, n) {
                            var r = l.find((function (e) {
                                return e.table === t
                            }));
                            if (r) {
                                var a = [];
                                if (r.elements.findIndex((function (e) {
                                    return e.productId === n.id
                                })) > -1) a = r.elements.map((function (e) {
                                    return e.productId === n.id ? (0, T.Z)((0, T.Z)({}, e), {}, {
                                        quantity: e.quantity + 1,
                                        total: e.price * e.quantity
                                    }) : e
                                })); else {
                                    var s = {
                                        productId: n.id,
                                        productName: n.name,
                                        quantity: 1,
                                        price: n.price,
                                        total: n.price
                                    };
                                    a = [].concat((0, g.Z)(r.elements), [s])
                                }
                                a = a.sort((function (e, t) {
                                    return e.productName < t.productName ? -1 : 1
                                })), e((0, K.Cs)({id: t, changes: {elements: a}}))
                            } else {
                                r = new $(t);
                                var o = {productId: n.id, productName: n.name, quantity: 1, price: n.price, total: n.price};
                                e((0, K.fS)((0, T.Z)((0, T.Z)({}, r), {}, {table: t, elements: [o]})))
                            }
                            i(t, {active: r.elements.length > 0})
                        }, cacheOrders: c, changeQuantity: function (t, n, r) {
                            var a = l.find((function (e) {
                                return e.table === t
                            }));
                            if (a && -1 !== a.elements.findIndex((function (e) {
                                return e.productId === n
                            }))) {
                                var s = a.elements.map((function (e) {
                                    if (e.productId === n) {
                                        var t = 0;
                                        switch (r) {
                                            case"increase":
                                                t = e.quantity + 1;
                                                break;
                                            case"decrease":
                                                e.quantity > 1 && (t = e.quantity - 1)
                                        }
                                        var a = e.price * e.quantity;
                                        return (0, T.Z)((0, T.Z)({}, e), {}, {quantity: t, total: a})
                                    }
                                    return e
                                })).filter((function (e) {
                                    return e.quantity > 0
                                }));
                                0 === s.length ? u(t) : e((0, K.Cs)({id: t, changes: {elements: s}}))
                            }
                        }, clearOrder: u, getTotal: function (e) {
                            return e && e.elements && e.elements.length > 0 ? e.elements.reduce((function (e, t) {
                                return e + t.price * t.quantity
                            }), 0) : 0
                        }, updateTable: i, removeProduct: function (t, n) {
                            var r = l.find((function (e) {
                                return e.table === t
                            }));
                            if (r) {
                                var a = r.elements.filter((function (e) {
                                    return e.productId !== n
                                }));
                                e((0, K.Cs)({
                                    id: t,
                                    changes: {elements: a}
                                })), 0 === r.elements.length ? u(t) : e((0, K.Cs)({id: t, changes: {elements: a}}))
                            }
                        }
                    }
                }(), B = D.tables, F = D.orders, Q = D.addProduct, U = D.clearOrder, G = D.changeQuantity, H = D.getTotal,
                te = D.removeProduct, ne = (0, N.CG)((function (e) {
                    return K.$s.selectById(e, O)
                })), re = ne ? H(ne) : 0;
            return (0, x.jsxs)(x.Fragment, {
                children: [(0, x.jsx)(Y.Z, {
                    title: "Commande",
                    active: f,
                    children: ne && (0, x.jsx)(J.Z, {
                        elements: ne.elements.map((function (e) {
                            return {
                                productId: e.productId,
                                productName: e.productName,
                                quantity: e.quantity,
                                price: e.price,
                                total: e.price * e.quantity
                            }
                        })), operationTotal: re, onClose: function (e) {
                            e && (console.log(e), O >= 0 && U(O)), m(!1)
                        }
                    })
                }), (0, x.jsxs)(d.Z, {
                    className: "max-h-fill relative flex snap-x snap-mandatory flex-row gap-x-2  overflow-x-auto  border-none bg-stone-400 py-0 px-0 md:overflow-x-hidden 2xl:max-w-none  ",
                    children: [(0, x.jsxs)("div", {
                        className: "relative flex w-screen min-w-full flex-auto  snap-center flex-col border border-stone-500 bg-stone-500 md:w-2/3 md:min-w-min",
                        children: [(0, x.jsx)("div", {
                            className: "w-ful flex items-center  justify-center  border-b border-b-stone-600  bg-stone-600 text-stone-300 drop-shadow-md ",
                            children: (0, x.jsxs)("button", {
                                type: "button",
                                className: " inline-flex w-full items-center justify-center py-2",
                                onClick: function () {
                                    return Z(!0)
                                },
                                children: [(0, x.jsx)(a.Z, {className: "mr-2 h-6 w-6"}), (0, x.jsx)("span", {
                                    className: " font-Primary text-lg uppercase",
                                    children: (null === R || void 0 === R ? void 0 : R.name) || "Cat\xe9gories"
                                })]
                            })
                        }), (0, x.jsx)("div", {
                            className: "h-full max-h-fit  flex-auto overflow-x-hidden overflow-y-scroll py-5 px-5  ",
                            children: (0, x.jsx)("div", {
                                className: " h-full",
                                children: h.length > 0 ? (0, x.jsx)(I, {
                                    products: h, onSelect: function (e) {
                                        Q(O, e)
                                    }
                                }) : (0, x.jsx)("div", {
                                    className: "flex h-full w-full items-center justify-center",
                                    children: (0, x.jsx)("p", {
                                        className: " font-Primary text-5xl font-thin uppercase opacity-10",
                                        children: "Aucun produit"
                                    })
                                })
                            })
                        }), (0, x.jsx)(s.M, {
                            children: w && (0, x.jsx)(S, {
                                selectedCategory: null === R || void 0 === R ? void 0 : R.id,
                                categories: v,
                                onClose: function (e) {
                                    M(e), Z(!1)
                                }
                            })
                        })]
                    }), (0, x.jsxs)("div", {
                        className: "flex w-screen min-w-full flex-initial snap-center flex-col  overflow-hidden  rounded-sm bg-stone-200 text-stone-700 drop-shadow-lg  md:w-1/3 md:min-w-min",
                        children: [(0, x.jsxs)("div", {
                            className: "flex w-full flex-initial flex-row items-center border-b border-b-stone-300  px-2 py-5 md:max-w-[33.333333vw] md:px-5",
                            children: [(0, x.jsx)("div", {
                                className: " mr-5 flex-initial font-Primary text-xl font-thin  uppercase",
                                children: (0, x.jsx)("p", {children: "Table"})
                            }), (0, x.jsx)("div", {
                                className: " flex-auto snap-x snap-mandatory overflow-x-auto  overscroll-x-none rounded-full border border-stone-300 py-1 px-2 shadow-inner shadow-stone-500 scrollbar-hide md:px-5",
                                children: (0, x.jsx)(L, {
                                    tables: B,
                                    tablesLoaded: B.length > 0,
                                    selectedTable: O,
                                    onSelect: function (t) {
                                        F.find((function (e) {
                                            return e.table === t
                                        })) || e((0, K.fS)({table: t, total: 0, elements: []})), A(t)
                                    }
                                })
                            })]
                        }), (0, x.jsxs)("div", {
                            className: "flex flex-auto flex-col items-stretch bg-stone-100 py-5  md:px-5",
                            children: [(0, x.jsx)("p", {
                                className: "mb-5 flex-initial text-center font-Primary text-2xl font-thin uppercase  text-stone-400",
                                children: O > 0 ? "Table N\xb0 ".concat(O) : "op\xe9ration comptoir"
                            }), (0, x.jsx)("div", {
                                className: "flex-auto overflow-x-hidden ",
                                children: ne && (0, x.jsx)(y, {
                                    setQuantity: function (e, t) {
                                        G(O, e, t)
                                    }, elements: ne.elements, onRemove: function (e) {
                                        te(O, e)
                                    }
                                })
                            }), (0, x.jsxs)("div", {
                                className: "flex w-full flex-initial flex-row items-end justify-between px-5 py-2  md:px-0 ",
                                children: [(0, x.jsx)("p", {
                                    className: " font-Secondary font-semibold uppercase",
                                    children: "Total"
                                }), (0, x.jsx)(s.M, {
                                    children: (0, x.jsxs)(i.E.p, {
                                        initial: {opacity: 0, x: -50},
                                        animate: {opacity: 1, x: 0},
                                        exit: {opacity: 0, x: 50},
                                        layout: !0,
                                        className: " font-Primary font-thin",
                                        children: [(0, x.jsx)(i.E.span, {
                                            className: "text-2xl",
                                            children: (0, E.u)(re)
                                        }), (0, x.jsx)("span", {className: "ml-1 text-base uppercase", children: u.KI})]
                                    }, re)
                                })]
                            })]
                        }), (0, x.jsxs)("div", {
                            className: " grid w-full grid-cols-5 ",
                            children: [(0, x.jsx)(X.Z, {
                                disabled: !ne || 0 === ne.elements.length,
                                onClick: function () {
                                    U(O)
                                },
                                genre: "error",
                                Icon: l.Z,
                                iconStyle: " h-8 w-8"
                            }), (0, x.jsx)(X.Z, {
                                disabled: !ne || 0 === ne.elements.length,
                                label: "Valider",
                                Icon: ee,
                                onClick: function () {
                                    return m(!0)
                                },
                                genre: "info",
                                className: " col-span-4  w-full",
                                iconStyle: " h-8 w-8"
                            })]
                        })]
                    })]
                })]
            })
        }
    }, 8155: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 18L18 6M6 6l12 12"
            }))
        }));
        t.Z = a
    }, 7845: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = a
    }, 6285: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = a
    }, 521: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = a
    }, 9169: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = a
    }, 870: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = a
    }, 7866: function (e, t, n) {
        var r = n(2791);
        var a = r.forwardRef((function (e, t) {
            return r.createElement("svg", Object.assign({
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: t
            }, e), r.createElement("path", {
                fillRule: "evenodd",
                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                clipRule: "evenodd"
            }))
        }));
        t.Z = a
    }
}]);
//# sourceMappingURL=645.ede96748.chunk.js.map
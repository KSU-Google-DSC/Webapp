"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.FirebaseAdapter = void 0;
var firestore_1 = require("firebase/firestore");
var converter_1 = require("./converter");
var FirebaseAdapter = function (firebaseApp) {
    var db = (0, firestore_1.getFirestore)(firebaseApp);
    var Users = (0, firestore_1.collection)(db, 'users').withConverter((0, converter_1.getConverter)());
    var Sessions = (0, firestore_1.collection)(db, 'sessions').withConverter((0, converter_1.getConverter)());
    var Accounts = (0, firestore_1.collection)(db, 'accounts').withConverter((0, converter_1.getConverter)());
    var VerificationTokens = (0, firestore_1.collection)(db, 'verificationTokens').withConverter((0, converter_1.getConverter)({ excludeId: true }));
    return {
        createUser: function (newUser) {
            return __awaiter(this, void 0, void 0, function () {
                var userRef, userSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, firestore_1.addDoc)(Users, newUser)];
                        case 1:
                            userRef = _a.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(userRef)];
                        case 2:
                            userSnapshot = _a.sent();
                            if (userSnapshot.exists() && Users.converter) {
                                return [2 /*return*/, Users.converter.fromFirestore(userSnapshot)];
                            }
                            throw new Error('[createUser] Failed to create user');
                    }
                });
            });
        },
        getUser: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var userSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(Users, id))];
                        case 1:
                            userSnapshot = _a.sent();
                            if (userSnapshot.exists() && Users.converter) {
                                return [2 /*return*/, Users.converter.fromFirestore(userSnapshot)];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        },
        getUserByEmail: function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var userQuery, userSnapshots, userSnpashot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userQuery = (0, firestore_1.query)(Users, (0, firestore_1.where)('email', '==', email), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(userQuery)];
                        case 1:
                            userSnapshots = _a.sent();
                            userSnpashot = userSnapshots.docs[0];
                            if ((userSnpashot === null || userSnpashot === void 0 ? void 0 : userSnpashot.exists()) && Users.converter) {
                                return [2 /*return*/, Users.converter.fromFirestore(userSnpashot)];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        },
        getUserByAccount: function (_a) {
            var provider = _a.provider, providerAccountId = _a.providerAccountId;
            return __awaiter(this, void 0, void 0, function () {
                var accountQuery, accountSnapshots, accountSnapshot, userId, userDoc;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            accountQuery = (0, firestore_1.query)(Accounts, (0, firestore_1.where)('provider', '==', provider), (0, firestore_1.where)('providerAccountId', '==', providerAccountId), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(accountQuery)];
                        case 1:
                            accountSnapshots = _b.sent();
                            accountSnapshot = accountSnapshots.docs[0];
                            if (!(accountSnapshot === null || accountSnapshot === void 0 ? void 0 : accountSnapshot.exists)) return [3 /*break*/, 3];
                            userId = accountSnapshot.data().userId;
                            return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(Users, userId))];
                        case 2:
                            userDoc = _b.sent();
                            if (userDoc.exists() && Users.converter) {
                                return [2 /*return*/, Users.converter.fromFirestore(userDoc)];
                            }
                            _b.label = 3;
                        case 3: return [2 /*return*/, null];
                    }
                });
            });
        },
        updateUser: function (partialUser) {
            return __awaiter(this, void 0, void 0, function () {
                var userRef, userSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userRef = (0, firestore_1.doc)(Users, partialUser.id);
                            return [4 /*yield*/, (0, firestore_1.setDoc)(userRef, partialUser, { merge: true })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(userRef)];
                        case 2:
                            userSnapshot = _a.sent();
                            if (userSnapshot.exists() && Users.converter) {
                                return [2 /*return*/, Users.converter.fromFirestore(userSnapshot)];
                            }
                            throw new Error('[updateUser] Failed to update user');
                    }
                });
            });
        },
        deleteUser: function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var userRef, accountsQuery, sessionsQuery;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userRef = (0, firestore_1.doc)(Users, userId);
                            accountsQuery = (0, firestore_1.query)(Accounts, (0, firestore_1.where)('userId', '==', userId));
                            sessionsQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)('userId', '==', userId));
                            // TODO: May be better to use events instead of transactions?
                            return [4 /*yield*/, (0, firestore_1.runTransaction)(db, function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                    var accounts, sessions;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, (0, firestore_1.getDocs)(accountsQuery)];
                                            case 1:
                                                accounts = _a.sent();
                                                return [4 /*yield*/, (0, firestore_1.getDocs)(sessionsQuery)];
                                            case 2:
                                                sessions = _a.sent();
                                                transaction["delete"](userRef);
                                                accounts.forEach(function (account) { return transaction["delete"](account.ref); });
                                                sessions.forEach(function (session) { return transaction["delete"](session.ref); });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            // TODO: May be better to use events instead of transactions?
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        linkAccount: function (account) {
            return __awaiter(this, void 0, void 0, function () {
                var accountRef, accountSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, firestore_1.addDoc)(Accounts, account)];
                        case 1:
                            accountRef = _a.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(accountRef)];
                        case 2:
                            accountSnapshot = _a.sent();
                            if (accountSnapshot.exists() && Accounts.converter) {
                                return [2 /*return*/, Accounts.converter.fromFirestore(accountSnapshot)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        unlinkAccount: function (_a) {
            var provider = _a.provider, providerAccountId = _a.providerAccountId;
            return __awaiter(this, void 0, void 0, function () {
                var accountQuery, accountSnapshots, accountSnapshot;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            accountQuery = (0, firestore_1.query)(Accounts, (0, firestore_1.where)('provider', '==', provider), (0, firestore_1.where)('providerAccountId', '==', providerAccountId), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(accountQuery)];
                        case 1:
                            accountSnapshots = _b.sent();
                            accountSnapshot = accountSnapshots.docs[0];
                            if (!(accountSnapshot === null || accountSnapshot === void 0 ? void 0 : accountSnapshot.exists())) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, firestore_1.deleteDoc)(accountSnapshot.ref)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        createSession: function (session) {
            return __awaiter(this, void 0, void 0, function () {
                var sessionRef, sessionSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, firestore_1.addDoc)(Sessions, session)];
                        case 1:
                            sessionRef = _a.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(sessionRef)];
                        case 2:
                            sessionSnapshot = _a.sent();
                            if (sessionSnapshot.exists() && Sessions.converter) {
                                return [2 /*return*/, Sessions.converter.fromFirestore(sessionSnapshot)];
                            }
                            throw new Error('[createSession] Failed to create session');
                    }
                });
            });
        },
        getSessionAndUser: function (sessionToken) {
            return __awaiter(this, void 0, void 0, function () {
                var sessionQuery, sessionSnapshots, sessionSnapshot, session, userDoc, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sessionQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)('sessionToken', '==', sessionToken), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(sessionQuery)];
                        case 1:
                            sessionSnapshots = _a.sent();
                            sessionSnapshot = sessionSnapshots.docs[0];
                            if (!((sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists()) && Sessions.converter)) return [3 /*break*/, 3];
                            session = Sessions.converter.fromFirestore(sessionSnapshot);
                            return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(Users, session.userId))];
                        case 2:
                            userDoc = _a.sent();
                            if (userDoc.exists() && Users.converter) {
                                user = Users.converter.fromFirestore(userDoc);
                                return [2 /*return*/, { session: session, user: user }];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, null];
                    }
                });
            });
        },
        updateSession: function (partialSession) {
            return __awaiter(this, void 0, void 0, function () {
                var sessionQuery, sessionSnapshots, sessionSnapshot, sessionDoc, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sessionQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)('sessionToken', '==', partialSession.sessionToken), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(sessionQuery)];
                        case 1:
                            sessionSnapshots = _a.sent();
                            sessionSnapshot = sessionSnapshots.docs[0];
                            if (!(sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists())) return [3 /*break*/, 4];
                            return [4 /*yield*/, (0, firestore_1.setDoc)(sessionSnapshot.ref, partialSession, { merge: true })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(sessionSnapshot.ref)];
                        case 3:
                            sessionDoc = _a.sent();
                            if ((sessionDoc === null || sessionDoc === void 0 ? void 0 : sessionDoc.exists()) && Sessions.converter) {
                                session = Sessions.converter.fromFirestore(sessionDoc);
                                return [2 /*return*/, session];
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/, null];
                    }
                });
            });
        },
        deleteSession: function (sessionToken) {
            return __awaiter(this, void 0, void 0, function () {
                var sessionQuery, sessionSnapshots, sessionSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sessionQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)('sessionToken', '==', sessionToken), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(sessionQuery)];
                        case 1:
                            sessionSnapshots = _a.sent();
                            sessionSnapshot = sessionSnapshots.docs[0];
                            if (!(sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists())) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, firestore_1.deleteDoc)(sessionSnapshot.ref)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        createVerificationToken: function (verificationToken) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationTokenRef, verificationTokenSnapshot, _a, id, verificationToken_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, firestore_1.addDoc)(VerificationTokens, verificationToken)];
                        case 1:
                            verificationTokenRef = _b.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(verificationTokenRef)];
                        case 2:
                            verificationTokenSnapshot = _b.sent();
                            if (verificationTokenSnapshot.exists() && VerificationTokens.converter) {
                                _a = VerificationTokens.converter.fromFirestore(verificationTokenSnapshot), id = _a.id, verificationToken_1 = __rest(_a, ["id"]);
                                return [2 /*return*/, verificationToken_1];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        useVerificationToken: function (_a) {
            var identifier = _a.identifier, token = _a.token;
            return __awaiter(this, void 0, void 0, function () {
                var verificationTokensQuery, verificationTokenSnapshots, verificationTokenSnapshot, _b, id, verificationToken;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            verificationTokensQuery = (0, firestore_1.query)(VerificationTokens, (0, firestore_1.where)('identifier', '==', identifier), (0, firestore_1.where)('token', '==', token), (0, firestore_1.limit)(1));
                            return [4 /*yield*/, (0, firestore_1.getDocs)(verificationTokensQuery)];
                        case 1:
                            verificationTokenSnapshots = _c.sent();
                            verificationTokenSnapshot = verificationTokenSnapshots.docs[0];
                            if (!((verificationTokenSnapshot === null || verificationTokenSnapshot === void 0 ? void 0 : verificationTokenSnapshot.exists()) && VerificationTokens.converter)) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, firestore_1.deleteDoc)(verificationTokenSnapshot.ref)];
                        case 2:
                            _c.sent();
                            _b = VerificationTokens.converter.fromFirestore(verificationTokenSnapshot), id = _b.id, verificationToken = __rest(_b, ["id"]);
                            return [2 /*return*/, verificationToken];
                        case 3: return [2 /*return*/, null];
                    }
                });
            });
        }
    };
};
exports.FirebaseAdapter = FirebaseAdapter;

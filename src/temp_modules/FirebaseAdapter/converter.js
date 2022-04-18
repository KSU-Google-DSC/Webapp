"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getConverter = void 0;
var firestore_1 = require("firebase/firestore");
var isTimestamp = function (value) {
    return typeof value === 'object' && value !== null && value instanceof firestore_1.Timestamp;
};
var getConverter = function (options) { return ({
    // `PartialWithFieldValue` implicitly types `object` as `any`, so we want to explicitly type it
    toFirestore: function (object) {
        var document = {};
        Object.keys(object).forEach(function (key) {
            if (object[key] !== undefined) {
                document[key] = object[key];
            }
        });
        return document;
    },
    // We need to explicitly type `snapshot` since it uses `DocumentData` for generic type
    fromFirestore: function (snapshot) {
        var _a;
        if (!snapshot.exists()) {
            return snapshot;
        }
        var document = snapshot.data();
        if (!(options === null || options === void 0 ? void 0 : options.excludeId)) {
            document = __assign(__assign({}, document), { id: snapshot.id });
        }
        for (var key in document) {
            var value = document[key];
            if (isTimestamp(value)) {
                document = __assign(__assign({}, document), (_a = {}, _a[key] = value.toDate(), _a));
            }
        }
        return document;
    }
}); };
exports.getConverter = getConverter;

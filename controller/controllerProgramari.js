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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('../config'), sql = _a.sql, poolPromise = _a.poolPromise;
var typesProgramari_1 = require("../types/typesProgramari");
var adaugareProgramare = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Cod_Masina, DataProgramare, ModalitateContact, Actiune, IntervalOrar, DurataProgramare, isoDataProgramare, _b, day, month, year, validare, pool, request, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, Cod_Masina = _a.Cod_Masina, DataProgramare = _a.DataProgramare, ModalitateContact = _a.ModalitateContact, Actiune = _a.Actiune, IntervalOrar = _a.IntervalOrar, DurataProgramare = _a.DurataProgramare;
                _b = DataProgramare.split(/[-/.]/), day = _b[0], month = _b[1], year = _b[2];
                isoDataProgramare = new Date("".concat(month, "/").concat(day, "/").concat(year));
                validare = (0, typesProgramari_1.validareProgramare)(req.body);
                if (!validare.isValid) {
                    res.status(400).json({ error: validare.message });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _c.sent();
                request = pool.request();
                request.input('Cod_Masina', sql.Int, Cod_Masina);
                request.input('DataProgramare', sql.DateTime, isoDataProgramare);
                request.input('ModalitateContact', sql.VarChar(15), ModalitateContact);
                request.input('Actiune', sql.VarChar(255), Actiune);
                request.input('IntervalOrar', sql.VarChar(5), IntervalOrar);
                request.input('DurataProgramare', sql.Int, DurataProgramare);
                return [4 /*yield*/, request.execute('adaugaProgramare')];
            case 3:
                _c.sent();
                res.status(200).send('Programarea a fost adaugata si s-a creat inregistrarea in istoric');
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                if (err_1 instanceof Error) {
                    res.status(500).send({ error: "eroare la introducerea programarii: ".concat(err_1.message) });
                }
                else {
                    console.log(err_1);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var execGetProgramariQuery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pool, request, query, _a, dataprogramare, queryParams, cond, formatDate, _b, startDate, endDate, formattedStartDate, formattedEndDate, formattedDate, _i, _c, _d, key, value, result, formattedResults, err_2;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                return [4 /*yield*/, poolPromise];
            case 1:
                pool = _e.sent();
                request = pool.request();
                query = "\n          SELECT\n                CONCAT(c.Nume, ' ', c.Prenume) AS NumeClient, m.Model AS ModelMasina, m.NrInmatriculare, p.DataProgramare, p.ModalitateContact, p.Actiune, p.IntervalOrar,               p.DurataProgramare FROM Programari p JOIN Masini m ON p.Cod_Masina = m.Cod_Masina JOIN Clienti c ON m.Cod_Client = c.Cod_Client";
                _a = req.query, dataprogramare = _a.dataprogramare, queryParams = __rest(_a, ["dataprogramare"]);
                cond = [];
                formatDate = function (dateString, isEndDate) {
                    if (isEndDate === void 0) { isEndDate = false; }
                    var parts = dateString.split(/[-/.]/);
                    if (parts.length === 3) {
                        var day = parts[0], month = parts[1], year = parts[2];
                        return "".concat(year, "-").concat(month, "-").concat(day);
                    }
                    else if (parts.length === 2) {
                        var month = parts[0], year = parts[1];
                        var lastDay = new Date(Number(year), Number(month), 0).getDate();
                        return isEndDate ? "".concat(year, "-").concat(month, "-").concat(lastDay) : "".concat(year, "-").concat(month, "-01");
                    }
                    else if (parts.length === 1) {
                        var year = parts[0];
                        return isEndDate ? "".concat(year, "-12-31") : "".concat(year, "-01-01");
                    }
                    else {
                        throw new Error('Formatul datei este invalid. Foloseste DD/MM/YYYY, MM/YYYY sau YYYY');
                    }
                };
                if (typeof dataprogramare === 'string') {
                    _b = dataprogramare.split('to').map(function (d) { return d.trim(); }), startDate = _b[0], endDate = _b[1];
                    if (startDate && endDate) {
                        formattedStartDate = formatDate(startDate);
                        formattedEndDate = formatDate(endDate, true);
                        //console.log(formattedStartDate);
                        //console.log(formattedEndDate);
                        cond.push("p.DataProgramare BETWEEN @StartDate AND @EndDate");
                        request.input('StartDate', sql.Date, formattedStartDate);
                        request.input('EndDate', sql.Date, formattedEndDate);
                    }
                    else {
                        formattedDate = formatDate(startDate);
                        cond.push("p.DataProgramare = @Date");
                        request.input('Date', sql.Date, formattedDate);
                    }
                }
                for (_i = 0, _c = Object.entries(queryParams); _i < _c.length; _i++) {
                    _d = _c[_i], key = _d[0], value = _d[1];
                    if (typeof value === 'string') {
                        cond.push("".concat(key, " LIKE @").concat(key));
                        request.input(key, sql.VarChar, "%".concat(value, "%"));
                    }
                }
                if (cond.length > 0) {
                    query += ' WHERE ' + cond.join(' AND ');
                }
                return [4 /*yield*/, request.query(query)];
            case 2:
                result = _e.sent();
                formattedResults = (0, typesProgramari_1.formatProgramari)(result.recordset);
                res.status(200).json(formattedResults);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _e.sent();
                console.error(err_2);
                if (err_2 instanceof Error) {
                    res.status(500).send("eroare la cautarea programarilor: ".concat(err_2.message));
                }
                else {
                    console.log(err_2);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var execGetProgramari = function (req, res, procedureName, params) { return __awaiter(void 0, void 0, void 0, function () {
    var pool, request_1, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, poolPromise];
            case 1:
                pool = _a.sent();
                request_1 = pool.request();
                if (params) {
                    params.forEach(function (param) {
                        request_1.input(param.name, param.type, param.value);
                    });
                }
                return [4 /*yield*/, request_1.execute(procedureName)];
            case 2:
                result = _a.sent();
                res.status(200).send(result.recordset);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                if (err_3 instanceof Error) {
                    res.status(500).send("A avut loc o eroare la executarea procedurii ".concat(procedureName, ": ").concat(err_3.message));
                }
                else {
                    console.log(err_3);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getProgramari = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execGetProgramari(req, res, 'getProgramari')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getProgramariData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataProgramare, params, _a, day, month, year, formattedDate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dataProgramare = req.params.dataProgramare;
                params = [];
                if (dataProgramare) {
                    _a = dataProgramare.split(/[-/.]/), day = _a[0], month = _a[1], year = _a[2];
                    formattedDate = "".concat(year, "-").concat(month, "-").concat(day);
                    params.push({ name: 'DataProgramare', type: sql.Date, value: formattedDate });
                }
                return [4 /*yield*/, execGetProgramari(req, res, 'getProgramari', params)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
module.exports = {
    adaugareProgramare: adaugareProgramare,
    getProgramari: getProgramari,
    getProgramariData: getProgramariData,
    execGetProgramariQuery: execGetProgramariQuery
};
//# sourceMappingURL=controllerProgramari.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
var type = require('express/lib/response').type;
var _a = require('../config'), sql = _a.sql, poolPromise = _a.poolPromise;
var adaugareMasina = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh, Activ, pool, request, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, Cod_Client = _a.Cod_Client, NrInmatriculare = _a.NrInmatriculare, VIN = _a.VIN, Model = _a.Model, AnFabr = _a.AnFabr, TipMotorizare = _a.TipMotorizare, CapacitateMotor = _a.CapacitateMotor, CP = _a.CP, KWh = _a.KWh, Activ = _a.Activ;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _b.sent();
                request = pool.request();
                request.input('Cod_Client', sql.Int, Cod_Client);
                request.input('NrInmatriculare', sql.VarChar(15), NrInmatriculare);
                request.input('VIN', sql.VarChar(17), VIN);
                request.input('Model', sql.VarChar(50), Model);
                request.input('AnFabr', sql.Int, AnFabr);
                request.input('TipMotorizare', sql.VarChar(20), TipMotorizare);
                request.input('CapacitateMotor', sql.Decimal(4, 1), CapacitateMotor);
                request.input('CP', sql.Int, CP);
                request.input('KWh', sql.Decimal(5, 2), KWh);
                request.input('Activ', sql.Bit, Activ);
                return [4 /*yield*/, request.execute('adaugareMasina')];
            case 3:
                _b.sent();
                res.status(201).send({ message: 'Masina a fost adaugata' });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1);
                if (err_1 instanceof Error) {
                    res.status(500).send({ error: "A avut loc o eroare: ".concat(err_1.message) });
                }
                else {
                    console.log(err_1);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var actualizareMasina = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh, Activ, pool, request, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, Cod_Client = _a.Cod_Client, NrInmatriculare = _a.NrInmatriculare, VIN = _a.VIN, Model = _a.Model, AnFabr = _a.AnFabr, TipMotorizare = _a.TipMotorizare, CapacitateMotor = _a.CapacitateMotor, CP = _a.CP, KWh = _a.KWh, Activ = _a.Activ;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _b.sent();
                request = pool.request();
                request.input('Cod_Masina', sql.Int, id);
                request.input('Cod_Client', sql.Int, Cod_Client || null);
                request.input('NrInmatriculare', sql.VarChar(15), NrInmatriculare || null);
                request.input('VIN', sql.VarChar(17), VIN || null);
                request.input('Model', sql.VarChar(50), Model || null);
                request.input('AnFabr', sql.Int, AnFabr || null);
                request.input('TipMotorizare', sql.VarChar(20), TipMotorizare || null);
                request.input('CapacitateMotor', sql.Decimal(4, 1), CapacitateMotor || null);
                request.input('CP', sql.Int, CP || null);
                request.input('KWh', sql.Decimal(5, 2), KWh || null);
                request.input('Activ', sql.Bit, Activ || null);
                return [4 /*yield*/, request.execute('actualizareMasina')];
            case 3:
                _b.sent();
                res.status(201).send({ message: 'Masina a fost actualizata' });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error(err_2);
                if (err_2 instanceof Error) {
                    res.status(500).send({ error: "A avut loc o eroare: ".concat(err_2.message) });
                }
                else {
                    console.log(err_2);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var dezactivareMasina = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pool, request, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _a.sent();
                request = pool.request();
                request.input('Cod_Masina', sql.Int, id);
                return [4 /*yield*/, request.execute('DezactivareMasina')];
            case 3:
                _a.sent();
                res.status(200).json({ message: 'Masina a fost dezactivata' });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.error(err_3);
                if (err_3 instanceof Error) {
                    res.status(500).send({ error: "A avut loc o eroare: ".concat(err_3.message) });
                }
                else {
                    console.log(err_3);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getMasini = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pool, request, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, poolPromise];
            case 1:
                pool = _a.sent();
                request = pool.request();
                return [4 /*yield*/, request.execute('getMasini')];
            case 2:
                result = _a.sent();
                res.status(200).send(result.recordset);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                if (err_4 instanceof Error) {
                    res.status(500).send({ error: "A avut loc o eroare: ".concat(err_4.message) });
                }
                else {
                    console.log(err_4);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    adaugareMasina: adaugareMasina,
    actualizareMasina: actualizareMasina,
    dezactivareMasina: dezactivareMasina,
    getMasini: getMasini
};
//# sourceMappingURL=controllerMasini.js.map
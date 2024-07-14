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
var _a = require('../config'), sql = _a.sql, poolPromise = _a.poolPromise;
var actualizareIstoric2 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, DataPrimire, ProblemeMentionate, ProblemeVizualeConstatate, isoDataPrimire, _b, day, month, year, pool, request, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                _a = req.body, DataPrimire = _a.DataPrimire, ProblemeMentionate = _a.ProblemeMentionate, ProblemeVizualeConstatate = _a.ProblemeVizualeConstatate;
                _b = DataPrimire.split(/[-/.]/), day = _b[0], month = _b[1], year = _b[2];
                isoDataPrimire = new Date("".concat(month, "/").concat(day, "/").concat(year));
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _c.sent();
                request = pool.request();
                request.input('Cod_Istoric', sql.Int, id);
                request.input('DataPrimire', sql.DateTime, isoDataPrimire);
                request.input('ProblemeMentionate', sql.VarChar(499), ProblemeMentionate);
                request.input('ProblemeVizualeConstatate', sql.VarChar(499), ProblemeVizualeConstatate);
                return [4 /*yield*/, request.execute('updateIstoricServiceStatus2')];
            case 3:
                _c.sent();
                res.status(200).send('Istoricul a fost actualizat.');
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                console.error(err_1);
                if (err_1 instanceof Error) {
                    res.status(500).send({ error: "eroare la actualizarea istoricului: ".concat(err_1.message) });
                }
                else {
                    console.log('Eroare', err_1);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var actualizareIstoric3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, OperatiuniEfectuate, PieseSchimbate, PieseReparate, AlteProblemeDescoperite, AlteReparatii, DurataReparatie, pool, request, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, OperatiuniEfectuate = _a.OperatiuniEfectuate, PieseSchimbate = _a.PieseSchimbate, PieseReparate = _a.PieseReparate, AlteProblemeDescoperite = _a.AlteProblemeDescoperite, AlteReparatii = _a.AlteReparatii, DurataReparatie = _a.DurataReparatie;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _b.sent();
                request = pool.request();
                request.input('Cod_Istoric', sql.Int, id);
                request.input('OperatiuniEfectuate', sql.VarChar(499), OperatiuniEfectuate);
                request.input('PieseSchimbate', sql.VarChar(499), PieseSchimbate);
                request.input('PieseReparate', sql.VarChar(499), PieseReparate);
                request.input('AlteProblemeDescoperite', sql.VarChar(499), AlteProblemeDescoperite);
                request.input('AlteReparatii', sql.VarChar(499), AlteReparatii);
                request.input('DurataReparatie', sql.Int, DurataReparatie);
                return [4 /*yield*/, request.execute('updateIstoricServiceStatus3')];
            case 3:
                _b.sent();
                res.status(200).send('Istoricul a fost actualizat.');
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                if (err_2 instanceof Error) {
                    res.status(500).send({ error: "eroare la actualizarea istoricului: ".concat(err_2.message) });
                }
                else {
                    console.log('Eroare', err_2);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getIstoricMasina = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pool, request, result, err_3;
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
                return [4 /*yield*/, request.execute('getIstoricMasina')];
            case 3:
                result = _a.sent();
                res.status(200).send(result.recordset);
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
module.exports = {
    actualizareIstoric2: actualizareIstoric2,
    actualizareIstoric3: actualizareIstoric3,
    getIstoricMasina: getIstoricMasina
};
//# sourceMappingURL=controllerIstoric.js.map
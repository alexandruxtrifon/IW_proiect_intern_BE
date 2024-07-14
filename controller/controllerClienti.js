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
exports.adaugareClient = void 0;
var type = require('express/lib/response').type;
var _a = require('../config'), sql = _a.sql, poolPromise = _a.poolPromise;
var adaugareClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Nume, Prenume, Email, NrTel, Activ, telefoane, pool, request, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, Nume = _a.Nume, Prenume = _a.Prenume, Email = _a.Email, NrTel = _a.NrTel, Activ = _a.Activ;
                //console.log(typeof Email)
                //console.log(typeof NrTel)
                if (!Nume || !Prenume || !Activ === undefined) {
                    res.status(400).json({ error: 'Numele, prenumele, si statusul sunt obligatorii' });
                    return [2 /*return*/];
                }
                if (typeof Activ !== 'boolean' && Activ !== 1 && Activ !== 0) {
                    res.status(400).json({ error: 'Statusul trebuie sa fie  0/1.' });
                    return [2 /*return*/];
                }
                if (!Email && (!Array.isArray(NrTel) || NrTel.length === 0)) {
                    res.status(400).json({ error: 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon.' });
                    return [2 /*return*/];
                }
                if (NrTel && (!Array.isArray(NrTel) || NrTel.some(function (nr) { return typeof nr !== 'string'; }))) {
                    res.status(400).json({ error: 'NrTel trebuie să fie un array de string-uri.' });
                    return [2 /*return*/];
                }
                if (!req.body.hasOwnProperty('Email') && !req.body.hasOwnProperty('NrTel')) {
                    res.status(400).json({ error: 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon' });
                    return [2 /*return*/];
                }
                telefoane = NrTel ? NrTel.join(',') : null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _b.sent();
                request = pool.request();
                request.input('Nume', sql.VarChar(30), Nume);
                request.input('Prenume', sql.VarChar(30), Prenume);
                request.input('Email', sql.VarChar(50), Email);
                request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
                request.input('Activ', sql.Bit, Activ);
                return [4 /*yield*/, request.execute('InsertClient2')];
            case 3:
                _b.sent();
                res.status(201).send({ message: 'Clientul a fost adaugat cu succes' });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1);
                if (err_1 instanceof Error) {
                    res.status(500).send({ error: "".concat(err_1.message) });
                }
                else {
                    console.log('eroare:', err_1);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adaugareClient = adaugareClient;
var actualizareClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, Nume, Prenume, Email /*, NrTel, Activ*/, pool, request, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, Nume = _a.Nume, Prenume = _a.Prenume, Email = _a.Email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _b.sent();
                request = pool.request();
                request.input('Cod_Client', sql.Int, id);
                request.input('Nume', sql.VarChar(30), Nume || null);
                request.input('Prenume', sql.VarChar(30), Prenume || null);
                request.input('Email', sql.VarChar(50), Email || null);
                //request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
                //request.input('Activ', sql.Bit, Activ || null);
                return [4 /*yield*/, request.execute('UpdateClient')];
            case 3:
                //request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
                //request.input('Activ', sql.Bit, Activ || null);
                _b.sent();
                res.status(200).json({ message: 'Clientul a fost actualizat cu succes' });
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
var execStatusClient = function (req, res, procedureName, mesaj) { return __awaiter(void 0, void 0, void 0, function () {
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
                request.input('Cod_Client', sql.Int, id);
                return [4 /*yield*/, request.execute(procedureName)];
            case 3:
                result = _a.sent();
                res.status(200).json({ message: mesaj });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.error(err_3);
                if (err_3 instanceof Error) {
                    res.status(500).send("A avut loc o eroare: ".concat(err_3.message));
                }
                else {
                    console.log(err_3);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var dezactivareClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execStatusClient(req, res, 'dezactivareClient', 'Clientul a fost dezactivat')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var activareClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execStatusClient(req, res, 'activareClient', 'Clientul a fost activat')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var execGetClienti = function (req, res, procedureName) { return __awaiter(void 0, void 0, void 0, function () {
    var pool, request, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, poolPromise];
            case 1:
                pool = _a.sent();
                request = pool.request();
                return [4 /*yield*/, request.execute(procedureName)];
            case 2:
                result = _a.sent();
                res.status(200).send(result.recordset);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                if (err_4 instanceof Error) {
                    res.status(500).send("A avut loc o eroare: ".concat(err_4.message));
                }
                else {
                    console.log(err_4);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var execGetTelefoane = function (req, res, procedureName) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pool, request, result, err_5;
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
                request.input('Cod_Client', sql.Int, id);
                return [4 /*yield*/, request.execute(procedureName)];
            case 3:
                result = _a.sent();
                res.status(200).send(result.recordset);
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                console.error(err_5);
                if (err_5 instanceof Error) {
                    res.status(500).send("A avut loc o eroare: ".concat(err_5.message));
                }
                else {
                    console.log(err_5);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var execActualizareTelefonClient = function (req, res, procedureName) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idClient, idTelefon, NrTel, pool, request, result, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, idClient = _a.idClient, idTelefon = _a.idTelefon;
                NrTel = req.body.NrTel;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, poolPromise];
            case 2:
                pool = _b.sent();
                request = pool.request();
                request.input('Cod_Client', sql.Int, idClient);
                request.input('Cod_Telefon', sql.Int, idTelefon);
                request.input('NrTel', sql.VarChar(50), NrTel);
                return [4 /*yield*/, request.execute(procedureName)];
            case 3:
                result = _b.sent();
                //res.status(200).send(result.recordset);
                res.status(200).json({ message: 'Telefonul a fost actualizat' });
                return [3 /*break*/, 5];
            case 4:
                err_6 = _b.sent();
                console.error(err_6);
                if (err_6 instanceof Error) {
                    res.status(500).send("A avut loc o eroare: ".concat(err_6.message));
                }
                else {
                    console.log(err_6);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getClienti = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execGetClienti(req, res, 'getClientiInternal')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getClientiActivi = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execGetClienti(req, res, 'getClientiActivi')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getClientiInactivi = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execGetClienti(req, res, 'getClientiInactivi')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getTelefonClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //const {id} = req.params;
            return [4 /*yield*/, execGetTelefoane(req, res, 'getTelefoaneClient')];
            case 1:
                //const {id} = req.params;
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var actualizareTelefonClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execActualizareTelefonClient(req, res, 'actualizareTelefonClient')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
module.exports = {
    adaugareClient: exports.adaugareClient,
    actualizareClient: actualizareClient,
    dezactivareClient: dezactivareClient,
    getClienti: getClienti,
    getClientiActivi: getClientiActivi,
    getClientiInactivi: getClientiInactivi,
    getTelefonClient: getTelefonClient,
    actualizareTelefonClient: actualizareTelefonClient,
    activareClient: activareClient
};
//# sourceMappingURL=controllerClienti.js.map
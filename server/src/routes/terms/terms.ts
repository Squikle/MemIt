import express from "express";
import {addOrUpdateTerm, getById, getBySetId, removeTerm} from "../../controllers/termsController";

const router = express.Router();

router.get("/", (req, res) => {
    let setId = req.query.setId as string;

    let terms = getBySetId(setId);
    if (!terms || terms.length <= 0) {
        res.sendStatus(404);
        return;
    }

    res.json(terms);
});

router.get("/:termId", (req, res) => {
    let termId = req.params.termId;

    let term = getById(termId);
    if (!term) {
        res.sendStatus(404);
        return;
    }

    res.json(term);
});

router.put("/", (req, res, next) => {
    let termId = addOrUpdateTerm({...req.body});
    res.json({id: termId});
});

router.delete("/:termId", (req, res, next) => {
    let termId = removeTerm(req.params.termId);
    res.json({id: termId});
});

export default router;
import express from "express";
import {addOrUpdateTerm, getById, getBySetId, removeTerm} from "../../controllers/termsController";
import {toDomain} from "./convertor";

const router = express.Router();

router.get("/", async (req, res) => {
    const setId = req.query.setId as string;

    let terms = await getBySetId(setId);
    if (!terms || terms.length <= 0) {
        res.sendStatus(404);
        return;
    }

    res.json(terms);
});

router.get("/:termId", async (req, res) => {
    let termId = req.params.termId;

    let term = await getById(termId);
    if (!term) {
        res.sendStatus(404);
        return;
    }

    res.json(term);
});

router.put("/", async (req, res, next) => {
    let termId = await addOrUpdateTerm(toDomain(req.body));
    res.json({id: termId});
});

router.delete("/:termId", async (req, res, next) => {
    let termId = await removeTerm(req.params.termId);
    res.json({id: termId});
});

export default router;
import express from "express";
import {addSet, editSet, getAll, removeSet} from "../../controllers/setsController";
import toDto from "./convertor";
import TermsSet from "../../@types/domain/TermsSet";

const router = express.Router();

router.get("/", (req, res) => {
    let sets: TermsSet[] = getAll();
    if (!sets || sets.length <= 0) {
        res.sendStatus(404);
        return;
    }

    res.json(sets.map(x => toDto(x)));
});

router.post("/", (req, res, next) => {
    let setId = addSet({...req.body});
    res.json({id: setId});
});

router.put("/:termId", (req, res, next) => {
    let setId = editSet({...req.body});
    res.json({id: setId});
});

router.delete("/:termId", (req, res, next) => {
    let setId = removeSet(req.params.termId);
    res.json({id: setId});
});

export default router;
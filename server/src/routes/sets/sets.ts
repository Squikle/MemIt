import express from "express";
import {addSet, editSet, getAll, removeSet} from "../../controllers/setsController";
import TermsSet from "../../@types/domain/TermsSet";
import {toDomain, toDto} from "./convertor";

const router = express.Router();

router.get("/", async (req, res) => {
    let sets: TermsSet[] = await getAll();
    if (!sets || sets.length <= 0) {
        res.sendStatus(404);
        return;
    }

    res.json(sets.map(x => toDto(x)));
});

router.post("/", async (req, res, next) => {
    let setId = await addSet(toDomain(req.body, req.userId));
    res.json({id: setId});
});

router.put("/:termId", async (req, res, next) => {
    let setId = await editSet(toDomain(req.body, req.userId));
    res.json({id: setId});
});

router.delete("/:termId", async (req, res, next) => {
    let setId = await removeSet(req.params.termId);
    res.json({id: setId});
});

export default router;
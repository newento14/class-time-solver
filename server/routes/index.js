import { Router } from "express";
import Bard from "bard-ai";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { message, cookie } = req.body;

    const bard = new Bard(cookie);
    return res.json(await bard.ask(message));
  } catch (e) {
    console.log(e);
  }
});

router.post("/withImage", async (req, res) => {
  try {
    console.log(req.body);
    const { image, message, cookie } = req.body;

    const imageBuffer = await fetch(image).then((res) => res.arrayBuffer());
    const bard = new Bard(cookie);
    return res.json(
      await bard.ask(message, {
        image: imageBuffer,
      })
    );
  } catch (e) {
    console.log(e);
  }
});

export default router;

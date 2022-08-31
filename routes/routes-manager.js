const
    express = require('express'),
    router = express.Router(),
    generatorAPI = require('../src/generatorAPI');

// Health check
router.get('/', (req, res) => {
    res.send("Robin Server is running.")
});

// Process the presence event

router.get("/options/", generatorAPI.initGenerator);
router.get("/vault/", generatorAPI.handleVaultOptions);
router.post('/', generatorAPI.executeGenerator);
router.post("/vault/", generatorAPI.handleVaultOperations)


module.exports = router;
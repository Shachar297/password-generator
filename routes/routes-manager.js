const
    express = require('express'),
    router = express.Router(),
    generatorAPI = require('../src/generatorAPI');

// Health check
router.get('/', (req, res) => {
    res.send("Robin Server is running.")
});

// Process the presence event
router.post('/', generatorAPI.executeGenerator);

router.get("/options/", generatorAPI.executeGenerator);

module.exports = router;
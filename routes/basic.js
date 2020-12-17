const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', (req, res) => {
    let reportId = process.env.BASIC_REPORT_ID;
    let url = process.env.AZURE_FUNCTION_URL;
    let report = {
        reportId: reportId,
    };
    let headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let opts = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(report)
    }
    fetch(url, opts)
        .then(response => response.json())
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err)
        });
});

module.exports = router;

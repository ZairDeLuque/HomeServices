function hostAlready(req, res){
    console.log(`[LOG] Request: (${req.ip}) to '${req.url}': [${req.method}].`);
    res.send('HomeWork status active. <br><br>API Version: 0.4-rca001323 | Aurora Services: 120.23.53.103-lolliepop');
}

function errorDir(req, res){
    console.log(`[LOG] Request: (${req.ip}) to '${req.url}': [Not found].`);
    res.status(404).send('NTD-Server: Not Found.');
}

module.exports = {
    main: hostAlready,
    notfound: errorDir
}
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3140;
app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
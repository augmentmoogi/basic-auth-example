require('dotenv').config()


const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;


module.exports = {
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID
}
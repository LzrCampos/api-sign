const moment = require('moment');

exports.sessionTimeout = lastLogin => {
    const dateNow = moment();
    const loginDate = moment(lastLogin);

    if (dateNow.diff(loginDate, 'minutes') > 30) {
        return false;
    }
    return true;
};

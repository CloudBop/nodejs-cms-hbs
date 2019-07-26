const moment = require('moment')

module.exports = {
    // (arg1, arg2= data inside of loop)
    select: function(selected, options){
        // replace string regex if value === selected
        return options.fn(this).replace(new RegExp(' value=\"'+ selected + '\"'), '$&selected="selected"');
    },
    generateDate: function(date, format){
        return moment(date).format(format)
    }

}
const moment = require('moment');

module.exports = {
  // (arg1, arg2= data inside of loop)
  select: function(selected, options) {
    // replace string regex if value === selected
    return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$&selected="selected"');
  },
  generateDate: function(date, format) {
    return moment(date).format(format);
  },
  paginate: function(options) {
    console.log(options);
  }
};
//  example options
// {
//     name: 'paginate',
//     hash: { current: 1 },
//     fn: [Function: prog] { program: 3, depth: 0, blockParams: 0 },
//     inverse: [Function: noop],
//     data: {
//       exphbs: {
//         cache: false,
//         view: 'home/index',
//         layout: 'home',
//         data: undefined,
//         helpers: [Object],
//         partials: [Object],
//         filePath: '/Users/colinrowntree/Web Development/Active NPM Projects/nodejs-cms-hbs/views/home/index.handlebars'
//       },
//       _parent: { exphbs: [Object] },
//       root: {
//         settings: [Object],
//         layout: 'home',
//         success_message: [],
//         error_message: [],
//         form_errors: [],
//         user: null,
//         error: [],
//         posts: [Array],
//         categories: [],
//         _locals: [Object: null prototype],
//         cache: false
//       }
//     },
//     loc: { start: { line: 30, column: 6 }, end: { line: 30, column: 43 } }

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
    // console.log(options.hash);
    // { pages: 14, current: 10 }
    let output = '';
    // left-most btn ui
    if (options.hash.current === 1) {
      // disable
      output += `<li class="page-item disabled"><a class="page-link">First</a></li>`;
    } else {
      output += `<li class="page-item"><a href="?page=1" class="page-link">First</a></li>`;
    }

    let i = Number(options.hash.current) > 5 ? Number(options.hash.current) - 4 : 1;
    // if selected paginate is greater than 5 from 1 add in ...
    if (i !== 1) {
      output += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
    }
    // loop from i to create paginator number ui
    for (; i <= Number(options.hash.current) + 4 && i <= options.hash.pages; i++) {
      //
      if (i === options.hash.current) {
        output += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
      } else {
        output += `<li class="page-item "><a href="?page=${i}" class="page-link">${i}</a></li>`;
      }
      // if paginate more than 5 pages from the end add ...
      if (i === Number(options.hash.current) + 4 && i < options.hash.pages) {
        output += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
      }
    }
    // if last paginator page
    if (options.hash.current === options.hash.pages) {
      output += `<li class="page-item disabled"><a class="page-link">Last</a></li>`;
    } else {
      output += `<li class="page-item "><a href="?page=${options.hash.pages}" class="page-link">Last</a></li>`;
    }

    return output;
  },
  paginateOld: function(options) {
    // console.log(options);
    let output = '';
    //
    if (options.hash.current === 1) {
      //
      output += `<li class="page-item disabled"> <a class="page-link">First </a> </li>`;
    } else {
      //
      output += `<li class="page-item"> <a href="?page=1" class="page-link">Second </a> </li>`;
    }
    // if we go over 5 pages of pagination...
    let i = Number(options.hash.current) > 5 ? Number(options.hash.current) - 4 : 1;
    // add the ... link to begging of pagination ui
    if (i !== 1) {
      output += `<li class=""page-item disabled> <a class="page-link">...</a> </li>`;
    }
    //
    for (; i <= Number(options.hash.current) + 4 && i <= options.hash.pages; i++) {
      if (i === options.hash.current) {
        output += `<li class="page-item active"> <a class="page-link"> ${i} </a> </li>`;
      } else {
        output += `<li class="page-item"> <a href="?page${i}" class="page-link"> ${i} </a> </li>`;
      }
    }
    //  append dots...
    if (i === Number(options.hash.current) + 4 && i < options.hash.pages) {
      output += `<li class=""page-item disabled> <a class="page-link">...</a> </li>`;
    }
    // end
    if (options.hash.current === options.hash.pages) {
      output += `<li class="page-item disabled"> <a class="page-link">Last</a> </li>`;
    } else {
      output += `<li class="page-item"> <a href="?page${options.hash.pages}" class="page-link"> Last </a> </li>`;
    }

    return output;
  }
};
//  example console.log(options)
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

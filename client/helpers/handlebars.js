Handlebars.registerHelper('dateAsTimeAgo', function(unixTimestamp) {
  return moment(unixTimestamp).fromNow();
});
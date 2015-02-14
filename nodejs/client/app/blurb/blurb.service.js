'use strict';

angular.module('nodejsApp')
  .service('Blurb', function Blurb() {
    this.getBlurb = function(pastMS) {
      var date = new Date(pastMS);
      var bc = date.getFullYear() < 0;
      var validBlurbs = [];
      var prefix = ['That\'s', 'Which is', 'That would be'];
      
      // is last...
      if (date.isLastWeek()) { validBlurbs.push({blurb: 'just last week, actually', reason: ''}); }
      if (date.isLastMonth()) { validBlurbs.push({blurb: 'not too long, just last month', reason: ''}); }
      if (date.isLastYear()) { validBlurbs.push({blurb: 'last year, which is a bit much all told', reason: ''}); }
      
      // relative
      
      // historic
      if (date.isBefore('July 4, 1776')) { validBlurbs.push({blurb: 'before America was even a country', reason: '(before July 4, 1776)'}); }
      
      // pre-historic
      if (bc && (-date.getFullYear() > 8000) && (-date.getFullYear() <= 10000)) { validBlurbs.push({blurb: 'around when humans first figured out agriculture', reason: '(10,000-8,000 BC)'}); }
      if (bc && (-date.getFullYear() > 10000)) { validBlurbs.push({blurb: 'before there were farmers', reason: '(estimated start of agriculture: 10,000 BC)'}); }
      
      // precise
  
      // fallback
      if (validBlurbs.length === 0) { validBlurbs.push({blurb: 'not very interesting, it seems', reason: '(no data found)'}); }
      
      var result = validBlurbs.last();
      return prefix.sample() + ' ' + result.blurb + ' ' + result.reason;
    };
  
  });

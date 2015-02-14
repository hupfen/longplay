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
      if (date.isLastYear()) { validBlurbs.push({blurb: 'last year, which is... a bit much for one video, all told', reason: ''}); }
      
      // relative
      
      // historic
      if (date.isBefore('February 14, 2005')) { validBlurbs.push({blurb: 'before YouTube even existed', reason: '(YouTube founded Feb. 14 2005)'}); }
      if (date.isBefore('July 4, 1934') && date.isAfter('November 7, 1867')) { validBlurbs.push({blurb: 'during Marie Curie\'s lifetime', reason: '(born Nov. 7, 1867; died July 4, 1934)'}); }
      if (date.isBefore('July 4, 1776')) { validBlurbs.push({blurb: 'before America was even a country', reason: '(before July 4, 1776)'}); }
      
      // pre-historic
      if (bc && (-date.getFullYear() > 3400) && (-date.getFullYear() <= 3500)) { validBlurbs.push({blurb: 'about the beginning of history', reason: '(writing invented between 3400-3500 BC)'}); }
      if (bc && (-date.getFullYear() > 3500)) { validBlurbs.push({blurb: 'before history', reason: '(writing invented between 3400-3500 BC, considered beginning of history)'}); }
      if (bc && (-date.getFullYear() > 8000) && (-date.getFullYear() <= 10000)) { validBlurbs.push({blurb: 'around when humans first figured out agriculture', reason: '(10,000-8,000 BC)'}); }
      if (bc && (-date.getFullYear() > 10000)) { validBlurbs.push({blurb: 'before there were farmers', reason: '(estimated start of agriculture: 10,000 BC)'}); }
      
      // precise
      if (date.is('December 5, 2013')) { validBlurbs.push({blurb: 'when Nelson Mandela passed away', reason: '(18 July 1918 – 5 December 2013)'}); }
      if (date.is('March 19, 2013')) { validBlurbs.push({blurb: 'the day Pope Francis was inaugurated', reason: '(elected March 13, 2013)'}); }
      if (date.is('October 31, 2011')) { validBlurbs.push({blurb: 'when we hit 7 billion people on Earth', reason: '(as declared by the UN)'}); }

      if (date.is('October 2, 1987')) { validBlurbs.push({blurb: 'my birthday! :D', reason: '(which isn\'t too long ago, right?)'}); }
      
      if (date.is('April 30, 1789')) { validBlurbs.push({blurb: 'the day of George Washington\'s first inauguration', reason: '(his term started March 4th)'}); }
  
      // fallback
      if (validBlurbs.length === 0) { validBlurbs.push({blurb: 'not very interesting, it seems', reason: '(no data found)'}); }
      
      var result = validBlurbs.last();
      return prefix.sample() + ' ' + result.blurb + (result.reason.length > 0 ? ' ' : '') + result.reason;
    };
  
  });

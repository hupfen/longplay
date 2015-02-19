'use strict';

angular.module('nodejsApp')
  .service('Blurb', function Blurb($firebase) {
  
    this.getBlurb = function(pastMS) {
      
      var date = new Date(pastMS);
      var bc = date.getFullYear() < 0;
      var validBlurbs = [];
      var prefix = ['That\'s', 'Which is', 'That would be'];
      
      // is last...
      if (date.isLastWeek()) { validBlurbs.push({blurb: 'just last week, actually', reason: ''}); }
      if (date.isLastMonth()) { validBlurbs.push({blurb: 'not too long, just last month', reason: ''}); }
      if (date.isLastYear()) { validBlurbs.push({blurb: 'last year, which is... a bit much for one video, all told', reason: ''}); }
      if (date.isAfter(Date.create().addYears(-10))) { validBlurbs.push({blurb: 'over a year, but within the last decade, at least', reason: ''}); }
      
      // relative
      if (date.isBefore(Date.create().addYears(-10)) && date.isAfter(Date.create().addYears(-17)) ) { validBlurbs.push({blurb: 'going through puberty', reason: '(begins 10-11 in girls; typically ends by age 17)'}); }
      if (date.isBefore(Date.create().addYears(-15)) && date.isAfter(Date.create().addYears(-120))) { validBlurbs.push({blurb: 'old enough to drive in the US', reason: '(varies by state; learner\'s permit usually available by age 15)'}); }
      if (date.isBefore(Date.create().addYears(-18)) && date.isAfter(Date.create().addYears(-120))) { validBlurbs.push({blurb: 'old enough to vote', reason: '(varies from 16 to 21, but 18 in US and most countries)'}); }
      if (date.isBefore(Date.create().addYears(-35)) && date.isAfter(Date.create().addYears(-120))) { validBlurbs.push({blurb: 'old enough to be president', reason: '(35 years old, as per Article II, Section 1, Clause 5 of the US Constitution)'}); }
      if (date.isBefore(Date.create().addYears(-230))) { validBlurbs.push({blurb: 'longer than one combined second of human experience', reason: '(roughly 7.28 billion seconds)'}); }
      
      // historic
      // 2000s
      if (date.isBefore('January 20, 2009')) { validBlurbs.push({blurb: 'before Barack Obama became US President', reason: '(inaugurated Jan. 20, 2009)'}); }
      if (date.isBefore('February 14, 2005')) { validBlurbs.push({blurb: 'before YouTube even existed', reason: '(YouTube founded Feb. 14 2005)'}); }
      // 1990s
      // 1980s
      if (date.isBefore('October 2, 1987')) { validBlurbs.push({blurb: 'before I was born', reason: '(Zoe, not this website)'}); }
      // 1970s
      // 1960s
      // 1950s
      if (date.isBefore('August 21, 1959')) { validBlurbs.push({blurb: 'before the US had 50 states', reason: '(Hawaii joined union August 21, 1959)'}); }
      // 1940s
      if (date.isBefore('14 August 1945') && date.isAfter('1 September 1939')) { validBlurbs.push({blurb: 'during World War II', reason: '(began 1 September 1939, Armistice Day 14 August 1945)'}); }
      // 1930s
      if (date.isBefore('1 September 1939')) { validBlurbs.push({blurb: 'before World War II', reason: '(began 1 September 1939, Armistice Day 14 August 1945)'}); }
      if (date.isBefore('September 1, 1939') && date.isAfter('October 29, 1929')) { validBlurbs.push({blurb: 'during the Great Depression', reason: '(from Black Friday, Oct. 29 1929, to start of WWII)'}); }
      if (date.isBefore('July 4, 1934') && date.isAfter('November 7, 1867')) { validBlurbs.push({blurb: 'during Marie Curie\'s lifetime', reason: '(born Nov. 7, 1867; died July 4, 1934)'}); }
      if (date.isBefore('July 7, 1930') && date.isAfter('May 22, 1859')) { validBlurbs.push({blurb: 'during Sir Arthur Conan Doyle\'s lifetime', reason: '(22 May 1859 – 7 July 1930)'}); }
      // 1920s 
      // 1910s
      if (date.isBefore('11 November 1918') && date.isAfter('28 July 1914')) { validBlurbs.push({blurb: 'during World War I', reason: '(began 28 July 1914, lasted to 11 Nov. 1918)'}); }
      if (date.isBefore('28 July 1914')) { validBlurbs.push({blurb: 'before World War I broke out', reason: '(began 28 July 1914, lasted to 11 Nov. 1918)'}); }
      // 1900s
      if (date.isBefore('22 January 1901') && date.isAfter('20 June 1837')) { validBlurbs.push({blurb: 'during the Victorian era in Britain', reason: '(20 June 1837 to 22 January 1901)'}); }
      // 1800s
      if (date.isBefore('April 6, 1898')) { validBlurbs.push({blurb: 'before the modern Olympics started up', reason: '(Games of the I Olympiad started April 6, 1898)'}); }
      if (date.isBefore('January 26, 1837') && date.isAfter('June 15, 1836')) { validBlurbs.push({blurb: 'when America was half its current size', reason: '(#25 Arkansas joined June 15, 1836, #26 Michigan joined Jan. 26, 1837)'}); }
      if (date.isBefore('June 15, 1836') && date.isAfter('July 4, 1776')) { validBlurbs.push({blurb: 'before America was even half its current size', reason: '(#25 Arkansas joined union June 15, 1836)'}); }
      if (date.isBefore('August 6, 1806') && date.isAfter('962')) { validBlurbs.push({blurb: 'during the existence of the Holy Roman Empire', reason: '(Otto I crowned in 962, Francis II abdicated August 6 1806)'}); }
      // 1700s
      if (date.isBefore('July 4, 1776')) { validBlurbs.push({blurb: 'before America was even a country', reason: '(before July 4, 1776)'}); }
      if (date.isBefore('1700') && date.isAfter('1300')) { validBlurbs.push({blurb: 'during the Renaissance', reason: '(generally considered 14th to 17th centuries)'}); }
      // 1600s
      // 1500s
      if (date.isBefore('1500') && date.isAfter('400')) { validBlurbs.push({blurb: 'during the Middle Ages', reason: '(generally considered 5th to 15th centuries)'}); }
      // 1400s
      // 1300s
      if (date.isBefore('1350') && date.isAfter('1347')) { validBlurbs.push({blurb: 'during the Black Death plague in Europe', reason: '(do be careful)'}); }
      // 1200s
      // 1100s
      // 1000s
      // 900s
      // 800s
      // 700s
      // 600s
      // 500 to 0AD
      if (!bc && date.isBefore('476')) { validBlurbs.push({blurb: 'during the Roman Empire', reason: '(27 BC to 476 AD)'}); }
      if (!bc && date.isBefore('393')) { validBlurbs.push({blurb: 'when they still did the original Olympics', reason: '(776 BC to 393 AD)'}); }
      
      // pre-historic
      if (bc && (-date.getFullYear() <= 27)) { validBlurbs.push({blurb: 'during the Roman Empire', reason: '(27 BC to 476 AD)'}); }
      if (bc && (-date.getFullYear() > 27) && (-date.getFullYear() <= 509)) { validBlurbs.push({blurb: 'during the Roman Republic', reason: '(precursor to Roman Empire; 509-27 BC)'}); }
      if (bc && (-date.getFullYear() > 509)) { validBlurbs.push({blurb: 'before the Roman Republic', reason: '(began 509 BC)'}); }
      if (bc && (-date.getFullYear() <= 776)) { validBlurbs.push({blurb: 'when they still did the original Olympics', reason: '(776 BC to 393 AD)'}); }
      if (bc && (-date.getFullYear() > 3400) && (-date.getFullYear() <= 3500)) { validBlurbs.push({blurb: 'about the beginning of history', reason: '(writing invented between 3400-3500 BC)'}); }
      if (bc && (-date.getFullYear() > 3500)) { validBlurbs.push({blurb: 'before history', reason: '(writing invented between 3400-3500 BC, considered beginning of history)'}); }
      if (bc && (-date.getFullYear() > 8000) && (-date.getFullYear() <= 10000)) { validBlurbs.push({blurb: 'around when humans first figured out agriculture', reason: '(10,000-8,000 BC)'}); }
      if (bc && (-date.getFullYear() > 10000)) { validBlurbs.push({blurb: 'before there were farmers', reason: '(estimated start of agriculture: 10,000 BC)'}); }
      
      // precise
      if (date.is('December 5, 2013')) { validBlurbs.push({blurb: 'when Nelson Mandela passed away', reason: '(18 July 1918 – 5 December 2013)'}); }
      if (date.is('March 19, 2013')) { validBlurbs.push({blurb: 'the day Pope Francis was inaugurated', reason: '(elected March 13, 2013)'}); }
      if (date.is('October 31, 2011')) { validBlurbs.push({blurb: 'when we hit 7 billion people on Earth', reason: '(as declared by the UN)'}); }
      if (date.is('February 14, 2005')) { validBlurbs.push({blurb: 'the day YouTube was founded', reason: '(YouTube founded Feb. 14 2005)'}); }
      if (date.is('September 25, 2004')) { validBlurbs.push({blurb: 'when Idaho became center of the universe', reason: '(as declared by the Mayor of Wallace, Idaho)'}); }

      if (date.is('October 2, 1987')) { validBlurbs.push({blurb: 'my birthday! :D', reason: '(which isn\'t too long ago, right?)'}); }
      if (date.is('February 14, 1859')) { validBlurbs.push({blurb: 'the day Oregon became a US state', reason: '(my home state! <3 PDX)'}); }
      
      if (date.is('April 30, 1789')) { validBlurbs.push({blurb: 'the day of George Washington\'s first inauguration', reason: '(his term started March 4th)'}); }
  
      // fallback
      if (validBlurbs.length === 0) { validBlurbs.push({blurb: 'not very interesting, it seems', reason: '(no data found)'}); }
      
      var result = validBlurbs.sample();
      return prefix.sample() + ' ' + result.blurb + (result.reason.length > 0 ? ' ' : '') + result.reason;
    };
  
  });

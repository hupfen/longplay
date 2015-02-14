'use strict';

describe('Service: Blurb', function () {

  // load the service's module
  beforeEach(module('nodejsApp'));

  // instantiate service
  var Blurb;
  beforeEach(inject(function (_Blurb_) {
    Blurb = _Blurb_;
  }));

  it('should do something', function () {
    expect(!!Blurb).toBe(true);
  });

});

describe('snackbar', function() {

  var
    snackbar,
    mockSnackbar = { baz: 'boom' },
    mockTemplateCache,
    mockTimeout,
    mockRootScope,
    mockScope = { foo: 'bar' },
    mockDocument,
    mockCompile,
    compileStub,
    mockAnimate;

  beforeEach(module('ch.Snackbar'));

  beforeEach(module(function($provide) {
    mockRootScope = {
      $new: sinon.stub()
    };
    mockRootScope.$new.returns(mockScope);

    mockTemplateCache = {
      put: sinon.spy(),
      get: sinon.spy()
    };

    mockTimeout = sinon.spy();

    mockDocument = {
      find: sinon.spy()
    };

    compileStub = sinon.stub();
    compileStub.returns(mockSnackbar);
    mockCompile = sinon.stub();
    mockCompile.returns(compileStub);

    mockAnimate = {
      enter: sinon.spy(),
      leave: sinon.spy()
    };

    $provide.value('$templateCache', mockTemplateCache);
    $provide.value('$rootScope', mockRootScope);
    $provide.value('$timeout', mockTimeout);
    $provide.value('$document', mockDocument);
    $provide.value('$compile', mockCompile);
    $provide.value('$animate', mockAnimate);
  }));

  beforeEach(inject(function($injector) {
    snackbar = $injector.get('snackbar');
  }));

  it('should exist', function() {
    expect(snackbar).to.not.be.undefined;
  });

  describe('init', function() {
    it('should get the correct template', function() {
      expect(mockTemplateCache.get.calledWith('snackbar.html')).to.be.true;
    });

    it('should create a new scope', function() {
      expect(mockRootScope.$new).to.have.been.called;
    });

    it('should find the body from the document', function() {
      expect(mockDocument.find.calledWith('body')).to.be.true
    });
  });

  describe('success()', function() {
    var
      message = 'success!';

    beforeEach(function() {
      snackbar.success(message);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    it('should default color to green', function() {
      expect(mockScope.styles.wrapper['background-color']).to.equal('#5cb85c');
    });

  });

  describe('error()', function() {
    var
      message = 'error!';

    beforeEach(function() {
      snackbar.error(message);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    it('should default color to red', function() {
      expect(mockScope.styles.wrapper['background-color']).to.equal('#d9534f');
    });
  });

  describe('loading()', function() {
    var
      message = 'loading...';

    beforeEach(function() {
      snackbar.loading(message);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    it('should default color to blue', function() {
      expect(mockScope.styles.wrapper['background-color']).to.equal('#428bca');
    });

    it('should not set a timeout', function() {
      expect(mockTimeout.called).to.be.false;
    });

    it('should set loading on scope to true', function() {
      expect(mockScope.loading).to.be.true;
    });
  });

  describe('notice()', function() {
    var
      message = 'foobar!';

    beforeEach(function() {
      snackbar.notice(message);
    });

    it('should compile the template with the correct scope', function() {
      expect(mockCompile).to.have.been.called;
      expect(compileStub.calledWith(mockScope)).to.be.true;
    });

    it('should timeout the snackbar to pop out after 4 seconds', function() {
      expect(mockTimeout.getCall(0).args[1]).to.equal(4000);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    describe('styles', function() {
      it('should set the styles on the scope', function() {
        expect(mockScope.styles).to.not.be.undefined;
      });

      it('should set the position on the scope', function() {
        expect(mockScope.position).to.not.be.undefined;
      });

      it('should default the position to bottom left', function() {
        expect(mockScope.position).to.equal('snackbar-bottom-left');
      });

      it('should default color to our dark gray', function() {
        expect(mockScope.styles.wrapper['background-color']).to.equal('#333');
      });
    });

  });

});
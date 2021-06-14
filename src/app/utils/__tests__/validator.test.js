const validator = require('../validator');

describe('Validator utils', () => {
  describe('validate presence', () => {
    it('should return null on empty required params array', () => {
      const invalidParams = validator.validatePresence({
        name: 'test',
        email: 'test@email.com',
      });
      expect(invalidParams).toEqual(null);
    });

    it('should return null if body contains required params', () => {
      const invalidParams = validator.validatePresence({
        name: 'test',
        email: 'test@email.com',
      }, ['name', 'email']);
      expect(invalidParams).toEqual(null);
    });

    it('should pass if required params are not missing', () => {
      const invalidParams = validator.validatePresence({
        name: 'test',
        email: 'test@email.com',
      }, ['name']);
      expect(invalidParams).toEqual(null);
    });

    it('should not pass if required params is missing', () => {
      const invalidParams = validator.validatePresence({
        name: 'test',
      }, ['name', 'email']);
      expect(invalidParams).toEqual('Missing required params: email');
    });

    it('should not pass if required params is missing with not required params', () => {
      const invalidParams = validator.validatePresence({
        email: 'test@test.com',
      }, ['name']);
      expect(invalidParams).toEqual('Missing required params: name');
    });

    it('should not pass if required params is missing and body is empty', () => {
      const invalidParams = validator.validatePresence({}, ['name']);
      expect(invalidParams).toEqual('Missing body or body is empty');
    });

    it('should not pass if required params is missing and body is null', () => {
      const invalidParams = validator.validatePresence(null, ['name']);
      expect(invalidParams).toEqual('Missing body or body is empty');
    });
  });

  describe('validate email', () => {
    it('should pass email validation', () => {
      const errorMessage = validator.validateEmail('test@email.com.br');
      expect(errorMessage).toEqual(null);
    });

    it('should fail on format validation', () => {
      let errorMessage;
      errorMessage = validator.validateEmail('test@email');
      expect(errorMessage).toEqual('Email format is invalid');
      errorMessage = null;

      errorMessage = validator.validateEmail('test');
      expect(errorMessage).toEqual('Email format is invalid');
      errorMessage = null;

      errorMessage = validator.validateEmail('test#$@!');
      expect(errorMessage).toEqual('Email format is invalid');
      errorMessage = null;

      errorMessage = validator.validateEmail('Johnny~/@123.com');
      expect(errorMessage).toEqual('Email format is invalid');
      errorMessage = null;
    });

    it('should fail on null email', () => {
      const errorMessage = validator.validateEmail();
      expect(errorMessage).toEqual('Email can\'t be null');
    });
  });

  describe('validate name', () => {
    it('should pass on validate name', () => {
      const errorMessage = validator.validateName('User Tester');
      expect(errorMessage).toEqual(null);
    });

    it('should pass on validate name with 2 or more names', () => {
      let errorMessage;
      errorMessage = validator.validateName('User Tester Silva');
      expect(errorMessage).toEqual(null);

      errorMessage = validator.validateName('User Tester Silva Son of Tester');
      expect(errorMessage).toEqual(null);
    });

    it('should fail on validate name with one name only', () => {
      const errorMessage = validator.validateName('User');
      expect(errorMessage).toEqual('Name must contain at least 2 names');
    });

    it('should fail on validate null', () => {
      const errorMessage = validator.validateName();
      expect(errorMessage).toEqual('Name can\'t be null');
    });
  });
});

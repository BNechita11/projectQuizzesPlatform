import { expect } from 'chai';
import User from '../../models/User.js';

describe('User Model Role Validation', () => {
  it('should throw an error if role is invalid', async () => {
    const invalidUserData = {
      username: 'testuser2',
      password: 'testpassword',
      role: 'invalidRole', 
    };

    const user = new User(invalidUserData);

    try {
      await user.validate(); 
      throw new Error('Validation passed with invalid role'); 
    } catch (err) {
      expect(err.errors.role).to.exist; 
    }
  });
});

//pt testare : npx mocha tests/unit/userRoleValidation.test.mjs ---> direct pe backend
import { expect } from 'chai';
import User from '../../models/User.js';

describe('User Model', () => {
  it('should create a user with a valid username', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      role: 'student',
    };

    const user = new User(userData);
    await user.validate(); 

    expect(user.username).to.equal('testuser'); 
  });
});
//pt testare npx mocha tests/unit/userModel.test.mjs --> direct pe backend
const { register } = require('../../controllers/authController');
const User = require('../../models/User');
const StudentDetails = require('../../models/StudentDetails');
const Principal = require('../../models/Principal');
const bcrypt = require('bcryptjs');

// Mock dependencies
jest.mock('../../models/User');
jest.mock('../../models/StudentDetails');
jest.mock('../../models/Principal');
jest.mock('bcryptjs');

describe('Auth Controller - Register', () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock Express req and res objects
    req = {
      body: {
        name: 'Test Student',
        email: 'student@example.com',
        password: 'password123',
        role: 'STUDENT'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should successfully register a new STUDENT and create StudentDetails', async () => {
    // Arrange
    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    
    const mockUser = {
      _id: 'mockUserId123',
      id: 'mockUserId123',
      name: 'Test Student',
      email: 'student@example.com',
      role: 'STUDENT'
    };
    
    User.create.mockResolvedValue(mockUser);
    StudentDetails.create.mockResolvedValue({});

    // Act
    await register(req, res);

    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'student@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
    expect(User.create).toHaveBeenCalledWith({
      name: 'Test Student',
      email: 'student@example.com',
      password: 'hashedPassword',
      role: 'STUDENT'
    });
    expect(StudentDetails.create).toHaveBeenCalledWith({ user: 'mockUserId123' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'mockUserId123',
      name: 'Test Student',
      email: 'student@example.com',
      role: 'STUDENT'
    });
  });

  it('should successfully register a new PRINCIPAL and create Principal details', async () => {
    // Arrange
    req.body.role = 'PRINCIPAL';
    req.body.name = 'Test Principal';
    req.body.email = 'principal@example.com';

    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    
    const mockUser = {
      _id: 'mockUserId456',
      id: 'mockUserId456',
      name: 'Test Principal',
      email: 'principal@example.com',
      role: 'PRINCIPAL'
    };
    
    User.create.mockResolvedValue(mockUser);
    Principal.create.mockResolvedValue({});

    // Act
    await register(req, res);

    // Assert
    expect(Principal.create).toHaveBeenCalledWith({ user: 'mockUserId456' });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('should not create role-specific details if role is neither STUDENT nor PRINCIPAL', async () => {
    // Arrange
    req.body.role = 'ADMIN';

    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    
    const mockUser = {
      _id: 'mockUserId789',
      id: 'mockUserId789',
      name: 'Test Admin',
      email: 'admin@example.com',
      role: 'ADMIN'
    };
    
    User.create.mockResolvedValue(mockUser);

    // Act
    await register(req, res);

    // Assert
    expect(StudentDetails.create).not.toHaveBeenCalled();
    expect(Principal.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('should throw an error (400) if user already exists', async () => {
    // Arrange
    User.findOne.mockResolvedValue({ _id: 'existingUserId' });

    // Act & Assert
    await expect(register(req, res)).rejects.toThrow('User already exists');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should throw an error (400) if user creation fails', async () => {
    // Arrange
    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    
    // Simulate failure during User.create
    User.create.mockResolvedValue(null);

    // Act & Assert
    await expect(register(req, res)).rejects.toThrow('Invalid user data input');
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

import { dbCore } from '@/config';
import { Course, User } from '@/models';
import {
  BadRequestError,
  JwtUserPayload,
  LogInPayload,
  UserSchemaType
} from '@/types';
import {
  checkExisted,
  comparePass,
  generateToken,
  hashPassword,
  sendError,
  sendGetSuccess,
  sendPostSuccess
} from '@/utils';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { startSession } from 'mongoose';

const { db } = dbCore;
const userCollection = db.collection('users');

const getList = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    sendGetSuccess(res, users);
  } catch (error) {
    sendError(res, error);
  }
};

const create = async (req: Request, res: Response) => {
  const session = await startSession();
  try {
    await session.withTransaction(async () => {
      const newCourse = await Course.create(
        [{ name: 'Literature', period: 4 }],
        {
          session
        }
      );
      const result = await User.create(
        [
          {
            ...req.body,
            info: req.body.infoId,
            course: newCourse[0]._id
          }
        ],
        { session }
      );
      sendPostSuccess(res, result);
    });
    session.endSession();
  } catch (error) {
    sendError(res, error);
  }
};

// TODO: Replace mongodb methods by Mongoose
const getById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    sendPostSuccess(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateInfo = req.body;
    const updatedUser = await User.updateOne(
      {
        _id: new ObjectId(userId)
      },
      {
        $set: updateInfo
      },
      { runValidators: true } // This option is required to trigger validation checker
    );
    sendPostSuccess(res, updatedUser);
  } catch (error) {
    sendError(res, error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const isMailExisted = await checkExisted<UserSchemaType>(User, {
      email: req.body.email
    });

    if (isMailExisted) {
      throw new BadRequestError('Email has already existed');
    }

    const hashedPass = await hashPassword(req.body.password);

    const newUser = await User.create({
      ...req.body,
      password: hashedPass
    } as UserSchemaType);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser.toJSON();
    sendPostSuccess(res, rest);
  } catch (error) {
    sendError(res, error);
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const payload = req.body as LogInPayload;
    const user = (await User.findOne({ email: payload.email }))?.toJSON();

    if (!user) {
      throw new BadRequestError('This email has not been registered');
    }

    const plainPass = payload.password;
    const hashedPass = user.password;

    // Compare password:
    const isPasswordMatched = await comparePass(plainPass, hashedPass);

    if (!isPasswordMatched) {
      throw new BadRequestError('Password is incorrect');
    }

    // Generate JWT:
    const bearerToken = generateToken({
      email: user.email,
      password: hashedPass,
      role: user.role
    } as JwtUserPayload);

    res.cookie('sessionId', bearerToken, {
      maxAge: 5 * 60 * 1000
    });
    sendGetSuccess(res, { user, bearerToken });
  } catch (error) {
    sendError(res, error);
  }
};

export { getList, create, getById, update, register, logIn };

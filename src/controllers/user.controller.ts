import { dbCore } from '@/config';
import { Course, User } from '@/models';
import { sendError, sendGetSuccess, sendPostSuccess } from '@/utils';
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

export { getList, create, getById, update };

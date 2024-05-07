import { envConfig, mailTransporter } from '@/config';
import { User } from '@/models';
import {
  BadRequestError,
  JwtUserPayload,
  LogInPayload,
  UserSchemaType
} from '@/types';
import {
  checkExisted,
  compareKey,
  generateToken,
  hashKey,
  sendError,
  sendGetSuccess,
  sendPostSuccess
} from '@/utils';
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
  try {
    const isMailExisted = await checkExisted<UserSchemaType>(User, {
      email: req.body.email
    });

    if (isMailExisted) {
      throw new BadRequestError('Email has already existed');
    }

    const hashedPass = await hashKey(req.body.password);
    const newUser = await User.create({
      ...req.body,
      password: hashedPass
    } as UserSchemaType);

    // Send verification email to user:
    await mailTransporter.send({
      to: newUser.email,
      templateId: envConfig.SENDGRID_VERIFY_MAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        name: newUser.name,
        verification_url: `${envConfig.PUBLIC_FE_URL}/verify.html?userId=${newUser._id}`
      }
    });

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
    const isPasswordMatched = await compareKey(plainPass, hashedPass);

    if (!isPasswordMatched) {
      throw new BadRequestError('Password is incorrect');
    }

    // Generate JWT:
    const bearerToken = generateToken({
      email: user.email,
      password: hashedPass,
      role: user.role
    } as JwtUserPayload);

    sendGetSuccess(res, { user, bearerToken });
  } catch (error) {
    sendError(res, error);
  }
};

const verifyAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId as string;
    const user = await User.findById(userId);

    if (user?.isVerified) {
      throw new BadRequestError('This account has been verified');
    }

    const updatedUser = await User.updateOne(
      { _id: userId },
      { isVerified: true }
    );

    // Generate JWT:
    const bearerToken = generateToken({
      email: user.email,
      password: user.password,
      role: user.role
    } as JwtUserPayload);

    // Send information email to user:
    await mailTransporter.send({
      to: user.email,
      templateId: envConfig.SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID,
      dynamicTemplateData: {
        name: user.name,
        page_url: `${envConfig.PUBLIC_FE_URL}?token=${bearerToken}`
      }
    });
    sendGetSuccess(res, { user: updatedUser, bearerToken });
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
};

export { register, logIn, verifyAccount };
